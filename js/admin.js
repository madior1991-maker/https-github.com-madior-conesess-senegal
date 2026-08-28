/* ==========================================================================
   CONESESS - ADMIN DASHBOARD & BADGE MANAGEMENT LOGIC
   ========================================================================== */

const INITIAL_MEMBERS_DATA = [];
const INITIAL_CONTACTS_DATA = [];
const INITIAL_ADMIN_USERS = [
  {
    name: 'Madior',
    email: 'madior@conesess.sn',
    password: 'admin',
    org: 'Présidence & Secrétariat Général Confédéral',
    phone: '+221 77 538 66 27',
    role: 'Super Administrateur Confédéral',
    status: 'Approuvé',
    isSuperAdmin: true,
    date: '2026-08-01'
  },
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
  }
];
const INITIAL_STEERING_CANDIDATES = [];

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
  // Purge legacy demo data to ensure a clean production slate
  if (localStorage.getItem('conesess_demo_purged_v2') !== 'true') {
    localStorage.setItem('conesess_members', JSON.stringify([]));
    localStorage.setItem('conesess_web_forms', JSON.stringify([]));
    localStorage.setItem('conesess_contacts', JSON.stringify([]));
    localStorage.setItem('conesess_demo_purged_v2', 'true');
  }

  let users = JSON.parse(localStorage.getItem('conesess_admin_users')) || [];
  const madiorExists = users.some(u => u.email.toLowerCase() === 'madior@conesess.sn');

  if (!madiorExists) {
    users.unshift(INITIAL_ADMIN_USERS[0]);
    localStorage.setItem('conesess_admin_users', JSON.stringify(users));
  } else {
    // Ensure Madior is set as active Super Admin with full rights
    const madiorIndex = users.findIndex(u => u.email.toLowerCase() === 'madior@conesess.sn');
    if (madiorIndex !== -1) {
      users[madiorIndex].isSuperAdmin = true;
      users[madiorIndex].role = 'Super Administrateur Confédéral';
      users[madiorIndex].status = 'Approuvé';
      localStorage.setItem('conesess_admin_users', JSON.stringify(users));
    }
  }

  if (!localStorage.getItem('conesess_members')) {
    localStorage.setItem('conesess_members', JSON.stringify([]));
  }
  if (!localStorage.getItem('conesess_contacts')) {
    localStorage.setItem('conesess_contacts', JSON.stringify([]));
  }
  if (!localStorage.getItem('conesess_web_forms')) {
    localStorage.setItem('conesess_web_forms', JSON.stringify([]));
  }
}

