/* ==========================================================================
   CONESESS - CONSEIL NATIONAL DES ENTREPRISES DE L'ESS DU SÉNÉGAL
   ENHANCED INTERACTIVE APPLICATION LOGIC & DATA V2
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavigation();
  initRegionalExplorer();
  initImpactCalculator();
  initGovernanceTabs();
  initIncubatorExplorer();
  initObservatoryCharts();
  initLabelWizard();
  initMemorandumSearch();
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
   2. INTERACTIVE 14 REGIONS SENEGAL EXPLORER
   -------------------------------------------------------------------------- */
const regionData = {
  "Dakar": {
    hubs: "Hub National & Incubateur Communal Pikine / Guédiawaye",
    coops: "1 240 Entreprises & Mutuelles Recensées",
    focus: "Services, Numérique Social, Mutuelles de Santé, Artisanat Urbain",
    contact: "dakar@conesess.sn | Guichet Unique Municipal"
  },
  "Thiès": {
    hubs: "Incubateur Universitaire UCAD / Incubateur Horticole Kayar",
    coops: "980 Coopératives & GIE",
    focus: "Pêche Solidaire, Maraîchage Agroécologique, Artisanat d'Art",
    contact: "thies@conesess.sn | Antenne Départementale Thiès"
  },
  "Saint-Louis": {
    hubs: "Incubateur Vallée du Fleuve & Synergie UGB",
    coops: "750 Organisations ESS",
    focus: "Riziculture Coopérative, Économie Bleue, Éco-Tourisme",
    contact: "saintlouis@conesess.sn | Guichet Saint-Louis"
  },
  "Fatick": {
    hubs: "Incubateur Départemental Environnemental Fatick / Foundiougne",
    coops: "620 Groupements & Mutuelles",
    focus: "Protection de la Mangrove, Biodiversité, Anacarde & Pêche",
    contact: "fatick@conesess.sn | Hub Thématique Foundiougne"
  },
  "Kaolack": {
    hubs: "Incubateur Agropastoral du Bassin Arachidier",
    coops: "590 Coopératives",
    focus: "Filières Arachide, Sel, Semences Agroécologiques",
    contact: "kaolack@conesess.sn | Antenne Régionale Kaolack"
  },
  "Ziguinchor": {
    hubs: "Incubateur Forestier & Transformation Agroalimentaire Casamance",
    coops: "680 Coopératives Féminines",
    focus: "Anacarde, Mangue, Produits Forestiers Non Ligneux, Mutuelles",
    contact: "ziguinchor@conesess.sn | Antenne Casamance"
  },
  "Kolda": {
    hubs: "Incubateur Agropastoral & Élevage Solidaire",
    coops: "510 Groupements",
    focus: "Filière Laitière, Miel, Arboriculture",
    contact: "kolda@conesess.sn | Relais Communal Kolda"
  },
  "Tambacounda": {
    hubs: "Incubateur Mobile Nomade & Bus de l'Entrepreneuriat",
    coops: "430 Organisations",
    focus: "Mines Responsables, Coton, Artisans Ruraux",
    contact: "tamba@conesess.sn | Clinique Mobile Tamba"
  }
};

