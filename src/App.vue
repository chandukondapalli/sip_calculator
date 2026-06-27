<template>
  <div class="app">

    <!-- ── Sticky Nav ─────────────────────────────────────── -->
    <header class="nav" :class="{ scrolled: scrolled }">
      <div class="nav-inner">
        <!-- Logo -->
        <button class="logo" @click="goHome">
          <img src="/images/logo.jpg" class="logo-avatar" alt="Chandu" />
          <span class="logo-text">{{ cfg.brand.name }}<span class="logo-gold">{{ cfg.brand.nameAccent }}</span></span>
        </button>

        <!-- Center links -->
        <nav class="nav-links">
          <button
            v-for="link in cfg.nav.links"
            :key="link.label"
            class="nav-link"
            @click="link.isCalc ? (activePage = 'calculator') : scrollTo(link.href)"
          >{{ link.label }}</button>
        </nav>

        <!-- Right -->
        <div class="nav-right">
          <a :href="cfg.nav.loginLink" target="_blank" class="btn-login">
            {{ cfg.nav.loginText }}
          </a>
          <a :href="cfg.nav.ctaLink" target="_blank" class="btn-gold-pill">
            {{ cfg.nav.ctaText }}
          </a>
          <button class="hamburger" @click="mobileOpen = !mobileOpen">☰</button>
        </div>
      </div>

      <!-- Mobile nav -->
      <div v-if="mobileOpen" class="mobile-nav">
        <button
          v-for="link in cfg.nav.links"
          :key="link.label"
          class="mobile-nav-link"
          @click="link.isCalc ? (activePage = 'calculator', mobileOpen = false) : (scrollTo(link.href), mobileOpen = false)"
        >{{ link.label }}</button>
        <a :href="cfg.nav.loginLink" target="_blank" class="btn-login mobile-cta">{{ cfg.nav.loginText }}</a>
        <a :href="cfg.nav.ctaLink"  target="_blank" class="btn-gold-pill mobile-cta">{{ cfg.nav.ctaText }}</a>
      </div>
    </header>

    <!-- ── Right Social Sidebar ───────────────────────────── -->
    <div class="social-sidebar">
      <a v-if="cfg.social.whatsapp"  :href="cfg.social.whatsapp"  target="_blank" class="ss-btn" title="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a v-if="cfg.social.youtube"   :href="cfg.social.youtube"   target="_blank" class="ss-btn" title="YouTube">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      </a>
      <a v-if="cfg.social.instagram" :href="cfg.social.instagram" target="_blank" class="ss-btn" title="Instagram">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
      <a v-if="cfg.social.linkedin"  :href="cfg.social.linkedin"  target="_blank" class="ss-btn" title="LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a v-if="cfg.social.email"     :href="cfg.social.email"                      class="ss-btn" title="Email">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </a>
    </div>

    <!-- ── Pages ──────────────────────────────────────────── -->
    <main>
      <HomePageSections v-if="activePage === 'home'"       @goto-calc="activePage = 'calculator'" />
      <CalculatorPage   v-if="activePage === 'calculator'" @goto-home="activePage = 'home'" />
    </main>

    <!-- ── Floating Book Now ──────────────────────────────── -->
    <a :href="cfg.floatingBtn.link" target="_blank" class="fab">
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>
      <span>{{ cfg.floatingBtn.text }}</span>
    </a>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { siteConfig as cfg } from './site.config'
import HomePageSections from './components/home-page-sections.vue'
import CalculatorPage   from './components/calculator-page.vue'

const activePage  = ref<'home' | 'calculator'>('home')
const mobileOpen  = ref(false)
const scrolled    = ref(false)

function goHome() {
  activePage.value = 'home'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollTo(href: string) {
  activePage.value = 'home'
  const id = href.replace('#', '')
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 50)
}

function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style>
/* ── Reset & base ─────────────────────────────────────────── */
.app { min-height: 100vh; background: var(--cream); color: var(--text); }

/* ── Forest Green + White + Saffron Orange palette ─────────── */
:root {
  /* Primary: Forest Green */
  --gold:        #e07b18;   /* saffron orange (was gold) */
  --gold-light:  #f5943a;
  --gold-pale:   #fff4ec;
  /* Dark sections: Forest Green (was navy) */
  --navy:        #0b6e4f;
  --navy-mid:    #1a9a6c;
  /* Backgrounds */
  --cream:       #f8fffe;
  --cream-2:     #eef8f4;
  --cream-3:     #d9f0e8;
  --white:       #ffffff;
  /* Text */
  --text:        #18271f;
  --text-body:   #3a5248;
  --text-dim:    #7a9988;
  /* Borders & shadows */
  --border:      rgba(11,110,79,0.18);
  --border-card: rgba(11,110,79,0.08);
  --shadow-sm:   0 2px 12px rgba(11,110,79,0.06);
  --shadow-md:   0 8px 32px rgba(11,110,79,0.10);
  --shadow-lg:   0 20px 60px rgba(11,110,79,0.14);
}

