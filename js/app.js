/* ==========================================================================
   CONESESS - CONSEIL NATIONAL DES ENTREPRISES DE L'ESS DU SÉNÉGAL
   APPLICATION LOGIC V8
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initGovernanceTabs();
  initIncubatorExplorer();
  initModalsAndForms();
});

/* --------------------------------------------------------------------------
   0. DARK / LIGHT THEME TOGGLE
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('conesess-theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('conesess-theme', theme);
    updateThemeIcon(theme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn i');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

/* --------------------------------------------------------------------------
   1. NAVIGATION & MOBILE TOGGLE
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.main-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. GOUVERNANCE ARCHITECTURE INTERACTIVE TABS
   -------------------------------------------------------------------------- */
const govData = {
  ag: {
    title: "A. L'Assemblée Générale (AG) – L'Organe Suprême et Populaire",
    badge: "Souveraineté & Démocratie ESS",
    desc: "L'Assemblée Générale est l'instance souveraine du CONESESS. Elle incarne la base militante, citoyenne et économique du réseau confédérateur de l'ESS au Sénégal.",
    features: [
      "Réunit l'ensemble des membres : coopératives locales, mutuelles de santé/d'épargne, GIE, associations productives et entreprises sociales.",
      "Fixe les grandes orientations stratégiques et élit le Conseil d'Administration.",
      "Principe démocratique immuable : Une entreprise / organisation = Une voix, quel que soit son chiffre d'affaires."
    ],
    diagram: "AG (Tous les Membres) ➔ Élection du CA ➔ Pouvoir Délibératif Souverain"
  },
  ca: {
    title: "B. Le Conseil d’Administration (CA) – Parlement Stratégique",
    badge: "Contrôle & Équilibre Régional",
    desc: "Le Conseil d'Administration agit comme le parlement du CONESESS. Il veille à l'équilibre des pouvoirs et à l'application des décisions de l'AG.",
    features: [
      "Regroupe des administrateurs élus représentant équitablement les 14 régions du Sénégal.",
      "Validation du plan de travail annuel et du budget prévisionnel.",
      "Nomme le Secrétaire Général et élit le Bureau Exécutif avec pouvoir permanent de contrôle et d'évaluation."
    ],
    diagram: "CA (14 Régions) ➔ Mandat par l'AG ➔ Nomme SG & Supervise BE"
  },
  be: {
    title: "C. Le Bureau Exécutif (BE) – Portage Politique Direct des Piliers",
    badge: "Moteur Exécutif & Plaidoyer",
    desc: "Organe restreint chargé de la mise en œuvre de la stratégie politique. Il s'articule autour d'une Présidence et de deux Vice-Présidences dédiées aux grands piliers.",
    features: [
      "La Présidence : Porte la parole unifiée des entreprises de l'ESS auprès de l’État et des partenaires.",
      "La Vice-Présidence IAN-ESS : Pilote politiquement l'Incubateur-Accélérateur National (Citoyenneté Bâtisseuse) et négocie avec la DER/FJ, le 3FPT.",
      "La Vice-Présidence ON-ESS : Garantit la fiabilité de l'Observatoire National et porte le plaidoyer basé sur la preuve scientifique."
    ],
    diagram: "Présidence <br> ├── VP Incubateur National (IAN-ESS) <br> └── VP Observatoire National (ON-ESS)"
  },
  sg: {
    title: "D. Le Secrétariat Général (SG) – Ancre d'Exécution Administrative",
    badge: "Modèle Confédéral CNP",
    desc: "Structure permanente non élue dirigée par un cadre de haut niveau recruté par le CA sur le modèle horizontal fort du CNP.",
    features: [
      "Coordonne l'administration globale et les services aux membres.",
      "Fluidifie les interactions financières et techniques entre l'Incubateur et l'Observatoire.",
      "Supervise le travail quotidien des 4 Pôles Sectoriels Métiers."
    ],
    diagram: "Secrétaire Général ➔ Coordination Administrative ➔ 4 Pôles Sectoriels"
  },
  sages: {
    title: "E. Le Collège des Membres Associés & Comité des Sages",
    badge: "Légitimité Éthique & Anti-Social Washing",
    desc: "Dispositif d'immunité éthique inspiré des meilleures traditions d'ingénierie territoriale et du modèle confédéral.",
    features: [
      "Figures Emblématiques de l'ESS & Citoyens Bâtisseurs Référents (chercheurs UCAD/UCAB, experts territoriaux).",
      "Droit de veto moral pour vacciner l'organisation contre le social-washing et les contingences partisanes.",
      "Partenaires Écosystémiques : Finance éthique, Fondations RSE, Haute Autorité du Waqf."
    ],
    diagram: "Comité des Sages ➔ Droit de Veto Moral ➔ Octroi Final du Label ESS"
  }
};

