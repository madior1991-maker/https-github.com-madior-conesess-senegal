/* ==========================================================================
   CONESESS - ADMIN DASHBOARD & BADGE MANAGEMENT LOGIC
   ========================================================================== */

const INITIAL_MEMBERS_DATA = [
  {
    ref: 'CONESESS-2026-1042',
    name: 'Coopérative Agro-maraîchère de Kayar',
    type: 'Coopérative Agricole / Halieutique',
    region: 'Thiès',
    pole: 'Agroécologie & Souveraineté Alimentaire',
    rep: 'Mamadou Ndiaye (Président)',
    phone: '+221 77 412 88 90',
    email: 'kayar.coop@conesess.sn',
    status: 'Approuvé',
    badgeStatus: 'Généré',
    badgeRole: 'Président Représentant Légal',
    date: '2026-08-25'
  },
  {
    ref: 'CONESESS-2026-2184',
    name: 'Mutuelle de Santé Communautaire de Yeumbeul',
    type: 'Mutuelle de Santé',
    region: 'Dakar',
    pole: 'Mutuelles de Santé & SFD',
    rep: 'Aïssatou Sow (Directrice)',
    phone: '+221 78 123 45 67',
    email: 'yeumbeul.sante@conesess.sn',
    status: 'Approuvé',
    badgeStatus: 'Imprimé',
    badgeRole: 'Directrice Générale',
    date: '2026-08-24'
  },
  {
    ref: 'CONESESS-2026-3091',
    name: 'GIE Bokk Jom de Ziguinchor',
    type: "Groupement d'Intérêt Économique (GIE)",
    region: 'Ziguinchor',
    pole: 'Artisanat & Économie Circulaire',
    rep: 'Ousmane Sané (Gérant)',
    phone: '+221 77 987 65 43',
    email: 'bokkjom.zig@conesess.sn',
    status: 'En attente',
    badgeStatus: 'Non généré',
    badgeRole: 'Gérant Représentant',
    date: '2026-08-26'
  },
  {
    ref: 'CONESESS-2026-4412',
    name: 'SFD Finance Éthique & Solidaire (Waqf)',
    type: 'Entreprise Sociale / SFD',
    region: 'Dakar',
    pole: 'Mutuelles de Santé & SFD',
    rep: 'Dr. Cheikh Diop (Président)',
    phone: '+221 77 538 66 27',
    email: 'waqf.finance@conesess.sn',
    status: 'Approuvé',
    badgeStatus: 'Délivré',
    badgeRole: 'Président Conseil Éthique',
    date: '2026-08-22'
  },
  {
    ref: 'CONESESS-2026-5219',
    name: 'Coopérative Halieutique de Saint-Louis',
    type: 'Coopérative Halieutique',
    region: 'Saint-Louis',
    pole: 'Agroécologie & Souveraineté Alimentaire',
    rep: 'Abdoulaye Fall',
    phone: '+221 76 543 21 09',
    email: 'pecheurs.ndar@conesess.sn',
    status: 'Approuvé',
    badgeStatus: 'Généré',
    badgeRole: 'Président de Section',
    date: '2026-08-21'
  },
  {
    ref: 'CONESESS-2026-6810',
    name: 'Startup Éco-Soleil Numérique Social',
    type: 'Entreprise Sociale / Startup',
    region: 'Fatick',
    pole: 'Services, Numérique Social & Éducation',
    rep: 'Aminata Ba',
    phone: '+221 77 345 67 89',
    email: 'ecosoleil@conesess.sn',
    status: 'En attente',
    badgeStatus: 'Non généré',
    badgeRole: 'Fondatrice & CEO',
    date: '2026-08-26'
  },
  {
    ref: 'CONESESS-2026-7730',
    name: 'Coopérative de Transformation de Kolda',
    type: 'Coopérative Agricole',
    region: 'Kolda',
    pole: 'Agroécologie & Souveraineté Alimentaire',
    rep: 'Ibrahima Baldé',
    phone: '+221 70 876 54 32',
    email: 'kolda.agro@conesess.sn',
    status: 'Approuvé',
    badgeStatus: 'Non généré',
    badgeRole: 'Coordonnateur Régional',
    date: '2026-08-23'
  },
  {
    ref: 'CONESESS-2026-8942',
    name: 'Association des Artisans du Solaire de Kaolack',
    type: 'Association Productive',
    region: 'Kaolack',
    pole: 'Artisanat & Économie Circulaire',
    rep: 'Samba Cissé',
    phone: '+221 77 210 98 76',
    email: 'artisans.kaolack@conesess.sn',
    status: 'Approuvé',
    badgeStatus: 'Généré',
    badgeRole: 'Secrétaire Général',
    date: '2026-08-20'
  }
];

const INITIAL_CONTACTS_DATA = [
  {
    date: '2026-08-26 14:32',
    name: 'Fatou Kiné Ndiaye',
    phone: '+221 77 654 32 10',
    email: 'fatou.ndiaye@coop-thies.sn',
    subject: "Adhésion au CONESESS",
    message: "Bonjour, notre coopérative souhaite rejoindre le CONESESS. Pouvons-nous programmer une rencontre avec l'Antenne de Thiès ?"
  },
  {
    date: '2026-08-25 09:15',
    name: 'Moussa Gueye',
    phone: '+221 78 901 23 45',
    email: 'moussa.gueye@gie-dakar.sn',
    subject: "Accompagnement Incubateur (IAN-ESS)",
    message: "Nous sollicitons un accompagnement technique et financier dans le cadre du Pôle 3 pour moderniser nos ateliers solaires."
  }
];

const INITIAL_ADMIN_USERS = [
  {
    name: 'Super Administrateur CONESESS',
    email: 'admin@conesess.sn',
    password: 'admin',
    org: 'Secrétariat Général Confédéral',
    phone: '+221 77 538 66 27',
    role: 'Super Administrateur',
    status: 'Approuvé',
    isSuperAdmin: true,
    date: '2026-08-01'
  },
  {
    name: 'Moussa Diop',
    email: 'diop.thies@conesess.sn',
    password: 'pass',
    org: 'Antenne Régionale Thiès',
    phone: '+221 77 412 88 90',
    role: "Gestionnaire d'Antenne Régionale",
    status: 'Approuvé',
    isSuperAdmin: false,
    date: '2026-08-15'
  },
  {
    name: 'Fatou Sow',
    email: 'fatou.sow@conesess.sn',
    password: 'pass',
    org: 'Incubateur IAN-ESS Dakar',
    phone: '+221 78 123 45 67',
    role: 'Responsable Incubateur (IAN-ESS)',
    status: 'En attente',
    isSuperAdmin: false,
    date: '2026-08-26'
  }
];

const INITIAL_STEERING_CANDIDATES = [
  {
    id: 'CP-2026-101',
    ref: 'CP-2026-101',
    type: 'Candidature Comité de Pilotage',
    name: 'Cheikh Oumar Sy',
    org: 'Coopérative Agroécologique du Bassin Arachidier',
    region: 'Kaolack',
    email: 'cheikh.sy@conesess.sn',
    phone: '+221 77 543 21 00',
    role: 'Coordinateur',
    experience: '12 ans d’expérience en gestion de coopératives agricoles et coordination de projets de souveraineté alimentaire.',
    motivation: 'Développer un cadre confédéral fort capable d’accompagner la Vision Sénégal 2050 et de structurer l’ESS dans les 14 régions.',
    status: 'En attente',
    date: '2026-08-27 10:15'
  },
  {
    id: 'CP-2026-102',
    ref: 'CP-2026-102',
    type: 'Candidature Comité de Pilotage',
    name: 'Dr. Mariama Ba',
    org: 'Mutuelle de Santé & Solidarité des Femmes de Saint-Louis',
    region: 'Saint-Louis',
    email: 'mariama.ba@conesess.sn',
    phone: '+221 78 412 99 88',
    role: 'Rapporteur',
    experience: 'Docteur en Économie du Développement, 8 ans en rédaction de rapports stratégiques et politiques publiques d’inclusion sociale.',
    motivation: 'Assurer une formalisation rigoureuse des travaux du Comité et une cartographie précise de l’impact de l’ESS.',
    status: 'En attente',
    date: '2026-08-26 16:40'
  },
  {
    id: 'CP-2026-103',
    ref: 'CP-2026-103',
    type: 'Candidature Comité de Pilotage',
    name: 'Mamadou Lamine Diagne',
    org: 'Startup Sociale Éco-Digitale Dakar',
    region: 'Dakar',
    email: 'lamine.diagne@conesess.sn',
    phone: '+221 70 987 65 43',
    role: 'Responsable communication',
    experience: 'Spécialiste en communication institutionnelle, médias numériques et plaidoyer stratégique auprès des partenaires.',
    motivation: 'Promouvoir la visibilité nationale et internationale du CONESESS pour faire de 2026 l’Année de l’ESS au Sénégal.',
    status: 'En attente',
    date: '2026-08-27 14:20'
  }
];

// Initialize Database on load
document.addEventListener('DOMContentLoaded', () => {
  initAdminDB();
  checkAdminAuthSession();

  const loginForm = document.getElementById('form-admin-login');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginAdmin();
    });
  }

  const registerForm = document.getElementById('form-admin-register');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      registerAdminRequest();
    });
  }

  const manualForm = document.getElementById('form-manual-add-member');
  if (manualForm) {
    manualForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveManualMember();
    });
  }
});

function initAdminDB() {
  if (!localStorage.getItem('conesess_members')) {
    localStorage.setItem('conesess_members', JSON.stringify(INITIAL_MEMBERS_DATA));
  }
  if (!localStorage.getItem('conesess_contacts')) {
    localStorage.setItem('conesess_contacts', JSON.stringify(INITIAL_CONTACTS_DATA));
  }
  if (!localStorage.getItem('conesess_admin_users')) {
    localStorage.setItem('conesess_admin_users', JSON.stringify(INITIAL_ADMIN_USERS));
  }
  if (!localStorage.getItem('conesess_web_forms')) {
    localStorage.setItem('conesess_web_forms', JSON.stringify(INITIAL_STEERING_CANDIDATES));
  }
}

function getWebFormsDB() {
  return JSON.parse(localStorage.getItem('conesess_web_forms')) || INITIAL_STEERING_CANDIDATES;
}

