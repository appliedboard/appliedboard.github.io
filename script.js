// Variables globales
let isEditMode = false;
let currentSection = '';

// Fonctions pour la navigation
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

function showPage(pageId) {
  document.querySelectorAll('#main-content > div').forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(`${pageId}-page`).style.display = 'block';
  
  if (window.innerWidth < 768) {
    toggleSidebar();
  }
  
  if (pageId === 'profile') {
    showProfileSection('general');
  }
  
  if (pageId === 'notifications') {
    updateNotificationBadge();
  }
}

// Fonction pour télécharger le CV
function downloadCV() {
  const link = document.createElement('a');
  link.href = 'cv-oumaroudaoudasouleymane.pdf';
  link.download = 'cv-oumaroudaoudasouleymane.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('Le téléchargement de votre CV a commencé.');
}

// Fonctions pour le mode édition
function toggleEditMode() {
  isEditMode = !isEditMode;
  const sectionContent = document.getElementById('profile-content');
  
  if (isEditMode) {
    sectionContent.classList.add('editable-section');
    activateEditMode();
  } else {
    sectionContent.classList.remove('editable-section');
    deactivateEditMode();
  }
}

function activateEditMode() {
  const inputs = document.querySelectorAll(`#profile-content input:not([type=radio]):not([type=checkbox]), 
                                           #profile-content select, 
                                           #profile-content textarea`);
  const saveBtn = document.querySelector('#profile-content .save-btn');
  
  inputs.forEach(input => {
    input.classList.remove('disabled-field');
    input.readOnly = false;
    input.disabled = false;
  });
  
  saveBtn.classList.remove('btn-modify-disabled');
  saveBtn.classList.add('btn-modify-active');
  saveBtn.innerHTML = '<i class="fas fa-save"></i> Enregistrer';
}

function deactivateEditMode() {
  const inputs = document.querySelectorAll(`#profile-content input:not([type=radio]):not([type=checkbox]), 
                                           #profile-content select, 
                                           #profile-content textarea`);
  const saveBtn = document.querySelector('#profile-content .save-btn');
  
  inputs.forEach(input => {
    input.classList.add('disabled-field');
    input.readOnly = true;
  });
  
  saveBtn.classList.remove('btn-modify-active');
  saveBtn.classList.add('btn-modify-disabled');
  saveBtn.innerHTML = '<i class="fas fa-edit"></i> Modifier';
}

