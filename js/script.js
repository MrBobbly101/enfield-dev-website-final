/* ==========================================================================
   script.js — Shared JavaScript for Enfield Dev Ltd
   ========================================================================== */

/* --------------------------------------------------------------------------
   HELPER: email format check (available to all form handlers)
   -------------------------------------------------------------------------- */
function isValidEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}


/* --------------------------------------------------------------------------
   1. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
var navToggle = document.getElementById("navToggle");
var mainNav   = document.getElementById("mainNav");

if (navToggle && mainNav) {

  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  document.addEventListener("click", function (event) {
    if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}


/* --------------------------------------------------------------------------
   2. CONTACT FORM VALIDATION (about-contact.html)
   -------------------------------------------------------------------------- */
var contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearFormErrors(contactForm, "formSuccess");

    var firstName = document.getElementById("firstName").value.trim();
    var lastName  = document.getElementById("lastName").value.trim();
    var email     = document.getElementById("email").value.trim();
    var role      = document.getElementById("role").value;
    var message   = document.getElementById("message").value.trim();
    var consent   = document.getElementById("consent").checked;

    var isValid = true;

    if (!firstName) { markError("firstName", "firstNameError", "Please enter your first name."); isValid = false; }
    if (!lastName)  { markError("lastName",  "lastNameError",  "Please enter your last name.");  isValid = false; }

    if (!email) {
      markError("email", "emailError", "Please enter your email address."); isValid = false;
    } else if (!isValidEmail(email)) {
      markError("email", "emailError", "Please enter a valid email address."); isValid = false;
    }

    if (!role)    { markError("role",    "roleError",    "Please select a role.");          isValid = false; }
    if (!message) { markError("message", "messageError", "Please enter a message.");        isValid = false; }
    else if (message.length < 20) { markError("message", "messageError", "Please write a bit more detail."); isValid = false; }
    if (!consent) { markError("consent", "consentError", "Please tick this box to agree."); isValid = false; }

    if (isValid) {
      showSuccessBanner("formSuccess");
      contactForm.reset();
    }
  });
}


/* --------------------------------------------------------------------------
   3. APPLY FORM VALIDATION (apply.html)
   -------------------------------------------------------------------------- */
var applyForm = document.getElementById("applyForm");

if (applyForm) {

  applyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearFormErrors(applyForm, "applySuccess");

    var firstName = document.getElementById("applyFirstName").value.trim();
    var lastName  = document.getElementById("applyLastName").value.trim();
    var email     = document.getElementById("applyEmail").value.trim();
    var phone     = document.getElementById("applyPhone").value.trim();
    var role      = document.getElementById("applyRole").value;
    var education = document.getElementById("applyEducation").value;
    var statement = document.getElementById("applyStatement").value.trim();
    var consent   = document.getElementById("applyConsent").checked;

    var isValid = true;

    if (!firstName) { markError("applyFirstName", "applyFirstNameError", "Please enter your first name."); isValid = false; }
    if (!lastName)  { markError("applyLastName",  "applyLastNameError",  "Please enter your last name.");  isValid = false; }

    if (!email) {
      markError("applyEmail", "applyEmailError", "Please enter your email address."); isValid = false;
    } else if (!isValidEmail(email)) {
      markError("applyEmail", "applyEmailError", "Please enter a valid email address."); isValid = false;
    }

    if (!phone) { markError("applyPhone", "applyPhoneError", "Please enter your phone number."); isValid = false; }
    if (!role)  { markError("applyRole",  "applyRoleError",  "Please select a role.");           isValid = false; }
    if (!education) { markError("applyEducation", "applyEducationError", "Please select your highest qualification."); isValid = false; }

    if (statement.length < 30) {
      markError("applyStatement", "applyStatementError", "Please write at least a short statement (30 characters minimum)."); isValid = false;
    }

    if (!consent) { markError("applyConsent", "applyConsentError", "Please tick this box to proceed."); isValid = false; }

    if (isValid) {
      showSuccessBanner("applySuccess");
      applyForm.reset();
    }
  });
}


/* --------------------------------------------------------------------------
   4. JOB FILTER (job-role.html)
   -------------------------------------------------------------------------- */
var filterButtons = document.getElementById("filterButtons");

if (filterButtons) {

  filterButtons.addEventListener("click", function (event) {
    if (event.target.tagName !== "BUTTON") return;

    var clickedBtn  = event.target;
    var filterValue = clickedBtn.getAttribute("data-filter");

    filterButtons.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.classList.remove("active");
    });
    clickedBtn.classList.add("active");

    document.querySelectorAll(".job-full-card").forEach(function (card) {
      if (filterValue === "all" || card.getAttribute("data-level") === filterValue) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
}


/* --------------------------------------------------------------------------
   SHARED HELPERS
   -------------------------------------------------------------------------- */

/* Mark a field invalid and show an error message */
function markError(fieldId, errorId, message) {
  var field = document.getElementById(fieldId);
  var span  = document.getElementById(errorId);
  if (field) field.classList.add("invalid");
  if (span)  span.textContent = message;
}

/* Clear all error states from a form, and hide its success banner */
function clearFormErrors(form, successId) {
  form.querySelectorAll("input, select, textarea").forEach(function (f) {
    f.classList.remove("invalid");
  });
  form.querySelectorAll(".field-error").forEach(function (s) {
    s.textContent = "";
  });
  var banner = document.getElementById(successId);
  if (banner) banner.style.display = "none";
}

/* Show a success banner and scroll to it */
function showSuccessBanner(successId) {
  var banner = document.getElementById(successId);
  if (banner) {
    banner.style.display = "block";
    banner.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