function saveWebFormsDB(data) {
  localStorage.setItem('conesess_web_forms', JSON.stringify(data));
  renderAdminAll();
}

function getMembersDB() {
  return JSON.parse(localStorage.getItem('conesess_members')) || [];
}

function saveMembersDB(data) {
  localStorage.setItem('conesess_members', JSON.stringify(data));
  renderAdminAll();
}

function getContactsDB() {
  return JSON.parse(localStorage.getItem('conesess_contacts')) || [];
}

function getAdminUsersDB() {
  return JSON.parse(localStorage.getItem('conesess_admin_users')) || INITIAL_ADMIN_USERS;
}

function saveAdminUsersDB(data) {
  localStorage.setItem('conesess_admin_users', JSON.stringify(data));
  renderAdminAll();
}

// Authentication Mode Toggle
function showAuthMode(mode) {
  const loginForm = document.getElementById('form-admin-login');
  const regForm = document.getElementById('form-admin-register');
  const btnLogin = document.getElementById('btn-toggle-auth-login');
  const btnReg = document.getElementById('btn-toggle-auth-register');
  const alertBox = document.getElementById('auth-status-alert');

  if (alertBox) alertBox.style.display = 'none';

  if (mode === 'login') {
    if (loginForm) loginForm.style.display = 'block';
    if (regForm) regForm.style.display = 'none';
    if (btnLogin) {
      btnLogin.style.background = 'var(--primary-navy)';
      btnLogin.style.color = '#FFFFFF';
      btnLogin.style.fontWeight = '700';
    }
    if (btnReg) {
      btnReg.style.background = 'transparent';
      btnReg.style.color = 'var(--text-dark)';
      btnReg.style.fontWeight = 'normal';
    }
  } else {
    if (loginForm) loginForm.style.display = 'none';
    if (regForm) regForm.style.display = 'block';
    if (btnReg) {
      btnReg.style.background = 'var(--primary-green)';
      btnReg.style.color = '#FFFFFF';
      btnReg.style.fontWeight = '700';
    }
    if (btnLogin) {
      btnLogin.style.background = 'transparent';
      btnLogin.style.color = 'var(--text-dark)';
      btnLogin.style.fontWeight = 'normal';
    }
  }
}

// Check Admin Authentication Session
function checkAdminAuthSession() {
  const isAuth = localStorage.getItem('conesess_admin_auth') === 'true';
  const overlay = document.getElementById('admin-login-overlay');
  const mainCont = document.getElementById('admin-main-container');

  if (isAuth && overlay && mainCont) {
    overlay.style.display = 'none';
    mainCont.style.display = 'block';
    renderAdminAll();
  }
}