// Profil sections
const profileSections = {
  general: `
    <div class="profile-header">
      <h1>Informations Personnelles</h1>
      <p>Informations en lecture seule</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-user"></i>
        <h2>Informations Personnelles</h2>
      </div>
      <div class="grid">
        <div><label>Prénom *</label><input type="text" value="Oumaroudaoudasouleymane" class="disabled-field" readonly /></div>
        <div><label>Nom *</label><input type="text" value="Oumaroudaoudasouleymane" class="disabled-field" readonly /></div>
        <div><label>Date de naissance *</label><input type="date" value="1995-05-12" class="disabled-field" readonly /></div>
        <div><label>Langue maternelle *</label><input type="text" value="Français" class="disabled-field" readonly /></div>
      </div>
      <div class="clearfix">
        <button class="save-btn btn-modify-disabled">
          <i class="fas fa-edit"></i> Modifier
        </button>
      </div>
      <p class="not-editable-message">Cliquez sur "Modifier" pour mettre à jour vos informations</p>
    </div>
  `,
  
  education: `
    <div class="profile-header">
      <h1>Parcours Académique</h1>
      <p>Historique éducatif en lecture seule</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-graduation-cap"></i>
        <h2>Résumé Éducatif</h2>
      </div>
      <div class="grid">
        <div>
          <label>Niveau d'éducation *</label>
          <select class="disabled-field" disabled>
            <option selected>Licence (3 ans)</option>
          </select>
        </div>
        <div>
          <label>Moyenne générale *</label>
          <input type="text" value="16" class="disabled-field" readonly />
        </div>
      </div>
      <div class="clearfix">
        <button class="save-btn btn-modify-disabled">
          <i class="fas fa-edit"></i> Modifier
        </button>
      </div>
      <p class="not-editable-message">Cliquez sur "Modifier" pour mettre à jour votre parcours</p>
    </div>
  `,
  
  documents: `
    <div class="profile-header">
      <h1>Documents</h1>
      <p>Gérez vos documents requis</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-file-alt"></i>
        <h2>Documents Requis</h2>
      </div>
      <div style="margin-top: 1rem;">
        <div class="document-status">
          <div>
            <i class="fas fa-file-pdf document-status-icon" style="color: #e74c3c;"></i>
            Passeport valide
          </div>
          <span class="status-uploaded">
            <i class="fas fa-check-circle"></i> Téléchargé
            <button class="app-btn btn-download" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-left: 10px;" onclick="downloadCV()">
              <i class="fas fa-download"></i> Télécharger
            </button>
          </span>
        </div>
      </div>
    </div>
  `,
  
  visa: `
    <div class="profile-header">
      <h1>Visa & Permis d'Études</h1>
      <p>Informations sur votre statut d'immigration</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-passport"></i>
        <h2>Visa & Permis d'Études</h2>
      </div>
      <div id="visaPermit">
        <div style="margin-top: 1.5rem;">
          <label style="font-weight: bold; display: block; margin-bottom: 0.5rem;">
            Avez-vous déjà été refusé un visa pour le Canada, les États-Unis, le Royaume-Uni, la Nouvelle-Zélande, l'Australie ou l'Irlande ? *
          </label>
          <div class="radio-group" style="gap: 2rem;">
            <label><input type="radio" name="refusedVisa" /> Oui</label>
            <label><input type="radio" name="refusedVisa" checked /> Non</label>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <label style="font-weight: bold;">Quels permis d'études ou visas valides possédez-vous ?</label>
          <div class="radio-group" style="margin-top: 0.5rem; flex-wrap: wrap; gap: 1rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" /> Canada
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" /> États-Unis
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" /> Royaume-Uni
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" /> Australie
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
              <input type="checkbox" checked /> Aucun
            </label>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <label style="font-weight: bold;">
            Veuillez fournir plus d'informations sur votre permis d'études/visa actuel et tout refus antérieur, le cas échéant
          </label>
          <textarea placeholder="Décrivez votre situation..." style="width: 100%; padding: 0.8rem; height: 100px; margin-top: 0.5rem; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem;"></textarea>
        </div>
        <div class="clearfix">
          <button class="save-btn" style="background: #198754;">
            <i class="fas fa-save"></i> Enregistrer & Continuer
          </button>
        </div>
      </div>
    </div>
  `,
  
  tests: `
    <div class="profile-header">
      <h1>Résultats de Tests</h1>
      <p>Vos scores aux examens linguistiques</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-language"></i>
        <h2>Scores aux Tests d'Anglais</h2>
      </div>
      <div id="testEnglish">
        <div class="radio-group" style="flex-direction: column; align-items: flex-start; margin-top: 1rem; gap: 0.8rem;">
          <label><input type="radio" name="english" /> TOEFL</label>
          <label><input type="radio" name="english" /> IELTS</label>
          <label><input type="radio" name="english" /> PTE</label>
          <label><input type="radio" name="english" /> Duolingo</label>
          <label><input type="radio" name="english" /> Je n'ai pas de test</label>
          <label><input type="radio" name="english" checked /> Pas encore, mais je le ferai à l'avenir</label>
          <small>Si vous n'avez pas encore passé de test, AppliedBoard peut vous aider à le faire à l'avenir.</small>
        </div>
        <div class="clearfix"><button class="save-btn">Enregistrer & Continuer</button></div>
      </div>
    </div>
  `
};

function showProfileSection(section) {
  currentSection = section;
  document.getElementById('profile-content').innerHTML = profileSections[section];
  
  // Mettre à jour le menu actif
  const sections = ['general', 'education', 'documents', 'tests', 'visa'];
  sections.forEach(sec => {
    const menuItem = document.getElementById(`menu-${sec}`);
    if (menuItem) {
      menuItem.classList.remove('active');
      const icon = menuItem.querySelector('.menu-icon');
      if (icon) {
        icon.classList.remove('fa-check-circle');
        icon.classList.add('fa-arrow-circle-right');
      }
    }
  });
  
  document.getElementById(`menu-${section}`).classList.add('active');
  const activeIcon = document.querySelector(`#menu-${section} .menu-icon`);
  activeIcon.classList.remove('fa-arrow-circle-right');
  activeIcon.classList.add('fa-check-circle');
  
  // Ajouter l'événement au bouton Modifier
  const saveBtn = document.querySelector('#profile-content .save-btn');
  if (saveBtn) {
    saveBtn.onclick = toggleEditMode;
  }
}

