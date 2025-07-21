// Fonctions pour la navigation
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

function showPage(pageId) {
  // Cacher toutes les pages
  document.querySelectorAll('#main-content > div').forEach(page => {
    page.style.display = 'none';
  });
  
  // Afficher la page demandée
  document.getElementById(`${pageId}-page`).style.display = 'block';
  
  // Fermer la sidebar sur mobile
  if (window.innerWidth < 768) {
    toggleSidebar();
  }
  
  // Si on affiche la page profil, initialiser la section
  if (pageId === 'profile') {
    showProfileSection('general');
  }
  
  // Mettre à jour le badge de notification si nécessaire
  if (pageId === 'notifications') {
    updateNotificationBadge();
  }
}

// Fonction pour télécharger le CV
function downloadCV() {
  // Créer un lien de téléchargement
  const link = document.createElement('a');
  link.href = 'cvoumaroudaoudasouleymane.pdf';
  link.download = 'cvoumaroudaoudasouleymane.pdf';
  
  // Simuler un clic sur le lien
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Afficher un message de confirmation
  alert('Le téléchargement de votre CV a commencé.');
}

// Fonctions pour la navigation dans le profil
const profileSections = {
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

  general: `
    <div class="profile-header">
      <h1>Informations Personnelles</h1>
      <p>Mettez à jour vos données personnelles</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-user"></i>
        <h2>Informations Personnelles</h2>
      </div>
      <div class="grid">
        <div><label>Prénom *</label><input type="text" value="Oumaroudaoudasouleymane" disabled /></div>
        <div><label>Deuxième prénom</label><input type="text" value="" disabled /></div>
        <div><label>Nom *</label><input type="text" value="Oumaroudaoudasouleymane" disabled /></div>
        <div><label>Date de naissance *</label><input type="date" value="1995-05-12" disabled /></div>
        <div><label>Langue maternelle *</label><input type="text" value="Français" disabled /></div>
        <div><label>Pays de citoyenneté *</label><select disabled><option selected>Niger</option></select></div>
        <div><label>Numéro de passeport *</label><input type="text" value="13pc50948" disabled /></div>
        <div><label>Date d'expiration du passeport</label><input type="date" value="2030-06-01" disabled /></div>
      </div>
      <div class="grid" style="margin-top: 1rem;">
        <div>
          <label>État civil *</label>
          <div class="radio-group">
            <label><input type="radio" checked disabled /> Célibataire</label>
            <label><input type="radio" disabled /> Marié(e)</label>
          </div>
        </div>
        <div>
          <label>Genre *</label>
          <div class="radio-group">
            <label><input type="radio" checked disabled /> Masculin</label>
            <label><input type="radio" disabled /> Féminin</label>
          </div>
        </div>
      </div>
      <div class="clearfix"><button class="save-btn">Enregistrer & Continuer</button></div>
    </div>

    <div class="card">
      <div class="section-title">
        <i class="fas fa-home"></i>
        <h2>Adresse</h2>
      </div>
      <div class="grid">
        <div><label>Adresse *</label><input type="text" value="Boukoki4" disabled /></div>
        <div><label>Ville *</label><input type="text" value="Niamey" disabled /></div>
        <div><label>Pays *</label><select disabled><option selected>Niger</option></select></div>
        <div><label>Région/État *</label><select disabled><option selected>Tillabéri Region</option></select></div>
        <div><label>Code postal</label><input type="text" value="8002" disabled /></div>
        <div><label>Email</label><input type="email" value="oumaroudaoudasouleymane@yahoo.com" disabled /></div>
        <div><label>Téléphone *</label><input type="text" value="+227 92 11 11 78" disabled /></div>
      </div>
      <div class="clearfix"><button class="save-btn">Enregistrer & Continuer</button></div>
    </div>
  `,
  
  education: `
    <div class="profile-header">
      <h1>Parcours Académique</h1>
      <p>Votre historique éducatif</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-graduation-cap"></i>
        <h2>Résumé Éducatif</h2>
      </div>
      <div id="eduSummary">
        <div class="grid">
          <div>
            <label>Pays d'éducation *</label>
            <select><option selected>Niger</option></select>
          </div>
          <div>
            <label>Niveau d'éducation le plus élevé *</label>
            <select><option selected>Licence (3 ans)</option></select>
          </div>
          <div>
            <label>Système de notation *</label>
            <select><option selected>Échelle: 0-20</option></select>
          </div>
          <div>
            <label>Moyenne générale *</label>
            <input type="text" value="16" />
          </div>
        </div>
        <div style="margin-top: 1rem;">
          <label>J'ai obtenu mon diplôme de cet établissement *</label>
          <div class="radio-group">
            <label><input type="radio" checked name="graduated" /> Oui</label>
            <label><input type="radio" name="graduated" /> Non</label>
          </div>
        </div>
        <div class="clearfix"><button class="save-btn">Enregistrer & Continuer</button></div>
      </div>
    </div>

    <div class="card">
      <div class="section-title">
        <i class="fas fa-school"></i>
        <h2>Établissements Scolaires</h2>
      </div>
      <div style="border-top: 1px solid #eee; margin-top: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem; background: #f8f9fa; border-radius: 8px; cursor: pointer;" onclick="toggleSection('school1')">
          <div>
            <i class="fas fa-university" style="color: #0d6efd; margin-right: 10px;"></i>
            LICENCE (3 ANS)
          </div>
          <i id="icon-school1" class="fas fa-chevron-down"></i>
        </div>
        <div id="school1" style="display: none; padding: 1rem; background: #f8f9fa; border-radius: 0 0 8px 8px;">
          <p style="margin: 0;">Détails sur la licence...</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem; margin-top: 0.5rem; background: #f8f9fa; border-radius: 8px; cursor: pointer;" onclick="toggleSection('school2')">
          <div>
            <i class="fas fa-school" style="color: #0d6efd; margin-right: 10px;"></i>
            LYCÉE
          </div>
          <i id="icon-school2" class="fas fa-chevron-down"></i>
        </div>
        <div id="school2" style="display: none; padding: 1rem; background: #f8f9fa; border-radius: 0 0 8px 8px;">
          <p style="margin: 0;">Détails sur le lycée...</p>
        </div>
      </div>
      <button style="background: none; border: none; color: #0d6efd; cursor: pointer; padding: 0; font-weight: bold; margin-top: 1rem; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-plus-circle"></i> Ajouter un établissement scolaire
      </button>
      <div class="clearfix"><button class="save-btn">Continuer</button></div>
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

    <div class="card">
      <div class="section-title">
        <i class="fas fa-chart-line"></i>
        <h2>Scores GRE ou GMAT</h2>
      </div>
      <div id="testGreGmat">
        <div class="radio-group" style="margin: 1rem 0; gap: 1.5rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" /> J'ai des scores GMAT
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" checked /> J'ai des scores GRE
          </label>
        </div>
        <div class="grid">
          <div><label>Score Verbal *</label><input type="text" value="110" /></div>
          <div><label>Rang Verbal *</label><input type="text" value="100" /></div>
          <div><label>Score Quantitatif *</label><input type="text" value="110" /></div>
          <div><label>Rang Quantitatif *</label><input type="text" value="100" /></div>
          <div><label>Score AWA *</label><input type="text" value="4.0" /></div>
          <div><label>Rang AWA *</label><input type="text" value="8" /></div>
          <div><label>Date de l'examen *</label><input type="date" /></div>
        </div>
        <div class="clearfix"><button class="save-btn">Enregistrer & Continuer</button></div>
      </div>
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
        <div class="document-status">
          <div>
            <i class="fas fa-file-pdf document-status-icon" style="color: #e74c3c;"></i>
            Preuves financières
          </div>
          <span class="status-pending">
            <i class="fas fa-exclamation-circle"></i> En attente
            <button class="app-btn btn-upload" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-left: 10px;">
              <i class="fas fa-upload"></i> Téléverser
            </button>
          </span>
        </div>
        <div class="document-status">
          <div>
            <i class="fas fa-file-pdf document-status-icon" style="color: #e74c3c;"></i>
            Lettre d'acceptation
          </div>
          <span class="status-pending">
            <i class="fas fa-exclamation-circle"></i> En attente
            <button class="app-btn btn-upload" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-left: 10px;">
              <i class="fas fa-upload"></i> Téléverser
            </button>
          </span>
        </div>
        <div class="document-status">
          <div>
            <i class="fas fa-file-image document-status-icon" style="color: #3498db;"></i>
            Photos d'identité
          </div>
          <span class="status-uploaded">
            <i class="fas fa-check-circle"></i> Téléchargé
            <button class="app-btn btn-download" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-left: 10px;">
              <i class="fas fa-download"></i> Télécharger
            </button>
          </span>
        </div>
      </div>
      <div style="margin-top: 1.5rem; text-align: center;">
        <button class="upload-btn" onclick="uploadDocuments()">
          <i class="fas fa-upload"></i> Télécharger des documents
        </button>
      </div>
    </div>
    
    <div class="card">
      <div class="section-title">
        <i class="fas fa-file-archive"></i>
        <h2>Documents Supplémentaires</h2>
      </div>
      <p>Vous pouvez télécharger ici d'autres documents qui pourraient être utiles pour vos candidatures :</p>
      
      <div style="margin-top: 1.5rem; text-align: center;">
        <button class="upload-btn">
          <i class="fas fa-plus-circle"></i> Ajouter un document
        </button>
      </div>
    </div>
  `
};

function showProfileSection(section) {
  // Mettre à jour le contenu
  document.getElementById('profile-content').innerHTML = profileSections[section];
  
  // Mettre à jour les icônes dans le menu
  const sections = ['general', 'education', 'documents', 'tests', 'visa'];
  sections.forEach(sec => {
    const menuItem = document.getElementById(`menu-${sec}`);
    if (menuItem) {
      // Supprimer la classe active de tous
      menuItem.classList.remove('active');
      
      // Mettre à jour l'icône
      const icon = menuItem.querySelector('.menu-icon');
      if (icon) {
        if (sec === section) {
          // Icône pour la section active
          icon.classList.remove('fa-arrow-circle-right');
          icon.classList.add('fa-check-circle');
          menuItem.classList.add('active');
        } else {
          // Icône par défaut pour les autres sections
          icon.classList.remove('fa-check-circle');
          icon.classList.add('fa-arrow-circle-right');
        }
      }
    }
  });
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
  // Afficher la page d'accueil par défaut
  showPage('home');
  
  // Initialiser le badge de notification
  updateNotificationBadge();
});
