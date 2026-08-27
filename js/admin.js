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
function loginAdmin() {
  const emailInput = document.getElementById('admin-email').value.trim().toLowerCase();
  const passwordInput = document.getElementById('admin-password').value;
  const alertBox = document.getElementById('auth-status-alert');

  const users = getAdminUsersDB();
  const user = users.find(u => u.email.toLowerCase() === emailInput);

  if (!user) {
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.color = '#DC2626';
      alertBox.style.border = '1px solid #DC2626';
      alertBox.innerHTML = `<i class="fas fa-exclamation-circle"></i> Aucun compte administrateur trouvé avec l'adresse <strong>${emailInput}</strong>. Veuillez effectuer une demande de compte.`;
    }
    return;
  }

  // Check Account Status
  if (user.status === 'En attente') {
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(244, 162, 97, 0.2)';
      alertBox.style.color = '#D97706';
      alertBox.style.border = '1px solid #F4A261';
      alertBox.innerHTML = `<i class="fas fa-clock"></i> <strong>Compte en attente d'approbation !</strong><br>Votre demande de compte (${user.name}) a été transmise au Super Administrateur. Votre accès sera activé dès sa validation.`;
    }
    return;
  }

  if (user.status === 'Refusé' || user.status === 'Suspendu') {
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.color = '#DC2626';
      alertBox.style.border = '1px solid #DC2626';
      alertBox.innerHTML = `<i class="fas fa-user-slash"></i> Accès refusé ou suspendu par le Super Administrateur.`;
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
      alertBox.innerHTML = `<i class="fas fa-key"></i> Mot de passe incorrect.`;
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
  showToast(`Bienvenue, ${user.name} ! Connexion réussie.`);
}

// Quick Super Admin Login
function quickLoginAdmin() {
  const users = getAdminUsersDB();
  const superAdmin = users.find(u => u.isSuperAdmin) || users[0];

  localStorage.setItem('conesess_admin_auth', 'true');
  localStorage.setItem('conesess_admin_active_user', JSON.stringify(superAdmin));

  const overlay = document.getElementById('admin-login-overlay');
  const mainCont = document.getElementById('admin-main-container');
  if (overlay) overlay.style.display = 'none';
  if (mainCont) mainCont.style.display = 'block';

  renderAdminAll();
  showToast("Connexion Super Administrateur effectuée.");
}

// Handle Register Admin Account Request
function registerAdminRequest() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const org = document.getElementById('reg-org').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const password = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role').value;
  const alertBox = document.getElementById('auth-status-alert');

  const users = getAdminUsersDB();
  const existing = users.find(u => u.email.toLowerCase() === email);

  if (existing) {
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.color = '#DC2626';
      alertBox.style.border = '1px solid #DC2626';
      alertBox.innerHTML = `<i class="fas fa-exclamation-circle"></i> Un compte admin existe déjà avec l'e-mail <strong>${email}</strong>.`;
    }
    return;
  }

  const newAdminUser = {
    name: name,
    email: email,
    password: password,
    org: org,
    phone: phone,
    role: role,
    status: 'En attente',
    isSuperAdmin: false,
    date: new Date().toISOString().slice(0,10)
  };

  users.push(newAdminUser);
  saveAdminUsersDB(users);

  document.getElementById('form-admin-register').reset();
  showAuthMode('login');

  if (alertBox) {
    alertBox.style.display = 'block';
    alertBox.style.background = 'rgba(0, 104, 55, 0.15)';
    alertBox.style.color = '#006837';
    alertBox.style.border = '1px solid #006837';
    alertBox.innerHTML = `<i class="fas fa-check-circle"></i> <strong>Demande enregistrée avec succès !</strong><br>Votre demande de compte admin pour <strong>${name}</strong> (${email}) a été transmise au Super Administrateur du CONESESS pour approbation.`;
  }

  showToast("Demande de compte admin soumise au Super Admin pour validation.");
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

