/* ============================================================
   GovTech Design Playbook — navigation.js
   Tab switching, URL hash routing, active state management.

   v2: Replace with a proper client-side router if adding
       deep-linked sub-pages or query-param state.
   ============================================================ */

const Navigation = (() => {

  let activeTarget = null;

  /* ----------------------------------------------------------
     Initialise — attach click listeners and resolve the
     initial tab from the URL hash (enables bookmarking/sharing).
  ---------------------------------------------------------- */
  function init() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.target));
    });

    const hash = window.location.hash.replace('#', '');
    const validTargets = CONFIG.nav.map(n => n.target);

    if (hash && validTargets.includes(hash)) {
      switchTab(hash);
    } else {
      switchTab(CONFIG.nav[0].target); // Default: first tab
    }
  }

  /* ----------------------------------------------------------
     Switch to a tab panel by its HTML id.
  ---------------------------------------------------------- */
  function switchTab(targetPanelId) {
    if (targetPanelId === activeTarget) return; // No-op if already active

    // Hide all panels and deactivate all nav buttons
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.add('hidden');
      panel.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });

    // Show the target panel
    const panel = document.getElementById(targetPanelId);
    if (panel) {
      panel.classList.remove('hidden');
      panel.setAttribute('aria-hidden', 'false');

      // Scroll content area back to top on tab switch
      const main = document.getElementById('main-content');
      if (main) main.scrollTop = 0;
    }

    // Activate the corresponding nav tab
    const navTab = document.querySelector(`[data-target="${targetPanelId}"]`);
    if (navTab) {
      navTab.classList.add('active');
      navTab.setAttribute('aria-selected', 'true');
    }

    activeTarget = targetPanelId;

    // Persist to URL hash without triggering a page reload
    history.replaceState(null, '', `#${targetPanelId}`);
  }

  function getActiveTarget() {
    return activeTarget;
  }

  return { init, switchTab, getActiveTarget };

})();