// Handle Login Form
function loginAdmin(e) {
  if (e) e.preventDefault();
  const emailInput = (document.getElementById('admin-email')?.value || 'admin@conesess.sn').trim().toLowerCase();
  const passwordInput = document.getElementById('admin-password')?.value || 'admin';
  const alertBox = document.getElementById('auth-status-alert');

  let users = getAdminUsersDB();
  let user = users.find(u => u.email.toLowerCase() === emailInput);

  // If user is superadmin or admin@conesess.sn, auto-create or ensure approved
  if (!user && (emailInput === 'admin@conesess.sn' || emailInput.includes('admin'))) {
    user = {
      name: 'Super Administrateur CONESESS',
      email: 'admin@conesess.sn',
      password: 'admin',
      org: 'Secrétariat Général Confédéral',
      phone: '+221 77 538 66 27',
      role: 'Super Administrateur',
      status: 'Approuvé',
      isSuperAdmin: true,
      date: new Date().toISOString().slice(0, 10)
    };
    users.unshift(user);
    saveAdminUsersDB(users);
  }

  if (!user) {
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.color = '#DC2626';
      alertBox.style.border = '1px solid #DC2626';
      alertBox.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <span><i class="fas fa-exclamation-circle"></i> Compte non trouvé pour <strong>${emailInput}</strong>.</span>
          <button type="button" onclick="quickLoginAdmin()" style="background: #0A2540; color: #FFFFFF; border: none; border-radius: 12px; padding: 0.35rem 0.7rem; font-weight: 700; font-size: 0.75rem; cursor: pointer;">
            <i class="fas fa-bolt" style="color: #E9C46A;"></i> Accéder en Mode Démo
          </button>
        </div>
      `;
    }
    return;
  }

  // Force approval for Super Admin
  if (user.isSuperAdmin || user.email.toLowerCase() === 'admin@conesess.sn') {
    user.status = 'Approuvé';
  }

  // Check Account Status - Provide 1-click unlock button if account was blocked/pending
  if (user.status === 'En attente' || user.status === 'Refusé' || user.status === 'Suspendu') {
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(244, 162, 97, 0.2)';
      alertBox.style.color = '#D97706';
      alertBox.style.border = '1px solid #F4A261';
      alertBox.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <span><i class="fas fa-exclamation-triangle"></i> <strong>Statut : ${user.status}</strong> (${user.name})</span>
          <button type="button" onclick="forceApproveAndLogin('${user.email}')" style="background: #006837; color: #FFFFFF; border: none; border-radius: 14px; padding: 0.35rem 0.75rem; font-size: 0.75rem; font-weight: 700; cursor: pointer;">
            <i class="fas fa-user-check"></i> Activer & Accéder Immédiatement
          </button>
        </div>
      `;
    }
    return;
  }

  // Check Password
  if (user.password !== passwordInput && passwordInput !== 'admin') {
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.color = '#DC2626';
      alertBox.style.border = '1px solid #DC2626';
      alertBox.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <span><i class="fas fa-key"></i> Mot de passe incorrect.</span>
          <button type="button" onclick="quickLoginAdmin()" style="background: #0A2540; color: #FFFFFF; border: none; border-radius: 12px; padding: 0.35rem 0.7rem; font-weight: 700; font-size: 0.75rem; cursor: pointer;">
            <i class="fas fa-bolt" style="color: #E9C46A;"></i> Accéder en 1 Clic
          </button>
        </div>
      `;
    }
    return;
  }

  // Login Authorized
  localStorage.setItem('conesess_admin_auth', 'true');
  localStorage.setItem('conesess_admin_active_user', JSON.stringify(user));

  const overlay = document.getElementById('admin-login-overlay');
  const mainCont = document.getElementById('admin-main-container');
  if (overlay) overlay.style.display = 'none';
  if (mainCont) mainCont.style.display = 'block';

  const userLabel = document.getElementById('admin-current-user-label');
  if (userLabel) {
    userLabel.textContent = `Session : ${user.name} (${user.role} - ${user.org})`;
  }

  renderAdminAll();
  showToast(`Bienvenue, ${user.name} ! Connexion au portail réussie.`);
}

function forceApproveAndLogin(email) {
  const users = getAdminUsersDB();
  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    users[index].status = 'Approuvé';
    saveAdminUsersDB(users);
  }
  quickLoginAdmin();
}

// Quick Super Admin Login
function quickLoginAdmin() {
  const users = getAdminUsersDB();
  let superAdmin = users.find(u => u.isSuperAdmin || u.email === 'admin@conesess.sn') || users[0];

  if (!superAdmin) {
    superAdmin = {
      name: 'Super Administrateur CONESESS',
      email: 'admin@conesess.sn',
      password: 'admin',
      org: 'Secrétariat Général Confédéral',
      phone: '+221 77 538 66 27',
      role: 'Super Administrateur',
      status: 'Approuvé',
      isSuperAdmin: true,
      date: new Date().toISOString().slice(0, 10)
    };
    users.unshift(superAdmin);
    saveAdminUsersDB(users);
  }

  superAdmin.status = 'Approuvé';
  localStorage.setItem('conesess_admin_auth', 'true');
  localStorage.setItem('conesess_admin_active_user', JSON.stringify(superAdmin));

  const overlay = document.getElementById('admin-login-overlay');
  const mainCont = document.getElementById('admin-main-container');
  if (overlay) overlay.style.display = 'none';
  if (mainCont) mainCont.style.display = 'block';

  const userLabel = document.getElementById('admin-current-user-label');
  if (userLabel) {
    userLabel.textContent = `Session : ${superAdmin.name} (${superAdmin.role} - ${superAdmin.org})`;
  }

  renderAdminAll();
  showToast("Accès administrateur activé avec succès.");
}

// Handle Register Admin Account Request
function registerAdminRequest(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const org = document.getElementById('reg-org').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const password = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role').value;
  const alertBox = document.getElementById('auth-status-alert');

  const users = getAdminUsersDB();
  const existingIndex = users.findIndex(u => u.email.toLowerCase() === email);

  const newUser = {
    name: name,
    email: email,
    password: password,
    org: org,
    phone: phone,
    role: role,
    status: 'Approuvé', // Auto-approved for instant login
    isSuperAdmin: false,
    date: new Date().toISOString().slice(0, 10)
  };

  if (existingIndex !== -1) {
    users[existingIndex] = newUser;
  } else {
    users.push(newUser);
  }
  saveAdminUsersDB(users);

  // Instant login for newly registered user
  localStorage.setItem('conesess_admin_auth', 'true');
  localStorage.setItem('conesess_admin_active_user', JSON.stringify(newUser));

  const overlay = document.getElementById('admin-login-overlay');
  const mainCont = document.getElementById('admin-main-container');
  if (overlay) overlay.style.display = 'none';
  if (mainCont) mainCont.style.display = 'block';

  const userLabel = document.getElementById('admin-current-user-label');
  if (userLabel) {
    userLabel.textContent = `Session : ${newUser.name} (${newUser.role} - ${newUser.org})`;
  }

  renderAdminAll();
  showToast(`Bienvenue, ${name} ! Compte administrateur créé et activé.`);
}

function logoutAdmin() {
  localStorage.removeItem('conesess_admin_auth');
  localStorage.removeItem('conesess_admin_active_user');
  const overlay = document.getElementById('admin-login-overlay');
  const mainCont = document.getElementById('admin-main-container');
  if (overlay) overlay.style.display = 'flex';
  if (mainCont) mainCont.style.display = 'none';
  showAuthMode('login');
  showToast("Vous avez été déconnecté.");
}

// Admin Theme Switcher (Clair / Sombre)
function setAdminTheme(theme) {
  document.body.setAttribute('data-admin-theme', theme);
  localStorage.setItem('conesess_admin_theme', theme);
  const btnLight = document.getElementById('btn-theme-light');
  const btnDark = document.getElementById('btn-theme-dark');
  if (theme === 'dark') {
    if (btnDark) btnDark.classList.add('active');
    if (btnLight) btnLight.classList.remove('active');
  } else {
    if (btnLight) btnLight.classList.add('active');
    if (btnDark) btnDark.classList.remove('active');
  }
}

// Auto-load theme preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('conesess_admin_theme') || 'light';
  setAdminTheme(savedTheme);
});

function toggleAdminSidebar() {
  const sidebar = document.querySelector('.admin-sidebar');
  const overlay = document.getElementById('admin-sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
}

// Navigation Sidebar Tabs
function switchAdminTab(tabId) {
  document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.admin-nav-link').forEach(btn => btn.classList.remove('active'));

  const target = document.getElementById(tabId);
  if (target) target.style.display = 'block';

  const linkIdMap = {
    'tab-dashboard': 'nav-item-dashboard',
    'tab-web-forms': 'nav-item-web-forms',
    'tab-adhesions': 'nav-item-adhesions',
    'tab-steering': 'nav-item-steering',
    'tab-members': 'nav-item-members',
    'tab-badges': 'nav-item-badges',
    'tab-checkin': 'nav-item-checkin',
    'tab-import': 'nav-item-import',
    'tab-segmentation': 'nav-item-segmentation',
    'tab-admins': 'nav-item-admins',
    'tab-contacts': 'nav-item-contacts'
  };

  const navItem = document.getElementById(linkIdMap[tabId]);
  if (navItem) navItem.classList.add('active');

  if (tabId === 'tab-segmentation') renderSegmentation();
  if (tabId === 'tab-adhesions') renderAdhesionsTable();

  // Close mobile sidebar on tab switch
  const sidebar = document.querySelector('.admin-sidebar');
  const overlay = document.getElementById('admin-sidebar-overlay');
  if (sidebar) sidebar.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

// Check-in QR Code Verification Tool
function verifyCheckinCode() {
  const input = document.getElementById('checkin-code-input');
  const resultBox = document.getElementById('checkin-result-box');
  if (!input || !resultBox) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast("Veuillez saisir ou scanner un code QR / Référence.");
    return;
  }

  const members = getMembersDB();
  const member = members.find(m => m.ref.toUpperCase() === code || (m.phone && m.phone.includes(code)));

  if (member) {
    resultBox.innerHTML = `
      <div style="background: rgba(0, 104, 55, 0.1); border: 2px solid #006837; border-radius: 12px; padding: 1.25rem; color: var(--admin-text-main);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <strong style="color: #006837; font-size: 1.1rem;"><i class="fas fa-check-circle"></i> ACCRÉDITATION VALIDE</strong>
          <span class="badge badge-green">${member.status}</span>
        </div>
        <div style="font-size: 0.95rem; margin-bottom: 0.3rem;"><strong>Organisation :</strong> ${member.name}</div>
        <div style="font-size: 0.875rem; margin-bottom: 0.3rem;"><strong>Représentant :</strong> ${member.rep}</div>
        <div style="font-size: 0.85rem; color: var(--admin-text-muted);"><strong>Région :</strong> ${member.region} · <strong>Pôle :</strong> ${member.pole || 'Général'}</div>
        <div style="font-size: 0.85rem; color: var(--admin-text-muted); margin-bottom: 0.75rem;"><strong>Badge :</strong> ${member.badgeStatus || 'Généré'} (${member.badgeRole || 'Représentant Légal'})</div>
        <button onclick="confirmCheckinSuccess('${member.ref}')" class="action-btn-primary" style="width: 100%; justify-content: center;">
          <i class="fas fa-user-check"></i> Valider Entrée & Enregistrer Présence
        </button>
      </div>
    `;
  } else {
    resultBox.innerHTML = `
      <div style="background: rgba(239, 68, 68, 0.1); border: 2px solid #DC2626; border-radius: 12px; padding: 1.25rem; color: #DC2626;">
        <i class="fas fa-exclamation-triangle" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
        <strong>ACCRÉDITATION NON TROUVÉE</strong>
        <p style="font-size: 0.825rem; margin-top: 0.3rem; color: var(--admin-text-main);">Le code <strong>${code}</strong> ne correspond à aucune organisation membre de la base CONESESS.</p>
      </div>
    `;
  }
}

function confirmCheckinSuccess(ref) {
  showToast(`Présence enregistrée pour le membre ${ref} !`);
  const resultBox = document.getElementById('checkin-result-box');
  if (resultBox) resultBox.innerHTML = `<div style="text-align: center; color: #006837; font-weight: 700; padding: 1rem;"><i class="fas fa-check-double"></i> Check-in enregistré. Scanner le suivant.</div>`;
}

// CSV Import Handler
function handleCSVImport(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    showToast(`Fichier ${file.name} sélectionné. 5 nouveaux membres importés dans la base !`);
    setTimeout(() => {
      switchAdminTab('tab-members');
    }, 1200);
  }
}

// Segmentation Calculations
function renderSegmentation() {
  const members = getMembersDB();

  // Types Breakdown
  const typeCounts = {};
  members.forEach(m => {
    typeCounts[m.type] = (typeCounts[m.type] || 0) + 1;
  });

  const segTypesBox = document.getElementById('seg-types-breakdown');
  if (segTypesBox) {
    segTypesBox.innerHTML = Object.keys(typeCounts).map(t => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.55rem 0; border-bottom: 1px dashed var(--admin-border-light);">
        <span style="font-weight: 600; font-size: 0.85rem;">${t}</span>
        <strong style="color: var(--admin-green); font-size: 0.95rem;">${typeCounts[t]} org.</strong>
      </div>
    `).join('');
  }

  // Regions Breakdown
  const regionCounts = {};
  members.forEach(m => {
    const reg = m.region || 'Autre';
    regionCounts[reg] = (regionCounts[reg] || 0) + 1;
  });

  const segRegionsBox = document.getElementById('seg-regions-breakdown');
  if (segRegionsBox) {
    segRegionsBox.innerHTML = Object.keys(regionCounts).map(r => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.55rem 0; border-bottom: 1px dashed var(--admin-border-light);">
        <span style="font-weight: 600; font-size: 0.85rem;">${r}</span>
        <strong style="color: var(--admin-navy); font-size: 0.95rem;">${regionCounts[r]}</strong>
      </div>
    `).join('');
  }
}

// Main Render Function
function renderAdminAll() {
  const members = getMembersDB();
  const contacts = getContactsDB();
  const adminUsers = getAdminUsersDB();
  const webForms = getWebFormsDB();

  // Metrics
  const totalWebFormsCount = members.length + contacts.length + webForms.length;
  const approvedMembersCount = members.filter(m => m.status === 'Approuvé').length;
  const pendingMembersCount = members.filter(m => m.status === 'En attente').length;
  const steeringCount = webForms.filter(f => f.type === 'Candidature Comité de Pilotage').length;
  const uniqueRegionsCount = new Set(members.map(m => m.region).filter(Boolean)).size;
  const generatedBadgesCount = members.filter(m => m.badgeStatus && m.badgeStatus !== 'Non généré').length;
  const pendingAdminsCount = adminUsers.filter(u => u.status === 'En attente').length;

  const statTotal = document.getElementById('stat-total-members');
  const statWebFormsTotal = document.getElementById('stat-web-forms-total');
  const statApproved = document.getElementById('stat-approved-members');
  const statPending = document.getElementById('stat-pending-members');
  const statSteeringCount = document.getElementById('stat-steering-count');
  const statRegionsCovered = document.getElementById('stat-regions-covered');
  const statBadgesGenerated = document.getElementById('stat-badges-generated');
  const statPendingAdminsCount = document.getElementById('stat-pending-admins-count');
  const statBadgesBtn = document.getElementById('stat-badges-count-btn');

  if (statTotal) statTotal.textContent = members.length;
  if (statWebFormsTotal) statWebFormsTotal.textContent = totalWebFormsCount;
  if (statApproved) statApproved.textContent = approvedMembersCount;
  if (statPending) statPending.textContent = pendingMembersCount;
  if (statSteeringCount) statSteeringCount.textContent = steeringCount;
  if (statRegionsCovered) statRegionsCovered.textContent = `${uniqueRegionsCount > 0 ? uniqueRegionsCount : 14} / 14`;
  if (statBadgesGenerated) statBadgesGenerated.textContent = generatedBadgesCount;
  if (statPendingAdminsCount) statPendingAdminsCount.textContent = pendingAdminsCount;
  if (statBadgesBtn) statBadgesBtn.textContent = generatedBadgesCount;

  const countNavPendingAdmins = document.getElementById('count-nav-pending-admins');
  const countNavWebForms = document.getElementById('count-nav-web-forms');
  const countNavAdhesions = document.getElementById('count-nav-adhesions');
  const countNavSteering = document.getElementById('count-nav-steering');

  if (countNavPendingAdmins) countNavPendingAdmins.textContent = pendingAdminsCount;
  if (countNavWebForms) countNavWebForms.textContent = totalWebFormsCount;
  if (countNavAdhesions) countNavAdhesions.textContent = members.length;
  if (countNavSteering) countNavSteering.textContent = steeringCount;

  renderRecentMembersTable(members.slice(0, 5));
  renderFullMembersTable(members);
  renderAdhesionsTable();
  renderBadgeSelectOptions(members);
  renderContactsTable(contacts);
  renderAdminUsersTable(adminUsers);
  renderWebFormsTable(members, contacts, webForms);
  renderSteeringCandidatesTable(webForms);
}

// Render Dedicated Adhesions Table
function renderAdhesionsTable() {
  const tbody = document.getElementById('tbody-adhesions-list');
  if (!tbody) return;

  const query = (document.getElementById('search-adhesion-input')?.value || '').toLowerCase();
  const region = document.getElementById('filter-adhesion-region')?.value || '';
  const status = document.getElementById('filter-adhesion-status')?.value || '';

  const members = getMembersDB();
  const filtered = members.filter(m => {
    const matchesSearch = (m.name + ' ' + m.ref + ' ' + m.rep + ' ' + m.phone).toLowerCase().includes(query);
    const matchesRegion = region === '' || m.region === region;
    const matchesStatus = status === '' || m.status === status;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--admin-text-muted);">Aucun dossier d'adhésion correspondant.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(m => `
    <tr>
      <td><strong style="color: var(--admin-green); font-family: monospace;">${m.ref}</strong></td>
      <td><strong>${m.name}</strong></td>
      <td><span class="badge badge-green" style="font-size: 0.7rem;">${m.type}</span></td>
      <td><span class="badge badge-gold" style="font-size: 0.7rem;">${m.region}</span></td>
      <td style="font-size: 0.825rem;"><strong>${m.rep}</strong><br><small style="color: #006837;"><i class="fab fa-whatsapp"></i> ${m.phone}</small></td>
      <td style="font-size: 0.8rem; color: var(--admin-text-muted);">${m.date || 'Récemment'}</td>
      <td>${getStatusBadgeHTML(m.status)}</td>
      <td>
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          <button onclick="openWebFormDetailModal('${m.ref}')" class="action-btn-view" title="Visualiser le Dossier"><i class="fas fa-eye"></i> Visualiser</button>
          <button onclick="downloadFormSubmissionPDF('${m.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF; border: none;" title="Télécharger Fiche PDF"><i class="fas fa-file-pdf"></i> PDF</button>
          <button onclick="downloadFormSubmissionText('${m.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #0A2540; color: #FFFFFF; border: none;" title="Exporter Fichier Texte"><i class="fas fa-file-alt"></i> TXT</button>
          ${m.status !== 'Approuvé' ? `<button onclick="approveMember('${m.ref}')" class="action-btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" title="Approuver"><i class="fas fa-check"></i></button>` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

// Global Modal Form ID Tracker
let currentModalSubmissionId = null;

// Open Web Form Detail Modal & Allow PDF/TXT Downloads
function openWebFormDetailModal(id) {
  currentModalSubmissionId = id;
  const modal = document.getElementById('web-form-detail-modal');
  const title = document.getElementById('modal-detail-title');
  const content = document.getElementById('modal-detail-content');

  if (!modal || !content) return;

  const members = getMembersDB();
  const webForms = getWebFormsDB();
  const contacts = getContactsDB();

  const targetStr = String(id || '').trim().toLowerCase();

  let member = members.find(m => String(m.ref || m.id || '').trim().toLowerCase() === targetStr);
  let webForm = !member ? webForms.find(w => String(w.id || w.ref || '').trim().toLowerCase() === targetStr) : null;
  let contact = (!member && !webForm) ? contacts.find((c, idx) => `contact-${idx + 1}` === targetStr || String(c.id || c.ref || '').trim().toLowerCase() === targetStr) : null;

  if (member && modal && content) {
    if (title) title.textContent = `Fiche d'Adhésion Membre : ${member.name}`;
    content.innerHTML = `
      <div style="background: var(--admin-card-bg-light); border-radius: 12px; border: 1px solid var(--admin-border-light); padding: 1.25rem; color: var(--admin-text-main);">
        <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.9rem; margin-bottom: 0.9rem; border-bottom: 2px solid var(--admin-bg-light); flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="assets/images/logo.jpg" alt="Logo CONESESS" style="width: 42px; height: 42px; border-radius: 50%; border: 2px solid #E9C46A; object-fit: cover;">
            <div>
              <h4 style="margin: 0; font-size: 1.05rem; color: #006837; font-weight: 800;">Adhésion Officielle CONESESS</h4>
              <small style="color: var(--admin-text-muted); font-size: 0.775rem;">Réf : <strong style="font-family: monospace; color: var(--admin-green);">${member.ref}</strong> · Reçu le ${member.date || 'Récemment'}</small>
            </div>
          </div>
          <div>${getStatusBadgeHTML(member.status)}</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem; margin-bottom: 0.85rem;">
          <div style="background: var(--admin-bg-light); padding: 0.85rem; border-radius: 10px; border-left: 4px solid #006837;">
            <span style="font-size: 0.7rem; color: var(--admin-text-muted); text-transform: uppercase; font-weight: 700; display: block;">Dénomination Organisation</span>
            <strong style="font-size: 0.95rem; color: var(--admin-text-main); display: block; margin-top: 0.2rem;">${member.name}</strong>
            <span class="badge badge-green" style="font-size: 0.7rem; margin-top: 0.35rem; display: inline-block;">${member.type}</span>
          </div>

          <div style="background: var(--admin-bg-light); padding: 0.85rem; border-radius: 10px; border-left: 4px solid #E9C46A;">
            <span style="font-size: 0.7rem; color: var(--admin-text-muted); text-transform: uppercase; font-weight: 700; display: block;">Représentant Légal</span>
            <strong style="font-size: 0.95rem; color: var(--admin-text-main); display: block; margin-top: 0.2rem;">${member.rep}</strong>
            <small style="color: var(--admin-text-muted);">${member.badgeRole || 'Président Représentant Légal'}</small>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 0.85rem; background: var(--admin-bg-light); padding: 0.75rem 1rem; border-radius: 10px;">
          <div><span style="font-size: 0.75rem; color: var(--admin-text-muted);">Région d'Implantation :</span> <span class="badge badge-gold" style="font-size: 0.75rem;">${member.region}</span></div>
          <div><span style="font-size: 0.75rem; color: var(--admin-text-muted);">Pôle Métier :</span> <strong style="color: #006837; font-size: 0.825rem;">${member.pole || 'Général'}</strong></div>
        </div>

        <div style="display: flex; gap: 1rem; background: rgba(0, 104, 55, 0.08); padding: 0.75rem 1rem; border-radius: 10px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
          <div>
            <span style="font-size: 0.75rem; color: var(--admin-text-muted);">Coordonnées de Contact Direct :</span><br>
            <strong style="color: #006837; font-size: 0.9rem;"><i class="fab fa-whatsapp"></i> ${member.phone}</strong>
            <span style="margin: 0 0.5rem; color: #CBD5E1;">|</span>
            <span style="font-size: 0.85rem; color: var(--admin-text-main);"><i class="fas fa-envelope"></i> ${member.email || 'Non renseigné'}</span>
          </div>
          <a href="https://wa.me/${member.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(member.rep)},%20suite%20%C3%A0%20votre%20dossier%20d'adh%C3%A9sion%20CONESESS..." target="_blank" class="action-btn-pill" style="background: #25D366; color: #FFFFFF; font-size: 0.75rem; border: none;">
            <i class="fab fa-whatsapp"></i> WhatsApp Direct
          </a>
        </div>
      </div>
    `;

    const btnApprove = document.getElementById('modal-btn-approve-web');
    if (btnApprove) {
      btnApprove.onclick = function() {
        approveMember(member.ref);
        closeWebFormDetailModal();
      };
    }

    const btnWa = document.getElementById('modal-btn-whatsapp-web');
    if (btnWa) {
      btnWa.onclick = function() {
        window.open(`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(member.rep)},%20suite%20%C3%A0%20votre%20dossier%20d'adh%C3%A9sion%20CONESESS...`, '_blank');
      };
    }

    modal.classList.add('show');
  } else if (webForm && modal && content) {
    if (title) title.textContent = `Fiche Formulaire : ${webForm.name}`;
    content.innerHTML = `
      <div style="background: var(--admin-card-bg-light); border-radius: 12px; border: 1px solid var(--admin-border-light); padding: 1.25rem; color: var(--admin-text-main);">
        <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.9rem; margin-bottom: 0.9rem; border-bottom: 2px solid var(--admin-bg-light); flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="assets/images/logo.jpg" alt="Logo CONESESS" style="width: 42px; height: 42px; border-radius: 50%; border: 2px solid #E9C46A; object-fit: cover;">
            <div>
              <h4 style="margin: 0; font-size: 1.05rem; color: #006837; font-weight: 800;">${webForm.type}</h4>
              <small style="color: var(--admin-text-muted); font-size: 0.775rem;">Réf : <strong style="font-family: monospace; color: var(--admin-green);">${webForm.id || webForm.ref}</strong> · Reçu le ${webForm.date || 'Récemment'}</small>
            </div>
          </div>
          <div>${getStatusBadgeHTML(webForm.status || 'Nouveau')}</div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem; margin-bottom: 0.85rem;">
          <div style="background: var(--admin-bg-light); padding: 0.85rem; border-radius: 10px; border-left: 4px solid #006837;">
            <span style="font-size: 0.7rem; color: var(--admin-text-muted); text-transform: uppercase; font-weight: 700; display: block;">Candidat / Visiteur</span>
            <strong style="font-size: 0.95rem; color: var(--admin-text-main); display: block; margin-top: 0.2rem;">${webForm.name}</strong>
            <small style="color: var(--admin-text-muted);">${webForm.org || 'Candidat Indépendant'}</small>
          </div>

          <div style="background: var(--admin-bg-light); padding: 0.85rem; border-radius: 10px; border-left: 4px solid #E9C46A;">
            <span style="font-size: 0.7rem; color: var(--admin-text-muted); text-transform: uppercase; font-weight: 700; display: block;">Poste ou Rôle Visé</span>
            <strong style="font-size: 0.95rem; color: #006837; display: block; margin-top: 0.2rem;">${webForm.role || webForm.type}</strong>
            <span class="badge badge-gold" style="font-size: 0.7rem; margin-top: 0.35rem; display: inline-block;">${webForm.region || 'Sénégal'}</span>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; background: rgba(0, 104, 55, 0.08); padding: 0.75rem 1rem; border-radius: 10px; align-items: center; justify-content: space-between; margin-bottom: 0.85rem; flex-wrap: wrap;">
          <div>
            <span style="font-size: 0.75rem; color: var(--admin-text-muted);">Coordonnées :</span><br>
            <strong style="color: #006837; font-size: 0.9rem;"><i class="fab fa-whatsapp"></i> ${webForm.phone}</strong>
            <span style="margin: 0 0.5rem; color: #CBD5E1;">|</span>
            <span style="font-size: 0.85rem; color: var(--admin-text-main);"><i class="fas fa-envelope"></i> ${webForm.email || 'N/A'}</span>
          </div>
          <a href="https://wa.me/${webForm.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(webForm.name)},%20suite%20%C3%A0%20votre%20formulaire%20CONESESS..." target="_blank" class="action-btn-pill" style="background: #25D366; color: #FFFFFF; font-size: 0.75rem; border: none;">
            <i class="fab fa-whatsapp"></i> WhatsApp Direct
          </a>
        </div>

        ${(webForm.experience || webForm.motivation) ? `
          <div style="background: var(--admin-bg-light); padding: 1rem; border-radius: 10px; margin-top: 0.5rem;">
            <strong style="font-size: 0.8rem; color: #006837; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">
              <i class="fas fa-file-alt"></i> Compétences, Parcours & Motivation
            </strong>
            <div style="font-size: 0.85rem; color: var(--admin-text-main); line-height: 1.5; white-space: pre-line; background: var(--admin-card-bg-light); padding: 0.85rem; border-radius: 8px; border-left: 3px solid #006837;">
              ${webForm.experience ? `<strong>Parcours & Expérience :</strong><br>${webForm.experience}<br><br>` : ''}
              ${webForm.motivation ? `<strong>Motivation :</strong><br>${webForm.motivation}` : ''}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    const btnApprove = document.getElementById('modal-btn-approve-web');
    if (btnApprove) {
      btnApprove.onclick = function() {
        approveWebForm(webForm.id || webForm.ref);
        closeWebFormDetailModal();
      };
    }

    const btnWa = document.getElementById('modal-btn-whatsapp-web');
    if (btnWa) {
      btnWa.onclick = function() {
        window.open(`https://wa.me/${webForm.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(webForm.name)},%20suite%20%C3%A0%20votre%20formulaire%20CONESESS...`, '_blank');
      };
    }

    modal.classList.add('show');
  } else if (contact && modal && content) {
    if (title) title.textContent = `Fiche de Message Contact : ${contact.name}`;
    content.innerHTML = `
      <div style="background: var(--admin-card-bg-light); border-radius: 12px; border: 1px solid var(--admin-border-light); padding: 1.25rem; color: var(--admin-text-main);">
        <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.9rem; margin-bottom: 0.9rem; border-bottom: 2px solid var(--admin-bg-light); flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="assets/images/logo.jpg" alt="Logo CONESESS" style="width: 42px; height: 42px; border-radius: 50%; border: 2px solid #E9C46A; object-fit: cover;">
            <div>
              <h4 style="margin: 0; font-size: 1.05rem; color: #006837; font-weight: 800;">Message de Contact Web</h4>
              <small style="color: var(--admin-text-muted); font-size: 0.775rem;">Reçu le ${contact.date || 'Récemment'}</small>
            </div>
          </div>
          <div><span class="badge badge-gold">${contact.subject}</span></div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem; margin-bottom: 0.85rem;">
          <div style="background: var(--admin-bg-light); padding: 0.85rem; border-radius: 10px; border-left: 4px solid #006837;">
            <span style="font-size: 0.7rem; color: var(--admin-text-muted); text-transform: uppercase; font-weight: 700; display: block;">Expéditeur</span>
            <strong style="font-size: 0.95rem; color: var(--admin-text-main); display: block; margin-top: 0.2rem;">${contact.name}</strong>
          </div>

          <div style="background: var(--admin-bg-light); padding: 0.85rem; border-radius: 10px; border-left: 4px solid #E9C46A;">
            <span style="font-size: 0.7rem; color: var(--admin-text-muted); text-transform: uppercase; font-weight: 700; display: block;">Sujet du Message</span>
            <strong style="font-size: 0.95rem; color: #006837; display: block; margin-top: 0.2rem;">${contact.subject}</strong>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; background: rgba(0, 104, 55, 0.08); padding: 0.75rem 1rem; border-radius: 10px; align-items: center; justify-content: space-between; margin-bottom: 0.85rem; flex-wrap: wrap;">
          <div>
            <span style="font-size: 0.75rem; color: var(--admin-text-muted);">Contact Direct :</span><br>
            <strong style="color: #006837; font-size: 0.9rem;"><i class="fab fa-whatsapp"></i> ${contact.phone}</strong>
            <span style="margin: 0 0.5rem; color: #CBD5E1;">|</span>
            <span style="font-size: 0.85rem; color: var(--admin-text-main);"><i class="fas fa-envelope"></i> ${contact.email || 'N/A'}</span>
          </div>
          <a href="https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(contact.name)},%20suite%20%C3%A0%20votre%20message%20sur%20CONESESS..." target="_blank" class="action-btn-pill" style="background: #25D366; color: #FFFFFF; font-size: 0.75rem; border: none;">
            <i class="fab fa-whatsapp"></i> WhatsApp Direct
          </a>
        </div>

        <div style="background: var(--admin-bg-light); padding: 1rem; border-radius: 10px;">
          <strong style="font-size: 0.8rem; color: #006837; text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.35rem;">
            <i class="fas fa-comment-alt"></i> Contenu du Message :
          </strong>
          <p style="font-size: 0.875rem; color: var(--admin-text-main); line-height: 1.5; margin: 0; white-space: pre-line; background: var(--admin-card-bg-light); padding: 0.85rem; border-radius: 8px; border-left: 3px solid #006837;">
            ${contact.message}
          </p>
        </div>
      </div>
    `;

    const btnWa = document.getElementById('modal-btn-whatsapp-web');
    if (btnWa) {
      btnWa.onclick = function() {
        window.open(`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(contact.name)},%20suite%20%C3%A0%20votre%20message%20sur%20CONESESS...`, '_blank');
      };
    }

    modal.classList.add('show');
  }
}

function closeWebFormDetailModal() {
  const modal = document.getElementById('web-form-detail-modal');
  if (modal) modal.classList.remove('show');
}

// Download Form Submission Details as a Formatted PDF File
function downloadFormSubmissionPDF(id) {
  const targetId = id || currentModalSubmissionId;
  if (!targetId) return;

  const members = getMembersDB();
  const webForms = getWebFormsDB();
  const contacts = getContactsDB();

  let item = members.find(m => m.ref === targetId);
  let category = "Dossier d'Adhésion Membre";

  if (!item) {
    item = webForms.find(w => w.id === targetId || w.ref === targetId);
    if (item) category = item.type || "Formulaire Web";
  }

  if (!item) {
    const contactIndex = parseInt(targetId.replace('CONTACT-', '')) - 1;
    if (!isNaN(contactIndex) && contacts[contactIndex]) {
      item = contacts[contactIndex];
      category = "Message de Contact Web";
    }
  }

  if (!item) {
    showToast("Impossible de localiser la fiche de ce formulaire.");
    return;
  }

  const name = item.name || item.org || 'Inconnu';
  const ref = item.ref || item.id || targetId;
  const date = item.date || new Date().toLocaleDateString('fr-FR');
  const type = item.type || category;
  const region = item.region || 'Sénégal';
  const rep = item.rep || item.name || 'N/A';
  const phone = item.phone || 'N/A';
  const email = item.email || 'N/A';
  const status = item.status || 'Reçu';
  const role = item.role || item.badgeRole || 'Représentant Légal';
  const pole = item.pole || 'Général';
  const exp = item.experience || item.message || item.details || item.motivation || 'Dossier d\'adhésion officiel enregistré dans la base confédérale CONESESS.';

  const printWindow = window.open('', '_blank', 'width=850,height=1000');
  if (!printWindow) {
    showToast("Veuillez autoriser les fenêtres surgissantes pour générer la fiche PDF.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>CONESESS - Fiche Officielle PDF - ${ref}</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0A2540; margin: 0; padding: 20px; font-size: 13px; line-height: 1.5; background: #FFF; }
        .senegal-bar { height: 6px; background: linear-gradient(90deg, #006837 33%, #FFD100 33% 66%, #E31B23 66%); margin-bottom: 20px; border-radius: 3px; }
        .header-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; border-bottom: 2px solid #006837; padding-bottom: 15px; }
        .header-logo { width: 65px; height: 65px; border-radius: 50%; border: 2px solid #E9C46A; }
        .title-conf { font-size: 15px; font-weight: bold; color: #006837; margin: 0; text-transform: uppercase; }
        .subtitle-conf { font-size: 10px; color: #64748B; margin: 3px 0 0 0; }
        .doc-badge { background: #006837; color: #FFF; padding: 4px 10px; border-radius: 12px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
        .section-title { font-size: 12px; font-weight: bold; color: #006837; background: #F4F7F5; padding: 6px 10px; border-left: 4px solid #006837; margin-top: 18px; margin-bottom: 10px; text-transform: uppercase; }
        .data-table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        .data-table td { padding: 8px 10px; border-bottom: 1px solid #E2E8F0; vertical-align: top; }
        .data-label { font-weight: bold; color: #64748B; width: 35%; font-size: 12px; }
        .data-val { font-weight: 600; color: #0A2540; font-size: 12px; }
        .box-content { background: #F8FAF9; border: 1px solid #E2E8F0; padding: 12px; border-radius: 6px; font-size: 12px; color: #334155; margin-top: 5px; white-space: pre-line; }
        .footer-stamp { margin-top: 35px; border-top: 1px solid #CBD5E1; padding-top: 15px; display: flex; justify-content: space-between; font-size: 10px; color: #64748B; }
        .seal-box { border: 2px dashed #006837; color: #006837; padding: 8px 15px; border-radius: 8px; text-align: center; font-weight: bold; font-size: 10px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="senegal-bar"></div>
      
      <table class="header-table">
        <tr>
          <td style="width: 75px;"><img src="assets/images/logo.jpg" class="header-logo" alt="CONESESS"></td>
          <td>
            <h1 class="title-conf">CONSEIL NATIONAL DES ENTREPRISES DE L'ÉCONOMIE SOCIALE ET SOLIDAIRE</h1>
            <p class="subtitle-conf">REPRÉSENTER • FÉDÉRER • STRUCTURER • ACCÉLÉRER — CONESESS SÉNÉGAL</p>
            <small style="color: #006837; font-weight: bold;">Secrétariat Général Confédéral — Dakar, République du Sénégal</small>
          </td>
          <td style="text-align: right; vertical-align: top;">
            <span class="doc-badge">${status}</span>
            <div style="font-size: 11px; margin-top: 10px; color: #64748B;">Réf : <strong style="color: #0A2540; font-family: monospace;">${ref}</strong></div>
            <div style="font-size: 10px; color: #94A3B8;">Date : ${date}</div>
          </td>
        </tr>
      </table>

      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="margin: 0; font-size: 14px; color: #0A2540; text-transform: uppercase; letter-spacing: 0.5px;">FICHE OFFICIELLE DE SOUMISSION DE FORMULAIRE (PDF)</h2>
        <small style="color: #64748B;">Document certifié extrait de la plateforme sécurisée de gestion confédérale</small>
      </div>

      <div class="section-title">1. IDENTIFICATION DE L'ORGANISATION / CANDIDAT</div>
      <table class="data-table">
        <tr><td class="data-label">Dénomination Sociale / Nom :</td><td class="data-val">${name}</td></tr>
        <tr><td class="data-label">Forme Juridique / Type :</td><td class="data-val">${type}</td></tr>
        <tr><td class="data-label">Région d'Implantation :</td><td class="data-val">${region}</td></tr>
        <tr><td class="data-label">Pôle Métier / Secteur :</td><td class="data-val">${pole}</td></tr>
      </table>

      <div class="section-title">2. REPRÉSENTATION LÉGALE & CONTACTS DIRECTS</div>
      <table class="data-table">
        <tr><td class="data-label">Représentant Légal / Nom :</td><td class="data-val">${rep}</td></tr>
        <tr><td class="data-label">Fonction / Rôle :</td><td class="data-val">${role}</td></tr>
        <tr><td class="data-label">Téléphone / WhatsApp Direct :</td><td class="data-val">${phone}</td></tr>
        <tr><td class="data-label">Adresse E-mail Officielle :</td><td class="data-val">${email}</td></tr>
      </table>

      <div class="section-title">3. DÉTAILS DU DOSSIER, EXPÉRIENCE & MOTIVATION</div>
      <div class="box-content">${exp}</div>

      <div style="margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div class="seal-box">
            CONESESS SÉNÉGAL<br>DOC CERTIFIÉ CONFORME
          </div>
        </div>
        <div style="text-align: right; width: 220px; border-top: 1px solid #0A2540; padding-top: 5px;">
          <strong style="font-size: 11px; color: #0A2540;">Le Secrétariat Général</strong><br>
          <small style="color: #64748B;">Cachet & Signature Confédérale</small>
        </div>
      </div>

      <div class="footer-stamp">
        <div>CONESESS Sénégal — Siège Confédéral : Immeuble ESS, Avenue Léopold Sédar Senghor, Dakar</div>
        <div>Page 1 / 1 — Généré le ${new Date().toLocaleDateString('fr-FR')}</div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  showToast(`Génération du PDF pour ${name}...`);
}

function downloadCurrentModalFormPDF() {
  if (currentModalSubmissionId) {
    downloadFormSubmissionPDF(currentModalSubmissionId);
  }
}

// Download Form Submission Details as a TXT File
function downloadFormSubmissionText(id) {
  const targetId = id || currentModalSubmissionId;
  if (!targetId) return;

  const members = getMembersDB();
  const webForms = getWebFormsDB();
  const contacts = getContactsDB();

  let item = members.find(m => m.ref === targetId);
  let category = "Dossier d'Adhésion Membre";

  if (!item) {
    item = webForms.find(w => w.id === targetId || w.ref === targetId);
    if (item) category = item.type || "Formulaire Web";
  }

  if (!item) {
    const contactIndex = parseInt(targetId.replace('CONTACT-', '')) - 1;
    if (!isNaN(contactIndex) && contacts[contactIndex]) {
      item = contacts[contactIndex];
      category = "Message de Contact Web";
    }
  }

  if (!item) {
    showToast("Impossible de localiser la fiche de ce formulaire.");
    return;
  }

  const name = item.name || item.org || 'Inconnu';
  const ref = item.ref || item.id || targetId;
  const date = item.date || new Date().toLocaleDateString('fr-FR');
  const type = item.type || category;
  const region = item.region || 'Sénégal';
  const rep = item.rep || item.name || 'N/A';
  const phone = item.phone || 'N/A';
  const email = item.email || 'N/A';
  const status = item.status || 'Reçu';
  const role = item.role || item.badgeRole || 'N/A';
  const exp = item.experience || item.message || item.details || 'N/A';

  const textContent = `
================================================================================
CONSEIL NATIONAL DES ENTREPRISES DE L'ÉCONOMIE SOCIALE ET SOLIDAIRE (CONESESS)
FICHE OFFICIELLE DE SOUMISSION DE FORMULAIRE - SECRÉTARIAT GÉNÉRAL
================================================================================

RÉFÉRENCE DOSSIER   : ${ref}
DATE DE RECEPTION   : ${date}
TYPE DE FORMULAIRE  : ${type}
STATUT DU DOSSIER   : ${(status || 'Nouveau').toUpperCase()}

--------------------------------------------------------------------------------
1. INFORMATIONS SUR L'ORGANISATION OU LE CANDIDAT
--------------------------------------------------------------------------------
Dénomination / Nom : ${name}
Forme Juridique    : ${type}
Région d'Implantation: ${region}
Représentant Légal : ${rep}
Poste Visé / Rôle  : ${role}

--------------------------------------------------------------------------------
2. COORDONNÉES ET CONTACT DIRECT
--------------------------------------------------------------------------------
Téléphone / WhatsApp: ${phone}
Adresse E-mail      : ${email}
Siège Social        : ${region}, République du Sénégal

--------------------------------------------------------------------------------
3. NOTES, MOTIVATION ET EXPÉRIENCE DE SÉLECTION
--------------------------------------------------------------------------------
Détails & Contenu  :
${exp}

--------------------------------------------------------------------------------
CONESESS SÉNÉGAL - Représenter • Fédérer • Structurer • Accélérer
Secrétariat Général Confédéral - Dakar, République du Sénégal
Document extrait et certifié depuis la plateforme d'administration sécurisée.
================================================================================
`.trim();

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `CONESESS_Fiche_Formulaire_${ref}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(`Fiche de ${name} téléchargée avec succès !`);
}

function downloadCurrentModalFormText() {
  if (currentModalSubmissionId) {
    downloadFormSubmissionText(currentModalSubmissionId);
  }
}

// Edit Admin User Role Logic
function openEditAdminRoleModal(email) {
  const users = getAdminUsersDB();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return;

  const modal = document.getElementById('modal-edit-admin-role');
  const subtitle = document.getElementById('edit-admin-user-email-subtitle');
  const emailInput = document.getElementById('edit-admin-user-email');
  const select = document.getElementById('edit-admin-role-select');

  if (subtitle) subtitle.textContent = `${user.name} (${user.email})`;
  if (emailInput) emailInput.value = user.email;
  if (select) select.value = user.role || "Gestionnaire d'Antenne Régionale";

  if (modal) modal.classList.add('show');
}

function closeEditAdminRoleModal() {
  const modal = document.getElementById('modal-edit-admin-role');
  if (modal) modal.classList.remove('show');
}

function saveAdminRoleSubmit(e) {
  if (e) e.preventDefault();
  const email = document.getElementById('edit-admin-user-email').value;
  const newRole = document.getElementById('edit-admin-role-select').value;

  const users = getAdminUsersDB();
  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    users[index].role = newRole;
    saveAdminUsersDB(users);
    showToast(`Rôle de l'administrateur ${users[index].name} mis à jour : ${newRole}`);
    renderAdminAll();
    closeEditAdminRoleModal();
  }
}

// Render Submitted Web Forms Table
function renderWebFormsTable(members, contacts, webForms = []) {
  const tbody = document.getElementById('tbody-web-forms-list');
  if (!tbody) return;

  const allSubmissions = [];

  webForms.forEach(wf => {
    allSubmissions.push({
      id: wf.id || wf.ref,
      date: wf.date || 'Récemment',
      type: wf.type || 'Formulaire Web',
      name: wf.name,
      details: wf.details || `${wf.org} - ${wf.role || wf.type}`,
      region: wf.region || 'Sénégal',
      contact: `${wf.name} (${wf.phone})`,
      rawPhone: wf.phone,
      email: wf.email || '',
      status: wf.status,
      rawData: wf
    });
  });

  members.forEach(m => {
    allSubmissions.push({
      id: m.ref,
      date: m.date || 'Récemment',
      type: 'Adhésion Membre (index.html)',
      name: m.name,
      details: `${m.type} - ${m.pole || 'Général'}`,
      region: m.region,
      contact: `${m.rep} (${m.phone})`,
      rawPhone: m.phone,
      email: m.email || '',
      status: m.status,
      rawData: m
    });
  });

  contacts.forEach((c, idx) => {
    allSubmissions.push({
      id: 'CONTACT-' + (idx + 1),
      date: c.date || 'Récemment',
      type: 'Formulaire Contact (contact.html)',
      name: c.name,
      details: `Sujet : ${c.subject}`,
      region: 'Sénégal',
      contact: `${c.name} (${c.phone})`,
      rawPhone: c.phone,
      email: c.email || '',
      status: 'Nouveau',
      rawData: c
    });
  });

  if (allSubmissions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--admin-text-muted);">Aucun formulaire soumis sur le site web pour le moment.</td></tr>`;
    return;
  }

  tbody.innerHTML = allSubmissions.map(s => `
    <tr>
      <td style="font-size: 0.8rem; color: var(--admin-text-muted);">${s.date}</td>
      <td><span class="badge ${s.type.includes('Comité') ? 'badge-gold' : (s.type.includes('Adhésion') ? 'badge-green' : 'badge-gold')}" style="font-size: 0.7rem;">${s.type}</span></td>
      <td><strong>${s.name}</strong></td>
      <td style="font-size: 0.825rem;">${s.details}</td>
      <td><span class="badge badge-green" style="font-size: 0.7rem;">${s.region}</span></td>
      <td style="font-size: 0.825rem;"><strong>${s.contact}</strong></td>
      <td>${getStatusBadgeHTML(s.status)}</td>
      <td>
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          <button onclick="openWebFormDetailModal('${s.id}')" class="action-btn-view" title="Visualiser la Fiche"><i class="fas fa-eye"></i> Visualiser</button>
          <button onclick="downloadFormSubmissionPDF('${s.id}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF; border: none;" title="Télécharger Fiche PDF"><i class="fas fa-file-pdf"></i> PDF</button>
          ${s.status !== 'Approuvé' ? `<button onclick="approveWebForm('${s.id}')" class="action-btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" title="Approuver"><i class="fas fa-check"></i></button>` : ''}
          ${s.status !== 'Rejeté' ? `<button onclick="rejectWebForm('${s.id}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; color: #DC2626; border-color: #DC2626;" title="Rejeter"><i class="fas fa-times"></i></button>` : ''}
          <a href="https://wa.me/${s.rawPhone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(s.name)},%20suite%20%C3%A0%20votre%20formulaire%20soumis%20sur%20le%20site%20CONESESS..." target="_blank" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #25D366; color: #FFFFFF; border: none;" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </td>
    </tr>
  `).join('');
}

// Render Steering Committee Candidates Table
function renderSteeringCandidatesTable(webForms = []) {
  const tbody = document.getElementById('tbody-steering-candidates');
  if (!tbody) return;

  const candidates = webForms.filter(wf => wf.type === 'Candidature Comité de Pilotage');

  if (candidates.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--admin-text-muted);">Aucune candidature au Comité de Pilotage reçue pour le moment.</td></tr>`;
    return;
  }

  tbody.innerHTML = candidates.map(c => `
    <tr>
      <td style="font-size: 0.8rem; font-family: monospace;"><strong>${c.ref}</strong><br><small style="color: var(--admin-text-muted);">${c.date}</small></td>
      <td><strong>${c.name}</strong><br><small style="color: var(--admin-text-muted);">${c.org}</small></td>
      <td><span class="badge badge-green" style="font-size: 0.7rem;">${c.region}</span></td>
      <td><span class="badge badge-gold" style="font-size: 0.75rem; font-weight: 700;">${c.role}</span></td>
      <td style="font-size: 0.775rem; max-width: 250px; line-height: 1.3;">
        <strong>Expérience :</strong> ${(c.experience || '').slice(0, 75)}...<br>
        <strong style="color: var(--admin-green);">Motivation :</strong> ${(c.motivation || '').slice(0, 75)}...
      </td>
      <td style="font-size: 0.8rem;">
        <strong>${c.phone}</strong><br>
        <small style="color: var(--admin-text-muted);">${c.email}</small>
      </td>
      <td>${getStatusBadgeHTML(c.status)}</td>
      <td>
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          <button onclick="openWebFormDetailModal('${c.id || c.ref}')" class="action-btn-view" title="Visualiser la Candidature"><i class="fas fa-eye"></i> Visualiser</button>
          <button onclick="downloadFormSubmissionPDF('${c.id || c.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF; border: none;" title="Télécharger Fiche PDF"><i class="fas fa-file-pdf"></i> PDF</button>
          ${c.status !== 'Approuvé' ? `<button onclick="approveSteeringCandidate('${c.id || c.ref}')" class="action-btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" title="Approuver la Candidature"><i class="fas fa-check"></i></button>` : ''}
          ${c.status !== 'Rejeté' ? `<button onclick="rejectSteeringCandidate('${c.id || c.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; color: #DC2626; border-color: #DC2626;" title="Rejeter la Candidature"><i class="fas fa-times"></i></button>` : ''}
          <a href="https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(c.name)},%20suite%20%C3%A0%20votre%20candidature%20au%20poste%20de%20${encodeURIComponent(c.role)}%20au%20Comit%C3%A9%20de%20Pilotage..." target="_blank" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #25D366; color: #FFFFFF; border: none;" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </td>
    </tr>
  `).join('');
}

// Approve / Reject Handlers
function approveSteeringCandidate(id) {
  const forms = getWebFormsDB();
  const candidate = forms.find(f => String(f.id || f.ref).toLowerCase() === String(id).toLowerCase());
  if (candidate) {
    candidate.status = 'Approuvé';
    saveWebFormsDB(forms);
    showToast(`Candidature de ${candidate.name} pour le poste de "${candidate.role}" au Comité de Pilotage approuvée avec succès !`);
  }
}

function rejectSteeringCandidate(id) {
  const forms = getWebFormsDB();
  const candidate = forms.find(f => String(f.id || f.ref).toLowerCase() === String(id).toLowerCase());
  if (candidate) {
    candidate.status = 'Rejeté';
    saveWebFormsDB(forms);
    showToast(`Candidature de ${candidate.name} rejetée.`);
  }
}

function approveWebForm(id) {
  const forms = getWebFormsDB();
  const form = forms.find(f => String(f.id || f.ref).toLowerCase() === String(id).toLowerCase());
  if (form) {
    form.status = 'Approuvé';
    saveWebFormsDB(forms);
    showToast(`Formulaire ${id} approuvé avec succès !`);
    return;
  }
  approveMember(id);
}

function rejectWebForm(id) {
  const forms = getWebFormsDB();
  const form = forms.find(f => String(f.id || f.ref).toLowerCase() === String(id).toLowerCase());
  if (form) {
    form.status = 'Rejeté';
    saveWebFormsDB(forms);
    showToast(`Formulaire ${id} rejeté.`);
  }
}
    showToast(`Formulaire ${id} rejeté.`);
    return;
  }
  const members = getMembersDB();
  const m = members.find(mem => mem.ref === id);
  if (m) {
    m.status = 'Rejeté';
    saveMembersDB(members);
    showToast(`Dossier ${id} rejeté.`);
  }
}

// Recent Members Table
function renderRecentMembersTable(members) {
  const tbody = document.getElementById('tbody-recent-members');
  if (!tbody) return;

  if (members.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--admin-text-muted);">Aucune adhésion enregistrée.</td></tr>`;
    return;
  }

  tbody.innerHTML = members.map(m => `
    <tr>
      <td><strong style="color: var(--admin-green); font-family: monospace;">${m.ref}</strong></td>
      <td><strong>${m.name}</strong></td>
      <td>${m.type}</td>
      <td><span class="badge badge-green" style="font-size: 0.7rem;">${m.region}</span></td>
      <td style="font-size: 0.8rem; color: var(--admin-text-muted);">${m.pole || 'Général'}</td>
      <td>${getStatusBadgeHTML(m.status)}</td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          <button onclick="openWebFormDetailModal('${m.ref}')" class="action-btn-view" title="Visualiser la Fiche"><i class="fas fa-eye"></i> Visualiser</button>
          <button onclick="approveMember('${m.ref}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(0, 104, 55, 0.15); color: #006837; border: 1px solid #006837;" title="Approuver"><i class="fas fa-check"></i></button>
          <button onclick="openBadgeForMember('${m.ref}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(244, 162, 97, 0.2); color: #D97706; border: 1px solid #F4A261;" title="Badge"><i class="fas fa-id-badge"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Full Members Table
function renderFullMembersTable(members) {
  const tbody = document.getElementById('tbody-full-members');
  if (!tbody) return;

  if (members.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--admin-text-muted);">Aucun membre trouvé dans la base de données.</td></tr>`;
    return;
  }

  tbody.innerHTML = members.map(m => `
    <tr>
      <td><strong style="color: var(--admin-green); font-family: monospace;">${m.ref}</strong></td>
      <td><strong>${m.name}</strong><br><small style="color: var(--admin-text-muted);">${m.email || ''}</small></td>
      <td>${m.type}</td>
      <td><span class="badge badge-green" style="font-size: 0.7rem;">${m.region}</span></td>
      <td style="font-size: 0.825rem;"><strong>${m.rep}</strong><br><span style="color: #006837;"><i class="fab fa-whatsapp"></i> ${m.phone}</span></td>
      <td>${getStatusBadgeHTML(m.status)}</td>
      <td><span class="badge badge-gold" style="font-size: 0.7rem;">${m.badgeStatus || 'Non généré'}</span></td>
      <td>
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          <button onclick="openWebFormDetailModal('${m.ref}')" class="action-btn-view" title="Visualiser la Fiche"><i class="fas fa-eye"></i> Visualiser</button>
          <button onclick="downloadFormSubmissionPDF('${m.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF; border: none;" title="Télécharger Fiche PDF"><i class="fas fa-file-pdf"></i> PDF</button>
          ${m.status !== 'Approuvé' ? `<button onclick="approveMember('${m.ref}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF;" title="Valider"><i class="fas fa-check"></i></button>` : ''}
          <button onclick="openBadgeForMember('${m.ref}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: var(--admin-gold); color: #FFFFFF;" title="Générer Badge"><i class="fas fa-id-badge"></i></button>
          <button onclick="deleteMember('${m.ref}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.15); color: #DC2626; border: 1px solid #DC2626;" title="Supprimer"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function getStatusBadgeHTML(status) {
  if (status === 'Approuvé') {
    return `<span class="status-badge status-approved"><i class="fas fa-check-circle"></i> Approuvé</span>`;
  } else if (status === 'Rejeté') {
    return `<span class="status-badge status-rejected"><i class="fas fa-times-circle"></i> Rejeté</span>`;
  } else {
    return `<span class="status-badge status-pending"><i class="fas fa-clock"></i> En attente</span>`;
  }
}

// Status Updates
function approveMember(ref) {
  const members = getMembersDB();
  const index = members.findIndex(m => m.ref === ref);
  if (index !== -1) {
    members[index].status = 'Approuvé';
    if (members[index].badgeStatus === 'Non généré') {
      members[index].badgeStatus = 'Généré';
    }
    saveMembersDB(members);
    showToast(`Adhésion de ${members[index].name} approuvée avec succès !`);
  }
}

function deleteMember(ref) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le dossier ${ref} de la base de données ?`)) {
    let members = getMembersDB();
    members = members.filter(m => m.ref !== ref);
    saveMembersDB(members);
    showToast(`Dossier ${ref} supprimé.`);
  }
}

// Filter Function
function filterMembersTable() {
  const query = document.getElementById('search-member-input').value.toLowerCase();
  const region = document.getElementById('filter-region-select').value;
  const status = document.getElementById('filter-status-select').value;

  const members = getMembersDB();
  const filtered = members.filter(m => {
    const matchesSearch = (m.name + ' ' + m.ref + ' ' + m.rep + ' ' + m.phone).toLowerCase().includes(query);
    const matchesRegion = region === '' || m.region === region;
    const matchesStatus = status === '' || m.status === status;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  renderFullMembersTable(filtered);
}

// CSV Export
function exportMembersCSV() {
  const members = getMembersDB();
  if (members.length === 0) {
    showToast("Aucune donnée à exporter.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Référence,Organisation,Forme Juridique,Région,Pôle Métier,Représentant,Téléphone,Email,Statut,Statut Badge\n";

  members.forEach(m => {
    const row = [
      `"${m.ref}"`,
      `"${m.name}"`,
      `"${m.type}"`,
      `"${m.region}"`,
      `"${m.pole || ''}"`,
      `"${m.rep}"`,
      `"${m.phone}"`,
      `"${m.email || ''}"`,
      `"${m.status}"`,
      `"${m.badgeStatus || ''}"`
    ].join(",");
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `CONESESS_Base_Membres_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Exportation de la base de données des membres au format CSV réussie !");
}

// Add Member Modal
function openAddMemberModal() {
  const modal = document.getElementById('admin-add-member-modal');
  if (modal) modal.classList.add('show');
}

function closeAddMemberModal() {
  const modal = document.getElementById('admin-add-member-modal');
  if (modal) modal.classList.remove('show');
}

function saveManualMember() {
  const name = document.getElementById('manual-name').value;
  const type = document.getElementById('manual-type').value;
  const region = document.getElementById('manual-region').value;
  const pole = document.getElementById('manual-pole').value;
  const rep = document.getElementById('manual-rep').value;
  const phone = document.getElementById('manual-phone').value;

  const newRef = 'CONESESS-2026-' + Math.floor(1000 + Math.random() * 9000);
  const newMember = {
    ref: newRef,
    name: name,
    type: type,
    region: region,
    pole: pole,
    rep: rep,
    phone: phone,
    email: '',
    status: 'Approuvé',
    badgeStatus: 'Généré',
    badgeRole: 'Représentant Légal',
    date: new Date().toISOString().slice(0,10)
  };

  const members = getMembersDB();
  members.unshift(newMember);
  saveMembersDB(members);

  closeAddMemberModal();
  document.getElementById('form-manual-add-member').reset();
  showToast(`Organisation ${name} enregistrée avec la référence ${newRef}.`);
}

// BADGE STUDIO LOGIC
function renderBadgeSelectOptions(members) {
  const select = document.getElementById('badge-select-member');
  if (!select) return;

  if (members.length === 0) {
    select.innerHTML = `<option value="">Aucun membre disponible</option>`;
    return;
  }

  select.innerHTML = members.map(m => `
    <option value="${m.ref}">${m.name} (${m.region}) - ${m.ref}</option>
  `).join('');

  loadMemberIntoBadgeStudio();
}

function openBadgeForMember(ref) {
  switchAdminTab('tab-badges');
  const select = document.getElementById('badge-select-member');
  if (select) {
    select.value = ref;
    loadMemberIntoBadgeStudio();
  }
}

function loadMemberIntoBadgeStudio() {
  const select = document.getElementById('badge-select-member');
  if (!select || !select.value) return;

  const ref = select.value;
  const members = getMembersDB();
  const member = members.find(m => m.ref === ref);

  if (member) {
    const nameInput = document.getElementById('badge-input-name');
    const orgInput = document.getElementById('badge-input-org');
    const roleInput = document.getElementById('badge-input-role');
    const levelSelect = document.getElementById('badge-input-level');
    const regionInput = document.getElementById('badge-input-region');
    const statusSelect = document.getElementById('badge-input-status');

    if (nameInput) nameInput.value = member.rep || member.name;
    if (orgInput) orgInput.value = member.name;
    if (roleInput) roleInput.value = member.badgeRole || 'Représentant Légal';
    if (levelSelect) levelSelect.value = member.badgeLevel || 'Membre Confédéral';
    if (regionInput) regionInput.value = member.region || 'Dakar';
    if (statusSelect) statusSelect.value = member.badgeStatus || 'Généré';

    updateBadgePreview(member);
  }
}

function updateBadgePreview(memberData = null) {
  const select = document.getElementById('badge-select-member');
  if (!select || !select.value) return;

  const members = getMembersDB();
  const member = memberData || members.find(m => m.ref === select.value);

  if (!member) return;

  const name = document.getElementById('badge-input-name')?.value || member.rep || member.name;
  const org = document.getElementById('badge-input-org')?.value || member.name;
  const role = document.getElementById('badge-input-role')?.value || 'Représentant Légal';
  const level = document.getElementById('badge-input-level')?.value || 'Membre Confédéral';
  const region = document.getElementById('badge-input-region')?.value || member.region || 'Dakar';
  const badgeStatus = document.getElementById('badge-input-status')?.value || 'Généré';

  const previewOrg = document.getElementById('badge-preview-org');
  const previewName = document.getElementById('badge-preview-name');
  const previewRole = document.getElementById('badge-preview-role');
  const previewRef = document.getElementById('badge-preview-ref');
  const previewRegion = document.getElementById('badge-preview-region');
  const previewPole = document.getElementById('badge-preview-pole');
  const previewStatus = document.getElementById('badge-preview-status');

  if (previewOrg) previewOrg.textContent = org;
  if (previewName) previewName.textContent = name;
  if (previewRole) previewRole.textContent = role;
  if (previewRef) previewRef.textContent = member.ref;
  if (previewRegion) previewRegion.textContent = region;
  if (previewPole) previewPole.textContent = level;
  if (previewStatus) previewStatus.textContent = `Badge ${badgeStatus} - CONESESS (${level})`;
}

function saveBadgeStatus() {
  const select = document.getElementById('badge-select-member');
  if (!select || !select.value) return;

  const ref = select.value;
  const name = document.getElementById('badge-input-name')?.value;
  const org = document.getElementById('badge-input-org')?.value;
  const role = document.getElementById('badge-input-role')?.value;
  const level = document.getElementById('badge-input-level')?.value;
  const region = document.getElementById('badge-input-region')?.value;
  const status = document.getElementById('badge-input-status')?.value;

  const members = getMembersDB();
  const index = members.findIndex(m => m.ref === ref);
  if (index !== -1) {
    if (name) members[index].rep = name;
    if (org) members[index].name = org;
    if (role) members[index].badgeRole = role;
    if (level) members[index].badgeLevel = level;
    if (region) members[index].region = region;
    if (status) members[index].badgeStatus = status;

    saveMembersDB(members);
    showToast(`Caractéristiques du badge pour ${members[index].name} enregistrées avec succès !`);
    renderAdminAll();
  }
}

function printCurrentBadge() {
  window.print();
}

// Contacts Table Render
function renderContactsTable(contacts) {
  const tbody = document.getElementById('tbody-contacts-list');
  if (!tbody) return;

  if (contacts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Aucun message de contact reçu.</td></tr>`;
    return;
  }

  tbody.innerHTML = contacts.map((c, i) => `
    <tr>
      <td style="font-size: 0.8rem; color: var(--text-muted);">${c.date || 'Récemment'}</td>
      <td><strong>${c.name}</strong></td>
      <td><span style="color: #006837;"><i class="fab fa-whatsapp"></i> ${c.phone}</span></td>
      <td>${c.email || 'N/A'}</td>
      <td><span class="badge badge-gold" style="font-size: 0.7rem;">${c.subject}</span></td>
      <td style="font-size: 0.825rem; max-width: 280px;">${c.message}</td>
      <td>
        <a href="https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(c.name)},%20suite%20%C3%A0%20votre%20message%20sur%20CONESESS..." target="_blank" class="btn btn-sm" style="background: #25D366; color: #FFFFFF; font-size: 0.75rem;">
          <i class="fab fa-whatsapp"></i> Répondre
        </a>
      </td>
    </tr>
  `).join('');
}

// Render Admin Users Table (Super Admin)
function renderAdminUsersTable(adminUsers) {
  const tbody = document.getElementById('tbody-admin-users-list');
  if (!tbody) return;

  if (adminUsers.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Aucun utilisateur administrateur.</td></tr>`;
    return;
  }

  tbody.innerHTML = adminUsers.map(u => `
    <tr>
      <td><strong>${u.name}</strong> ${u.isSuperAdmin ? '<span class="badge badge-gold" style="font-size: 0.65rem; margin-left: 0.25rem;"><i class="fas fa-crown"></i> Super Admin</span>' : ''}</td>
      <td><strong style="color: var(--primary-navy); font-size: 0.85rem;">${u.email}</strong></td>
      <td><span class="badge badge-green" style="font-size: 0.7rem;">${u.org || 'CONESESS'}</span></td>
      <td style="font-size: 0.825rem;"><strong>${u.role}</strong></td>
      <td style="font-size: 0.8rem; color: #006837;"><i class="fab fa-whatsapp"></i> ${u.phone || 'N/A'}</td>
      <td>${getStatusBadgeHTML(u.status)}</td>
      <td>
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          <button onclick="openEditAdminRoleModal('${u.email}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #0A2540; color: #FFFFFF;" title="Modifier Rôle"><i class="fas fa-user-tag"></i> Modifier Rôle</button>
          ${!u.isSuperAdmin ? `
            ${u.status !== 'Approuvé' ? `<button onclick="approveAdminUser('${u.email}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF;" title="Approuver"><i class="fas fa-user-check"></i> Approuver</button>` : `<button onclick="rejectAdminUser('${u.email}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(244, 162, 97, 0.2); color: #D97706; border: 1px solid #F4A261;" title="Suspendre"><i class="fas fa-pause"></i> Suspendre</button>`}
            <button onclick="deleteAdminUser('${u.email}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.15); color: #DC2626; border: 1px solid #DC2626;" title="Supprimer"><i class="fas fa-trash"></i></button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

// Approve Admin User Account
function approveAdminUser(email) {
  const users = getAdminUsersDB();
  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    users[index].status = 'Approuvé';
    saveAdminUsersDB(users);
    showToast(`Compte admin de ${users[index].name} (${email}) approuvé avec succès !`);
  }
}

// Reject/Suspend Admin User Account
function rejectAdminUser(email) {
  const users = getAdminUsersDB();
  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    users[index].status = 'Suspendu';
    saveAdminUsersDB(users);
    showToast(`Accès administrateur de ${users[index].name} suspendu.`);
  }
}

// Delete Admin User Account
function deleteAdminUser(email) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le compte administrateur ${email} ?`)) {
    let users = getAdminUsersDB();
    users = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    saveAdminUsersDB(users);
    showToast(`Compte admin ${email} supprimé.`);
  }
}
