/* ==========================================================================
   CONESESS - CENTRALIZED ADMIN PLATFORM & FORM PROCESSING ENGINE
   ========================================================================== */

const INITIAL_ADMIN_USERS = [
  {
    name: 'Madior',
    email: 'madior1991@gmail.com',
    password: 'admin',
    org: 'Présidence & Secrétariat Général Confédéral',
    phone: '+221 77 538 66 27',
    role: 'Super Administrateur Confédéral',
    status: 'Approuvé',
    isSuperAdmin: true,
    date: '2026-08-01'
  },
  {
    name: 'Secrétariat Général CONESESS',
    email: 'admin@conesess.sn',
    password: 'admin',
    org: 'Secrétariat Général Confédéral',
    phone: '+221 77 538 66 27',
    role: 'Administrateur Général',
    status: 'Approuvé',
    isSuperAdmin: true,
    date: '2026-08-01'
  }
];

let currentModalSubmissionId = null;

// Initialize Database and sync on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initAdminData();
  renderAdminAll();

  // Listen for storage events across windows/tabs
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('conesess_')) {
      renderAdminAll();
    }
  });

  // Realtime 3-second polling for instant inter-device cloud sync (Mobile & Web)
  setInterval(() => {
    if (typeof fetchCloudDataToLocal === 'function') {
      fetchCloudDataToLocal();
    }
    renderAdminAll();
  }, 3000);
});

function initAdminData() {
  if (!localStorage.getItem('conesess_web_forms')) {
    localStorage.setItem('conesess_web_forms', JSON.stringify([]));
  }
  if (!localStorage.getItem('conesess_members')) {
    localStorage.setItem('conesess_members', JSON.stringify([]));
  }
  if (!localStorage.getItem('conesess_admin_users')) {
    localStorage.setItem('conesess_admin_users', JSON.stringify(INITIAL_ADMIN_USERS));
  }
  localStorage.setItem('conesess_admin_auth', 'true');
}

function confirmResetDatabase() {
  if (confirm("⚠️ Confirmez-vous la réinitialisation complète de la mémoire de l'Espace Admin ?\n\nCette action effacera le cache et remettra la plateforme à neuf pour recevoir les vraies données.")) {
    localStorage.setItem('conesess_web_forms', JSON.stringify([]));
    localStorage.setItem('conesess_members', JSON.stringify([]));
    localStorage.setItem('conesess_contacts', JSON.stringify([]));
    localStorage.setItem('conesess_notifications', JSON.stringify([]));
    localStorage.setItem('conesess_admin_users', JSON.stringify(INITIAL_ADMIN_USERS));
    
    renderAdminAll();
    showToast("Mémoire administrateur réinitialisée avec succès !");
  }
}

