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
  // Masque toutes les pages principales
  document.querySelectorAll('#main-content > div').forEach(page => {
    page.style.display = 'none';
  });
  
  // Affiche la page demandée en ajoutant le suffixe '-page'
  const pageElement = document.getElementById(`${pageId}-page`);
  if (pageElement) {
    pageElement.style.display = 'block';
  }
  
  // Ferme le menu latéral sur les petits écrans après une sélection
  if (window.innerWidth < 768) {
    toggleSidebar();
  }
  
  // Logique spécifique pour certaines pages
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
    
    document.querySelectorAll('.education-item').forEach(item => {
      item.classList.add('editable');
    });
    
    const addButton = document.createElement('button');
    addButton.className = 'add-education-btn';
    addButton.innerHTML = '<i class="fas fa-plus"></i> Ajouter une formation';
    addButton.onclick = () => alert("Fonctionnalité d'ajout non implémentée.");
    
    const timeline = document.querySelector('.education-timeline');
    if (timeline && !document.querySelector('.add-education-btn')) {
      timeline.appendChild(addButton);
    }
  } else {
    sectionContent.classList.remove('editable-section');
    deactivateEditMode();
    
    document.querySelectorAll('.education-item').forEach(item => {
      item.classList.remove('editable');
    });
    
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

// Contenu des sections du profil
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
        <div><label>Prénom *</label><input type="text" value="Harouna" class="disabled-field" readonly /></div>
        <div><label>Nom *</label><input type="text" value="Abass Ousseini" class="disabled-field" readonly /></div>
        <div><label>Date de naissance *</label><input type="date" value="1999-09-28" class="disabled-field" readonly /></div>
	<div><label>Lieux de Naissance *</label><input type="text" value="Niamey" class="disabled-field" readonly /></div>       
        <div><label>Langue maternelle *</label><input type="text" value="Français" class="disabled-field" readonly /></div>
        <div><label>Nationalité *</label><input type="text" value="Nigerienne" class="disabled-field" readonly /></div>
        <div><label>PassePort *</label><input type="text" value="13pc48492" class="disabled-field" readonly /></div>
        <div><label>PassePort Expire Date *</label><input type="date" value="2030-05-11" class="disabled-field" readonly /></div>
        <div><label>Statut Matrimonial *</label><input type="text" value="Celibataire" class="disabled-field" readonly /></div>
        <div><label>Telephone *</label><input type="tel" value="227 90132717" class="disabled-field" readonly /></div>
        <div><label>Adresse email *</label><input type="email" value="kodahabasse@gmail.com" class="disabled-field" readonly /></div>
        <div><label>Ville *</label><input type="text" value="Niamey" class="disabled-field" readonly /></div>
        <div><label>Adress *</label><input type="text" value="DAN ZAMA" class="disabled-field" readonly /></div>
        <div><label>Code Postal *</label><input type="text" value="8000" class="disabled-field" readonly /></div>
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
      <div class="education-item" onclick="toggleEducationDetails('master')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title">1-YEAR LICENCE DEGREE</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-master"></i>
        </div>
        <div class="education-details" id="details-master" style="display: none;">
          <div class="detail-row"><label>Établissement:</label><span>ESCOM</span></div>
          <div class="detail-row"><label>Adresse:</label><span>Niamey</span></div>
          <div class="detail-row"><label>Période:</label><span>Septembre 2023 - Juin 2024</span></div>
          <div class="detail-row"><label>Moyenne:</label><span>13/20</span></div>
          <div class="detail-row"><label>Spécialisation:</label><span>COMMNICATION</span></div>
          <div class="detail-row"><label>Diplôme obtenu:</label><span>Oui</span></div>
        </div>
      </div>

       <div class="education-item" onclick="toggleEducationDetails('licence1')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title"2-YEAR BTS</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-licence1"></i>
        </div>
        <div class="education-details" id="details-licence1" style="display: none;">
          <div class="detail-row"><label>Établissement:</label><span>ONECS</span></div>
          <div class="detail-row"><label>Adresse:</label><span>Niamey</span></div>
          <div class="detail-row"><label>Période:</label><span>Septembre 2021</span></div>
          <div class="detail-row"><label>Moyenne:</label><span>11/20</span></div>
          <div class="detail-row"><label>Spécialisation:</label><span>Communication des Entreprises</span></div>
          <div class="detail-row"><label>Diplôme obtenu:</label><span>Oui</span></div>
        </div>
      </div>


      
      <div class="education-item" onclick="toggleEducationDetails('highschool')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title">GRADE 12 / HIGH SCHOOL</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-highschool"></i>
        </div>
        <div class="education-details" id="details-highschool" style="display: none;">
          <div class="detail-row"><label>Établissement:</label><span>Lycée </span></div>
          <div class="detail-row"><label>Adresse:</label><span>-, - Niamey</span></div>
          <div class="detail-row"><label>Période:</label><span>Septembre 2015 - Juillet 2018</span></div>
          <div class="detail-row"><label>Moyenne au bac:</label><span>10.56/20</span></div>
          <div class="detail-row"><label>Filière:</label><span>Littérature</span></div>
          <div class="detail-row"><label>Mention:</label><span>Passable</span></div>
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
    
    <div class="document-list-container">
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="passport" disabled checked>
          <label for="passport">Passeport valide</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Téléchargé</span>
          <button class="app-btn btn-download" onclick="downloadDocument('passport')"><i class="fas fa-download"></i> Télécharger</button>
        </div>
      </div>
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="financial" disabled checked>
          <label for="financial">Preuves financières</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Téléchargé</span>
          <button class="app-btn btn-download" onclick="downloadDocument('finance')"><i class="fas fa-download"></i> Télécharger</button>
        </div>
      </div>
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="BAC" disabled checked>
          <label for="BAC">BAC Transcript</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Téléchargé</span>
          <button class="app-btn btn-download" onclick="downloadDocument('bac')"><i class="fas fa-download"></i> Télécharger</button>
        </div>
      </div>
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="Motivation" disabled checked>
          <label for="Motivation">Lettre De Motivation</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Téléchargé</span>
          <button class="app-btn btn-download" onclick="downloadDocument('motivation')"><i class="fas fa-download"></i> Télécharger</button>
        </div>
      </div>
       <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="Etude" disabled checked>
          <label for="Etude">Projet d'étude</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Téléchargé</span>
          <button class="app-btn btn-download" onclick="downloadDocument('etude')"><i class="fas fa-download"></i> Télécharger</button>
        </div>
      </div>
       <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="Recomandation" disabled checked>
          <label for="Recomandation">Lettre De Recommandation</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Téléchargé</span>
          <button class="app-btn btn-download" onclick="downloadDocument('recommandation')"><i class="fas fa-download"></i> Télécharger</button>
        </div>
      </div>
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="licence_2" disabled>
          <label for="licence_2">Transcript BTS</label>
        </div>
        <div class="document-status status-pending">
          <span><i class="fas fa-clock"></i> En attente</span>
          <button class="app-btn btn-upload" onclick="uploadDocument('licence_2')"><i class="fas fa-upload"></i> Téléverser</button>
        </div>
      </div>
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="licence_3" disabled>
          <label for="licence_3">Transcript ESCOM</label>
        </div>
        <div class="document-status status-pending">
          <span><i class="fas fa-clock"></i> En attente</span>
          <button class="app-btn btn-upload" onclick="uploadDocument('licence_3')"><i class="fas fa-upload"></i> Téléverser</button>
        </div>
      </div>
	    <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="master_1" disabled>
          <label for="master_1">Transcript IPHEC</label>
        </div>
        <div class="document-status status-pending">
          <span><i class="fas fa-clock"></i> En attente</span>
          <button class="app-btn btn-upload" onclick="uploadDocument('Master_1')"><i class="fas fa-upload"></i> Téléverser</button>
        </div>
      </div>
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="photos" disabled checked>
          <label for="photos">Photos d'identité</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Téléchargé</span>
          <button class="app-btn btn-download" onclick="downloadDocument('photos')"><i class="fas fa-download"></i> Télécharger</button>
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
            <label><input type="checkbox" /> Canada</label>
            <label><input type="checkbox" /> États-Unis</label>
            <label><input type="checkbox" /> Royaume-Uni</label>
            <label><input type="checkbox" /> Australie</label>
            <label><input type="checkbox" checked /> Aucun</label>
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
  
  document.querySelectorAll('.profile-sidebar li').forEach(item => item.classList.remove('active'));
  document.getElementById(`menu-${section}`).classList.add('active');
  
  const saveBtn = document.querySelector('#profile-content .save-btn');
  if (saveBtn) {
    saveBtn.onclick = toggleEditMode;
  }
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
  const unreadCount = document.querySelectorAll('.notification-card.unread').length;
  const badge = document.querySelector('.notification-badge');
  if (badge) {
      if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
  }
}

