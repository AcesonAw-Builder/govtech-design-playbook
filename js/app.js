/* ============================================================
   GovTech Design Playbook — app.js
   App initialisation: wires all modules, drives interactive
   IMPACT checklist, and registers the service worker.

   v2: Add analytics events, feature flags, user state
       persistence (localStorage for checklist progress).
   ============================================================ */

const App = (() => {

  /* ----------------------------------------------------------
     Boot sequence
  ---------------------------------------------------------- */
  function init() {
    Navigation.init();
    InstallGuide.init();
    initChecklistProgress();
    registerServiceWorker();
  }

  /* ----------------------------------------------------------
     IMPACT Audit — interactive checklist with live progress bar.
     JS also handles the .is-checked class for broader browser
     compatibility (avoids relying on CSS :has() selector).
  ---------------------------------------------------------- */
  function initChecklistProgress() {
    const checkboxes   = document.querySelectorAll('#impact-checklist .checklist-checkbox');
    const progressFill = document.getElementById('impact-progress-fill');
    const progressText = document.getElementById('impact-progress-text');
    const progressBar  = document.querySelector('.progress-bar');

    if (!checkboxes.length) return;

    function updateProgress() {
      const total   = checkboxes.length;
      const checked = document.querySelectorAll('#impact-checklist .checklist-checkbox:checked').length;
      const pct     = (checked / total) * 100;

      if (progressFill) progressFill.style.width = `${pct}%`;
      if (progressText) progressText.textContent  = `${checked} / ${total} complete`;
      if (progressBar)  progressBar.setAttribute('aria-valuenow', checked);
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        // Toggle .is-checked on the parent item for CSS styling
        const item = cb.closest('.checklist-item');
        if (item) item.classList.toggle('is-checked', cb.checked);
        updateProgress();
      });
    });

    updateProgress(); // Set initial state on load
  }

  /* ----------------------------------------------------------
     Register the PWA service worker.
     NOTE: Service workers require a secure context (HTTPS or
     localhost). They will not work over file:// protocol.
     Serve the project via a local HTTP server for full PWA support.
  ---------------------------------------------------------- */
  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .then(reg => {
          console.log('[SW] Registered, scope:', reg.scope);
        })
        .catch(err => {
          console.warn('[SW] Registration failed:', err);
        });
    });
  }

  return { init };

})();

/* ----------------------------------------------------------
   Boot the app once the DOM is ready.
---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => App.init());