function toggleSection(id) {
  const section = document.getElementById(id);
  const icon = document.getElementById('icon-' + id);
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  } else {
    section.style.display = "none";
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  }
}

function uploadDocuments() {
  alert("Fonctionnalité de téléchargement activée. Veuillez sélectionner les documents à télécharger.");
}

function handleCardClick(card) {
  card.style.boxShadow = '0 0 15px rgba(0, 123, 255, 0.6)';
  setTimeout(() => {
    card.style.boxShadow = '';
  }, 300);
}

// Fonctions pour les notifications
function markAsRead(button) {
  const card = button.closest('.notification-card');
  card.classList.remove('unread');
  
  // Mettre à jour le badge de notification
  updateNotificationBadge();
}

function deleteNotification(button) {
  const card = button.closest('.notification-card');
  card.style.opacity = '0';
  setTimeout(() => {
    card.remove();
    updateNotificationBadge();
  }, 300);
}

function updateNotificationBadge() {
  const unreadNotifications = document.querySelectorAll('.notification-card.unread').length;
  const badge = document.querySelector('.notification-badge');
  
  if (unreadNotifications > 0) {
    badge.textContent = unreadNotifications;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// Données des programmes
const programData = {
  "International Business": {
    description: "Le programme International Business prépare les étudiants à travailler dans un environnement commercial mondial. Les cours couvrent les opérations commerciales internationales, le marketing mondial, la finance internationale et les stratégies de gestion interculturelle.",
    requirements: [
      "Diplôme d'études secondaires ou équivalent",
      "TOEFL iBT 61 ou IELTS 5.5 (pour les non-anglophones)",
      "Relevés de notes officiels",
      "Lettre de motivation",
      "2 lettres de recommandation"
    ],
    dates: [
      "Date limite d'inscription: 15/08/2025",
      "Début des cours: 25/08/2025",
      "Date limite de paiement: 20/08/2025"
    ],
    careers: [
      "Spécialiste du commerce international",
      "Analyste de marché global",
      "Coordinateur des importations/exportations",
      "Représentant des ventes internationales"
    ]
  },
  "Logistics and Global Supply Chain Management": {
    description: "Ce programme forme les étudiants à gérer les flux de marchandises à l'échelle mondiale. Les cours couvrent la gestion des transports, l'entreposage, la gestion des stocks, les douanes et la réglementation internationale.",
    requirements: [
      "Diplôme d'études secondaires ou équivalent",
      "TOEFL iBT 61 ou IELTS 5.5 (pour les non-anglophones)",
      "Relevés de notes officiels",
      "CV/Curriculum Vitae",
      "Preuve de fonds suffisants"
    ],
    dates: [
      "Date limite d'inscription: 01/09/2025",
      "Début des cours: 10/09/2025",
      "Date limite de paiement: 05/09/2025"
    ],
    careers: [
      "Gestionnaire de la chaîne d'approvisionnement",
      "Analyste logistique",
      "Coordinateur des transports",
      "Gestionnaire des opérations d'entrepôt"
    ]
  }
};

// Fonction pour afficher les détails du programme
function showProgramDetails(programName) {
  const program = programData[programName];
  
  // Mettre à jour le titre
  document.getElementById('program-details-title').textContent = programName;
  document.getElementById('program-details-college').textContent = "Houston Community College";
  
  // Remplir les sections
  document.getElementById('program-description').innerHTML = `<p>${program.description}</p>`;
  
  let requirementsHtml = '<ul>';
  program.requirements.forEach(req => {
    requirementsHtml += `<li>${req}</li>`;
  });
  requirementsHtml += '</ul>';
  document.getElementById('program-requirements').innerHTML = requirementsHtml;
  
  let datesHtml = '<ul>';
  program.dates.forEach(date => {
    datesHtml += `<li>${date}</li>`;
  });
  datesHtml += '</ul>';
  document.getElementById('program-dates').innerHTML = datesHtml;
  
  let careersHtml = '<ul>';
  program.careers.forEach(career => {
    careersHtml += `<li>${career}</li>`;
  });
  careersHtml += '</ul>';
  document.getElementById('program-careers').innerHTML = careersHtml;
  
  // Afficher la page des détails
  showPage('program-details');
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  showPage('home');
  updateNotificationBadge();
});