function getWebFormsDB() {
  return JSON.parse(localStorage.getItem('conesess_web_forms')) || [];
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

function getAdminUsersDB() {
  return JSON.parse(localStorage.getItem('conesess_admin_users')) || INITIAL_ADMIN_USERS;
}

function saveAdminUsersDB(data) {
  localStorage.setItem('conesess_admin_users', JSON.stringify(data));
  renderAdminAll();
}

// Main Render Function for all Tabs & Stats
function renderAdminAll() {
  const webForms = getWebFormsDB();
  const members = getMembersDB();
  const admins = getAdminUsersDB();

  // Update Metrics Cards
  const totalSubmissionsEl = document.getElementById('stat-total-submissions');
  const confirmedMembersEl = document.getElementById('stat-confirmed-members');
  const steeringCountEl = document.getElementById('stat-steering-count');
  const regionsCountEl = document.getElementById('stat-regions-count');

  if (totalSubmissionsEl) totalSubmissionsEl.textContent = webForms.length;
  if (confirmedMembersEl) confirmedMembersEl.textContent = members.length;
  
  const steeringCandidates = webForms.filter(w => w.type && w.type.includes('Candidature'));
  if (steeringCountEl) steeringCountEl.textContent = steeringCandidates.length;

  const uniqueRegions = new Set([...webForms.map(w => w.region), ...members.map(m => m.region)].filter(Boolean));
  if (regionsCountEl) regionsCountEl.textContent = `${uniqueRegions.size} / 14`;

  renderDashboardRecentSubmissions(webForms);
  renderAllWebFormsTable(webForms);
  renderAdhesionsTable(members);
  renderSteeringTable(steeringCandidates);
  renderEnterpriseAnnuaire(members);
  renderAdminsList(admins);
  populateBadgeMemberSelect(members, webForms);
}

// Render Action Buttons HTML Helper
function renderRowActionButtons(id) {
  return `
    <div class="btn-group-actions">
      <button onclick="openWebFormDetailModal('${id}')" class="btn-act btn-act-view" title="Visualiser l'Aperçu"><i class="fas fa-eye"></i> Aperçu</button>
      <button onclick="approveWebForm('${id}')" class="btn-act btn-act-approve" title="Accepter et Valider"><i class="fas fa-check"></i> Accepter</button>
      <button onclick="rejectWebForm('${id}')" class="btn-act btn-act-reject" title="Rejeter la Demande"><i class="fas fa-times"></i> Rejeter</button>
      <button onclick="sendFormEmail('${id}')" class="btn-act btn-act-email" title="Envoyer un E-mail"><i class="fas fa-envelope"></i> Mail</button>
      <button onclick="sendFormWhatsApp('${id}')" class="btn-act btn-act-wa" title="Envoyer sur WhatsApp"><i class="fab fa-whatsapp"></i> WhatsApp</button>
      <button onclick="downloadFormSubmissionPDF('${id}')" class="btn-act btn-act-pdf" title="Télécharger Fiche PDF"><i class="fas fa-file-pdf"></i> PDF</button>
      <button onclick="deleteWebForm('${id}')" class="btn-act btn-act-delete" title="Supprimer Définitivement"><i class="fas fa-trash-alt"></i> Supprimer</button>
    </div>
  `;
}

// Render Recent Submissions on Dashboard
function renderDashboardRecentSubmissions(webForms) {
  const tbody = document.getElementById('tbody-dashboard-recent');
  if (!tbody) return;

  if (!webForms.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Aucune nouvelle soumission enregistrée depuis le site web.</td></tr>`;
    return;
  }

  tbody.innerHTML = webForms.slice(0, 8).map(wf => `
    <tr>
      <td>
        <strong style="color: var(--admin-green); display: block;">${wf.ref || wf.id}</strong>
        <small style="color: var(--admin-text-muted);">${wf.date || 'Aujourd\'hui'}</small>
      </td>
      <td><span class="badge ${wf.type && wf.type.includes('Candidature') ? 'badge-gold' : 'badge-green'}">${wf.type || 'Adhésion Web'}</span></td>
      <td><strong>${wf.name}</strong><br><small style="color: var(--admin-text-muted);">${wf.org || 'Entreprise ESS'}</small></td>
      <td>${wf.phone}<br><small style="color: var(--admin-text-muted);">${wf.email || ''}</small></td>
      <td><span class="badge ${wf.status === 'Approuvé' ? 'badge-green' : (wf.status === 'Rejeté' ? 'badge-red' : 'badge-gold')}">${wf.status || 'En attente'}</span></td>
      <td>${renderRowActionButtons(wf.ref || wf.id)}</td>
    </tr>
  `).join('');
}

// Render All Web Forms Table
function renderAllWebFormsTable(webForms) {
  const tbody = document.getElementById('tbody-web-forms-all');
  if (!tbody) return;

  if (!webForms.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Aucun formulaire transmis.</td></tr>`;
    return;
  }

  tbody.innerHTML = webForms.map(wf => `
    <tr>
      <td><strong>${wf.ref || wf.id}</strong></td>
      <td>${wf.date || 'Récemment'}</td>
      <td><span class="badge badge-navy">${wf.type || 'Adhésion Membre'}</span></td>
      <td><strong>${wf.name}</strong> (${wf.org || 'Structure ESS'})</td>
      <td>${wf.phone}<br><small style="color: var(--admin-text-muted);">${wf.email || ''}</small></td>
      <td><span class="badge ${wf.status === 'Approuvé' ? 'badge-green' : (wf.status === 'Rejeté' ? 'badge-red' : 'badge-gold')}">${wf.status || 'En attente'}</span></td>
      <td>${renderRowActionButtons(wf.ref || wf.id)}</td>
    </tr>
  `).join('');
}

// Action 1: Approve Web Form Submission
function approveWebForm(id) {
  let webForms = getWebFormsDB();
  const index = webForms.findIndex(w => w.id === id || w.ref === id);
  if (index !== -1) {
    const item = webForms[index];
    item.status = 'Approuvé';

    let members = getMembersDB();
    if (!members.some(m => m.ref === item.ref)) {
      members.push({
        ref: item.ref || item.id,
        name: item.org || item.name,
        type: item.legalForm || 'Coopérative ESS',
        region: item.region || 'Dakar',
        contactPerson: item.name,
        phone: item.phone,
        email: item.email || '',
        badgeStatus: 'Généré',
        badgeRole: item.badgeRole || 'Membre Titulaire',
        date: new Date().toISOString().slice(0, 10)
      });
      saveMembersDB(members);
    }

    saveWebFormsDB(webForms);
    showToast(`✅ Dossier ${item.name} accepté et transféré au Registre Officiel !`);
    if (document.getElementById('web-form-detail-modal').style.display === 'flex') {
      closeWebFormDetailModal();
    }
  }
}

// Action 2: Reject Web Form Submission
function rejectWebForm(id) {
  let webForms = getWebFormsDB();
  const index = webForms.findIndex(w => w.id === id || w.ref === id);
  if (index !== -1) {
    webForms[index].status = 'Rejeté';
    saveWebFormsDB(webForms);
    showToast(`❌ Dossier ${webForms[index].name} marqué comme rejeté.`);
    if (document.getElementById('web-form-detail-modal').style.display === 'flex') {
      closeWebFormDetailModal();
    }
  }
}

// Action 3: Delete Web Form Submission permanently
function deleteWebForm(id) {
  if (confirm("⚠️ Souhaitez-vous supprimer définitivement ce formulaire de la base de données ?")) {
    let webForms = getWebFormsDB();
    webForms = webForms.filter(w => w.id !== id && w.ref !== id);
    saveWebFormsDB(webForms);
    showToast("🗑️ Soumission supprimée de la plateforme.");
    if (document.getElementById('web-form-detail-modal').style.display === 'flex') {
      closeWebFormDetailModal();
    }
  }
}

// Action 4: Open Form Detail Modal (Aperçu)
function openWebFormDetailModal(id) {
  currentModalSubmissionId = id;
  const webForms = getWebFormsDB();
  const members = getMembersDB();
  const item = webForms.find(w => w.id === id || w.ref === id) || members.find(m => m.ref === id);

  if (!item) return;

  const modal = document.getElementById('web-form-detail-modal');
  const title = document.getElementById('modal-detail-title');
  const content = document.getElementById('modal-detail-content');

  if (title) title.textContent = `Aperçu du Dossier : ${item.name} (${item.ref || item.id})`;

  if (content) {
    content.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 1rem;">
        <div><strong>Type :</strong> ${item.type || 'Formulaire Web'}</div>
        <div><strong>Référence :</strong> <span style="font-family: monospace; color: var(--admin-green);">${item.ref || item.id}</span></div>
        <div><strong>Représentant :</strong> ${item.name}</div>
        <div><strong>Organisation :</strong> ${item.org || 'Entreprise ESS'}</div>
        <div><strong>Forme Juridique :</strong> ${item.legalForm || 'Non spécifiée'}</div>
        <div><strong>Région :</strong> ${item.region || 'Sénégal'}</div>
        <div><strong>Téléphone :</strong> ${item.phone}</div>
        <div><strong>E-mail :</strong> ${item.email || 'Non renseigné'}</div>
        <div><strong>Statut :</strong> <span class="badge badge-green">${item.status || 'En attente'}</span></div>
        <div><strong>Date :</strong> ${item.date || 'Récemment'}</div>
      </div>
      ${item.motivation ? `
        <div style="background: #FFFFFF; padding: 0.85rem; border-radius: 8px; border-left: 4px solid var(--admin-green);">
          <strong style="color: var(--admin-green); display: block; font-size: 0.8rem; text-transform: uppercase;">Note / Motivation</strong>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.85rem; line-height: 1.4;">${item.motivation}</p>
        </div>
      ` : ''}
    `;
  }

  // Bind Action Buttons in Modal
  document.getElementById('modal-btn-approve').onclick = () => approveWebForm(id);
  document.getElementById('modal-btn-reject').onclick = () => rejectWebForm(id);
  document.getElementById('modal-btn-email').onclick = () => sendFormEmail(id);
  document.getElementById('modal-btn-wa').onclick = () => sendFormWhatsApp(id);
  document.getElementById('modal-btn-pdf').onclick = () => downloadFormSubmissionPDF(id);
  document.getElementById('modal-btn-delete').onclick = () => deleteWebForm(id);

  if (modal) modal.style.display = 'flex';
}

function closeWebFormDetailModal() {
  const modal = document.getElementById('web-form-detail-modal');
  if (modal) modal.style.display = 'none';
}

// Action 5: Send Form Email
function sendFormEmail(id) {
  const webForms = getWebFormsDB();
  const members = getMembersDB();
  const item = webForms.find(w => w.id === id || w.ref === id) || members.find(m => m.ref === id);

  if (item && item.email) {
    const subject = encodeURIComponent(`CONESESS - Suivi de votre Dossier ${item.ref || item.id}`);
    const body = encodeURIComponent(`Bonjour ${item.name},\n\nNous avons bien reçu votre formulaire pour "${item.org || item.name}". Votre dossier (Réf: ${item.ref || item.id}) est en cours de traitement par le Secrétariat Général Confédéral.\n\nCordialement,\nLe CONESESS Sénégal`);
    window.location.href = `mailto:${item.email}?subject=${subject}&body=${body}`;
  } else {
    showToast("Adresse e-mail non disponible pour ce dossier.");
  }
}

// Action 6: Send Form WhatsApp
function sendFormWhatsApp(id) {
  const webForms = getWebFormsDB();
  const members = getMembersDB();
  const item = webForms.find(w => w.id === id || w.ref === id) || members.find(m => m.ref === id);

  if (item && item.phone) {
    const phoneClean = item.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Bonjour ${item.name}, le CONESESS a bien reçu votre dossier (${item.ref || item.id}) pour "${item.org || item.name}".`);
    window.open(`https://wa.me/${phoneClean}?text=${message}`, '_blank');
  } else {
    showToast("Numéro de téléphone non disponible.");
  }
}