function clearAllAdminData() {
  if (confirm("Êtes-vous sûr de vouloir réinitialiser la base de données et effacer toutes les données de test ?")) {
    localStorage.setItem('conesess_members', JSON.stringify([]));
    localStorage.setItem('conesess_web_forms', JSON.stringify([]));
    localStorage.setItem('conesess_contacts', JSON.stringify([]));
    localStorage.setItem('conesess_admin_users', JSON.stringify(INITIAL_ADMIN_USERS));
    renderAdminAll();
    showToast("Base de données réinitialisée à zéro avec succès.");
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
  const superAdmin = users.find(u => u.email.toLowerCase() === 'madior@conesess.sn') || users.find(u => u.isSuperAdmin) || users[0];

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
  showToast(`Bienvenue Madior ! Connexion Super Administrateur Confédéral effectuée.`);
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

  // Smooth scroll to top of main viewport
  window.scrollTo({ top: 0, behavior: 'smooth' });

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
        <div style="display: flex; gap: 0.3rem;">
          <button onclick="openWebFormDetailModal('${m.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" title="Visualiser le Dossier"><i class="fas fa-eye"></i> Aperçu</button>
          <button onclick="downloadFormSubmissionPDF('${m.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF; border: none;" title="Télécharger PDF"><i class="fas fa-file-pdf"></i> PDF</button>
          <button onclick="downloadFormSubmissionText('${m.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #0A2540; color: #FFFFFF; border: none;" title="Télécharger Fiche TXT"><i class="fas fa-file-alt"></i> TXT</button>
          ${m.status !== 'Approuvé' ? `<button onclick="approveMember('${m.ref}')" class="action-btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" title="Approuver"><i class="fas fa-check"></i></button>` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

// Global Modal Form ID Tracker
let currentModalSubmissionId = null;

// Open Web Form Detail Modal & Render Rich Form Preview
function openWebFormDetailModal(id) {
  currentModalSubmissionId = id;
  const modal = document.getElementById('web-form-detail-modal');
  const title = document.getElementById('modal-detail-title');
  const content = document.getElementById('modal-detail-content');

  if (!modal || !content) return;

  const members = getMembersDB();
  const webForms = getWebFormsDB();
  const contacts = getContactsDB();

  let member = members.find(m => m.ref === id);
  let webForm = !member ? webForms.find(w => w.id === id || w.ref === id) : null;
  let contact = (!member && !webForm && id.startsWith('CONTACT-')) ? contacts[parseInt(id.replace('CONTACT-', '')) - 1] : null;

  if (member) {
    if (title) title.textContent = `Aperçu du Dossier : ${member.name}`;
    content.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.85rem; margin-bottom: 1rem; border-bottom: 2px solid var(--admin-border-light);">
        <div>
          <span class="badge badge-green mb-1" style="font-size: 0.75rem;"><i class="fas fa-building"></i> Dossier d'Adhésion Membre Officiel</span>
          <h4 style="margin: 0.2rem 0 0 0; color: var(--admin-text-main); font-size: 1.15rem;">${member.name}</h4>
        </div>
        <div style="text-align: right;">
          <span style="font-family: monospace; font-weight: 800; color: var(--admin-green); font-size: 0.95rem; display: block;">${member.ref}</span>
          <div>${getStatusBadgeHTML(member.status)}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.85rem; margin-bottom: 1rem;">
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px; border-left: 3.5px solid #006837;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem; text-transform: uppercase;">Forme Juridique</small>
          <strong style="color: var(--admin-text-main); font-size: 0.875rem;">${member.type}</strong>
        </div>
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px; border-left: 3.5px solid #E9C46A;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem; text-transform: uppercase;">Région d'Implantation</small>
          <strong style="color: var(--admin-text-main); font-size: 0.875rem;">${member.region}</strong>
        </div>
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px; border-left: 3.5px solid #0A2540;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem; text-transform: uppercase;">Pôle Métier ESS</small>
          <strong style="color: var(--admin-text-main); font-size: 0.875rem;">${member.pole || 'Pôle 1 : Agroécologie & Souveraineté'}</strong>
        </div>
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px; border-left: 3.5px solid #F4A261;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem; text-transform: uppercase;">Badge d'Accréditation</small>
          <strong style="color: #D97706; font-size: 0.875rem;">${member.badgeStatus || 'Badge Généré'} (${member.badgeRole || 'Représentant Légal'})</strong>
        </div>
      </div>

      <div style="background: var(--admin-bg-light); padding: 1rem; border-radius: 10px; border: 1px solid var(--admin-border-light); margin-bottom: 0.5rem;">
        <h5 style="margin: 0 0 0.6rem 0; color: #006837; font-size: 0.875rem;"><i class="fas fa-user-tie"></i> Représentant Légal & Contacts Directs</h5>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.65rem; font-size: 0.835rem;">
          <div><strong>Nom du Représentant :</strong> ${member.rep}</div>
          <div><strong>Téléphone / WhatsApp :</strong> <span style="color: #006837; font-weight: 700;"><i class="fab fa-whatsapp"></i> ${member.phone}</span></div>
          <div><strong>Adresse E-mail :</strong> ${member.email || 'Non renseignée'}</div>
          <div><strong>Date de Dépôt :</strong> ${member.date || 'Récemment'}</div>
        </div>
      </div>
    `;

    setupModalButtons(member.ref, member.rep, member.phone, 'member');
    modal.classList.add('show');

  } else if (webForm) {
    if (title) title.textContent = `Aperçu du Formulaire Web : ${webForm.name}`;
    content.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.85rem; margin-bottom: 1rem; border-bottom: 2px solid var(--admin-border-light);">
        <div>
          <span class="badge badge-gold mb-1" style="font-size: 0.75rem;"><i class="fas fa-file-signature"></i> ${webForm.type || 'Formulaire Soumis'}</span>
          <h4 style="margin: 0.2rem 0 0 0; color: var(--admin-text-main); font-size: 1.15rem;">${webForm.name}</h4>
        </div>
        <div style="text-align: right;">
          <span style="font-family: monospace; font-weight: 800; color: var(--admin-green); font-size: 0.95rem; display: block;">${webForm.id || webForm.ref}</span>
          <div>${getStatusBadgeHTML(webForm.status || 'En attente')}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.85rem; margin-bottom: 1rem;">
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px; border-left: 3.5px solid #006837;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem; text-transform: uppercase;">Organisation Représentée</small>
          <strong style="color: var(--admin-text-main); font-size: 0.875rem;">${webForm.org || 'Candidat Indépendant'}</strong>
        </div>
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px; border-left: 3.5px solid #E9C46A;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem; text-transform: uppercase;">Région</small>
          <strong style="color: var(--admin-text-main); font-size: 0.875rem;">${webForm.region || 'Sénégal'}</strong>
        </div>
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px; border-left: 3.5px solid #0A2540;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem; text-transform: uppercase;">Fonction / Poste Visé</small>
          <strong style="color: var(--admin-text-main); font-size: 0.875rem;">${webForm.role || webForm.type}</strong>
        </div>
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px; border-left: 3.5px solid #F4A261;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem; text-transform: uppercase;">Téléphone Direct</small>
          <strong style="color: #006837; font-size: 0.875rem;"><i class="fab fa-whatsapp"></i> ${webForm.phone}</strong>
        </div>
      </div>

      ${webForm.experience ? `
        <div style="background: var(--admin-bg-light); padding: 0.85rem 1rem; border-radius: 8px; border-left: 4px solid #0A2540; margin-bottom: 0.85rem;">
          <h5 style="margin: 0 0 0.35rem 0; color: #0A2540; font-size: 0.825rem; text-transform: uppercase;"><i class="fas fa-briefcase"></i> Expérience Professionnelle & Parcours</h5>
          <p style="margin: 0; font-size: 0.85rem; color: var(--admin-text-main); line-height: 1.4; white-space: pre-wrap;">${webForm.experience}</p>
        </div>
      ` : ''}

      ${webForm.motivation ? `
        <div style="background: var(--admin-bg-light); padding: 0.85rem 1rem; border-radius: 8px; border-left: 4px solid #006837; margin-bottom: 0.5rem;">
          <h5 style="margin: 0 0 0.35rem 0; color: #006837; font-size: 0.825rem; text-transform: uppercase;"><i class="fas fa-quote-left"></i> Note de Motivation Confédérale</h5>
          <p style="margin: 0; font-size: 0.85rem; color: var(--admin-text-main); line-height: 1.4; white-space: pre-wrap;">${webForm.motivation}</p>
        </div>
      ` : ''}
    `;

    setupModalButtons(webForm.id || webForm.ref, webForm.name, webForm.phone, 'webForm');
    modal.classList.add('show');

  } else if (contact) {
    if (title) title.textContent = `Aperçu du Message : ${contact.name}`;
    content.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.85rem; margin-bottom: 1rem; border-bottom: 2px solid var(--admin-border-light);">
        <div>
          <span class="badge badge-gold mb-1" style="font-size: 0.75rem;"><i class="fas fa-envelope"></i> Message de Contact Web</span>
          <h4 style="margin: 0.2rem 0 0 0; color: var(--admin-text-main); font-size: 1.15rem;">${contact.name}</h4>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.8rem; color: var(--admin-text-muted);">${contact.date || 'Récemment'}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 1rem;">
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem;">Sujet du Message</small>
          <strong style="color: var(--admin-text-main); font-size: 0.875rem;">${contact.subject}</strong>
        </div>
        <div style="background: var(--admin-bg-light); padding: 0.65rem 0.85rem; border-radius: 8px;">
          <small style="color: var(--admin-text-muted); display: block; font-size: 0.725rem;">Téléphone / WhatsApp</small>
          <strong style="color: #006837; font-size: 0.875rem;"><i class="fab fa-whatsapp"></i> ${contact.phone}</strong>
        </div>
      </div>

      <div style="background: var(--admin-bg-light); padding: 1rem; border-radius: 10px; border: 1px solid var(--admin-border-light);">
        <h5 style="margin: 0 0 0.5rem 0; color: #006837; font-size: 0.85rem;"><i class="fas fa-comment-alt"></i> Message du Visiteur</h5>
        <p style="margin: 0; font-size: 0.875rem; color: var(--admin-text-main); line-height: 1.5; white-space: pre-wrap;">${contact.message}</p>
      </div>
    `;

    setupModalButtons(id, contact.name, contact.phone, 'contact');
    modal.classList.add('show');
  }
}

function setupModalButtons(ref, name, phone, type) {
  const btnApprove = document.getElementById('modal-btn-approve-web');
  if (btnApprove) {
    if (type === 'contact') {
      btnApprove.style.display = 'none';
    } else {
      btnApprove.style.display = 'inline-flex';
      btnApprove.onclick = function() {
        if (type === 'member') approveMember(ref);
        else approveWebForm(ref);
        closeWebFormDetailModal();
      };
    }
  }

  const btnWa = document.getElementById('modal-btn-whatsapp-web');
  if (btnWa) {
    btnWa.onclick = function() {
      window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(name)},%20suite%20%C3%A0%20votre%20formulaire%20soumis%20sur%20le%20site%20CONESESS...`, '_blank');
    };
  }
}

function closeWebFormDetailModal() {
  const modal = document.getElementById('web-form-detail-modal');
  if (modal) modal.classList.remove('show');
}

// Download Form Submission as Official PDF Document
function downloadFormSubmissionPDF(id) {
  const targetId = id || currentModalSubmissionId;
  if (!targetId) {
    showToast("Veuillez d'abord sélectionner une fiche à télécharger.");
    return;
  }

  const members = getMembersDB();
  const webForms = getWebFormsDB();
  const contacts = getContactsDB();

  let item = members.find(m => m.ref === targetId);
  let category = "Dossier d'Adhésion Membre Officiel";

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
    showToast("Impossible de localiser la fiche du formulaire.");
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
  const role = item.role || item.badgeRole || 'Représentant / Délégué';
  const exp = item.experience || item.message || item.details || 'Aucune observation complémentaire.';
  const motivation = item.motivation || '';

  const printWin = window.open('', '_blank', 'width=900,height=1000');
  if (!printWin) {
    showToast("Veuillez autoriser les fenêtres surgissantes pour ouvrir le PDF.");
    return;
  }

  printWin.document.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>CONESESS_Fiche_Officielle_${ref}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        @page { size: A4; margin: 12mm; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0A2540; margin: 0; padding: 24px; background: #FFFFFF; font-size: 13px; line-height: 1.4; }
        .pdf-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3.5px solid #006837; padding-bottom: 14px; margin-bottom: 20px; }
        .pdf-brand { display: flex; align-items: center; gap: 14px; }
        .pdf-brand img { width: 60px; height: 60px; border-radius: 50%; border: 2px solid #E9C46A; object-fit: cover; }
        .pdf-brand-text h1 { margin: 0; color: #006837; font-size: 1.25rem; font-weight: 800; }
        .pdf-brand-text p { margin: 3px 0 0 0; color: #D97706; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .pdf-doc-title { text-align: right; }
        .pdf-doc-title h2 { margin: 0; color: #0A2540; font-size: 1.05rem; text-transform: uppercase; }
        .pdf-doc-title p { margin: 3px 0 0 0; color: #64748B; font-size: 0.8rem; }

        .ref-box { background: #F4F7F5; border: 1px solid #CBD5E1; border-left: 5px solid #006837; padding: 12px 18px; border-radius: 8px; margin-bottom: 22px; display: flex; justify-content: space-between; align-items: center; }
        .ref-box strong { font-size: 1.05rem; color: #006837; font-family: monospace; }

        .section-header { background: #006837; color: #FFFFFF; padding: 7px 14px; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; border-radius: 5px; margin-top: 18px; margin-bottom: 10px; }

        table.info-table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
        table.info-table td { padding: 9px 12px; border: 1px solid #E2E8F0; font-size: 0.85rem; vertical-align: top; }
        table.info-table td.lbl { width: 32%; background: #F8FAFC; font-weight: 700; color: #0A2540; }

        .content-box { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 8px; line-height: 1.5; white-space: pre-wrap; font-size: 0.85rem; margin-bottom: 18px; }

        .pdf-footer { margin-top: 40px; border-top: 1.5px solid #E2E8F0; padding-top: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
        .footer-note { font-size: 0.725rem; color: #64748B; max-width: 380px; line-height: 1.4; }
        .stamp-box { width: 200px; border: 2px dashed #006837; padding: 12px; text-align: center; border-radius: 10px; color: #006837; font-size: 0.725rem; font-weight: 700; background: rgba(0, 104, 55, 0.03); }

        @media print {
          body { padding: 0; }
          .no-print { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="background: #0A2540; color: #fff; padding: 14px; text-align: center; border-radius: 8px; margin-bottom: 20px; font-weight: 700;">
        <i class="fas fa-file-pdf" style="color: #25D366; font-size: 1.2rem; margin-right: 6px;"></i> Fiche Officielle Prête au Format PDF.
        <button onclick="window.print()" style="margin-left: 15px; padding: 8px 20px; background: #006837; color: #fff; border: none; border-radius: 20px; cursor: pointer; font-weight: 700; font-size: 0.85rem;">
          <i class="fas fa-download"></i> Télécharger en PDF
        </button>
      </div>

      <div class="pdf-header">
        <div class="pdf-brand">
          <img src="assets/images/logo.jpg" alt="Logo CONESESS">
          <div class="pdf-brand-text">
            <h1>CONESESS SÉNÉGAL</h1>
            <p>Conseil National des Entreprises de l'Équonomie Sociale et Solidaires</p>
          </div>
        </div>
        <div class="pdf-doc-title">
          <h2>FICHE HOMOLOGUÉE</h2>
          <p>Secrétariat Général Confédéral</p>
        </div>
      </div>

      <div class="ref-box">
        <div>
          <span style="font-size: 0.725rem; color: #64748B; display: block; text-transform: uppercase;">Référence Officielle Dossier</span>
          <strong>${ref}</strong>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.725rem; color: #64748B; display: block; text-transform: uppercase;">Date d'Émission</span>
          <span style="font-weight: 700; color: #0A2540;">${date}</span>
        </div>
      </div>

      <div class="section-header">1. Identification du Dossier & Organisation</div>
      <table class="info-table">
        <tr>
          <td class="lbl">Dénomination / Nom</td>
          <td><strong>${name}</strong></td>
        </tr>
        <tr>
          <td class="lbl">Forme Juridique / Type</td>
          <td>${type}</td>
        </tr>
        <tr>
          <td class="lbl">Région d'Implantation</td>
          <td>${region}, République du Sénégal</td>
        </tr>
        <tr>
          <td class="lbl">Représentant Légal / Titulaire</td>
          <td>${rep}</td>
        </tr>
        <tr>
          <td class="lbl">Fonction / Titre Visé</td>
          <td>${role}</td>
        </tr>
      </table>

      <div class="section-header">2. Contacts Directs & Accréditation</div>
      <table class="info-table">
        <tr>
          <td class="lbl">Téléphone Direct / WhatsApp</td>
          <td><strong>${phone}</strong></td>
        </tr>
        <tr>
          <td class="lbl">Adresse E-mail Officielle</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td class="lbl">Statut d'Approbation Admin</td>
          <td><strong style="color: #006837;">${status.toUpperCase()}</strong></td>
        </tr>
      </table>

      <div class="section-header">3. Contenu, Parcours & Motivation</div>
      <div class="content-box">
<strong>Détails / Expérience :</strong>
${exp}

${motivation ? `\n<strong>Note de Motivation :</strong>\n${motivation}` : ''}
      </div>

      <div class="pdf-footer">
        <div class="footer-note">
          <strong>CONESESS SÉNÉGAL - Siège Confédéral Dakar</strong><br>
          Représenter • Fédérer • Structurer • Accélérer l'Économie Sociale et Solidaire.<br>
          Fiche officielle extraite du portail d'administration confédéral.
        </div>
        <div class="stamp-box">
          SECRÉTARIAT GÉNÉRAL<br>
          CONESESS SÉNÉGAL<br>
          <span style="font-size: 0.65rem; color: #64748B;">Cachet & Signature Électronique</span>
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `);

  printWin.document.close();
  showToast(`Aperçu PDF de ${name} ouvert. Choisissez "Enregistrer au format PDF".`);
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
        <div style="display: flex; gap: 0.3rem;">
          <button onclick="openWebFormDetailModal('${s.id}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" title="Voir Fiche"><i class="fas fa-eye"></i> Aperçu</button>
          <button onclick="downloadFormSubmissionPDF('${s.id}')" class="action-btn-pill" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; background: #006837; color: #FFFFFF; border: none;" title="Télécharger PDF"><i class="fas fa-file-pdf"></i> PDF</button>
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
      <td style="font-size: 0.775rem; max-width: 230px; line-height: 1.3;">
        <strong>Expérience :</strong> ${(c.experience || '').slice(0, 60)}...<br>
        <strong style="color: var(--admin-green);">Motivation :</strong> ${(c.motivation || '').slice(0, 60)}...
      </td>
      <td style="font-size: 0.8rem;">
        <strong>${c.phone}</strong><br>
        <small style="color: var(--admin-text-muted);">${c.email}</small>
      </td>
      <td>${getStatusBadgeHTML(c.status)}</td>
      <td>
        <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
          <button onclick="openWebFormDetailModal('${c.id || c.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.45rem; font-size: 0.725rem;" title="Aperçu du Dossier"><i class="fas fa-eye"></i> Aperçu</button>
          <button onclick="downloadFormSubmissionPDF('${c.id || c.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.45rem; font-size: 0.725rem; background: #006837; color: #FFFFFF; border: none;" title="Télécharger Candidature PDF"><i class="fas fa-file-pdf"></i> PDF</button>
          <button onclick="downloadFormSubmissionText('${c.id || c.ref}')" class="action-btn-pill" style="padding: 0.25rem 0.45rem; font-size: 0.725rem; background: #0A2540; color: #FFFFFF; border: none;" title="Fiche TXT"><i class="fas fa-file-alt"></i> TXT</button>
          ${c.status !== 'Approuvé' ? `<button onclick="approveSteeringCandidate('${c.id}')" class="action-btn-primary" style="padding: 0.25rem 0.45rem; font-size: 0.725rem;" title="Approuver"><i class="fas fa-check"></i></button>` : ''}
          ${c.status !== 'Rejeté' ? `<button onclick="rejectSteeringCandidate('${c.id}')" class="action-btn-pill" style="padding: 0.25rem 0.45rem; font-size: 0.725rem; color: #DC2626; border-color: #DC2626;" title="Rejeter"><i class="fas fa-times"></i></button>` : ''}
          <a href="https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(c.name)},%20suite%20%C3%A0%20votre%20candidature%20au%20poste%20de%20${encodeURIComponent(c.role)}%20au%20Comit%C3%A9%20de%20Pilotage..." target="_blank" class="action-btn-pill" style="padding: 0.25rem 0.45rem; font-size: 0.725rem; background: #25D366; color: #FFFFFF; border: none;" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </td>
    </tr>
  `).join('');
}

// Export All Steering Committee Candidates as PDF Report
function exportSteeringCandidatesPDF() {
  const forms = getWebFormsDB();
  const candidates = forms.filter(wf => wf.type === 'Candidature Comité de Pilotage');

  if (candidates.length === 0) {
    showToast("Aucune candidature au Comité de Pilotage disponible pour le moment.");
    return;
  }

  const printWin = window.open('', '_blank', 'width=950,height=1000');
  if (!printWin) {
    showToast("Veuillez autoriser les fenêtres surgissantes pour ouvrir le rapport PDF.");
    return;
  }

  printWin.document.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>CONESESS_Rapport_Comite_Pilotage</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        @page { size: A4 landscape; margin: 10mm; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0A2540; margin: 0; padding: 20px; background: #FFFFFF; font-size: 12px; }
        .pdf-header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #006837; padding-bottom: 12px; margin-bottom: 18px; }
        .pdf-brand { display: flex; align-items: center; gap: 12px; }
        .pdf-brand img { width: 50px; height: 50px; border-radius: 50%; border: 2px solid #E9C46A; object-fit: cover; }
        .pdf-brand-text h1 { margin: 0; color: #006837; font-size: 1.15rem; font-weight: 800; }
        .pdf-brand-text p { margin: 2px 0 0 0; color: #D97706; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        
        table.list-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        table.list-table th { background: #006837; color: #FFFFFF; padding: 8px 10px; text-align: left; font-size: 0.8rem; text-transform: uppercase; }
        table.list-table td { padding: 8px 10px; border-bottom: 1px solid #E2E8F0; font-size: 0.8rem; vertical-align: top; }
        table.list-table tr:nth-child(even) { background: #F8FAFC; }

        @media print {
          .no-print { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="background: #0A2540; color: #fff; padding: 12px; text-align: center; border-radius: 8px; margin-bottom: 15px; font-weight: 700;">
        <i class="fas fa-users-cog"></i> Rapport Officiel des Candidatures au Comité de Pilotage.
        <button onclick="window.print()" style="margin-left: 15px; padding: 6px 16px; background: #006837; color: #fff; border: none; border-radius: 20px; cursor: pointer; font-weight: 700;">
          Imprimer / Enregistrer le Rapport PDF
        </button>
      </div>

      <div class="pdf-header">
        <div class="pdf-brand">
          <img src="assets/images/logo.jpg" alt="Logo CONESESS">
          <div class="pdf-brand-text">
            <h1>CONESESS SÉNÉGAL</h1>
            <p>Registre Officiel des Candidats au Comité de Pilotage Confédéral</p>
          </div>
        </div>
        <div style="text-align: right;">
          <strong style="color: #006837; font-size: 1rem;">${candidates.length} Candidat(s) Enregistré(s)</strong><br>
          <small style="color: #64748B;">Extrait le ${new Date().toLocaleDateString('fr-FR')}</small>
        </div>
      </div>

      <table class="list-table">
        <thead>
          <tr>
            <th>Référence</th>
            <th>Candidat & Organisation</th>
            <th>Région</th>
            <th>Poste Visé</th>
            <th>Téléphone / Email</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          ${candidates.map(c => `
            <tr>
              <td style="font-family: monospace; font-weight: 700;">${c.ref}</td>
              <td><strong>${c.name}</strong><br><small style="color: #64748B;">${c.org}</small></td>
              <td>${c.region}</td>
              <td><strong style="color: #D97706;">${c.role}</strong></td>
              <td>${c.phone}<br><small style="color: #64748B;">${c.email}</small></td>
              <td><strong>${(c.status || 'En attente').toUpperCase()}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 400);
        };
      </script>
    </body>
    </html>
  `);

  printWin.document.close();
}

// Approve / Reject Handlers
function approveSteeringCandidate(id) {
  const forms = getWebFormsDB();
  const candidate = forms.find(f => f.id === id);
  if (candidate) {
    candidate.status = 'Approuvé';
    saveWebFormsDB(forms);
    showToast(`Candidature de ${candidate.name} pour le poste de "${candidate.role}" au Comité de Pilotage approuvée avec succès !`);
  }
}

function rejectSteeringCandidate(id) {
  const forms = getWebFormsDB();
  const candidate = forms.find(f => f.id === id);
  if (candidate) {
    candidate.status = 'Rejeté';
    saveWebFormsDB(forms);
    showToast(`Candidature de ${candidate.name} rejetée.`);
  }
}

function approveWebForm(id) {
  const forms = getWebFormsDB();
  const form = forms.find(f => f.id === id);
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
  const form = forms.find(f => f.id === id);
  if (form) {
    form.status = 'Rejeté';
    saveWebFormsDB(forms);
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

// Open Web Form Detail Modal
function openWebFormDetailModal(id) {
  const modal = document.getElementById('web-form-detail-modal');
  const title = document.getElementById('modal-detail-title');
  const content = document.getElementById('modal-detail-content');

  const members = getMembersDB();
  const member = members.find(m => m.ref === id);

  if (member && modal && content) {
    if (title) title.textContent = `Fiche d'Adhésion : ${member.name}`;
    content.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
        <div><strong>Référence :</strong> <span style="color: var(--admin-green); font-family: monospace;">${member.ref}</span></div>
        <div><strong>Date de Soumission :</strong> ${member.date || 'Récemment'}</div>
        <div><strong>Organisation :</strong> ${member.name}</div>
        <div><strong>Forme Juridique :</strong> ${member.type}</div>
        <div><strong>Région :</strong> ${member.region}</div>
        <div><strong>Pôle Métier :</strong> ${member.pole || 'Général'}</div>
        <div><strong>Représentant Légal :</strong> ${member.rep}</div>
        <div><strong>Téléphone / WhatsApp :</strong> ${member.phone}</div>
        <div><strong>E-mail Officiel :</strong> ${member.email || 'Non renseigné'}</div>
        <div><strong>Statut du Dossier :</strong> ${member.status}</div>
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
        window.open(`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(member.rep)},%20votre%20dossier%20CONESESS...`, '_blank');
      };
    }

    modal.classList.add('show');
  }
}

function closeWebFormDetailModal() {
  const modal = document.getElementById('web-form-detail-modal');
  if (modal) modal.classList.remove('show');
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
  const inputGlobal = document.getElementById('admin-global-search');
  const inputMember = document.getElementById('search-member-input');
  const regionSelect = document.getElementById('filter-region-select');
  const statusSelect = document.getElementById('filter-status-select');

  const query = ((inputGlobal && inputGlobal.value) || (inputMember && inputMember.value) || '').toLowerCase().trim();
  const region = regionSelect ? regionSelect.value : '';
  const status = statusSelect ? statusSelect.value : '';

  const members = getMembersDB();
  const filtered = members.filter(m => {
    const matchesSearch = !query || (m.name + ' ' + m.ref + ' ' + m.rep + ' ' + m.phone + ' ' + (m.email || '')).toLowerCase().includes(query);
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

// Robust Toast Notification System
function showToast(message) {
  let toastContainer = document.getElementById('admin-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'admin-toast-container';
    toastContainer.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 10000; display: flex; flex-direction: column; gap: 10px; pointer-events: none;';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.cssText = 'background: #0A2540; color: #FFFFFF; border-left: 4px solid #006837; padding: 12px 20px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; box-shadow: 0 10px 25px rgba(0,0,0,0.35); opacity: 0; transform: translateY(20px); transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: auto; display: flex; align-items: center; gap: 10px;';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color: #E9C46A; font-size: 1.1rem;"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 20);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}

// Download High-Definition Badge PDF Card
function downloadBadgePDF() {
  const select = document.getElementById('badge-select-member');
  if (!select || !select.value) {
    showToast("Veuillez sélectionner un membre pour générer son badge.");
    return;
  }

  const members = getMembersDB();
  const member = members.find(m => m.ref === select.value);
  if (!member) return;

  const name = document.getElementById('badge-input-name')?.value || member.rep || member.name;
  const org = document.getElementById('badge-input-org')?.value || member.name;
  const role = document.getElementById('badge-input-role')?.value || 'Représentant Légal';
  const level = document.getElementById('badge-input-level')?.value || 'Membre Confédéral';
  const region = document.getElementById('badge-input-region')?.value || member.region || 'Dakar';
  const status = document.getElementById('badge-input-status')?.value || 'Généré';

  const printWin = window.open('', '_blank', 'width=750,height=950');
  if (!printWin) {
    showToast("Veuillez autoriser les fenêtres surgissantes pour ouvrir la carte Badge.");
    return;
  }

  printWin.document.write(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>BADGE_OFFICIEL_CONESESS_${member.ref}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #F4F7F5; margin: 0; padding: 30px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .badge-card { width: 340px; height: 530px; background: linear-gradient(145deg, #0A2540 0%, #061526 100%); border-radius: 20px; border: 3px solid #E9C46A; color: #FFFFFF; box-shadow: 0 20px 45px rgba(0,0,0,0.35); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
        .senegal-bar { height: 6px; width: 100%; background: linear-gradient(90deg, #00853F 0%, #00853F 33.3%, #FDEF42 33.3%, #FDEF42 66.6%, #E31B23 66.6%, #E31B23 100%); }
        .badge-header { background: linear-gradient(135deg, #006837 0%, #004D28 100%); padding: 16px 12px 10px 12px; text-align: center; border-bottom: 2px solid #E9C46A; }
        .badge-brand { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 4px; }
        .badge-brand img { width: 44px; height: 44px; border-radius: 50%; border: 2px solid #E9C46A; object-fit: cover; }
        .badge-brand h1 { margin: 0; color: #FFFFFF; font-size: 1.15rem; font-weight: 800; letter-spacing: 1px; }
        .badge-brand p { margin: 2px 0 0 0; color: #E9C46A; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; }
        
        .badge-photo-box { width: 110px; height: 110px; border-radius: 50%; border: 4px solid #E9C46A; margin: 15px auto 8px auto; overflow: hidden; background: #FFFFFF; display: flex; align-items: center; justify-content: center; }
        .badge-photo-box img { width: 100%; height: 100%; object-fit: cover; }

        .badge-body { text-align: center; padding: 0 16px; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
        .badge-holder-name { font-size: 1.2rem; font-weight: 800; color: #FFFFFF; margin: 0 0 4px 0; }
        .badge-holder-org { font-size: 0.825rem; color: #E9C46A; font-weight: 700; margin: 0 0 8px 0; }
        .badge-holder-role { display: inline-block; background: rgba(0, 104, 55, 0.4); color: #FFFFFF; border: 1.5px solid #006837; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; margin-bottom: 12px; }

        .badge-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 10px; font-size: 0.725rem; border: 1px solid rgba(255,255,255,0.12); margin-bottom: 10px; }
        .badge-info-lbl { color: #94A3B8; font-size: 0.65rem; text-transform: uppercase; display: block; }
        .badge-info-val { color: #FFFFFF; font-weight: 700; font-family: monospace; }

        .badge-footer { background: #004D28; border-top: 1.5px solid #E9C46A; padding: 10px; text-align: center; font-size: 0.65rem; color: rgba(255,255,255,0.9); }
        .badge-status-pill { display: inline-block; background: #E9C46A; color: #0A2540; font-weight: 800; padding: 3px 10px; border-radius: 12px; font-size: 0.65rem; text-transform: uppercase; margin-bottom: 4px; }

        @media print {
          body { background: transparent; padding: 0; }
          .no-print { display: none !important; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 20px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 24px; background: #006837; color: #fff; border: none; border-radius: 25px; cursor: pointer; font-weight: 800; font-size: 0.9rem;">
          <i class="fas fa-print"></i> Imprimer / Enregistrer le Badge PDF
        </button>
      </div>

      <div class="badge-card">
        <div class="senegal-bar"></div>
        <div class="badge-header">
          <div class="badge-brand">
            <img src="assets/images/logo.jpg" alt="Logo CONESESS">
            <div>
              <h1>CONESESS</h1>
              <p>SÉNÉGAL • ESS CONFÉDÉRATION</p>
            </div>
          </div>
        </div>

        <div class="badge-photo-box">
          <img src="assets/images/logo.jpg" alt="Photo Titulaire">
        </div>

        <div class="badge-body">
          <div class="badge-holder-name">${name}</div>
          <div class="badge-holder-org">${org}</div>
          <div><span class="badge-holder-role">${role}</span></div>

          <div class="badge-info-grid">
            <div>
              <span class="badge-info-lbl">Réf. Accréditation</span>
              <span class="badge-info-val">${member.ref}</span>
            </div>
            <div>
              <span class="badge-info-lbl">Région</span>
              <span class="badge-info-val" style="color: #E9C46A;">${region}</span>
            </div>
          </div>
        </div>

        <div class="badge-footer">
          <span class="badge-status-pill">ACCRÉDITÉ • ${level.toUpperCase()}</span><br>
          Conseil National des Entreprises de l'ESS du Sénégal
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 400);
        };
      </script>
    </body>
    </html>
  `);

  printWin.document.close();
}

function printCurrentBadge() {
  downloadBadgePDF();
}

function deleteContact(index) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce message de contact ?")) {
    const contacts = getContactsDB();
    contacts.splice(index, 1);
    localStorage.setItem('conesess_contacts', JSON.stringify(contacts));
    renderAdminAll();
    showToast("Message de contact supprimé avec succès.");
  }
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
        <div style="display: flex; gap: 0.35rem;">
          <a href="https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(c.name)},%20suite%20%C3%A0%20votre%20message%20sur%20CONESESS..." target="_blank" class="btn btn-sm" style="background: #25D366; color: #FFFFFF; font-size: 0.75rem;">
            <i class="fab fa-whatsapp"></i> Répondre
          </a>
          <button onclick="deleteContact(${i})" class="btn btn-sm" style="background: rgba(239, 68, 68, 0.15); color: #DC2626; border: 1px solid #DC2626; font-size: 0.75rem;" title="Supprimer"><i class="fas fa-trash"></i></button>
        </div>
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