/* ── Sticky Nav ───────────────────────────────────────────── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(248,255,254,0.96);
  backdrop-filter: blur(16px);
  border-color: rgba(11,110,79,0.10);
  box-shadow: var(--shadow-sm);
}
.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  text-decoration: none;
}
.logo-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center;
  border: 2px solid var(--navy);
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(11,110,79,0.12);
}
.logo-text {
  font-size: 0.92rem;
  font-weight: 800;
  color: var(--navy);
  letter-spacing: 0.01em;
  font-family: 'Inter', sans-serif;
  line-height: 1.15;
  text-transform: uppercase;
}
.logo-gold {
  color: var(--gold);
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-family: 'Inter', sans-serif;
  margin-top: 1px;
}

.nav-links { display: flex; gap: 0.25rem; margin-left: auto; }
.nav-link {
  background: none; border: none; cursor: pointer;
  padding: 0.45rem 0.9rem;
  font-size: 0.78rem; font-weight: 700;
  color: var(--text-body); letter-spacing: 0.06em; text-transform: uppercase;
  transition: color 0.15s;
}
.nav-link:hover { color: var(--gold); }

.nav-right { display: flex; align-items: center; gap: 0.75rem; margin-left: 1.5rem; }

.btn-login {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.55rem 1.2rem;
  background: transparent;
  color: var(--navy);
  border: 1.5px solid var(--navy);
  border-radius: 8px;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-login:hover { background: var(--navy); color: #fff; }

.btn-gold-pill {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.6rem 1.5rem;
  background: var(--navy);
  color: #fff;
  border-radius: 8px;
  font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
  text-decoration: none;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  white-space: nowrap;
  border: none; cursor: pointer;
}
.btn-gold-pill:hover {
  background: var(--gold);
  color: #fff;
  box-shadow: 0 6px 24px rgba(184,130,42,0.35);
  transform: translateY(-1px);
}

.hamburger {
  display: none;
  background: none; border: none; cursor: pointer;
  font-size: 1.5rem; color: var(--navy);
}

.mobile-nav {
  display: flex; flex-direction: column;
  padding: 1rem 2rem 1.5rem;
  gap: 0.25rem;
  background: var(--white);
  border-top: 1px solid var(--border-card);
  box-shadow: var(--shadow-md);
}
.mobile-nav-link {
  background: none; border: none; cursor: pointer;
  padding: 0.7rem 0;
  font-size: 0.88rem; font-weight: 700;
  color: var(--text-body); text-align: left; letter-spacing: 0.05em; text-transform: uppercase;
  border-bottom: 1px solid rgba(10,22,40,0.05);
}
.mobile-nav-link:hover { color: var(--gold); }
.mobile-cta { margin-top: 0.75rem; }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: block; }
  .nav-right .btn-gold-pill,
  .nav-right .btn-login { display: none; }
}

/* ── Right social sidebar ─────────────────────────────────── */
.social-sidebar {
  position: fixed;
  right: 0; top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex; flex-direction: column;
  gap: 0;
}
.ss-btn {
  display: flex; align-items: center; justify-content: center;
  width: 42px; height: 42px;
  background: var(--white);
  color: var(--text-dim);
  text-decoration: none;
  border-left: 1px solid var(--border-card);
  border-top: 1px solid var(--border-card);
  box-shadow: -2px 0 8px rgba(10,22,40,0.06);
  transition: color 0.15s, background 0.15s;
}
.ss-btn:first-child { border-radius: 8px 0 0 0; }
.ss-btn:last-child  { border-radius: 0 0 0 8px; border-bottom: 1px solid var(--border-card); }
.ss-btn svg { width: 16px; height: 16px; }
.ss-btn:hover { color: var(--white); background: var(--gold); border-color: var(--gold); }

@media (max-width: 640px) { .social-sidebar { display: none; } }

/* ── Floating Book Now ────────────────────────────────────── */
.fab {
  position: fixed;
  bottom: 1.5rem; right: 1.5rem;
  z-index: 150;
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.2rem;
  background: var(--navy);
  color: #fff;
  border-radius: 10px;
  font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.07em;
  text-decoration: none;
  box-shadow: var(--shadow-md);
  transition: all 0.2s;
}
.fab:hover {
  background: var(--gold);
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(184,130,42,0.4);
}

/* ── Shared section utility ───────────────────────────────── */
.section-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}
.gold-badge {
  display: inline-flex; align-items: center; gap: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.3rem 0.9rem;
  font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--gold);
  background: var(--gold-pale);
}
.gold-badge::before { content: '◆'; font-size: 0.5rem; }
.serif { font-family: 'Playfair Display', serif; }
.text-gold { color: var(--gold); }
.text-dim  { color: var(--text-dim); }
</style>