function initRegionalExplorer() {
  const buttons = document.querySelectorAll('.region-btn');
  const detailBox = document.getElementById('region-detail-display');

  if (!detailBox) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const regionName = btn.dataset.region;
      const data = regionData[regionName] || {
        hubs: "Relais Communal ON-ESS & Antenne Régionale",
        coops: "Plus de 350 Entreprises ESS",
        focus: "Agroécologie, Mutuelles locales, Artisanat",
        contact: `${regionName.toLowerCase()}@conesess.sn`
      };

      detailBox.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;" class="mb-2">
          <h3 style="color: var(--primary-green); font-size: 1.4rem;"><i class="fas fa-map-marker-alt" style="color: var(--accent-gold);"></i> Région de ${regionName}</h3>
          <span class="badge badge-navy">${data.coops}</span>
        </div>
        <p class="mb-2"><strong>Hub Active :</strong> ${data.hubs}</p>
        <p class="mb-2"><strong>Spécialisations Filières :</strong> ${data.focus}</p>
        <p style="font-size: 0.85rem; color: var(--text-muted);"><strong>Contact Régional :</strong> ${data.contact}</p>
      `;
    });
  });
}

/* --------------------------------------------------------------------------
   3. CALCULATEUR D'IMPACT SOCIAL & ÉCONOMIQUE
   -------------------------------------------------------------------------- */
function initImpactCalculator() {
  const membersInput = document.getElementById('calc-members');
  const revenueInput = document.getElementById('calc-revenue');
  const reinvestInput = document.getElementById('calc-reinvest');

  if (!membersInput || !revenueInput) return;

  const updateImpact = () => {
    const members = parseInt(membersInput.value) || 0;
    const revenue = parseFloat(revenueInput.value) || 0;
    const reinvestPct = parseInt(reinvestInput.value) || 50;

    // Calculations
    const jobs = Math.round(members * 0.45);
    const localReinvest = Math.round((revenue * (reinvestPct / 100)) / 1000);
    const labelScore = Math.min(100, Math.round((members > 100 ? 40 : 20) + (reinvestPct > 50 ? 40 : 20) + (revenue > 5 ? 20 : 10)));

    document.getElementById('res-jobs').textContent = `${jobs} emplois`;
    document.getElementById('res-reinvest').textContent = `${localReinvest} k XOF`;
    document.getElementById('res-score').textContent = `${labelScore} / 100`;
  };

  membersInput.addEventListener('input', updateImpact);
  revenueInput.addEventListener('input', updateImpact);
  if (reinvestInput) reinvestInput.addEventListener('input', updateImpact);

  updateImpact();
}

/* --------------------------------------------------------------------------
   4. GOUVERNANCE ARCHITECTURE INTERACTIVE TABS
   -------------------------------------------------------------------------- */
const govData = {
  ag: {
    title: "A. L'Assemblée Générale (AG) – L'Organe Suprême et Populaire",
    badge: "Souveraineté & Démocratie ESS",
    desc: "L'Assemblée Générale est l'instance souveraine du CONESESS. Elle incarne la base militante, citoyenne et économique du patronat social du Sénégal.",
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
      "La Présidence : Porte la parole unifiée du patronat social auprès de l’État et des partenaires.",
      "La Vice-Présidence IAN-ESS : Pilote politiquement l'Incubateur-Accélérateur National (Citoyenneté Bâtisseuse) et négocie avec la DER/FJ, le 3FPT.",
      "La Vice-Présidence ON-ESS : Garantit la fiabilité de l'Observatoire National et porte le plaidoyer basé sur la preuve scientifique."
    ],
    diagram: "Présidence <br> ├── VP Incubateur National (IAN-ESS) <br> └── VP Observatoire National (ON-ESS)"
  },
  sg: {
    title: "D. Le Secrétariat Général (SG) – Ancre d'Exécution Administrative",
    badge: "Modèle Patronal CNP",
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
    desc: "Dispositif d'immunité éthique inspiré des meilleures traditions d'ingénierie territoriale et du modèle patronal.",
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
   5. PILIER 1 : INCUBATEUR NATIONAL (IAN-ESS) INTERACTIVE EXPLORER
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
   6. PILIER 2 : OBSERVATOIRE NATIONAL (ON-ESS) CHARTS (CHART.JS)
   -------------------------------------------------------------------------- */
function initObservatoryCharts() {
  const pibCtx = document.getElementById('pibChart');
  const regionCtx = document.getElementById('regionChart');
  const parityCtx = document.getElementById('parityChart');

  if (typeof Chart === 'undefined') return;

  if (pibCtx) {
    new Chart(pibCtx, {
      type: 'doughnut',
      data: {
        labels: ['Agroécologie & Agriculture', 'Mutuelles & SFD', 'Artisanat & Énergie', 'Services & Numérique Social'],
        datasets: [{
          data: [42, 28, 18, 12],
          backgroundColor: ['#006837', '#0A2540', '#F4A261', '#2A9D8F'],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { font: { family: 'Plus Jakarta Sans', size: 11 } } }
        }
      }
    });
  }

  if (regionCtx) {
    new Chart(regionCtx, {
      type: 'bar',
      data: {
        labels: ['Dakar', 'Thiès', 'Saint-Louis', 'Fatick', 'Kaolack', 'Ziguinchor', 'Kolda', 'Tambacounda'],
        datasets: [{
          label: 'Entreprises ESS Recensées (ON-ESS)',
          data: [1240, 980, 750, 620, 590, 680, 510, 430],
          backgroundColor: '#006837',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  if (parityCtx) {
    new Chart(parityCtx, {
      type: 'bar',
      data: {
        labels: ['Norme Patronat ESS CONESESS (Max 1:7)', 'Moyenne Secteur Classique (1:45+)', 'Moyenne Coopératives (1:4)'],
        datasets: [{
          label: 'Ratio Salarial Maximum',
          data: [7, 45, 4],
          backgroundColor: ['#2A9D8F', '#E76F51', '#006837'],
          borderRadius: 6
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. LABEL ESS INTERACTIVE SIMULATOR (STEP WIZARD)
   -------------------------------------------------------------------------- */
let currentWizardStep = 1;

function initLabelWizard() {
  const nextBtn = document.getElementById('wizard-next-btn');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const stepContainer = document.getElementById('wizard-step-content');

  if (!nextBtn || !stepContainer) return;

  renderWizardStep(currentWizardStep);

  nextBtn.addEventListener('click', () => {
    if (currentWizardStep < 4) {
      currentWizardStep++;
      renderWizardStep(currentWizardStep);
    } else {
      showToast("Félicitations ! Votre structure réunit les critères préliminaires pour l'obtention du Label ESS - Citoyenneté Bâtisseuse.");
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentWizardStep > 1) {
      currentWizardStep--;
      renderWizardStep(currentWizardStep);
    }
  });
}

function renderWizardStep(step) {
  const stepContainer = document.getElementById('wizard-step-content');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');
  const stepItems = document.querySelectorAll('.wizard-steps .step-item');

  stepItems.forEach((item, idx) => {
    if (idx + 1 === step) {
      item.classList.add('active');
    } else if (idx + 1 < step) {
      item.classList.add('completed');
    } else {
      item.classList.remove('active', 'completed');
    }
  });

  prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
  nextBtn.textContent = step === 4 ? 'Soumettre la Demande Officielle' : 'Étape Suivante ➔';

  if (step === 1) {
    stepContainer.innerHTML = `
      <h3 style="color: var(--primary-navy);" class="mb-3">Étape 1 : Forme Juridique & Statut de la Structure</h3>
      <p class="text-muted mb-4">Sélectionnez la catégorie patronale d'ESS à laquelle appartient votre organisation au Sénégal.</p>
      <div class="wizard-form-group">
        <label>Nom de votre Entreprise / Groupement</label>
        <input type="text" class="wizard-form-control" placeholder="ex: Coopérative Agroécologique de Kayar" id="wiz-name">
      </div>
      <div class="wizard-form-group">
        <label>Type d'Organisation ESS</label>
        <select class="wizard-form-control" id="wiz-type">
          <option>Coopérative Agricole / Artisanale</option>
          <option>Mutuelle de Santé / Épargne & Crédit (SFD)</option>
          <option>Groupement d'Intérêt Économique (GIE) Territorial</option>
          <option>Entreprise Sociale / Startup d'Impact</option>
          <option>Association à Vocation Économique Productive</option>
        </select>
      </div>
      <div class="wizard-form-group">
        <label>Région d'Implantation Principale</label>
        <select class="wizard-form-control">
          <option>Dakar</option><option>Thiès</option><option>Saint-Louis</option>
          <option>Fatick</option><option>Kaolack</option><option>Ziguinchor</option>
          <option>Kolda</option><option>Tambacounda</option><option>Matam</option>
          <option>Kaffrine</option><option>Kedougou</option><option>Sédhiou</option>
          <option>Louga</option><option>Diourbel</option>
        </select>
      </div>
    `;
  } else if (step === 2) {
    stepContainer.innerHTML = `
      <h3 style="color: var(--primary-navy);" class="mb-3">Étape 2 : Principes Démocratiques & Ratios Sociales</h3>
      <p class="text-muted mb-4">Évaluation de la gouvernance éthique selon la charte du CONESESS.</p>
      <div class="wizard-form-group">
        <label>Appliquez-vous la règle « Une personne = Une voix » à l'Assemblée Générale ?</label>
        <select class="wizard-form-control">
          <option>Oui, à 100% (Immuable)</option>
          <option>En cours de formalisation</option>
        </select>
      </div>
      <div class="wizard-form-group">
        <label>Écart entre la rémunération la plus haute et la plus basse dans votre structure</label>
        <select class="wizard-form-control">
          <option>Inférieur à 1:7 (Conforme aux normes du Label CONESESS)</option>
          <option>Entre 1:7 et 1:10</option>
          <option>Non mesuré actuellement</option>
        </select>
      </div>
      <div class="wizard-form-group">
        <label>Part des bénéfices réinvestis dans la communauté / la réserve statutaire</label>
        <input type="text" class="wizard-form-control" placeholder="ex: 60% des bénéfices réinvestis">
      </div>
    `;
  } else if (step === 3) {
    stepContainer.innerHTML = `
      <h3 style="color: var(--primary-navy);" class="mb-3">Étape 3 : Impact Communautaire & Ancrage "Citoyenneté Bâtisseuse"</h3>
      <p class="text-muted mb-4">Éligibilité aux programmes d'incubation IAN-ESS et marchés publics réservés.</p>
      <div class="wizard-form-group">
        <label>Nombre de bénéficiaires / membres directement impactés</label>
        <select class="wizard-form-control">
          <option>Plus de 100 personnes (Projet d'envergure prioritaire IAN-ESS)</option>
          <option>Entre 30 et 100 personnes</option>
          <option>Moins de 30 personnes</option>
        </select>
      </div>
      <div class="wizard-form-group">
        <label>Pôle Sectoriel Métier Concerné</label>
        <select class="wizard-form-control">
          <option>Agroécologie & Souveraineté Alimentaire</option>
          <option>Mutuelles de Santé, d'Épargne et de Crédit (SFD)</option>
          <option>Artisanat, Énergie Renouvelable & Économie Circulaire</option>
          <option>Services, Numérique Social & Éducation</option>
        </select>
      </div>
    `;
  } else if (step === 4) {
    stepContainer.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--accent-soft-green); color: var(--primary-green); display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 1.5rem auto;">
          <i class="fas fa-award"></i>
        </div>
        <h3 style="color: var(--primary-navy);" class="mb-2">Éligibilité Validée au Pre-Label ESS !</h3>
        <p style="color: var(--text-body); max-width: 600px; margin: 0 auto 2rem auto;">
          Votre organisation répond aux critères de la <strong>Citoyenneté Bâtisseuse</strong>.
          En soumettant votre dossier, l'Observatoire National (ON-ESS) procédera à l'audit technique de terrain, avant arbitrage par le Comité des Sages.
        </p>
        <div style="background: var(--bg-alt); padding: 1.25rem; border-radius: var(--radius-md); text-align: left;" class="mb-3">
          <h4 style="color: var(--primary-green);" class="mb-2">Avantages rattachés au Label CONESESS :</h4>
          <ul style="font-size: 0.9rem; line-height: 1.8;">
            <li>✓ Accès prioritaire aux lignes de financement DER/FJ & 3FPT via la Vice-Présidence IAN-ESS.</li>
            <li>✓ Éligibilité aux quotas de marchés publics réservés par l'État.</li>
            <li>✓ Audit scientifique et cartographie dans le tableau de bord macro de l'Observatoire (Vision 2050).</li>
          </ul>
        </div>
      </div>
    `;
  }
}

/* --------------------------------------------------------------------------
   8. MEMORANDUM SEARCH & FILTER
   -------------------------------------------------------------------------- */
function initMemorandumSearch() {
  const searchInput = document.getElementById('memo-search-input');
  const memoSections = document.querySelectorAll('.memo-section-block');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    memoSections.forEach(block => {
      const text = block.textContent.toLowerCase();
      if (text.includes(term)) {
        block.style.display = 'block';
      } else {
        block.style.display = 'none';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. MODAL WINDOWS & FORMS
   -------------------------------------------------------------------------- */
function initModalsAndForms() {
  const joinBtns = document.querySelectorAll('.btn-join-modal');
  const modalOverlay = document.getElementById('membership-modal');
  const modalClose = document.getElementById('modal-close-btn');

  if (modalOverlay) {
    joinBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
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

  const membershipForm = document.getElementById('form-membership');
  if (membershipForm) {
    membershipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      modalOverlay.classList.remove('show');
      showToast("Votre demande d'adhésion au CONESESS a été transmise au Secrétariat Général avec succès !");
    });
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
  }, 4000);
}