// Données des programmes
const programData = {
  "International Business": {
    description: "Le programme International Business prépare les étudiants à travailler dans un environnement commercial mondial. Les cours couvrent les opérations commerciales internationales, le marketing mondial, la finance internationale et les stratégies de gestion interculturelle.",
    requirements: ["Diplôme d'études secondaires ou équivalent", "TOEFL iBT 61 ou IELTS 5.5", "Relevés de notes officiels", "Lettre de motivation", "2 lettres de recommandation"],
    dates: ["Date limite d'inscription: 15/08/2025", "Début des cours: 25/08/2025", "Date limite de paiement: 20/08/2025"],
    careers: ["Spécialiste du commerce international", "Analyste de marché global", "Coordinateur des importations/exportations", "Représentant des ventes internationales"]
  },
  "Logistics and Global Supply Chain Management": {
    description: "Ce programme forme les étudiants à gérer les flux de marchandises à l'échelle mondiale. Les cours couvrent la gestion des transports, l'entreposage, la gestion des stocks, les douanes et la réglementation internationale.",
    requirements: ["Diplôme d'études secondaires ou équivalent", "TOEFL iBT 61 ou IELTS 5.5", "Relevés de notes officiels", "CV/Curriculum Vitae", "Preuve de fonds suffisants"],
    dates: ["Date limite d'inscription: 01/09/2025", "Début des cours: 10/09/2025", "Date limite de paiement: 05/09/2025"],
    careers: ["Gestionnaire de la chaîne d'approvisionnement", "Analyste logistique", "Coordinateur des transports", "Gestionnaire des opérations d'entrepôt"]
  }
};

