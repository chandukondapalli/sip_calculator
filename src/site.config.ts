// ============================================================
//  CHANDU WEALTH — SITE CONFIG
//  Open this file in ANY text editor (Notepad, VS Code) and
//  update the values below to change your website instantly.
//  After saving, refresh the browser to see changes.
// ============================================================

export const siteConfig = {

  // ── BRAND ─────────────────────────────────────────────────
  brand: {
    name:        'Personal Finance ',
    nameAccent:  'by Chandu',
    tagline:     'Your Personal Finance Partner',
    motto:       'Clarity Today. Prosperity Tomorrow.',
    domain:      'chanduwealth.com',
    amfiBadge:   'AMFI Registered Mutual Fund Distributor',
    arnNumber:   'ARN-313814',
  },

  // ── NAVIGATION LINKS ─────────────────────────────────────
  nav: {
    links: [
      { label: 'Services',    href: '#services' },
      { label: 'Calculators', href: '#calc', isCalc: true },
      { label: 'About',       href: '#about' },
      { label: 'Videos',      href: '#videos' },
    ],
    loginText: 'Client Login',
    loginLink: 'https://www.wealthy.in/#login',
    ctaText:   'Get Started',
    ctaLink:   'https://www.wealthy.in/partners/chandufin',
  },

  // ── HERO SECTION ──────────────────────────────────────────
  hero: {
    headline1:    'Your Money Deserves',
    headlineGold: 'Better',           // renders in gold italic
    headline2:    'Decisions.',
    subtext:      'Most Indians and NRIs earn well — but very few build wealth. I help salaried families and NRI investors turn income into lasting prosperity through simple, honest financial planning.',
    cta1Text:     'Book a Free Call →',
    cta1Link:     'https://forms.gle/EkH6AssiWStjz4Jq5',
    cta2Text:     'Try Calculators',
    cta2IsCalc:   true,
    cta2Link:     '#calc',
  },

  // ── STATS BAR ─────────────────────────────────────────────
  stats: [
    { value: '₹6 Cr+',   label: 'Assets Under Advisory' },
    { value: '100+',      label: 'Families Guided' },
    { value: '₹30 L+',   label: 'Monthly SIP Book' },
  ],

  // ── FEATURED QUOTE (below hero or between sections) ───────
  // A rotating strip of inspirational financial quotes
  quotes: [
    {
      text: 'Do not save what is left after spending, but spend what is left after saving.',
      author: 'Warren Buffett',
    },
    {
      text: 'An investment in knowledge pays the best interest.',
      author: 'Benjamin Franklin',
    },
    {
      text: 'The best time to plant a tree was 20 years ago. The second best time is now.',
      author: 'Chinese Proverb',
    },
    {
      text: 'Financial freedom is available to those who learn about it and work for it.',
      author: 'Robert Kiyosaki',
    },
  ],

  // ── SERVICES ─────────────────────────────────────────────
  services: {
    badgeText:   'WHAT I OFFER',
    heading1:    'Every Family Deserves a',
    headingGold: 'Financial Plan',
    subtext:     'From your first SIP to your last EMI — I walk with you at every step of the journey, in plain Telugu or English, with zero jargon.',
    cards: [
      {
        icon:  '🛡️',
        title: 'Term Insurance',
        copy:  'Your income is your family\'s lifeline. I help you find the right cover — not too little, not over-priced — so your family never struggles if something happens to you.',
      },
      {
        icon:  '🏥',
        title: 'Health Insurance',
        copy:  'One hospital bill can wipe out years of savings. I review room limits, co-pay clauses, and waiting periods so your cover actually works when you need it most.',
      },
      {
        icon:  '🌅',
        title: 'Retirement Planning',
        copy:  'Retirement isn\'t about stopping work — it\'s about having a choice. We build a corpus that gives you ₹1 lakh+ per month without depending on anyone.',
      },
      {
        icon:  '📈',
        title: 'Wealth Management',
        copy:  'Emergency fund first, insurance second, investment third — in the right order. I build a structured plan across equity, debt, and gold for each life goal.',
      },
      {
        icon:  '💼',
        title: 'Mutual Fund Portfolio',
        copy:  'Stop guessing which fund is "best". I review your existing portfolio for overlap, drift, and underperformance — then align every SIP to a specific goal.',
      },
    ],
  },

  // ── ABOUT / SPLIT SECTION ─────────────────────────────────
  about: {
    badgeText:   'THE PERSON BEHIND THE PLAN',
    heading1:    'Finance Made',
    headingGold: 'Human Again.',
    subtext:     'I\'m Chandu — an AMFI registered Mutual Fund Distributor (ARN-313814) from Hyderabad. I guide salaried professionals, business owners, and NRI investors across the globe to build wealth back home. I don\'t sell products. I build personalised plans.',
    photo:       '/images/chandu.jpg',  // drop your photo in public/images/
    photoCaption: 'AMFI Registered MFD · Hyderabad',
    features: [
      'Personalised roadmap built around your salary, goals & family',
      'NRI investment planning — invest in India from anywhere in the world',
      'Zero commission pressure — I recommend what fits, not what pays',
      'Guidance in Telugu & English — no finance jargon',
      'Quarterly reviews to keep your plan on track',
    ],
    certifications: [
      { icon: '⚡', label: 'AMFI Certified' },
      { icon: '📊', label: 'CFP Pursuing' },
      { icon: '🎓', label: 'Finance Educator' },
    ],
    ctaText: 'Let\'s Build Your Plan →',
    ctaLink: 'https://forms.gle/EkH6AssiWStjz4Jq5',
  },

  // ── TESTIMONIALS ─────────────────────────────────────────
  testimonials: {
    badgeText:   'REAL STORIES',
    heading1:    'Words from Families',
    headingGold: 'Who Took the First Step.',
    items: [
      {
        quote: 'Before meeting Chandu, I had 6 random SIPs and no idea why. He helped us stop, restructure everything around our actual goals — home, kids\' education, retirement. For the first time, our money has a purpose.',
        name:  'Rahul & Priya',
        role:  'Software Engineers · Hyderabad',
      },
      {
        quote: 'He showed me exactly how ₹5,000 extra per month on my home loan would save ₹11 lakhs in interest and cut 4 years off my tenure. I wouldn\'t have believed it without his calculator. Game-changing.',
        name:  'Srinivas K.',
        role:  'Home Loan Borrower · Hyderabad',
      },
      {
        quote: 'I was nervous about investing. Chandu explained everything in Telugu, never rushed me, and started me with just ₹2,000 SIP. Two years later I\'m at ₹15,000 per month and completely confident.',
        name:  'Meena Reddy',
        role:  'First-Time Investor · Hyderabad',
      },
    ],
  },

  // ── YOUTUBE VIDEOS ───────────────────────────────────────
  videos: {
    badgeText:   'FREE FINANCIAL EDUCATION',
    heading1:    'Learn Money in',
    headingGold: 'Plain Language.',
    channelUrl:  'https://www.youtube.com/@PersonalFinancebyChandu',
    channelText: 'Visit Channel ↗',
    items: [
      { id: 'tV_CnVhYwjk', title: 'Why Your HIGH Income Isn\'t Making You RICH? Software Couple in Hyderabad Making 3 Lakhs/Month!', views: '1L+' },
      { id: 'J-gtK4qEscI', title: '16 Years లో 8 కోట్ల Wealth Creation — How Is It Even Possible for a Corporate Couple?', views: '1L+' },
      { id: 'gjQUNMRDiyE', title: 'మా నెల ఖర్చులు ₹1,15,000 | Software Engineer Monthly Budget | Episode 4', views: '1L+' },
      { id: 'CBmzlC5m5S0', title: 'Living in a 1.5 Crore House with 90% Salary Locked in Expenses | Salary Secrets Ep 3', views: '1L+' },
      { id: 'lSJ2dekjG60', title: 'Living in Hyderabad with 1.8 Lakhs Salary with Zero Investments | Salary Secrets Ep 2', views: '1L+' },
      { id: 'mEwmHvoB1WY', title: 'How She Cleared a ₹1 Crore Loan in Just 3 Years — Real Women Empowerment', views: '1L+' },
      { id: 'sCJaO_vPmXg', title: '9 Lakhs/Month Income, But No Mutual Funds — NRI Mistakes & Typical NRI Story', views: '1L+' },
      { id: 'vCajKIh89gk', title: 'My Journey to a ₹65 Lakhs Portfolio in Just 5 Years — Life of a Software Engineer', views: '1L+' },
      { id: 'Lw84hK3XgfY', title: 'Government Employee Salary ₹1,05,000 — Retirement Plan & Financial Planning Ready', views: '1L+' },
    ],
  },

  // ── CONTACT / CTA SECTION ─────────────────────────────────
  contact: {
    badgeText:   'TAKE THE FIRST STEP',
    heading1:    'One Conversation Can',
    headingGold: 'Change Everything.',
    subtext:     'Most people put off financial planning because they think it\'s complicated. It\'s not — when someone explains it clearly. Book a free 30-minute call. No sales pitch, no obligation. Just clarity.',
    ctaText:     'Book Your Free Call →',
    ctaLink:     'https://forms.gle/EkH6AssiWStjz4Jq5',
  },

  // ── SOCIAL LINKS ─────────────────────────────────────────
  social: {
    whatsapp:  'https://wa.me/919177069555',
    youtube:   'https://www.youtube.com/@PersonalFinancebyChandu',
    instagram: 'https://www.instagram.com/personalfinancebychandu?igsh=NGgxZDVrMzA3cWo3',
    linkedin:  '',
    email:     'mailto:kondapallichandu7@gmail.com',
  },

  // ── FOOTER ───────────────────────────────────────────────
  footer: {
    description: 'Helping salaried families across Hyderabad build financial clarity, protection, and long-term wealth — one conversation at a time.',
    address:     'Hyderabad, Telangana',
    email:       'kondapallichandu7@gmail.com',
    disclaimer:  'Mutual fund investments are subject to market risks. Read all scheme related documents carefully. Past performance is not indicative of future returns.',
    copyrightYear: '2026',
    resources: [
      { label: 'Our Services',   href: '#services' },
      { label: 'Calculators',    href: '#calc', isCalc: true },
      { label: 'About Chandu',   href: '#about' },
      { label: 'YouTube Videos', href: '#videos' },
    ],
  },

  // ── FLOATING BUTTON ───────────────────────────────────────
  floatingBtn: {
    text: 'Free Call',
    link: 'https://forms.gle/EkH6AssiWStjz4Jq5',
  },

} as const