function initGovernanceTabs() {
  const tabs = document.querySelectorAll('.gov-tab-btn');
  const infoContainer = document.getElementById('gov-info-display');

  if (!infoContainer) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.dataset.gov;
      const data = govData[key];

      if (data) {
        infoContainer.style.opacity = '0';
        setTimeout(() => {
          infoContainer.innerHTML = `
            <div class="gov-info">
              <span class="badge badge-gold mb-2">${data.badge}</span>
              <h3>${data.title}</h3>
              <p>${data.desc}</p>
              <div class="gov-feature-list mb-4">
                ${data.features.map(f => `<div class="gov-feature-item"><i class="fas fa-check-circle"></i> <span>${f}</span></div>`).join('')}
              </div>
            </div>
            <div class="gov-diagram-visual">
              <span class="badge badge-green mb-3">Organigramme & Flux</span>
              <div style="font-family: monospace; font-size: 0.95rem; color: #F4A261; line-height: 1.8;">
                ${data.diagram}
              </div>
            </div>
          `;
          infoContainer.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. PILIER 1 : INCUBATEUR NATIONAL (IAN-ESS) INTERACTIVE EXPLORER
   -------------------------------------------------------------------------- */
const incubatorData = {
  communal: {
    title: "1. L'Incubateur Communal (Proximité)",
    badge: "Ancrage Local",
    desc: "Dispositif d'accompagnement de proximité installé dans les communes pour structurer le tissu micro-économique local.",
    target: "Accompagne tous types de projets ESS d'envergure, structurants et duplicables au niveau municipal.",
    methodology: "Business Mentoring hebdomadaire, redevabilité stricte des budgets locaux chaque lundi matin, revues physiques in situ.",
    impact: "Structuration directe des groupements de femmes, mutuelles communales et ateliers collectifs."
  },
  departemental: {
    title: "2. L'Incubateur Départemental / Environnemental",
    badge: "Hub Thématique Fatick/Foundiougne",
    desc: "Hub thématique territorial conçu pour résoudre des problématiques environnementales et économiques spécifiques.",
    target: "Exemple de prototype : Hub Fatick / Foundiougne dédié à la conservation de la biodiversité, au reboisement de la mangrove et à l'économie bleue.",
    methodology: "Synergie inter-départementale, valorisation des chaînes de valeur halieutiques et éco-touristiques solidairement gérées.",
    impact: "Restauration des écosystèmes et création d'emplois verts pour la jeunesse rurale."
  },
  mobile: {
    title: "3. L'Incubateur Mobile (Modèle Nomade & Bus)",
    badge: "Équité Territoriale & Hackathons",
    desc: "Dispositif nomade corrigeant les inégalités d'accès aux services dans les zones enclavées sans bureau fixe.",
    target: "Clinique mobile et Bus de l'Entrepreneuriat allant au pas de la porte des acteurs ruraux.",
    methodology: "Parcours initié par un Hackathon Territorial de 48h agissant comme un entonnoir de sélection pour capter et financer les projets champions.",
    impact: "Détection des pépites rurales et inclusion des zones isolées dans l'agenda national."
  },
  confessionnel: {
    title: "4. L'Incubateur Confessionnel (Philanthropie Éthique)",
    badge: "Prototype Ahloulahi / Layenne",
    desc: "Articule la foi et l'ESS pour transformer la charité passive en autonomisation économique durable.",
    target: "Prototype Ahloulahi Incubator (Communauté Layenne) et dahiras/daaras productifs.",
    methodology: "Mutation des Dahiras en Coopératives Productives Solidaires, modernisation des Daaras en pôles agro-écologiques, intégration Zakat (amorçage) & Waqf (garantie) via Fintech sociale.",
    impact: "Souveraineté économique communautaire et valorisation éthique de la finance sociale."
  },
  universitaire: {
    title: "5. L'Incubateur Universitaire (Service à la Communauté)",
    badge: "UCAD / UCAB - Loi 2015-02",
    desc: "Operationalise la mission régalienne de Service à la Communauté des universités publiques sénégalaises.",
    target: "Cabinets de conseil pédagogiques (UCAD FLSH) et exploitation partagée de 10 ha agro-écologiques à Kangare Lo avec l'UCAB de Bambey.",
    methodology: "Synergie intergénérationnelle étudiants, enseignants-chercheurs et coopératives d'exploitation.",
    impact: "Transition recherche-action, incubations universitaires et souveraineté alimentaire."
  }
};

function initIncubatorExplorer() {
  const tabCards = document.querySelectorAll('.incubator-tab-card');
  const displayPanel = document.getElementById('incubator-detail-display');

  if (!displayPanel) return;

  tabCards.forEach(card => {
    card.addEventListener('click', () => {
      tabCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const key = card.dataset.hub;
      const data = incubatorData[key];

      if (data) {
        displayPanel.innerHTML = `
          <div class="incubator-detail-grid">
            <div>
              <span class="badge badge-green mb-3">${data.badge}</span>
              <h3 style="font-size: 1.6rem; color: var(--primary-navy);" class="mb-3">${data.title}</h3>
              <p class="mb-4">${data.desc}</p>
              <div style="background: var(--bg-alt); padding: 1.25rem; border-radius: var(--radius-md); border-left: 4px solid var(--primary-green);">
                <strong style="color: var(--primary-green);">Public & Cible :</strong>
                <p style="font-size: 0.9rem; margin-top: 0.3rem;">${data.target}</p>
              </div>
            </div>
            <div>
              <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); box-shadow: var(--shadow-sm);" class="mb-3">
                <h4 style="color: var(--text-dark);" class="mb-2"><i class="fas fa-cogs" style="color: var(--accent-gold);"></i> Méthodologie d'Action</h4>
                <p style="font-size: 0.9rem; color: var(--text-body);">${data.methodology}</p>
              </div>
              <div style="background: var(--bg-surface); padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); box-shadow: var(--shadow-sm);">
                <h4 style="color: var(--text-dark);" class="mb-2"><i class="fas fa-chart-line" style="color: var(--accent-emerald);"></i> Impact Attendu</h4>
                <p style="font-size: 0.9rem; color: var(--text-body);">${data.impact}</p>
              </div>
            </div>
          </div>
        `;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. MODAL WINDOWS & ADHESION FORM HANDLERS
   -------------------------------------------------------------------------- */
function initModalsAndForms() {
  const joinBtns = document.querySelectorAll('.btn-join-modal');
  const modalOverlay = document.getElementById('membership-modal');
  const modalClose = document.getElementById('modal-close-btn');

  if (modalOverlay) {
    joinBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.getAttribute('href') === '#adhesion') {
          const targetSection = document.getElementById('adhesion');
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            return;
          }
        }
        e.preventDefault();
        modalOverlay.classList.add('show');
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('show');
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('show');
      }
    });
  }

  // Embedded Page Adhesion Form
  const mainForm = document.getElementById('form-main-adhesion');
  const mainSuccessBox = document.getElementById('adhesion-success-msg');

  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const randRef = 'CONESESS-2026-' + Math.floor(1000 + Math.random() * 9000);
      const refElement = document.getElementById('adhesion-ref-num');
      if (refElement) refElement.textContent = randRef;

      mainForm.style.display = 'none';
      if (mainSuccessBox) mainSuccessBox.style.display = 'block';

      showToast("Félicitations ! Votre demande d'adhésion au CONESESS a été enregistrée (" + randRef + ").");
      
      const cardContainer = document.getElementById('adhesion-card-container');
      if (cardContainer) {
        cardContainer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Modal Form Submission
  const modalForm = document.getElementById('form-membership');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalOverlay.classList.remove('show');
      modalForm.reset();
      const randRef = 'CONESESS-2026-' + Math.floor(1000 + Math.random() * 9000);
      showToast("Votre demande d'adhésion (" + randRef + ") a été transmise au Secrétariat Général avec succès !");
    });
  }
}

function resetAdhesionForm() {
  const mainForm = document.getElementById('form-main-adhesion');
  const mainSuccessBox = document.getElementById('adhesion-success-msg');

  if (mainForm) {
    mainForm.reset();
    mainForm.style.display = 'block';
  }
  if (mainSuccessBox) {
    mainSuccessBox.style.display = 'none';
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color: #F4A261;"></i> <span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
