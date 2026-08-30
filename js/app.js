/* ==========================================================================
   CONESESS - CONSEIL NATIONAL DES ENTREPRISES DE L'ESS DU SÉNÉGAL
   APPLICATION LOGIC V8
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initGovernanceTabs();
  initIncubatorExplorer();
  initModalsAndForms();
  if (typeof fetchCloudDataToLocal === 'function') fetchCloudDataToLocal();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & MODERN MOBILE DRAWER SHEET
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.main-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const overlay = document.getElementById('mobile-nav-overlay');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  const openDrawer = () => {
    if (overlay && drawer) {
      overlay.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    if (overlay && drawer) {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.mobile-nav-item').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
      document.querySelectorAll('.mobile-nav-item').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. GOUVERNANCE ARCHITECTURE INTERACTIVE TABS
   -------------------------------------------------------------------------- */
const govData = {
  ag: {
    title: "A. L'Assemblée Générale (AG) – L'Organe Suprême",
    badge: "Souveraineté & Démocratie ESS",
    desc: "L'Assemblée Générale est l'instance souveraine du CONESESS. Elle incarne la base militante, citoyenne et économique du cadre national fédérateur de l'ESS au Sénégal.",
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
    badge: "Modèle Cadre Fédérateur CNP",
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
      tabs.forEach(t => {
        t.classList.remove('active');
        t.style.background = '';
        t.style.borderColor = '';
        t.style.borderLeft = '';
        const strong = t.querySelector('strong');
        if (strong) strong.style.color = '';
      });

      tab.classList.add('active');

      const key = tab.dataset.gov;
      const data = govData[key];

      if (data) {
        infoContainer.style.opacity = '0';
        setTimeout(() => {
          infoContainer.innerHTML = `
            <div class="gov-info">
              <span class="badge badge-gold mb-2">${data.badge}</span>
              <h3 style="color: var(--accent-gold);">${data.title}</h3>
              <p style="color: rgba(255,255,255,0.88);">${data.desc}</p>
              <div class="gov-feature-list mb-4">
                ${data.features.map(f => `<div class="gov-feature-item"><i class="fas fa-check-circle" style="color: #2A9D8F;"></i> <span style="color: rgba(255,255,255,0.92);">${f}</span></div>`).join('')}
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
  proximite: {
    title: "1. Incubateurs territoriaux de proximité",
    badge: "Ancrage Territorial",
    desc: "Accompagner les entreprises et projets ESS au plus près des communes et bassins économiques.",
    target: "Projets ESS communaux, GIE locaux, coopératives de quartier et mutuelles de santé/épargne.",
    methodology: "Diagnostic entrepreneurial, Business Mentoring hebdomadaire, formation pratique et digitalisation de proximité.",
    impact: "Structuration directe des acteurs économiques locaux et création d'emplois durables au niveau municipal."
  },
  thematiques: {
    title: "2. Hubs thématiques et environnementaux",
    badge: "Transition Écologique & Climat",
    desc: "Développer des dispositifs spécialisés autour des enjeux environnementaux, agricoles, climatiques et territoriaux.",
    target: "Initiatives d'agro-écologie, de gestion des déchets, de reboisement et d'économie verte/bleue.",
    methodology: "Accompagnement thématique ciblé, ingénierie de projets éco-responsables et valorisation des filières durables.",
    impact: "Restauration des écosystèmes locaux, résilience climatique et développement des chaînes de valeur vertes."
  },
  mobile: {
    title: "3. Incubateur mobile",
    badge: "Équité Territoriale & Inclusion",
    desc: "Déployer des équipes et services d’accompagnement vers les territoires ne disposant pas encore d’infrastructures permanentes.",
    target: "Entreprises et groupements solidaires situés dans les communes et zones rurales enclavées.",
    methodology: "Dispositif nomade d'accompagnement terrain, ateliers de formation mobiles et caravanes de conseil.",
    impact: "Accès équitable aux services d'ingénierie et intégration des territoires ruraux dans la dynamique nationale."
  },
  partenariats: {
    title: "4. Partenariats communautaires et confessionnels",
    badge: "Finance Solidaire & Éthique",
    desc: "Construire, lorsque cela est pertinent, des partenariats avec les organisations communautaires et confessionnelles engagées dans l’entrepreneuriat solidaire et le développement économique.",
    target: "Organisations communautaires, associations citoyennes et groupements solidaires confessionnels.",
    methodology: "Partenariats éthiques, structuration en coopératives autonomes et ingénierie de finance sociale solidaire.",
    impact: "Autonomisation économique des communautés et valorisation de l'entrepreneuriat solidaire ancré."
  },
  universitaires: {
    title: "5. Hubs universitaires",
    badge: "Recherche, Innovation & ESS",
    desc: "Créer des passerelles entre universités, recherche, innovation et entreprises ESS à travers des conventions avec les établissements intéressés.",
    target: "Étudiants-entrepreneurs, enseignants-chercheurs, laboratoires de recherche et startups sociales.",
    methodology: "Conventions université-entreprise, transfert d'innovation, incubation académique et mentoring d'experts.",
    impact: "Valorisation de la recherche appliquée, innovation sociale et émergence d'entreprises ESS à fort potentiel."
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
          <div class="incubator-detail-grid" style="grid-template-columns: 1fr; gap: 1.25rem;">
            <div>
              <span class="badge badge-green mb-2">${data.badge}</span>
              <h3 style="font-size: 1.35rem; color: var(--primary-green);" class="mb-2">${data.title}</h3>
              <p style="font-size: 0.875rem; color: var(--text-body);" class="mb-3">${data.desc}</p>
              <div style="background: var(--accent-soft-green); padding: 0.85rem; border-radius: var(--radius-md); border-left: 3px solid var(--primary-green);">
                <strong style="color: var(--primary-green); font-size: 0.85rem;">Public & Cible :</strong>
                <p style="font-size: 0.825rem; color: var(--text-dark); margin-top: 0.2rem; margin-bottom: 0;">${data.target}</p>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div style="background: var(--bg-alt); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                <h4 style="color: var(--primary-navy); font-size: 0.875rem;" class="mb-1"><i class="fas fa-cogs" style="color: var(--accent-gold);"></i> Méthodologie d'Action</h4>
                <p style="font-size: 0.825rem; color: var(--text-body); margin: 0;">${data.methodology}</p>
              </div>
              <div style="background: var(--bg-alt); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                <h4 style="color: var(--primary-navy); font-size: 0.875rem;" class="mb-1"><i class="fas fa-chart-line" style="color: var(--primary-green);"></i> Impact Attendu</h4>
                <p style="font-size: 0.825rem; color: var(--text-body); margin: 0;">${data.impact}</p>
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
  const joinBtns = document.querySelectorAll('.btn-join-modal, [href="#adhesion"], [data-open-modal="membership-modal"]');
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

  // Helper function to dispatch automatic form reception notification & direct email to madior1991@gmail.com
  function dispatchEmailNotificationAlert(type, title, details) {
    const notifs = JSON.parse(localStorage.getItem('conesess_notifications')) || [];
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    
    const notifItem = {
      id: 'notif-' + Date.now(),
      type: type,
      title: title,
      details: details,
      date: dateStr,
      read: false
    };

    notifs.unshift(notifItem);
    localStorage.setItem('conesess_notifications', JSON.stringify(notifs));
    console.log(`[FORM RECEPTION NOTIFICATION]: ${title} - ${details}`);

    // Direct Email Dispatch to madior1991@gmail.com
    try {
      fetch('https://formsubmit.co/ajax/madior1991@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[CONESESS] ${title}`,
          _template: 'table',
          _captcha: 'false',
          Destinataire: 'madior1991@gmail.com',
          Type_Formulaire: type,
          Titre: title,
          Détails: details,
          Date_Soumission: dateStr,
          URL: window.location.href
        })
      }).then(res => res.json())
        .then(data => console.log("Email dispatch to madior1991@gmail.com OK:", data))
        .catch(err => console.warn("Email dispatch note:", err));
    } catch(e) {}
  }