// Fonction pour afficher les détails du programme
function showProgramDetails(programName) {
  const program = programData[programName];
  document.getElementById('program-details-title').textContent = programName;
  document.getElementById('program-details-college').textContent = "Houston Community College";
  document.getElementById('program-description').innerHTML = `<p>${program.description}</p>`;
  document.getElementById('program-requirements').innerHTML = `<ul>${program.requirements.map(r => `<li>${r}</li>`).join('')}</ul>`;
  document.getElementById('program-dates').innerHTML = `<ul>${program.dates.map(d => `<li>${d}</li>`).join('')}</ul>`;
  document.getElementById('program-careers').innerHTML = `<ul>${program.careers.map(c => `<li>${c}</li>`).join('')}</ul>`;
  showPage('program-details');
}

// --- DÉBUT DE LA SECTION PAIEMENT ---

// Fonction pour payer tous les paiements en attente
function payAllPending() {
    const pendingCards = document.querySelectorAll('#pending-payments-container .application-card');
    let totalAmount = 0;

    if (pendingCards.length === 0) {
        alert("Il n'y a aucun paiement en attente à régler.");
        return;
    }

    pendingCards.forEach(card => {
        const amount = parseFloat(card.dataset.amount);
        if (!isNaN(amount)) {
            totalAmount += amount;
        }
    });

    if (totalAmount > 0) {
        showPaymentPage('Paiement groupé des frais en attente', totalAmount);
    } else {
        alert("Le montant total est de zéro. Aucun paiement n'est nécessaire.");
    }
}

// Étape 1: Créer et afficher le formulaire de paiement.
function showPaymentPage(programName, amount) {
  let paymentPage = document.getElementById('payment-flow-page');
  // Crée la page de paiement si elle n'existe pas encore.
  if (!paymentPage) {
      paymentPage = document.createElement('div');
      paymentPage.id = 'payment-flow-page';
      document.getElementById('main-content').appendChild(paymentPage);
  }

  paymentPage.innerHTML = `
    <div class="payment-container">
      <div class="program-header">
          <h1>Paiement pour ${programName}</h1>
          <p class="payment-amount">Montant à payer: ${amount} $</p>
      </div>
      <div class="payment-card">
        <h2><i class="fas fa-credit-card"></i> Informations de paiement</h2>
        <div class="payment-form">
          <div class="form-group"><label for="card-number">Numéro de carte *</label><input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19"></div>
          <div class="form-group"><label for="card-name">Nom sur la carte *</label><input type="text" id="card-name" placeholder="Nom Prénom"></div>
          <div class="form-row">
            <div class="form-group"><label for="expiry-date">Date d'expiration *</label><input type="text" id="expiry-date" placeholder="MM/AA" maxlength="5"></div>
            <div class="form-group"><label for="cvv">CVV *</label><input type="text" id="cvv" placeholder="123" maxlength="4"></div>
          </div>
          <div class="payment-methods">
            <div class="payment-method active"><i class="fab fa-cc-visa"></i> Visa</div>
            <div class="payment-method"><i class="fab fa-cc-mastercard"></i> Mastercard</div>
            <div class="payment-method"><i class="fas fa-university"></i> Virement</div>
          </div>
          <button class="payment-btn" onclick="processPayment('${programName}', ${amount})"><i class="fas fa-lock"></i> Payer ${amount} $</button>
          <p class="payment-security"><i class="fas fa-lock"></i> Transactions sécurisées avec chiffrement SSL</p>
        </div>
      </div>
    </div>
  `;
  
  // Affiche la page de paiement.
  showPage('payment-flow');
  
  // Ajoute les événements pour les champs du formulaire.
  document.getElementById('card-number').addEventListener('input', e => {
    let value = e.target.value.replace(/\s+/g, '').replace(/\D/g, '');
    e.target.value = value.match(/.{1,4}/g)?.join(' ') || '';
  });
  
  document.getElementById('expiry-date').addEventListener('input', e => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
    e.target.value = value;
  });

  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
      document.querySelector('.payment-method.active').classList.remove('active');
      this.classList.add('active');
    });
  });
}

