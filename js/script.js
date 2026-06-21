/* ============================================================
   MERIDIAN STRUCTURES — script.js
   Vanilla JS, no dependencies.
   1. Mobile navigation toggle
   2. Scroll-reveal for sections (IntersectionObserver)
   3. Footer year
   4. Contact form validation
   ============================================================ */

(function () {
  'use strict';

  /* ---------- 1. Mobile navigation toggle ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu after a link is chosen (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. Scroll-reveal ---------- */
  var revealEls = document.querySelectorAll('.scroll-reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 3. Footer year ---------- */
  var yearEl = document.querySelector('[data-current-year]');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- 4. Contact form validation ---------- */
  var form = document.getElementById('contact-form');
  if (!form) { return; }

  var statusBox = document.getElementById('form-status');

  var validators = {
    name: function (value) {
      if (!value.trim()) { return 'Enter your full name.'; }
      if (value.trim().length < 2) { return 'Name looks too short.'; }
      return '';
    },
    email: function (value) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) { return 'Enter an email address.'; }
      if (!pattern.test(value.trim())) { return 'Enter a valid email address.'; }
      return '';
    },
    phone: function (value) {
      if (!value.trim()) { return ''; } // optional field
      var pattern = /^[0-9+\-\s()]{7,16}$/;
      if (!pattern.test(value.trim())) { return 'Enter a valid phone number, or leave this blank.'; }
      return '';
    },
    projectType: function (value) {
      if (!value) { return 'Select the type of project.'; }
      return '';
    },
    message: function (value) {
      if (!value.trim()) { return 'Tell us a little about the project.'; }
      if (value.trim().length < 10) { return 'A few more details would help (10+ characters).'; }
      return '';
    }
  };

  function showFieldError(fieldName, message) {
    var input = form.elements[fieldName];
    var fieldWrapper = input.closest('.field');
    var errorEl = document.getElementById(fieldName + '-error');

    if (message) {
      fieldWrapper.classList.add('has-error');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) { errorEl.textContent = message; }
    } else {
      fieldWrapper.classList.remove('has-error');
      input.setAttribute('aria-invalid', 'false');
      if (errorEl) { errorEl.textContent = ''; }
    }
  }

  function validateField(fieldName) {
    var input = form.elements[fieldName];
    var message = validators[fieldName](input.value);
    showFieldError(fieldName, message);
    return message === '';
  }

  // Live validation as the visitor leaves each field
  Object.keys(validators).forEach(function (fieldName) {
    var input = form.elements[fieldName];
    if (!input) { return; }
    input.addEventListener('blur', function () { validateField(fieldName); });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var fieldNames = Object.keys(validators);
    var allValid = fieldNames
      .map(validateField)
      .every(function (isValid) { return isValid; });

    if (!allValid) {
      statusBox.textContent = 'Please fix the highlighted fields and try again.';
      statusBox.dataset.state = 'error';
      statusBox.classList.add('is-visible');
      var firstInvalid = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      if (firstInvalid) { firstInvalid.focus(); }
      return;
    }

    // No backend is wired up in this static build — this simulates a
    // successful submission so the validation flow can be demonstrated end
    // to end. Swap this block for a real fetch() call to your API/endpoint.
    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(function () {
      statusBox.textContent = 'Thanks — your inquiry has been received. We reply within one business day.';
      statusBox.dataset.state = 'success';
      statusBox.classList.add('is-visible');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send inquiry';
      statusBox.focus();
    }, 600);
  });
})();