const CLOUD_SYNC_ENDPOINTS = [
  "https://crudcrud.com/api/4ae8ebfb950b414aa7e2012e7df06a26/submissions",
  "https://crudcrud.com/api/ba15e0b43e6b48d89f8003de52f17c56/submissions",
  "https://crudcrud.com/api/8e8609a6331a47dfb21efb045239a0ef/submissions",
  "https://crudcrud.com/api/4f01285c31734664b9b3c9a7ac3934cc/submissions"
];

function getCloudEndpoints() {
  const custom = localStorage.getItem('conesess_cloud_endpoint');
  if (custom && custom.trim().startsWith('http')) {
    return [custom.trim(), ...CLOUD_SYNC_ENDPOINTS];
  }
  return CLOUD_SYNC_ENDPOINTS;
}

async function pushLocalDataToCloud() {
  const members = JSON.parse(localStorage.getItem('conesess_members')) || [];
  const webForms = JSON.parse(localStorage.getItem('conesess_web_forms')) || [];
  const contacts = JSON.parse(localStorage.getItem('conesess_contacts')) || [];

  const payload = {
    timestamp: Date.now(),
    members: members,
    webForms: webForms,
    contacts: contacts
  };

  const endpoints = getCloudEndpoints();
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      });
      if (res.ok) {
        console.log("Cloud sync push success via:", endpoint);
        break;
      }
    } catch (err) {
      console.warn("Cloud push warning for endpoint", endpoint, err);
    }
  }
}