// Étape 2: Lancer le traitement (simulation)
function processPayment(programName, amount) {
  if (!document.getElementById('card-number').value || !document.getElementById('card-name').value || !document.getElementById('expiry-date').value || !document.getElementById('cvv').value) {
    alert('Veuillez remplir tous les champs obligatoires.');
    return;
  }
  showPaymentLoading(programName, amount);
  setTimeout(() => showVerificationForm(programName, amount), 2000);
}

// Étape 3: Afficher l'écran de chargement
function showPaymentLoading(programName, amount) {
  const paymentPage = document.getElementById('payment-flow-page');
  paymentPage.innerHTML = `
    <div class="payment-container">
      <div class="payment-loading">
        <i class="fas fa-spinner"></i>
        <h2>Traitement de votre paiement</h2>
        <p>Veuillez patienter pendant que nous traitons votre paiement de ${amount} $ pour ${programName}...</p>
      </div>
    </div>
  `;
}

// Étape 4: Afficher le formulaire de vérification
function showVerificationForm(programName, amount) {
  const paymentPage = document.getElementById('payment-flow-page');
  paymentPage.innerHTML = `
    <div class="payment-container">
      <div class="verification-card">
        <h2><i class="fas fa-mobile-alt"></i> Vérification en 2 étapes</h2>
        <p>Un code a été envoyé à votre numéro de téléphone.</p>
        <div class="verification-inputs">
          ${Array(6).fill(0).map((_, i) => `<input type="text" maxlength="1" oninput="moveToNext(this, ${i + 1})">`).join('')}
        </div>
        <p class="verification-note">Entrez le code à 6 chiffres reçu par SMS.</p>
        <button class="payment-btn" onclick="completePayment('${programName}', ${amount})"><i class="fas fa-check-circle"></i> Valider</button>
        <p style="margin-top: 1rem;">Vous n'avez pas reçu de code ? <span class="resend-code" onclick="resendCode()">Renvoyer le code</span></p>
      </div>
    </div>
  `;
  document.querySelector('.verification-inputs input').focus();
}

function moveToNext(input, nextIndex) {
  if (input.value.length === 1) {
    const inputs = input.parentElement.querySelectorAll('input');
    if (nextIndex < inputs.length) inputs[nextIndex].focus();
  }
}

function resendCode() {
  alert("Un nouveau code de vérification a été envoyé.");
}

// Étape 5: Valider le code et afficher la confirmation
function completePayment(programName, amount) {
  const code = [...document.querySelectorAll('.verification-inputs input')].map(i => i.value).join('');
  if (code.length !== 6) {
    alert('Veuillez entrer un code de vérification complet.');
    return;
  }
  showPaymentSuccess(programName, amount);
}

// Étape 6: Afficher l'écran de succès
function showPaymentSuccess(programName, amount) {
  const paymentPage = document.getElementById('payment-flow-page');
  paymentPage.innerHTML = `
    <div class="payment-container">
      <div class="payment-success">
        <i class="fas fa-check-circle"></i>
        <h2>Paiement confirmé !</h2>
        <p>Votre paiement de ${amount} $ pour le programme "${programName}" a été traité avec succès.</p>
        <div class="payment-details" style="margin-top:1.5rem; padding:1rem; background-color:#f8f9fa; border-radius:8px;">
          <p><strong>Référence:</strong> PAY-${Math.floor(100000 + Math.random() * 900000)}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        <button class="back-btn" onclick="showPage('payments')" style="margin-top:2rem;">
          <i class="fas fa-arrow-left"></i> Retour aux paiements
        </button>
      </div>
    </div>
  `;
}

// --- FIN DE LA SECTION PAIEMENT ---

function toggleEducationDetails(id) {
  const details = document.getElementById(`details-${id}`);
  const icon = document.getElementById(`toggle-${id}`);
  if (details && icon) {
      const isVisible = details.style.display === "block";
      details.style.display = isVisible ? "none" : "block";
      icon.classList.toggle('fa-chevron-down', isVisible);
      icon.classList.toggle('fa-chevron-up', !isVisible);
  }
}

function downloadDocument(type) {
  alert('Simulation du téléchargement du document : ' + type);
}

function uploadDocument(type) {
  alert('Simulation du téléversement pour : ' + type);
}

function showUploadModal() {
  alert("Affichage de la modale pour l'ajout de nouveaux documents.");
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  updateNotificationBadge();
});
