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
    title: "A. L'Assemblée Générale (AG) – L'Organe Suprême",
    badge: "Souveraineté & Démocratie ESS",
    desc: "L'Assemblée Générale est l'instance souveraine du CONESESS. Elle incarne la base militante, citoyenne et économique du réseau confédérateur de l'ESS au Sénégal.",
    features: [
      "Réunit l'ensemble des membres à jour : coopératives, mutuelles, GIE et entreprises sociales.",
      "Définit la politique générale et élit le Conseil d'Administration.",
      "Principe égalitaire strict : Une entreprise / organisation = Une voix."
    ],
    diagram: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
        <div style="background: var(--accent-soft-green); border: 1px solid var(--primary-green); padding: 0.75rem 1rem; border-radius: 8px; font-weight: 700; color: var(--primary-green);">
          <i class="fas fa-users"></i> AG Souveraine (Tous les Membres)
        </div>
        <div style="text-align: center; color: var(--primary-green); font-size: 1.1rem;"><i class="fas fa-arrow-down"></i></div>
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 0.75rem 1rem; border-radius: 8px; color: var(--text-dark);">
          <i class="fas fa-sitemap"></i> Élection du CA (14 Régions)
        </div>
        <div style="text-align: center; color: var(--primary-green); font-size: 1.1rem;"><i class="fas fa-arrow-down"></i></div>
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 0.75rem 1rem; border-radius: 8px; color: var(--text-dark);">
          <i class="fas fa-gavel"></i> Vote du Budget & Orientations
        </div>
      </div>
    `
  },
  ca: {
    title: "B. Le Conseil d'Administration (CA) – Organe de Délibération",
    badge: "Contrôle & Équilibre Régional",
    desc: "Le Conseil d'Administration agit comme le parlement du CONESESS. Il veille à l'équilibre des pouvoirs et à l'application des décisions de l'AG.",
    features: [
      "Regroupe des administrateurs élus représentant équitablement les 14 régions du Sénégal.",
      "Validation du plan de travail annuel et du budget prévisionnel.",
      "Nomme le Secrétaire Général (SG) et élit le Bureau Exécutif avec pouvoir permanent de contrôle et d'évaluation."
    ],
    diagram: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
        <div style="background: var(--accent-soft-gold); border: 1px solid var(--accent-gold); padding: 0.75rem 1rem; border-radius: 8px; font-weight: 700; color: #D97706;">
          <i class="fas fa-sitemap"></i> CA (14 Régions du Sénégal)
        </div>
        <div style="text-align: center; color: #D97706; font-size: 1.1rem;"><i class="fas fa-arrow-down"></i></div>
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 0.75rem 1rem; border-radius: 8px; color: var(--text-dark);">
          <i class="fas fa-briefcase"></i> Élection du Bureau Exécutif (BE)
        </div>
        <div style="text-align: center; color: #D97706; font-size: 1.1rem;"><i class="fas fa-arrow-down"></i></div>
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 0.75rem 1rem; border-radius: 8px; color: var(--text-dark);">
          <i class="fas fa-user-check"></i> Nomination & Contrôle du SG
        </div>
      </div>
    `
  },
  be: {
    title: "C. Le Bureau Exécutif (BE) – Portage Politique Direct des Piliers",
    badge: "Moteur Exécutif & Plaidoyer",
    desc: "Organe restreint chargé de la mise en œuvre de la stratégie politique. Il s'articule autour d'une Présidence et de deux Vice-Présidences dédiées aux grands piliers.",
    features: [
      "La Présidence : Porte la parole unifiée des entreprises de l'ESS auprès de l’État et des partenaires.",
      "La Vice-Présidence IAN-ESS : Pilote politiquement l'Incubateur-Accélérateur National et négocie avec la DER/FJ, le 3FPT.",
      "La Vice-Présidence ON-ESS : Garantit la fiabilité de l'Observatoire National et porte le plaidoyer basés sur la preuve."
    ],
    diagram: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
        <div style="background: var(--accent-soft-green); border: 1px solid var(--primary-green); padding: 0.75rem 1rem; border-radius: 8px; font-weight: 700; color: var(--primary-green);">
          <i class="fas fa-user-tie"></i> Présidence du CONESESS
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
          <div style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 0.65rem; border-radius: 6px; font-size: 0.8rem; color: var(--primary-green); font-weight: 600;">
            <i class="fas fa-rocket"></i> VP Incubateur IAN-ESS
          </div>
          <div style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 0.65rem; border-radius: 6px; font-size: 0.8rem; color: var(--primary-navy); font-weight: 600;">
            <i class="fas fa-chart-bar"></i> VP Observatoire ON-ESS
          </div>
        </div>
      </div>
    `
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
    diagram: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
        <div style="background: var(--accent-soft-green); border: 1px solid var(--primary-green); padding: 0.75rem 1rem; border-radius: 8px; font-weight: 700; color: var(--primary-green);">
          <i class="fas fa-user-shield"></i> Secrétaire Général (SG)
        </div>
        <div style="text-align: center; color: var(--primary-green); font-size: 1.1rem;"><i class="fas fa-arrow-down"></i></div>
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 0.75rem 1rem; border-radius: 8px; color: var(--text-dark);">
          <i class="fas fa-cogs"></i> Coordination 4 Pôles Métiers
        </div>
      </div>
    `
  },
  sages: {
    title: "E. Le Collège des Membres Associés : L'Ancre de la Légitimité Éthique",
    badge: "Membre Associé CNP & Éthique",
    desc: "Inspiré du statut de membre associé du CNP, ce collège intègre des entités et personnalités majeures :",
    features: [
      "<strong>Les Figures Emblématiques de l'ESS (Les Citoyens Bâtisseurs Référents) :</strong> Profils à haut potentiel, experts en ingénierie territoriale, chercheurs des universités (UCAD, UCAB) et leaders communautaires. Ils forment un Comité des Sages / Comité Consultatif disposant d'un droit de veto moral pour immuniser l'organisation contre les contingences partisanes et le social washing.",
      "<strong>Les Partenaires Écosystémiques :</strong> Institutions de la finance éthique et de la philanthropie, fondations d'entreprises (RSE), et guichets de l'économie du don (Haute Autorité du Waqf)."
    ],
    diagram: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
        <div style="background: var(--accent-soft-gold); border: 1px solid var(--accent-gold); padding: 0.75rem 1rem; border-radius: 8px; font-weight: 700; color: #D97706;">
          <i class="fas fa-award"></i> Collège des Membres Associés
        </div>
        <div style="text-align: center; color: #D97706; font-size: 1.1rem;"><i class="fas fa-shield-alt"></i></div>
        <div style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 0.75rem 1rem; border-radius: 8px; color: var(--text-dark); font-size: 0.875rem;">
          <i class="fas fa-check-double"></i> Droit de Veto Moral & Haute Autorité du Waqf
        </div>
      </div>
    `
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
              <span class="badge badge-green mb-3"><i class="fas fa-project-diagram"></i> Organigramme & Flux</span>
              ${data.diagram}
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
      tabCards.forEach(c => {
        c.classList.remove('active');
        c.style.background = 'rgba(255,255,255,0.05)';
        c.style.borderColor = 'rgba(255,255,255,0.15)';
        const h4 = c.querySelector('h4');
        if (h4) h4.style.color = '#FFFFFF';
      });

      card.classList.add('active');
      card.style.background = 'rgba(255,255,255,0.12)';
      card.style.borderColor = 'var(--primary-green)';
      const h4 = card.querySelector('h4');
      if (h4) h4.style.color = 'var(--accent-gold)';

      const key = card.dataset.hub;
      const data = incubatorData[key];

      if (data) {
        displayPanel.innerHTML = `
          <div class="incubator-detail-grid" style="grid-template-columns: 1fr; gap: 1.25rem;">
            <div>
              <span class="badge badge-green mb-2">${data.badge}</span>
              <h3 style="font-size: 1.4rem; color: var(--accent-gold);" class="mb-2">${data.title}</h3>
              <p style="font-size: 0.9rem; color: rgba(255,255,255,0.85);" class="mb-3">${data.desc}</p>
              <div style="background: rgba(255,255,255,0.08); padding: 1rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-gold);">
                <strong style="color: var(--accent-gold); font-size: 0.85rem;">Public & Cible :</strong>
                <p style="font-size: 0.85rem; color: rgba(255,255,255,0.9); margin-top: 0.2rem;">${data.target}</p>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: rgba(255,255,255,0.06); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1);">
                <h4 style="color: #FFFFFF; font-size: 0.9rem;" class="mb-1"><i class="fas fa-cogs" style="color: var(--accent-gold);"></i> Méthodologie d'Action</h4>
                <p style="font-size: 0.825rem; color: rgba(255,255,255,0.8);">${data.methodology}</p>
              </div>
              <div style="background: rgba(255,255,255,0.06); padding: 1rem; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1);">
                <h4 style="color: #FFFFFF; font-size: 0.9rem;" class="mb-1"><i class="fas fa-chart-line" style="color: var(--accent-emerald);"></i> Impact Attendu</h4>
                <p style="font-size: 0.825rem; color: rgba(255,255,255,0.8);">${data.impact}</p>
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

  // Handle "Autre" legal form specification in Main Form
  const mainTypeSelect = document.getElementById('adh-type');
  const mainOtherGroup = document.getElementById('adh-type-other-group');
  const mainOtherInput = document.getElementById('adh-type-other-input');

  if (mainTypeSelect && mainOtherGroup && mainOtherInput) {
    mainTypeSelect.addEventListener('change', () => {
      if (mainTypeSelect.value === 'autre') {
        mainOtherGroup.style.display = 'block';
        mainOtherInput.setAttribute('required', 'true');
        mainOtherInput.focus();
      } else {
        mainOtherGroup.style.display = 'none';
        mainOtherInput.removeAttribute('required');
        mainOtherInput.value = '';
      }
    });
  }

  // Handle "Autre" legal form specification in Modal Form
  const modalTypeSelect = document.getElementById('modal-adh-type');
  const modalOtherGroup = document.getElementById('modal-adh-type-other-group');
  const modalOtherInput = document.getElementById('modal-adh-type-other-input');

  if (modalTypeSelect && modalOtherGroup && modalOtherInput) {
    modalTypeSelect.addEventListener('change', () => {
      if (modalTypeSelect.value === 'autre') {
        modalOtherGroup.style.display = 'block';
        modalOtherInput.setAttribute('required', 'true');
        modalOtherInput.focus();
      } else {
        modalOtherGroup.style.display = 'none';
        modalOtherInput.removeAttribute('required');
        modalOtherInput.value = '';
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
      if (modalOtherGroup) modalOtherGroup.style.display = 'none';
      const randRef = 'CONESESS-2026-' + Math.floor(1000 + Math.random() * 9000);
      showToast("Votre demande d'adhésion (" + randRef + ") a été transmise au Secrétariat Technique avec succès !");
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('form-contact-send');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.reset();
      showToast("Votre message a été transmis avec succès au Secrétariat Technique du CONESESS !");
    });
  }
}

function resetAdhesionForm() {
  const mainForm = document.getElementById('form-main-adhesion');
  const mainSuccessBox = document.getElementById('adhesion-success-msg');
  const mainOtherGroup = document.getElementById('adh-type-other-group');
  const mainOtherInput = document.getElementById('adh-type-other-input');

  if (mainForm) {
    mainForm.reset();
    mainForm.style.display = 'block';
  }
  if (mainOtherGroup) mainOtherGroup.style.display = 'none';
  if (mainOtherInput) {
    mainOtherInput.removeAttribute('required');
    mainOtherInput.value = '';
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