async function fetchCloudDataToLocal() {
  let remoteRecords = [];
  const endpoints = getCloudEndpoints();
  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          remoteRecords = remoteRecords.concat(data);
        }
      }
    } catch (err) {
      console.warn("Cloud fetch warning for endpoint", endpoint, err);
    }
  }

  if (remoteRecords.length === 0) return;

  const validSnapshots = remoteRecords.filter(r => r && (r.webForms || r.members || r.type || r.ref));
  if (validSnapshots.length === 0) return;

  let localMembers = JSON.parse(localStorage.getItem('conesess_members')) || [];
  let localWebForms = JSON.parse(localStorage.getItem('conesess_web_forms')) || [];
  let localContacts = JSON.parse(localStorage.getItem('conesess_contacts')) || [];

  let membersMap = new Map();
  localMembers.forEach(m => {
    if (!m) return;
    const key = m.ref || (m.email ? m.email.toLowerCase() : null) || (m.phone ? m.phone.replace(/[^0-9]/g, '') : null) || (m.name ? m.name.toLowerCase() : null);
    if (key) membersMap.set(key, m);
  });

  let webFormsMap = new Map();
  localWebForms.forEach(wf => {
    if (!wf) return;
    const key = wf.ref || wf.id || (wf.email ? wf.email.toLowerCase() : null) || (wf.phone ? wf.phone.replace(/[^0-9]/g, '') : null) || (wf.name ? wf.name.toLowerCase() : null);
    if (key) webFormsMap.set(key, wf);
  });

  let contactsMap = new Map();
  localContacts.forEach(c => {
    if (!c) return;
    const key = (c.email ? c.email.toLowerCase() : '') + (c.phone || '') + (c.date || '');
    if (key) contactsMap.set(key, c);
  });

  let updated = false;

  // Process snapshots in chronological order (oldest first so newest updates overwrite)
  validSnapshots.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

  validSnapshots.forEach(rec => {
    if (!rec) return;

    // 1. Process members
    const membersArray = rec.members && Array.isArray(rec.members) ? rec.members : [];
    membersArray.forEach(m => {
      if (!m) return;
      const key = m.ref || (m.email ? m.email.toLowerCase() : null) || (m.phone ? m.phone.replace(/[^0-9]/g, '') : null) || (m.name ? m.name.toLowerCase() : null);
      if (key) {
        const existing = membersMap.get(key);
        if (!existing || JSON.stringify(existing) !== JSON.stringify(m)) {
          membersMap.set(key, m);
          updated = true;
        }
      }
    });

    // 2. Process webForms
    const formsArray = rec.webForms && Array.isArray(rec.webForms) ? rec.webForms : (rec.type || rec.ref ? [rec] : []);
    formsArray.forEach(wf => {
      if (!wf) return;
      const key = wf.ref || wf.id || (wf.email ? wf.email.toLowerCase() : null) || (wf.phone ? wf.phone.replace(/[^0-9]/g, '') : null) || (wf.name ? wf.name.toLowerCase() : null);
      if (key) {
        const existing = webFormsMap.get(key);
        if (!existing || JSON.stringify(existing) !== JSON.stringify(wf)) {
          webFormsMap.set(key, wf);
          updated = true;
        }
      }
    });

    // 3. Process contacts
    const contactsArray = rec.contacts && Array.isArray(rec.contacts) ? rec.contacts : [];
    contactsArray.forEach(c => {
      if (!c) return;
      const key = (c.email ? c.email.toLowerCase() : '') + (c.phone || '') + (c.date || '');
      if (key) {
        const existing = contactsMap.get(key);
        if (!existing || JSON.stringify(existing) !== JSON.stringify(c)) {
          contactsMap.set(key, c);
          updated = true;
        }
      }
    });
  });

  if (updated) {
    localStorage.setItem('conesess_members', JSON.stringify(Array.from(membersMap.values())));
    localStorage.setItem('conesess_web_forms', JSON.stringify(Array.from(webFormsMap.values())));
    localStorage.setItem('conesess_contacts', JSON.stringify(Array.from(contactsMap.values())));
    try { window.dispatchEvent(new Event('storage')); } catch(e) {}
  }
}

  // Helper function to save new member submission to localStorage DB (Single Central Storage)
  function saveSubmissionToDB(newMember) {
    const webForms = JSON.parse(localStorage.getItem('conesess_web_forms')) || [];
    const webFormEntry = {
      id: newMember.ref,
      type: "Adhésion Membre",
      ref: newMember.ref,
      name: newMember.rep || newMember.name,
      org: newMember.name,
      legalForm: newMember.type,
      region: newMember.region,
      dept: newMember.dept,
      sector: newMember.sector,
      membersCount: newMember.members,
      email: newMember.email,
      phone: newMember.phone,
      role: newMember.sector || 'Représentant Légal',
      details: `Forme: ${newMember.type} | Secteur: ${newMember.sector} | Effectif: ${newMember.members}`,
      desc: newMember.desc,
      motivation: newMember.motivation,
      status: newMember.status || 'En attente',
      date: newMember.date || new Date().toISOString().slice(0,10)
    };
    webForms.unshift(webFormEntry);
    localStorage.setItem('conesess_web_forms', JSON.stringify(webForms));

    // Dispatch Email Notification Alert to madior1991@gmail.com
    dispatchEmailNotificationAlert(
      "Adhésion Membre",
      `Nouveau Dossier d'Adhésion : ${newMember.name}`,
      `Organisation: ${newMember.name} (${newMember.region}) | Réf: ${newMember.ref} | Contact: ${newMember.rep} (${newMember.phone})`
    );

    try { pushLocalDataToCloud(); } catch(err) {}
    try { window.dispatchEvent(new Event('storage')); } catch(err) {}
  }

  // Helper function to save contact message to localStorage DB (Single Central Storage)
  function saveContactMessageToDB(newMessage) {
    const webForms = JSON.parse(localStorage.getItem('conesess_web_forms')) || [];
    const ref = `CNT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const contactFormEntry = {
      id: ref,
      ref: ref,
      type: "Message Contact Direct",
      name: newMessage.name,
      org: newMessage.org || newMessage.name || 'Individuel',
      legalForm: 'Contact Direct',
      region: 'Sénégal',
      email: newMessage.email,
      phone: newMessage.phone,
      role: newMessage.subject || 'Demande d\'Information',
      details: `Sujet : ${newMessage.subject}`,
      motivation: newMessage.message,
      experience: newMessage.message,
      status: 'En attente',
      date: newMessage.date || new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })
    };
    webForms.unshift(contactFormEntry);
    localStorage.setItem('conesess_web_forms', JSON.stringify(webForms));

    dispatchEmailNotificationAlert(
      "Message Contact Direct",
      `Nouveau message de ${newMessage.name} (${newMessage.org || 'Individuel'})`,
      `Sujet: ${newMessage.subject} | Email: ${newMessage.email} | Tel: ${newMessage.phone}`
    );

    try { pushLocalDataToCloud(); } catch(err) {}
    try { window.dispatchEvent(new Event('storage')); } catch(err) {}
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

      // Extract form values
      const name = document.getElementById('adh-name')?.value || 'Organisation ESS';
      const typeSelect = document.getElementById('adh-type');
      let typeVal = typeSelect?.options[typeSelect.selectedIndex]?.text || 'Coopérative';
      if (typeSelect?.value === 'autre') {
        typeVal = document.getElementById('adh-type-other-input')?.value || 'Autre Forme';
      }
      const region = document.getElementById('adh-region')?.value || 'Dakar';
      const dept = document.getElementById('adh-dept')?.value || '';
      const sectorSelect = document.getElementById('adh-sector');
      const sectorVal = sectorSelect?.options[sectorSelect.selectedIndex]?.text || 'Général';
      const members = document.getElementById('adh-members')?.value || '1';
      const rep = document.getElementById('adh-rep')?.value || 'Représentant';
      const phone = document.getElementById('adh-phone')?.value || '+221 77 000 00 00';
      const email = document.getElementById('adh-email')?.value || '';
      const desc = document.getElementById('adh-desc')?.value || '';
      const motivation = document.getElementById('adh-motivation')?.value || '';

      saveSubmissionToDB({
        ref: randRef,
        name: name,
        type: typeVal,
        region: region,
        dept: dept,
        sector: sectorVal,
        members: members,
        rep: rep,
        phone: phone,
        email: email,
        desc: desc,
        motivation: motivation,
        status: 'En attente',
        badgeStatus: 'Non généré',
        badgeRole: 'Représentant Légal',
        date: new Date().toISOString().slice(0,10)
      });

      mainForm.style.display = 'none';
      if (mainSuccessBox) mainSuccessBox.style.display = 'block';

      openSubmissionSuccessModal(randRef);
      showToast("Votre demande a bien été transmise (" + randRef + ").");
      
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

      const randRef = 'CONESESS-2026-' + Math.floor(1000 + Math.random() * 9000);

      const name = document.getElementById('modal-adh-name')?.value || 'Organisation ESS';
      const typeSelect = document.getElementById('modal-adh-type');
      let typeVal = typeSelect?.options[typeSelect.selectedIndex]?.text || 'Coopérative';
      if (typeSelect?.value === 'autre') {
        typeVal = document.getElementById('modal-adh-type-other-input')?.value || 'Autre Forme';
      }
      const region = document.getElementById('modal-adh-region')?.value || 'Dakar';
      const dept = document.getElementById('modal-adh-dept')?.value || '';
      const sectorSelect = document.getElementById('modal-adh-sector');
      const sectorVal = sectorSelect?.options[sectorSelect.selectedIndex]?.text || 'Général';
      const members = document.getElementById('modal-adh-members')?.value || '1';
      const rep = document.getElementById('modal-adh-rep')?.value || 'Représentant';
      const phone = document.getElementById('modal-adh-phone')?.value || '+221 77 000 00 00';
      const email = document.getElementById('modal-adh-email')?.value || '';
      const desc = document.getElementById('modal-adh-desc')?.value || '';
      const motivation = document.getElementById('modal-adh-motivation')?.value || '';

      saveSubmissionToDB({
        ref: randRef,
        name: name,
        type: typeVal,
        region: region,
        dept: dept,
        sector: sectorVal,
        members: members,
        rep: rep,
        phone: phone,
        email: email,
        desc: desc,
        motivation: motivation,
        status: 'En attente',
        badgeStatus: 'Non généré',
        badgeRole: 'Représentant Légal',
        date: new Date().toISOString().slice(0,10)
      });

      if (modalOverlay) modalOverlay.classList.remove('show');
      modalForm.reset();
      if (modalOtherGroup) modalOtherGroup.style.display = 'none';

      openSubmissionSuccessModal(randRef);
      showToast("Votre demande a bien été transmise (" + randRef + ").");
    });
  }

  // Standalone & Inline Contact Form Submissions
  const standaloneContactForm = document.getElementById('form-contact-standalone');
  if (standaloneContactForm) {
    standaloneContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'Visiteur';
      const org = document.getElementById('contact-org')?.value || '';
      const email = document.getElementById('contact-email')?.value || '';
      const phone = document.getElementById('contact-phone')?.value || '';
      const subject = document.getElementById('contact-subject')?.value || 'Demande d\'Information';
      const message = document.getElementById('contact-message')?.value || '';

      saveContactMessageToDB({
        date: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
        name: name,
        org: org,
        phone: phone,
        email: email,
        subject: subject,
        message: message
      });

      const ref = `CNT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      dispatchEmailNotificationAlert(
        "Message Contact Direct",
        `Nouveau message de ${name} (${org || 'Individuel'})`,
        `Sujet: ${subject} | Email: ${email} | Tel: ${phone}`
      );

      try { window.dispatchEvent(new Event('storage')); } catch(err) {}

      standaloneContactForm.reset();
      openSubmissionSuccessModal(ref);
      showToast(`Votre message (${ref}) a été transmis avec succès au Secrétariat Général !`);
    });
  }

  // Steering Committee Candidate Form Handler
  const steeringForm = document.getElementById('form-steering-committee-candidate');
  if (steeringForm) {
    steeringForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('steering-name')?.value || 'Candidat').trim();
      const org = (document.getElementById('steering-org')?.value || 'Organisation ESS').trim();
      const region = document.getElementById('steering-region')?.value || 'Dakar';
      const email = (document.getElementById('steering-email')?.value || '').trim();
      const phone = (document.getElementById('steering-phone')?.value || '').trim();
      const role = document.getElementById('steering-role')?.value || 'Coordinateur';
      const experience = (document.getElementById('steering-experience')?.value || '').trim();
      const motivation = (document.getElementById('steering-motivation')?.value || '').trim();

      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
      const ref = `CP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newApp = {
        id: 'web-' + Date.now(),
        type: 'Candidature Comité de Pilotage',
        ref: ref,
        name: name,
        org: org,
        legalForm: 'Candidat Comité de Pilotage',
        region: region,
        email: email,
        phone: phone,
        role: role,
        details: `Poste visé : ${role} | Expérience : ${experience}`,
        motivation: motivation,
        experience: experience,
        status: 'En attente',
        date: dateStr
      };

      const existingForms = JSON.parse(localStorage.getItem('conesess_web_forms')) || [];
      existingForms.unshift(newApp);
      localStorage.setItem('conesess_web_forms', JSON.stringify(existingForms));

      dispatchEmailNotificationAlert(
        "Comité de Pilotage",
        `Candidature au Comité de Pilotage : ${name}`,
        `Poste visé: ${role} | Organisation: ${org} (${region}) | Réf: ${ref} | Tel: ${phone}`
      );

      try { pushLocalDataToCloud(); } catch(err) {}
      try { window.dispatchEvent(new Event('storage')); } catch(err) {}

      steeringForm.reset();
      openSubmissionSuccessModal(ref);
      showToast(`Votre candidature (${ref}) a été transmise avec succès au Secrétariat technique !`);
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

function openSubmissionSuccessModal(refNum) {
  const modal = document.getElementById('modal-submission-success');
  const refElem = document.getElementById('success-modal-ref-num');
  if (refElem && refNum) refElem.textContent = refNum;

  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'flex';
    modal.style.zIndex = '99999';
  }
}

function closeSubmissionSuccessModal() {
  const modal = document.getElementById('modal-submission-success');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
}
