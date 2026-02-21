/* ============================================================
   GovTech Design Playbook — config.js
   Single source of truth for app copy, tool definitions,
   nav structure, and install instructions.

   v2: Consider externalising copy to a CMS, i18n file, or
       fetching from a headless content source.
   ============================================================ */

const CONFIG = {

  /* ----------------------------------------------------------
     App Meta
  ---------------------------------------------------------- */
  app: {
    name:       'GovTech Modernisation & Design Readiness Playbook',
    shortName:  'Design Playbook',
    version:    '1.1.0',
    targetUser: 'Senior Design Talent / Principal Designers',
  },

  /* ----------------------------------------------------------
     Navigation Tabs
     Order here controls render order in the nav bar.
  ---------------------------------------------------------- */
  nav: [
    { id: 'about',          label: 'About',     icon: '📖', target: 'tab-about'           },
    { id: 'impact',         label: 'IMPACT',    icon: '📋', target: 'tab-impact'          },
    { id: 'ai-layer',       label: 'AI Layer',  icon: '🤖', target: 'tab-ai-layer'        },
    { id: 'infrastructure', label: 'Infra',     icon: '🏗️', target: 'tab-infrastructure'  },
    { id: 'value-prop',     label: 'Value',     icon: '🌉', target: 'tab-value-prop'      },
    { id: 'install',        label: 'Install',   icon: '📲', target: 'tab-install'         },
  ],

  /* ----------------------------------------------------------
     IMPACT Framework Audit — Checklist Items
     v2: Add scoring weights to auto-generate a readiness score.
         Add export-to-PDF / shareable audit report.
  ---------------------------------------------------------- */
  impactChecklist: [
    {
      id:    'business-fitness',
      title: 'Business Fitness',
      desc:  'Does the product hinder policy implementation or frustrate citizens?',
    },
    {
      id:    'technical-fitness',
      title: 'Technical Fitness',
      desc:  'Is the stack insecure, brittle, or incompatible with the SG Tech Stack (SGTS)?',
    },
    {
      id:    'cost-fitness',
      title: 'Cost Fitness',
      desc:  'Are maintenance costs disproportionate to the value delivered?',
    },
    {
      id:    'outcome-parity',
      title: 'Outcome over Feature Parity',
      desc:  'Are we building for better outcomes (e.g. reduced turnaround time) rather than just copying old features?',
    },
  ],

  /* ----------------------------------------------------------
     AI & Engineering Productivity Layer — Tool Definitions
     v2: Add links to internal Litmus/Sentinel dashboards.
         Add usage guidelines and case study snippets.
  ---------------------------------------------------------- */
  aiTools: [
    {
      id:       'litmus',
      name:     'Litmus',
      tag:      'Safety Evaluation',
      icon:     '🔬',
      desc:     'Evaluates AI safety and reliability before go-live. Run Litmus assessments at every major milestone to validate model outputs against government standards.',
      badge:    'Pre-deployment',
      featured: false,
    },
    {
      id:       'sentinel',
      name:     'Sentinel',
      tag:      'Content Moderation',
      icon:     '🛡️',
      desc:     'Real-time content moderation and output filtering for live AI systems. Ensures citizen-facing AI outputs remain safe, accurate, and policy-compliant.',
      badge:    'Live / Runtime',
      featured: false,
    },
    {
      id:       'commute-build',
      name:     'The "Commute Build" Standard',
      tag:      'Rapid Prototyping',
      icon:     '🚄',
      desc:     'Prioritises rapid, intent-driven prototyping (vibe coding) to reduce iteration cycles by 20%+. A working prototype should be achievable in the time of a commute.',
      metric:   { value: '20%+', label: 'Faster Iteration' },
      featured: true,
    },
  ],

  /* ----------------------------------------------------------
     Infrastructure Standards — SGDS & SGTS
     v2: Link to live SGDS/SGTS documentation.
         Add component library preview, compliance checklist.
  ---------------------------------------------------------- */
  infrastructure: [
    {
      id:               'sgds',
      name:             'SGDS',
      fullName:         'Singapore Government Design System',
      icon:             '🎨',
      desc:             'Plug-and-play UI components that ensure 100% WCAG 2.1 accessibility compliance out of the box. Design with SGDS first — only deviate with a justified reason.',
      complianceBadge:  '✅ WCAG 2.1 — 100% Compliant',
      modules: [
        { label: 'Components',     highlight: false },
        { label: 'Typography',     highlight: false },
        { label: 'Colour Tokens',  highlight: false },
        { label: 'Accessibility',  highlight: false },
      ],
    },
    {
      id:       'sgts',
      name:     'SGTS',
      fullName: 'Singapore Government Tech Stack',
      icon:     '⚙️',
      desc:     'Shared modules that handle national-scale complexity. Leverage SGTS integrations instead of building from scratch — this is how you scale to 6M citizens.',
      modules: [
        { label: 'Singpass',   highlight: true  },
        { label: 'Myinfo',     highlight: true  },
        { label: 'GovWallet',  highlight: true  },
        { label: 'Notify',     highlight: false },
        { label: 'FormSG',     highlight: false },
      ],
    },
  ],

  /* ----------------------------------------------------------
     Value Proposition — The Bridge & The Multiplier
     v2: Add portfolio case study deep-links, testimonials,
         and quantitative impact metrics.
  ---------------------------------------------------------- */
  valueProps: [
    {
      id:      'bridge',
      variant: 'bridge',
      icon:    '🌉',
      title:   'The Bridge',
      desc:    'Healthtech rigour from MOH and MSF engagement — directly relevant to GovTech\'s citizen-facing mission. Enterprise-scale experience (3,000+ users) that maps to serving 6M citizens.',
      pillars: [
        { stat: 'MOH / MSF', label: 'Healthtech Rigour' },
        { divider: true },
        { stat: '3,000+',    label: 'Users → 6M Citizens' },
      ],
    },
    {
      id:      'multiplier',
      variant: 'multiplier',
      icon:    '✖️',
      title:   'The Multiplier',
      desc:    'Proven experience mentoring junior designers and aligning PMs and Engineers. A senior designer who doesn\'t just ship — but multiplies the output of the whole team.',
      traits: [
        { icon: '🎓', text: 'Mentors junior designers' },
        { icon: '🤝', text: 'Aligns PMs & Engineers' },
        { icon: '📈', text: 'Multiplies team output' },
      ],
    },
  ],

  /* ----------------------------------------------------------
     Install Guide — Platform Definitions
     detect() returns true if this platform matches the user's device.
     v2: Add annotated screenshots per step.
         Add Huawei AppGallery PWA publishing guide.
  ---------------------------------------------------------- */
  installPlatforms: [
    {
      id:   'ios',
      name: 'iOS — Safari',
      icon: '🍎',
      detect: () => {
        const ua = navigator.userAgent;
        return /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
      },
      steps: [
        { icon: '🧭', text: 'Open this page in <strong>Safari</strong> — not Chrome or Firefox.' },
        { icon: '📤', text: 'Tap the <strong>Share</strong> button (the box with an upward arrow) at the bottom of the screen.' },
        { icon: '⬇️', text: 'Scroll down the Share menu and tap <strong>"Add to Home Screen"</strong>.' },
        { icon: '✏️', text: 'Edit the name if you like, then tap <strong>"Add"</strong> in the top-right.' },
        { icon: '🎉', text: 'Done! The app icon will appear on your <strong>Home Screen</strong>.' },
      ],
    },
    {
      id:            'android',
      name:          'Android — Chrome',
      icon:          '🤖',
      nativeInstall: true, // Supports beforeinstallprompt
      detect: () => {
        const ua = navigator.userAgent;
        // Exclude Huawei devices which have their own entry
        return /Android/.test(ua) && !/Huawei|HUAWEI|HMSCore/.test(ua);
      },
      steps: [
        { icon: '🌐', text: 'Open this page in <strong>Chrome</strong>.' },
        { icon: '⋮',  text: 'Tap the <strong>three-dot menu</strong> (⋮) in the top-right corner.' },
        { icon: '📲', text: 'Tap <strong>"Add to Home Screen"</strong> or <strong>"Install app"</strong>.' },
        { icon: '✅', text: 'Tap <strong>"Add"</strong> or <strong>"Install"</strong> to confirm.' },
        { icon: '🎉', text: 'Done! The app icon will appear on your <strong>Home Screen</strong>.' },
      ],
    },
    {
      id:   'huawei',
      name: 'Huawei — Browser',
      icon: '📱',
      detect: () => /Huawei|HUAWEI|HMSCore/.test(navigator.userAgent),
      steps: [
        { icon: '🌐', text: 'Open this page in the <strong>Huawei Browser</strong>.' },
        { icon: '⋯',  text: 'Tap the <strong>three-dot menu</strong> at the bottom of the screen.' },
        { icon: '🏠', text: 'Tap <strong>"Add to Home Screen"</strong>.' },
        { icon: '✅', text: 'Tap <strong>"Add"</strong> to confirm.' },
        { icon: '🎉', text: 'Done! The app icon will appear on your <strong>Home Screen</strong>.' },
      ],
    },
    {
      id:   'oppo',
      name: 'OPPO / ColorOS — Browser',
      icon: '📲',
      detect: () => /OPPO|CPH\d|PBEM|OP\d/.test(navigator.userAgent),
      steps: [
        { icon: '🌐', text: 'Open this page in the <strong>ColorOS Browser</strong>.' },
        { icon: '⋯',  text: 'Tap the <strong>three-dot menu</strong> in the top-right corner.' },
        { icon: '🏠', text: 'Tap <strong>"Add to home screen"</strong>.' },
        { icon: '✅', text: 'Tap <strong>"Add"</strong> to confirm.' },
        { icon: '🎉', text: 'Done! The app icon will appear on your <strong>Home Screen</strong>.' },
      ],
    },
  ],

};