// Action 7: Download Printable Form Submission PDF
function downloadFormSubmissionPDF(id) {
  const targetId = id || currentModalSubmissionId;
  const webForms = getWebFormsDB();
  const members = getMembersDB();
  const item = webForms.find(w => w.id === targetId || w.ref === targetId) || members.find(m => m.ref === targetId);

  if (!item) {
    showToast("Veuillez choisir une fiche valide.");
    return;
  }

  const printWin = window.open('', '_blank', 'width=800,height=900');
  printWin.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fiche Officielle - ${item.ref || item.id}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 2rem; color: #0F172A; }
        .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #006837; padding-bottom: 1rem; margin-bottom: 2rem; }
        .title { color: #006837; margin: 0; font-size: 1.5rem; }
        .box { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 1.25rem; border-radius: 10px; margin-bottom: 1.5rem; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .footer { margin-top: 3rem; text-align: center; font-size: 0.8rem; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 1rem; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1 class="title">CONESESS SÉNÉGAL</h1>
          <p style="margin:0; font-weight:bold;">Fiche Officielle de Soumission Web</p>
        </div>
        <div style="text-align:right;">
          <strong style="color:#006837;">Réf: ${item.ref || item.id}</strong><br>
          <small>Date: ${item.date || new Date().toISOString().slice(0,10)}</small>
        </div>
      </div>

      <div class="box">
        <h3>Informations du Demandeur</h3>
        <div class="grid">
          <p><strong>Nom & Prénom :</strong> ${item.name}</p>
          <p><strong>Organisation :</strong> ${item.org || 'Entreprise ESS'}</p>
          <p><strong>Type Formulaire :</strong> ${item.type || 'Adhésion Web'}</p>
          <p><strong>Forme Juridique :</strong> ${item.legalForm || 'N/A'}</p>
          <p><strong>Région :</strong> ${item.region || 'Sénégal'}</p>
          <p><strong>Téléphone :</strong> ${item.phone}</p>
          <p><strong>E-mail :</strong> ${item.email || 'Non spécifié'}</p>
          <p><strong>Statut Dossier :</strong> ${item.status || 'En attente'}</p>
        </div>
      </div>

      ${item.motivation ? `
        <div class="box">
          <h3>Note & Motivation</h3>
          <p>${item.motivation}</p>
        </div>
      ` : ''}

      <div class="footer">
        <p>CONESESS Sénégal - Conseil National des Entreprises de l'Économie Sociale et Solidaire</p>
        <p>Document généré automatiquement depuis la plateforme d'administration centrale.</p>
      </div>
      <script>window.onload = function() { window.print(); };</script>
    </body>
    </html>
  `);
  printWin.document.close();
}

// Login Modal & Admin Session Handlers
function openLoginModal() {
  const modal = document.getElementById('modal-admin-login');
  if (modal) modal.style.display = 'flex';
}

function closeLoginModal() {
  const modal = document.getElementById('modal-admin-login');
  if (modal) modal.style.display = 'none';
}

function loginAdminUser(e) {
  if (e) e.preventDefault();
  showToast("Session Madior (Super Administrateur) confirmée !");
  closeLoginModal();
}

// Render Adhesions Table
function renderAdhesionsTable(members) {
  const tbody = document.getElementById('tbody-adhesions-list');
  if (!tbody) return;

  if (!members.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Aucun membre validé.</td></tr>`;
    return;
  }

  tbody.innerHTML = members.map(m => `
    <tr>
      <td><strong style="color: var(--admin-green);">${m.ref}</strong></td>
      <td><strong>${m.name}</strong></td>
      <td>${m.type}</td>
      <td>${m.region}</td>
      <td>${m.contactPerson || m.name}</td>
      <td><span class="badge badge-green">${m.badgeRole || 'Membre Titulaire'}</span></td>
      <td>
        <button onclick="loadMemberToBadgeStudio('${m.ref}')" class="btn-act btn-act-view"><i class="fas fa-id-badge"></i> Badge CR80</button>
      </td>
    </tr>
  `).join('');
}

// Render Steering Table
function renderSteeringTable(candidates) {
  const tbody = document.getElementById('tbody-steering-list');
  if (!tbody) return;

  if (!candidates.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Aucune candidature pour le Comité de Pilotage.</td></tr>`;
    return;
  }

  tbody.innerHTML = candidates.map(c => `
    <tr>
      <td>${c.date || 'Récemment'}</td>
      <td><strong>${c.name}</strong></td>
      <td>${c.org}</td>
      <td><span class="badge badge-gold">${c.sector || 'Pôle Stratégique'}</span></td>
      <td>${c.region || 'Dakar'}</td>
      <td><span class="badge badge-green">Candidature Reçue</span></td>
      <td>${renderRowActionButtons(c.ref || c.id)}</td>
    </tr>
  `).join('');
}

function renderEnterpriseAnnuaire(members) {
  const tbody = document.getElementById('tbody-members-annuaire');
  if (!tbody) return;

  if (!members.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Annuaire vide.</td></tr>`;
    return;
  }

  tbody.innerHTML = members.map(m => `
    <tr>
      <td><strong>${m.ref}</strong></td>
      <td><strong>${m.name}</strong></td>
      <td>${m.type}</td>
      <td>${m.region}</td>
      <td>${m.phone}</td>
      <td><span class="badge badge-green">Actif</span></td>
    </tr>
  `).join('');
}

function renderAdminsList(admins) {
  const tbody = document.getElementById('tbody-admins-list');
  if (!tbody) return;

  tbody.innerHTML = admins.map(a => `
    <tr>
      <td><strong>${a.name}</strong></td>
      <td>${a.email}</td>
      <td><span style="font-family: monospace;">••••••••</span></td>
      <td>${a.org}</td>
      <td><span class="badge badge-navy">${a.role}</span></td>
      <td><span class="badge badge-green">Actif</span></td>
    </tr>
  `).join('');
}

function populateBadgeMemberSelect(members, webForms) {
  const select = document.getElementById('badge-select-member');
  if (!select) return;

  const allParticipants = [
    ...members.map(m => ({ ref: m.ref, name: m.name, org: m.type, role: m.badgeRole || 'Membre Titulaire' })),
    ...webForms.map(w => ({ ref: w.ref || w.id, name: w.name, org: w.org || 'Candidat ESS', role: 'Membre Titulaire' }))
  ];

  select.innerHTML = `<option value="">-- Choisir dans la liste des membres --</option>` + allParticipants.map(p => `
    <option value="${p.ref}">${p.name} (${p.org})</option>
  `).join('');
}

function loadMemberToBadgeStudio(ref) {
  if (!ref) return;
  const members = getMembersDB();
  const webForms = getWebFormsDB();
  const item = members.find(m => m.ref === ref) || webForms.find(w => w.id === ref || w.ref === ref);

  if (item) {
    document.getElementById('badge-input-name').value = item.name;
    document.getElementById('badge-input-org').value = item.org || item.name;
    updateBadgePreview();
    switchAdminTab('tab-badges');
  }
}

function updateBadgePreview() {
  const name = document.getElementById('badge-input-name').value || 'Nom du Titulaire';
  const org = document.getElementById('badge-input-org').value || 'Organisation / Structure';
  const accessSelect = document.getElementById('badge-input-access-level');
  const levelText = accessSelect.options[accessSelect.selectedIndex].text;
  const levelColor = accessSelect.options[accessSelect.selectedIndex].getAttribute('data-color') || '#006837';

  document.getElementById('preview-badge-name').textContent = name;
  document.getElementById('preview-badge-org').textContent = org;
  
  const levelBadge = document.getElementById('preview-badge-level');
  levelBadge.textContent = levelText;
  levelBadge.style.background = levelColor;

  const band = document.getElementById('badge-color-band');
  if (band) band.style.background = levelColor;
}

function downloadBadgePDF() {
  window.print();
}

function verifyCheckinCode() {
  const code = document.getElementById('checkin-input-code').value.trim();
  const resultBox = document.getElementById('checkin-result-box');
  if (!code || !resultBox) return;

  const members = getMembersDB();
  const webForms = getWebFormsDB();
  const item = members.find(m => m.ref === code) || webForms.find(w => w.id === code || w.ref === code);

  resultBox.style.display = 'block';
  if (item) {
    resultBox.style.background = '#F0FDF4';
    resultBox.style.border = '2px solid #006837';
    resultBox.style.color = '#006837';
    resultBox.innerHTML = `
      <i class="fas fa-check-circle" style="font-size: 2.5rem; margin-bottom: 0.5rem;"></i>
      <h3 style="margin: 0;">Badge Valide - Accès Autorisé</h3>
      <p style="margin: 0.25rem 0 0 0;"><strong>${item.name}</strong> (${item.org || item.type || 'CONESESS'})</p>
    `;
  } else {
    resultBox.style.background = '#FEF2F2';
    resultBox.style.border = '2px solid #DC2626';
    resultBox.style.color = '#DC2626';
    resultBox.innerHTML = `
      <i class="fas fa-times-circle" style="font-size: 2.5rem; margin-bottom: 0.5rem;"></i>
      <h3 style="margin: 0;">Badge Non Reconnu</h3>
      <p style="margin: 0.25rem 0 0 0;">Référence ${code} introuvable dans le registre.</p>
    `;
  }
}

function switchAdminTab(tabId) {
  document.querySelectorAll('.admin-tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.admin-nav-item').forEach(btn => btn.classList.remove('active'));

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
    'tab-admins': 'nav-item-admins',
    'tab-settings': 'nav-item-settings'
  };

  const navItem = document.getElementById(linkIdMap[tabId]);
  if (navItem) navItem.classList.add('active');

  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('admin-sidebar-overlay');
  if (sidebar) sidebar.classList.remove('active');
  if (overlay) overlay.style.display = 'none';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleAdminSidebar() {
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('admin-sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('active');
  if (overlay) overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

function setAdminTheme(theme) {
  document.body.setAttribute('data-admin-theme', theme);
}

function forceRealtimeSyncRefresh() {
  if (typeof fetchCloudDataToLocal === 'function') {
    fetchCloudDataToLocal();
  }
  renderAdminAll();
  showToast("Flux d'administration réactualisé !");
}

function exportWebFormsCSV() {
  const data = getWebFormsDB();
  let csv = "ID,Date,Type,Nom,Structure,Telephone,Email,Statut\n";
  data.forEach(d => {
    csv += `"${d.ref||d.id}","${d.date||''}","${d.type||''}","${d.name||''}","${d.org||''}","${d.phone||''}","${d.email||''}","${d.status||''}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `CONESESS_Formulaires_Web_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
}

function openAddMemberModal() {
  const modal = document.getElementById('modal-add-member');
  if (modal) modal.style.display = 'flex';
}

function closeAddMemberModal() {
  const modal = document.getElementById('modal-add-member');
  if (modal) modal.style.display = 'none';
}

function saveManualMember(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('manual-name').value.trim();
  const type = document.getElementById('manual-type').value;
  const region = document.getElementById('manual-region').value;
  const phone = document.getElementById('manual-phone').value.trim();

  if (!name || !phone) return;

  const members = getMembersDB();
  members.push({
    ref: `CONESESS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    name: name,
    type: type,
    region: region,
    phone: phone,
    badgeStatus: 'Généré',
    badgeRole: 'Membre Titulaire',
    date: new Date().toISOString().slice(0, 10)
  });

  saveMembersDB(members);
  closeAddMemberModal();
  showToast(`Membre ${name} ajouté au registre !`);
}

function openAddAdminModal() {
  const modal = document.getElementById('modal-add-admin');
  if (modal) modal.style.display = 'flex';
}

function closeAddAdminModal() {
  const modal = document.getElementById('modal-add-admin');
  if (modal) modal.style.display = 'none';
}

function saveNewAdminAccount(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('new-admin-name').value.trim();
  const email = document.getElementById('new-admin-email').value.trim().toLowerCase();
  const pass = document.getElementById('new-admin-pass').value.trim();
  const role = document.getElementById('new-admin-role').value;

  const admins = getAdminUsersDB();
  admins.push({
    name: name,
    email: email,
    password: pass,
    org: 'CONESESS Sénégal',
    role: role,
    status: 'Approuvé'
  });

  saveAdminUsersDB(admins);
  closeAddAdminModal();
  showToast(`Compte administrateur créé pour ${name} !`);
}

function renewCloudSyncEndpointKey() {
  const key = document.getElementById('setting-cloud-key').value.trim();
  localStorage.setItem('conesess_cloud_endpoint', key);
  showToast("Endpoint de synchronisation cloud mis à jour !");
}