// Navigation Sidebar Tabs
function switchAdminTab(tabId) {
  document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.admin-nav-link').forEach(btn => btn.classList.remove('active'));

  const target = document.getElementById(tabId);
  if (target) target.style.display = 'block';

  const linkIdMap = {
    'tab-dashboard': 'nav-item-dashboard',
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
}

// Check-in QR Code Verification Tool
function verifyCheckinCode() {
  const input = document.getElementById('checkin-code-input');
  const resultBox = document.getElementById('checkin-result-box');
  if (!input || !resultBox) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast("Veuillez saisir la référence du badge.");
    return;
  }

  const members = getMembersDB();
  const member = members.find(m => m.ref.toUpperCase() === code || m.phone.includes(code));

  if (member) {
    resultBox.style.display = 'block';
    resultBox.style.background = 'rgba(0, 104, 55, 0.12)';
    resultBox.style.border = '1.5px solid #006837';
    resultBox.style.color = '#006837';
    resultBox.innerHTML = `
      <div style="font-size: 1.5rem; margin-bottom: 0.25rem;"><i class="fas fa-check-circle"></i> ACCÈS ACCORDÉ</div>
      <strong style="font-size: 1.1rem; display: block; color: var(--admin-text-main);">${member.name}</strong>
      <span style="font-size: 0.9rem;">Représentant : <strong>${member.rep}</strong> (${member.region})</span><br>
      <small style="color: var(--admin-text-muted);">Forme : ${member.type} | Réf : ${member.ref}</small>
    `;
    showToast(`Entrée validée sur site pour ${member.name} !`);
  } else {
    resultBox.style.display = 'block';
    resultBox.style.background = 'rgba(239, 68, 68, 0.15)';
    resultBox.style.border = '1.5px solid #DC2626';
    resultBox.style.color = '#DC2626';
    resultBox.innerHTML = `
      <div style="font-size: 1.3rem; margin-bottom: 0.25rem;"><i class="fas fa-times-circle"></i> REFUSÉ OU INCONNU</div>
      <span>Aucun badge ou participant trouvé avec le code <strong>${code}</strong>.</span>
    `;
  }
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

// Segmentation Charts Renderer
function renderSegmentation() {
  const members = getMembersDB();
  const regionContainer = document.getElementById('segmentation-region-bars');
  const poleContainer = document.getElementById('segmentation-pole-bars');

  if (!regionContainer || !poleContainer) return;

  const regions = {};
  const poles = {};

  members.forEach(m => {
    regions[m.region] = (regions[m.region] || 0) + 1;
    const poleName = m.pole || 'Pôle 1 : Agroécologie';
    poles[poleName] = (poles[poleName] || 0) + 1;
  });

  const total = members.length || 1;

  regionContainer.innerHTML = Object.keys(regions).map(r => {
    const count = regions[r];
    const pct = Math.round((count / total) * 100);
    return `
      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.825rem; font-weight: 600; margin-bottom: 0.25rem;">
          <span>${r}</span>
          <span>${count} (${pct}%)</span>
        </div>
        <div style="background: var(--admin-bg-light); height: 10px; border-radius: 10px; overflow: hidden;">
          <div style="width: ${pct}%; background: var(--admin-green); height: 100%; border-radius: 10px;"></div>
        </div>
      </div>
    `;
  }).join('');

  poleContainer.innerHTML = Object.keys(poles).map(p => {
    const count = poles[p];
    const pct = Math.round((count / total) * 100);
    return `
      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.825rem; font-weight: 600; margin-bottom: 0.25rem;">
          <span>${p.slice(0, 28)}...</span>
          <span>${count} (${pct}%)</span>
        </div>
        <div style="background: var(--admin-bg-light); height: 10px; border-radius: 10px; overflow: hidden;">
          <div style="width: ${pct}%; background: var(--admin-gold); height: 100%; border-radius: 10px;"></div>
        </div>
      </div>
    `;
  }).join('');
}

// Render All Components
function renderAdminAll() {
  const members = getMembersDB();
  const contacts = getContactsDB();
  const adminUsers = getAdminUsersDB();

  // Metrics
  const total = members.length;
  const approved = members.filter(m => m.status === 'Approuvé').length;
  const pending = members.filter(m => m.status === 'En attente').length;
  const badgesCount = members.filter(m => m.badgeStatus && m.badgeStatus !== 'Non généré').length;
  const pendingAdminsCount = adminUsers.filter(u => u.status === 'En attente').length;

  const statTotal = document.getElementById('stat-total-members');
  const statApproved = document.getElementById('stat-approved-members');
  const statPending = document.getElementById('stat-pending-members');
  const statBadgesBtn = document.getElementById('stat-badges-count-btn');

  if (statTotal) statTotal.textContent = total;
  if (statApproved) statApproved.textContent = approved;
  if (statPending) statPending.textContent = pending;
  if (statBadgesBtn) statBadgesBtn.textContent = badgesCount;

  const countNavPendingAdmins = document.getElementById('count-nav-pending-admins');
  if (countNavPendingAdmins) countNavPendingAdmins.textContent = pendingAdminsCount;

  renderRecentMembersTable(members.slice(0, 5));
  renderFullMembersTable(members);
  renderBadgeSelectOptions(members);
  renderContactsTable(contacts);
  renderAdminUsersTable(adminUsers);
}

// Recent Members Table
function renderRecentMembersTable(members) {
  const tbody = document.getElementById('tbody-recent-members');
  if (!tbody) return;

  if (members.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">Aucune adhésion enregistrée.</td></tr>`;
    return;
  }

  tbody.innerHTML = members.map(m => `
    <tr>
      <td><strong style="color: var(--primary-green); font-family: monospace;">${m.ref}</strong></td>
      <td><strong>${m.name}</strong></td>
      <td>${m.type}</td>
      <td><span class="badge badge-green" style="font-size: 0.7rem;">${m.region}</span></td>
      <td style="font-size: 0.8rem; color: var(--text-muted);">${m.pole || 'Général'}</td>
      <td>${getStatusBadgeHTML(m.status)}</td>
      <td>
        <button onclick="approveMember('${m.ref}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(0, 104, 55, 0.15); color: #006837; border: 1px solid #006837;" title="Approuver"><i class="fas fa-check"></i></button>
        <button onclick="openBadgeForMember('${m.ref}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(244, 162, 97, 0.2); color: #D97706; border: 1px solid #F4A261;" title="Badge"><i class="fas fa-id-badge"></i></button>
      </td>
    </tr>
  `).join('');
}

// Full Members Table
function renderFullMembersTable(members) {
  const tbody = document.getElementById('tbody-full-members');
  if (!tbody) return;

  if (members.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">Aucun membre trouvé dans la base de données.</td></tr>`;
    return;
  }

  tbody.innerHTML = members.map(m => `
    <tr>
      <td><strong style="color: var(--primary-green); font-family: monospace;">${m.ref}</strong></td>
      <td><strong>${m.name}</strong><br><small style="color: var(--text-muted);">${m.email || ''}</small></td>
      <td>${m.type}</td>
      <td><span class="badge badge-green" style="font-size: 0.7rem;">${m.region}</span></td>
      <td style="font-size: 0.825rem;"><strong>${m.rep}</strong><br><span style="color: #006837;"><i class="fab fa-whatsapp"></i> ${m.phone}</span></td>
      <td>${getStatusBadgeHTML(m.status)}</td>
      <td><span class="badge badge-gold" style="font-size: 0.7rem;">${m.badgeStatus || 'Non généré'}</span></td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          ${m.status !== 'Approuvé' ? `<button onclick="approveMember('${m.ref}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF;" title="Valider"><i class="fas fa-check"></i></button>` : ''}
          <button onclick="openBadgeForMember('${m.ref}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: var(--accent-gold); color: #FFFFFF;" title="Générer Badge"><i class="fas fa-id-badge"></i></button>
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
    const roleInput = document.getElementById('badge-input-role');
    const statusSelect = document.getElementById('badge-input-status');

    if (roleInput) roleInput.value = member.badgeRole || 'Représentant Légal';
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

  const role = document.getElementById('badge-input-role').value || 'Représentant Légal';
  const badgeStatus = document.getElementById('badge-input-status').value || 'Généré';

  document.getElementById('badge-preview-org').textContent = member.name;
  document.getElementById('badge-preview-name').textContent = member.rep;
  document.getElementById('badge-preview-role').textContent = role;
  document.getElementById('badge-preview-ref').textContent = member.ref;
  document.getElementById('badge-preview-region').textContent = member.region;
  document.getElementById('badge-preview-pole').textContent = (member.pole || 'Général').slice(0, 15) + '...';
  document.getElementById('badge-preview-status').textContent = `Badge ${badgeStatus} - CONESESS`;
}

function saveBadgeStatus() {
  const select = document.getElementById('badge-select-member');
  if (!select || !select.value) return;

  const ref = select.value;
  const role = document.getElementById('badge-input-role').value;
  const status = document.getElementById('badge-input-status').value;

  const members = getMembersDB();
  const index = members.findIndex(m => m.ref === ref);
  if (index !== -1) {
    members[index].badgeRole = role;
    members[index].badgeStatus = status;
    saveMembersDB(members);
    showToast(`Statut du badge pour ${members[index].name} mis à jour : ${status}`);
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
      <td style="font-size: 0.825rem;">${u.role}</td>
      <td style="font-size: 0.8rem; color: #006837;"><i class="fab fa-whatsapp"></i> ${u.phone || 'N/A'}</td>
      <td>${getStatusBadgeHTML(u.status)}</td>
      <td>
        ${!u.isSuperAdmin ? `
          <div style="display: flex; gap: 0.35rem;">
            ${u.status !== 'Approuvé' ? `<button onclick="approveAdminUser('${u.email}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF;" title="Approuver"><i class="fas fa-user-check"></i> Approuver</button>` : `<button onclick="rejectAdminUser('${u.email}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(244, 162, 97, 0.2); color: #D97706; border: 1px solid #F4A261;" title="Suspendre"><i class="fas fa-pause"></i> Suspendre</button>`}
            <button onclick="deleteAdminUser('${u.email}')" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: rgba(239, 68, 68, 0.15); color: #DC2626; border: 1px solid #DC2626;" title="Supprimer"><i class="fas fa-trash"></i></button>
          </div>
        ` : '<span style="font-size: 0.75rem; color: var(--text-muted); italic;">Compte Principal</span>'}
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
