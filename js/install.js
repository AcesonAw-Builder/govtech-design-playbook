/* ============================================================
   GovTech Design Playbook — install.js
   Device detection, PWA native install prompt (Android Chrome),
   and dynamic rendering of install instructions.

   v2: Add annotated screenshots per step.
       Add desktop browser install instructions (Chrome/Edge address bar).
       Localise for additional languages.
   ============================================================ */

const InstallGuide = (() => {

  let deferredPrompt = null; // Holds the beforeinstallprompt event

  /* ----------------------------------------------------------
     Initialise
  ---------------------------------------------------------- */
  function init() {
    captureNativePrompt();
    checkIfAlreadyInstalled();
    renderInstallPage();
  }

  /* ----------------------------------------------------------
     Capture the native Android Chrome install prompt.
     Store it so we can trigger it on button click.
  ---------------------------------------------------------- */
  function captureNativePrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      showNativeInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      showInstalledConfirmation();
    });
  }

  /* ----------------------------------------------------------
     Show the "Install on this device" button (Android Chrome only).
  ---------------------------------------------------------- */
  function showNativeInstallButton() {
    const promptWrap = document.getElementById('install-native-prompt');
    if (promptWrap) promptWrap.classList.remove('hidden');

    const btn = document.getElementById('install-pwa-btn');
    if (!btn) return;

    btn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      deferredPrompt = null;
      if (outcome === 'accepted') showInstalledConfirmation();
    });
  }

  /* ----------------------------------------------------------
     Replace the install button with a success confirmation.
  ---------------------------------------------------------- */
  function showInstalledConfirmation() {
    const promptWrap = document.getElementById('install-native-prompt');
    if (promptWrap) {
      promptWrap.innerHTML = `
        <div class="install-success" role="status">
          <span aria-hidden="true">🎉</span>
          <span>App installed! Find it on your home screen.</span>
        </div>
      `;
      promptWrap.classList.remove('hidden');
    }
  }

  /* ----------------------------------------------------------
     If the app is already running as a standalone PWA,
     show a "you're using the installed app" banner.
  ---------------------------------------------------------- */
  function checkIfAlreadyInstalled() {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true; // iOS Safari

    if (!isStandalone) return;

    const wrap = document.getElementById('install-detected');
    if (!wrap) return;

    const banner = document.createElement('div');
    banner.className = 'already-installed-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML = `
      <span aria-hidden="true">✅</span>
      <span>You're using the installed app. You're all set!</span>
    `;
    wrap.prepend(banner);
  }

  /* ----------------------------------------------------------
     Detect which platform the user is on.
     Returns the first matching platform config, or null.
  ---------------------------------------------------------- */
  function detectPlatform() {
    for (const platform of CONFIG.installPlatforms) {
      try {
        if (platform.detect()) return platform;
      } catch (_) {
        // Guard against any UA parsing errors
      }
    }
    return null; // Desktop or unrecognised device
  }

  /* ----------------------------------------------------------
     Render steps as HTML.
     highlighted = true → hero card style (white text, numbered circles)
     highlighted = false → accordion style (blue-tinted circles)
  ---------------------------------------------------------- */
  function renderSteps(steps, highlighted) {
    return steps.map((step, i) => {
      const numClass   = highlighted ? 'step-number'         : 'platform-step-number';
      const wrapClass  = highlighted ? 'install-step'        : 'platform-step';
      const textClass  = highlighted ? 'step-text'           : 'platform-step-text';
      const iconHtml   = step.icon ? `<span aria-hidden="true">${step.icon}</span> ` : '';

      return `
        <div class="${wrapClass}">
          <div class="${numClass}" aria-hidden="true">${i + 1}</div>
          <p class="${textClass}">${iconHtml}${step.text}</p>
        </div>
      `;
    }).join('');
  }

  /* ----------------------------------------------------------
     Render the detected-platform hero card at the top.
  ---------------------------------------------------------- */
  function renderDetectedPlatform(platform) {
    const wrap = document.getElementById('install-detected');
    if (!wrap) return;

    if (platform) {
      const card = document.createElement('div');
      card.className = 'detected-platform-card';
      card.innerHTML = `
        <p class="detected-label">Detected: Your device</p>
        <h3 class="detected-platform-name">${platform.icon} ${platform.name}</h3>
        <div class="install-steps" role="list">
          ${renderSteps(platform.steps, true)}
        </div>
      `;
      wrap.appendChild(card);
    } else {
      // Desktop or unknown device
      const card = document.createElement('div');
      card.className = 'detected-platform-card';
      card.style.background = 'linear-gradient(135deg, #4a5568, #2d3748)';
      card.innerHTML = `
        <p class="detected-label">Desktop detected</p>
        <h3 class="detected-platform-name">💻 Desktop Browser</h3>
        <p class="step-text">
          On Chrome or Edge, look for an <strong>install icon</strong> (⊕) in the address bar.
          On Safari (macOS), use <strong>File → Add to Dock</strong>.
          For mobile instructions, see the platforms listed below.
        </p>
      `;
      wrap.appendChild(card);
    }
  }

  /* ----------------------------------------------------------
     Render accordion items for all non-detected platforms.
  ---------------------------------------------------------- */
  function renderOtherPlatforms(detectedId) {
    const wrap = document.getElementById('install-all-platforms');
    if (!wrap) return;

    const others = CONFIG.installPlatforms.filter(p => p.id !== detectedId);
    if (others.length === 0) return;

    const title = document.createElement('p');
    title.className = 'install-section-title';
    title.textContent = 'Other devices';
    wrap.appendChild(title);

    others.forEach(platform => {
      const accordion = document.createElement('div');
      accordion.className = 'platform-accordion';
      accordion.id = `accordion-${platform.id}`;

      accordion.innerHTML = `
        <button
          class="platform-accordion-header"
          aria-expanded="false"
          aria-controls="body-${platform.id}"
        >
          <span class="platform-header-left">
            <span class="platform-header-icon" aria-hidden="true">${platform.icon}</span>
            <span>${platform.name}</span>
          </span>
          <span class="accordion-chevron" aria-hidden="true">▼</span>
        </button>
        <div
          class="platform-accordion-body"
          id="body-${platform.id}"
          role="region"
          aria-labelledby="accordion-${platform.id}"
        >
          <div class="platform-steps">
            ${renderSteps(platform.steps, false)}
          </div>
        </div>
      `;

      // Toggle accordion open/closed
      const header = accordion.querySelector('.platform-accordion-header');
      header.addEventListener('click', () => {
        const isOpen = accordion.classList.contains('open');
        accordion.classList.toggle('open', !isOpen);
        header.setAttribute('aria-expanded', String(!isOpen));
      });

      wrap.appendChild(accordion);
    });
  }

  /* ----------------------------------------------------------
     Orchestrate rendering of the full install page.
  ---------------------------------------------------------- */
  function renderInstallPage() {
    const detected = detectPlatform();
    renderDetectedPlatform(detected);
    renderOtherPlatforms(detected ? detected.id : null);
  }

  return { init };

})();
