<template>
  <div class="home">

    <!-- ── HERO ───────────────────────────────────────────── -->
    <section id="home" class="hero">
      <!-- Decorative blobs -->
      <div class="hero-blob hero-blob-1"></div>
      <div class="hero-blob hero-blob-2"></div>

      <div class="hero-content">
        <div class="hero-eyebrow">
          <span class="hero-arn-badge">{{ cfg.brand.arnNumber }}</span>
          {{ cfg.brand.amfiBadge }}
        </div>

        <h1 class="hero-h1 serif">
          {{ cfg.hero.headline1 }}<br/>
          <em class="hero-em">{{ cfg.hero.headlineGold }}</em>
          {{ cfg.hero.headline2 }}
        </h1>

        <p class="hero-sub">{{ cfg.hero.subtext }}</p>

        <div class="hero-ctas">
          <a :href="cfg.hero.cta1Link" target="_blank" class="btn-gold-pill hero-cta1">
            {{ cfg.hero.cta1Text }}
          </a>
          <button class="hero-cta2" @click="$emit('goto-calc')">
            {{ cfg.hero.cta2Text }}
          </button>
        </div>

        <!-- Inline stat chips -->
        <div class="hero-chips">
          <div v-for="s in cfg.stats" :key="s.label" class="hero-chip">
            <span class="hc-value serif">{{ s.value }}</span>
            <span class="hc-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── QUOTE STRIP ───────────────────────────────────── -->
    <section class="quote-strip">
      <div class="section-wrap">
        <div class="qs-inner">
          <div
            v-for="(q, i) in cfg.quotes"
            :key="i"
            class="qs-item"
            :class="{ 'qs-active': activeQuote === i }"
            @click="activeQuote = i"
          >
            <p class="qs-text serif">"{{ q.text }}"</p>
            <span class="qs-author">— {{ q.author }}</span>
          </div>
        </div>
        <div class="qs-dots">
          <button
            v-for="(q, i) in cfg.quotes"
            :key="i"
            class="qs-dot"
            :class="{ active: activeQuote === i }"
            @click="activeQuote = i"
          ></button>
        </div>
      </div>
    </section>

    <!-- ── SERVICES ──────────────────────────────────────── -->
    <section id="services" class="services-section">
      <div class="section-wrap">
        <div class="section-header">
          <div class="gold-badge">{{ cfg.services.badgeText }}</div>
          <h2 class="section-h2 serif">
            {{ cfg.services.heading1 }}
            <span class="text-gold">{{ cfg.services.headingGold }}</span>
          </h2>
          <p class="section-sub text-dim">{{ cfg.services.subtext }}</p>
        </div>

        <div class="services-grid">
          <article v-for="card in cfg.services.cards" :key="card.title" class="service-card">
            <div class="sc-icon">{{ card.icon }}</div>
            <h3 class="sc-title serif">{{ card.title }}</h3>
            <p class="sc-copy text-dim">{{ card.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ── ABOUT SPLIT ────────────────────────────────────── -->
    <section id="about" class="about-section">
      <div class="section-wrap about-inner">
        <!-- Left: photo -->
        <div class="about-photo-wrap">
          <div class="about-photo-frame">
            <img
              v-if="cfg.about.photo"
              :src="cfg.about.photo"
              :alt="cfg.brand.name + ' ' + cfg.brand.nameAccent"
              class="about-photo"
              @error="photoError = true"
            />
            <!-- Placeholder when photo not set -->
            <div v-if="photoError || !cfg.about.photo" class="about-photo-placeholder">
              <span>📸</span>
              <p>Add your photo to<br/><code>public/chandu-photo.jpg</code></p>
            </div>
          </div>
          <!-- Badge overlay -->
          <div class="about-badge">
            <span class="ab-icon">🛡️</span>
            <div>
              <div class="ab-title">{{ cfg.about.photoCaption }}</div>
              <div v-if="cfg.brand.arnNumber" class="ab-sub">{{ cfg.brand.arnNumber }}</div>
            </div>
          </div>
        </div>

        <!-- Right: features -->
        <div class="about-copy">
          <div class="gold-badge">{{ cfg.about.badgeText }}</div>
          <h2 class="about-h2 serif">
            {{ cfg.about.heading1 }}<br/>
            <span class="text-gold">{{ cfg.about.headingGold }}</span>
          </h2>
          <p class="about-sub text-dim">{{ cfg.about.subtext }}</p>

          <ul class="about-features">
            <li v-for="f in cfg.about.features" :key="f" class="af-item">
              <span class="af-check text-gold">◎</span>
              <span>{{ f }}</span>
            </li>
          </ul>

          <div class="certifications">
            <div v-for="c in cfg.about.certifications" :key="c.label" class="cert-pill">
              <span>{{ c.icon }}</span>
              <span>{{ c.label }}</span>
            </div>
          </div>

          <a :href="cfg.about.ctaLink" target="_blank" class="btn-gold-pill about-cta">
            {{ cfg.about.ctaText }}
          </a>
        </div>
      </div>
    </section>

    <!-- ── CALCULATOR CTA STRIP ───────────────────────────── -->
    <section id="calc" class="calc-strip">
      <div class="section-wrap calc-strip-inner">
        <div>
          <h3 class="serif cs-h3">Free <span class="text-gold">Financial Calculators</span></h3>
          <p class="text-dim cs-p">SIP · Lumpsum · Step-Up SIP · SWP · Home Loan Prepayment · EV vs Petrol</p>
        </div>
        <button class="btn-gold-pill" @click="$emit('goto-calc')">Open Calculator →</button>
      </div>
    </section>

    <!-- ── TESTIMONIALS ───────────────────────────────────── -->
    <section class="testimonials-section">
      <div class="section-wrap">
        <div class="section-header">
          <div class="gold-badge">{{ cfg.testimonials.badgeText }}</div>
          <h2 class="section-h2 serif">
            {{ cfg.testimonials.heading1 }}<br/>
            <span class="text-gold">{{ cfg.testimonials.headingGold }}</span>
          </h2>
        </div>
        <div class="testimonials-grid">
          <article v-for="t in cfg.testimonials.items" :key="t.name" class="testimonial-card">
            <div class="tc-stars text-gold">★★★★★</div>
            <p class="tc-quote">"{{ t.quote }}"</p>
            <div class="tc-footer">
              <strong class="tc-name">{{ t.name }}</strong>
              <span class="tc-role text-gold">{{ t.role }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── YOUTUBE VIDEOS CAROUSEL ──────────────────────────── -->
    <section id="videos" class="videos-section">
      <div class="section-wrap">
        <div class="videos-header">
          <div>
            <div class="gold-badge">{{ cfg.videos.badgeText }}</div>
            <h2 class="section-h2 serif">
              {{ cfg.videos.heading1 }}<br/>
              <span class="text-gold">{{ cfg.videos.headingGold }}</span>
            </h2>
          </div>
          <a :href="cfg.videos.channelUrl" target="_blank" class="channel-link">
            {{ cfg.videos.channelText }}
          </a>
        </div>

        <!-- Carousel wrapper -->
        <div class="carousel" @keydown.left="prevSlide" @keydown.right="nextSlide" tabindex="0">
          <!-- Track — shows 3 at a time on desktop, 1 on mobile -->
          <div class="carousel-track-wrap">
            <div
              class="carousel-track"
              :style="{ transform: `translateX(-${carouselOffset}%)` }"
            >
              <article
                v-for="(v, i) in cfg.videos.items"
                :key="v.id"
                class="carousel-card"
                :class="{ 'carousel-card--active': isVisible(i) }"
              >
                <!-- Thumbnail click → embed swap -->
                <div class="cc-thumb" @click="playingId = playingId === v.id ? null : v.id">
                  <template v-if="playingId === v.id">
                    <iframe
                      :src="`https://www.youtube.com/embed/${v.id}?autoplay=1`"
                      :title="v.title"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </template>
                  <template v-else>
                    <img
                      :src="`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`"
                      :alt="v.title"
                      loading="lazy"
                    />
                    <div class="cc-play">
                      <svg viewBox="0 0 24 24" fill="white" width="40" height="40">
                        <circle cx="12" cy="12" r="12" fill="rgba(11,110,79,0.85)"/>
                        <polygon points="9.5,7 18,12 9.5,17" fill="white"/>
                      </svg>
                    </div>
                    <div class="cc-views-badge">{{ v.views }}</div>
                  </template>
                </div>
                <div class="vc-meta">
                  <h3 class="vc-title">{{ v.title }}</h3>
                </div>
              </article>
            </div>
          </div>

          <!-- Prev / Next arrows -->
          <button class="carousel-btn carousel-btn--prev" @click="prevSlide" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button class="carousel-btn carousel-btn--next" @click="nextSlide" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <!-- Dot indicators -->
          <div class="carousel-dots">
            <button
              v-for="(_, i) in cfg.videos.items"
              :key="i"
              class="carousel-dot"
              :class="{ 'carousel-dot--active': i === carouselIndex }"
              @click="goToSlide(i)"
              :aria-label="`Video ${i + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CONTACT CTA ────────────────────────────────────── -->
    <section class="contact-section">
      <div class="section-wrap contact-inner">
        <div class="gold-badge">{{ cfg.contact.badgeText }}</div>
        <h2 class="contact-h2 serif">
          {{ cfg.contact.heading1 }}<br/>
          <span class="text-gold">{{ cfg.contact.headingGold }}</span>
        </h2>
        <p class="contact-sub text-dim">{{ cfg.contact.subtext }}</p>
        <a :href="cfg.contact.ctaLink" target="_blank" class="btn-gold-pill contact-cta">
          {{ cfg.contact.ctaText }}
        </a>
      </div>
    </section>

    <!-- ── FOOTER ─────────────────────────────────────────── -->
    <footer class="footer">
      <div class="section-wrap footer-inner">
        <!-- Left brand -->
        <div class="footer-brand">
          <div class="footer-logo serif">
            {{ cfg.brand.name }}<span class="text-gold">{{ cfg.brand.nameAccent }}</span>
          </div>
          <p class="footer-desc text-dim">{{ cfg.footer.description }}</p>
          <div class="footer-socials">
            <a v-if="cfg.social.whatsapp"  :href="cfg.social.whatsapp"  target="_blank" class="fsoc">WA</a>
            <a v-if="cfg.social.youtube"   :href="cfg.social.youtube"   target="_blank" class="fsoc">YT</a>
            <a v-if="cfg.social.instagram" :href="cfg.social.instagram" target="_blank" class="fsoc">IG</a>
            <a v-if="cfg.social.linkedin"  :href="cfg.social.linkedin"  target="_blank" class="fsoc">IN</a>
          </div>
        </div>

        <!-- Resources -->
        <div class="footer-col">
          <h4 class="footer-col-title text-gold">RESOURCES</h4>
          <a
            v-for="r in cfg.footer.resources"
            :key="r.label"
            class="footer-link"
            href="#"
            @click.prevent="'isCalc' in r ? $emit('goto-calc') : scrollToId(r.href)"
          >{{ r.label }}</a>
        </div>

        <!-- Connect -->
        <div class="footer-col">
          <h4 class="footer-col-title text-gold">CONNECT</h4>
          <div class="footer-contact-row">
            <span class="text-gold">📍</span>
            <span class="text-dim">{{ cfg.footer.address }}</span>
          </div>
          <div class="footer-contact-row">
            <span class="text-gold">✉</span>
            <a :href="`mailto:${cfg.footer.email}`" class="footer-email">{{ cfg.footer.email }}</a>
          </div>
          <a :href="cfg.contact.ctaLink" target="_blank" class="footer-portal-btn">
            CONNECT NOW ↗
          </a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom">
        <div class="section-wrap footer-bottom-inner">
          <span>© {{ cfg.footer.copyrightYear }} {{ cfg.brand.name }}{{ cfg.brand.nameAccent }}. All rights reserved.</span>
          <span class="text-dim footer-disclaimer">{{ cfg.footer.disclaimer }}</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { siteConfig as cfg } from '../site.config'

defineEmits<{ (e: 'goto-calc'): void }>()

const photoError   = ref(false)
const activeQuote  = ref(0)
let   quoteTimer: ReturnType<typeof setInterval>

// ── Carousel ─────────────────────────────────────────────────
const carouselIndex  = ref(0)
const playingId      = ref<string | null>(null)
const slidesPerView  = ref(3)   // updated on resize

function updateSlidesPerView() {
  slidesPerView.value = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3
}

const maxIndex = computed(() => Math.max(0, cfg.videos.items.length - slidesPerView.value))
const carouselOffset = computed(() => carouselIndex.value * (100 / slidesPerView.value))

function isVisible(i: number) {
  return i >= carouselIndex.value && i < carouselIndex.value + slidesPerView.value
}

function goToSlide(i: number) {
  carouselIndex.value = Math.min(Math.max(0, i), maxIndex.value)
  playingId.value = null
}
function nextSlide() { goToSlide(carouselIndex.value + 1) }
function prevSlide() { goToSlide(carouselIndex.value - 1) }

onMounted(() => {
  quoteTimer = setInterval(() => {
    activeQuote.value = (activeQuote.value + 1) % cfg.quotes.length
  }, 5000)
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
})
onUnmounted(() => {
  clearInterval(quoteTimer)
  window.removeEventListener('resize', updateSlidesPerView)
})

function scrollToId(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.home { padding-top: 72px; }

/* ── Hero (centered, no orb) ───────────────────────────────── */
.hero {
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7rem 2rem 5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: var(--cream);
}
/* Decorative blobs */
.hero-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}
.hero-blob-1 {
  width: 50vw; height: 50vw;
  top: -15%; left: -12%;
  background: radial-gradient(circle, rgba(11,110,79,0.07) 0%, transparent 70%);
}
.hero-blob-2 {
  width: 40vw; height: 40vw;
  bottom: -10%; right: -8%;
  background: radial-gradient(circle, rgba(224,123,24,0.08) 0%, transparent 70%);
}
.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  max-width: 820px;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-body);
}
.hero-arn-badge {
  background: var(--navy);
  color: #fff;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}
.hero-h1 {
  font-size: clamp(2.8rem, 6vw, 5.2rem);
  font-weight: 900;
  color: var(--text);
  line-height: 1.06;
  letter-spacing: -0.03em;
}
.hero-em { font-style: italic; color: var(--navy); }
.hero-sub {
  max-width: 540px;
  color: var(--text-body);
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  line-height: 1.8;
}
.hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
.hero-cta1 { font-size: 0.85rem; }
.hero-cta2 {
  padding: 0.65rem 1.6rem;
  border: 2px solid var(--navy);
  border-radius: 8px;
  color: var(--navy);
  background: transparent;
  font-size: 0.78rem; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.hero-cta2:hover { background: var(--navy); color: #fff; }

/* Stat chips row inside hero */
.hero-chips {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}
.hero-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.9rem 1.6rem;
  background: var(--white);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
}
.hc-value {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--navy);
  line-height: 1;
}
.hc-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
}

/* ── Quote strip ───────────────────────────────────────────── */
.quote-strip {
  padding: 5rem 0;
  background: var(--navy);
  position: relative;
  overflow: hidden;
}
.quote-strip::before {
  content: '"';
  position: absolute;
  top: -0.5rem; left: max(2rem, calc((100vw - 1280px) / 2));
  font-family: 'Playfair Display', serif;
  font-size: 16rem;
  color: rgba(212,168,83,0.06);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.qs-inner {
  min-height: 140px;
  position: relative;
}
.qs-item {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 780px;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  pointer-events: none;
}
.qs-item.qs-active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  position: relative;
}
.qs-text {
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
  font-weight: 700;
  font-style: italic;
  color: #fff;
  line-height: 1.55;
  letter-spacing: -0.01em;
}
.qs-author {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
}
.qs-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}
.qs-dot {
  width: 24px; height: 3px;
  border-radius: 2px;
  border: none;
  background: rgba(255,255,255,0.2);
  cursor: pointer;
  transition: background 0.3s, width 0.3s;
}
.qs-dot.active {
  background: var(--gold);
  width: 40px;
}

/* ── Services ──────────────────────────────────────────────── */
.services-section { padding: 7rem 0; background: var(--white); }
.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.section-h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: var(--navy);
  line-height: 1.15;
}
.section-sub { max-width: 520px; font-size: 0.95rem; line-height: 1.7; color: var(--text-body); }

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
.service-card {
  background: var(--cream);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 2rem 1.6rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}
.service-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 1.6rem; right: 1.6rem;
  height: 3px;
  background: linear-gradient(90deg, var(--gold), var(--gold-light));
  border-radius: 2px 2px 0 0;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.service-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(184,130,42,0.15);
}
.service-card:hover::after { transform: scaleX(1); }
.sc-icon {
  font-size: 2rem;
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px; height: 52px;
  background: var(--gold-pale);
  border-radius: 14px;
}
.sc-title { font-size: 1.05rem; font-weight: 700; color: var(--navy); margin-bottom: 0.6rem; }
.sc-copy  { font-size: 0.85rem; line-height: 1.7; color: var(--text-body); }

/* ── About split ───────────────────────────────────────────── */
.about-section { padding: 7rem 0; background: var(--cream-2); }
.about-inner {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 5rem;
  align-items: center;
}
.about-photo-wrap { position: relative; max-width: 300px; justify-self: center; }
.about-photo-frame {
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 3/4;
  max-width: 300px;
  background: linear-gradient(145deg, var(--cream-3), var(--gold-pale));
  border: 3px solid rgba(11,110,79,0.12);
  box-shadow: var(--shadow-lg);
}
.about-photo { width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.about-photo-placeholder {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 1rem; color: var(--text-dim); font-size: 0.85rem; text-align: center; padding: 2rem;
}
.about-photo-placeholder span { font-size: 3rem; }
.about-photo-placeholder code {
  background: var(--gold-pale); padding: 0.25rem 0.5rem;
  border-radius: 4px; font-size: 0.78rem; color: var(--gold);
}

.about-badge {
  position: absolute;
  bottom: 1.5rem; right: -1rem;
  background: var(--white);
  border: 1px solid var(--border-card);
  border-radius: 14px;
  padding: 0.85rem 1.1rem;
  display: flex; align-items: center; gap: 0.7rem;
  box-shadow: var(--shadow-md);
}
.ab-icon  { font-size: 1.4rem; }
.ab-title { font-size: 0.75rem; font-weight: 800; color: var(--navy); text-transform: uppercase; letter-spacing: 0.07em; }
.ab-sub   { font-size: 0.68rem; color: var(--text-dim); margin-top: 0.15rem; }

.about-copy { display: flex; flex-direction: column; gap: 1.5rem; }
.about-h2 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 900; color: var(--navy); line-height: 1.15; }
.about-sub { font-size: 0.95rem; line-height: 1.75; color: var(--text-body); }

.about-features { list-style: none; display: flex; flex-direction: column; gap: 0.8rem; }
.af-item {
  display: flex; align-items: center; gap: 0.9rem;
  font-size: 0.9rem; font-weight: 600; color: var(--text);
  padding: 0.6rem 0.8rem;
  background: var(--white);
  border-radius: 10px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-sm);
}
.af-check { font-size: 1rem; flex-shrink: 0; color: var(--gold); }

.certifications { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.cert-pill {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.45rem 1rem;
  border: 1.5px solid var(--gold);
  border-radius: 8px;
  font-size: 0.75rem; font-weight: 800; color: var(--navy); letter-spacing: 0.05em;
  background: var(--gold-pale);
}

.about-cta { align-self: flex-start; }

/* ── Calculator strip ──────────────────────────────────────── */
.calc-strip {
  padding: 3.5rem 0;
  background: var(--navy);
}
.calc-strip-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}
.cs-h3 { font-size: clamp(1.2rem, 2.5vw, 1.7rem); color: #fff; margin-bottom: 0.35rem; }
.cs-p  { font-size: 0.88rem; color: rgba(255,255,255,0.55); }

/* ── Testimonials ──────────────────────────────────────────── */
.testimonials-section { padding: 7rem 0; background: var(--white); }
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.testimonial-card {
  background: var(--cream);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 2rem;
  display: flex; flex-direction: column; gap: 1.1rem;
  transition: transform 0.25s, box-shadow 0.25s;
}
.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
.tc-stars { font-size: 0.9rem; letter-spacing: 3px; color: var(--gold); }
.tc-quote {
  font-size: 0.92rem; line-height: 1.8; color: var(--text-body); flex: 1;
  font-style: italic;
  padding-left: 1rem;
  border-left: 3px solid var(--gold);
}
.tc-footer { display: flex; flex-direction: column; gap: 0.2rem; }
.tc-name  { font-size: 0.9rem; font-weight: 800; color: var(--navy); }
.tc-role  { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em; color: var(--gold); }

/* ── Videos carousel ───────────────────────────────────────── */
.videos-section { padding: 7rem 0; background: var(--cream-2); }
.videos-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}
.channel-link {
  display: inline-flex; align-items: center;
  padding: 0.55rem 1.3rem;
  border: 2px solid var(--navy);
  border-radius: 8px;
  color: var(--navy);
  background: var(--white);
  text-decoration: none;
  font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
  transition: all 0.2s;
  white-space: nowrap;
  align-self: flex-end;
  box-shadow: var(--shadow-sm);
}
.channel-link:hover { background: var(--navy); color: #fff; }

/* Carousel container */
.carousel {
  position: relative;
  outline: none;
}
.carousel-track-wrap {
  overflow: hidden;
  border-radius: 20px;
}
.carousel-track {
  display: flex;
  transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.carousel-card {
  flex: 0 0 calc(100% / 3);
  padding: 0 0.75rem;
  box-sizing: border-box;
  opacity: 0.45;
  transition: opacity 0.35s;
}
.carousel-card--active { opacity: 1; }

.cc-thumb {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/9;
  background: #111;
  cursor: pointer;
}
.cc-thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}
.cc-thumb:hover img { transform: scale(1.04); }
.cc-thumb iframe {
  width: 100%; height: 100%;
  border: 0; display: block;
}
.cc-play {
  position: absolute;
  inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.15);
  transition: background 0.2s;
}
.cc-thumb:hover .cc-play { background: rgba(0,0,0,0.05); }
.cc-views-badge {
  position: absolute;
  top: 0.6rem; right: 0.6rem;
  background: rgba(11,110,79,0.92);
  color: #fff;
  font-size: 0.68rem; font-weight: 800;
  letter-spacing: 0.06em;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}
.vc-meta { padding: 0.9rem 0.25rem 0; }
.vc-title {
  font-size: 0.85rem; font-weight: 700;
  color: var(--text); line-height: 1.45;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

/* Arrows */
.carousel-btn {
  position: absolute;
  top: calc(50% - 2rem);   /* vertically centred on the thumbnail */
  transform: translateY(-50%);
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 2px solid var(--border-card);
  background: var(--white);
  color: var(--navy);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  z-index: 10;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.carousel-btn:hover { background: var(--navy); color: #fff; border-color: var(--navy); }
.carousel-btn--prev { left: -22px; }
.carousel-btn--next { right: -22px; }

/* Dots */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 1.75rem;
}
.carousel-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(11,110,79,0.2);
  cursor: pointer;
  transition: background 0.25s, transform 0.25s, width 0.25s;
}
.carousel-dot--active {
  background: var(--navy);
  width: 24px;
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .carousel-card { flex: 0 0 50%; }
  .carousel-btn--prev { left: -16px; }
  .carousel-btn--next { right: -16px; }
}
@media (max-width: 640px) {
  .carousel-card { flex: 0 0 100%; padding: 0; }
  .carousel-btn--prev { left: 0; }
  .carousel-btn--next { right: 0; }
}

/* ── Contact CTA ───────────────────────────────────────────── */
.contact-section {
  padding: 8rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: var(--navy);
}
.contact-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,130,42,0.12) 0%, transparent 65%);
  pointer-events: none;
}
.contact-inner {
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
  position: relative; z-index: 1;
}
.contact-h2 {
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
}
.contact-sub { max-width: 480px; font-size: 1rem; line-height: 1.7; color: rgba(255,255,255,0.65); }
.contact-cta {
  background: var(--gold) !important;
  color: #fff !important;
  font-size: 0.92rem; padding: 0.9rem 2.2rem;
  border-radius: 10px !important;
}
.contact-cta:hover {
  background: var(--gold-light) !important;
  box-shadow: 0 8px 32px rgba(184,130,42,0.5) !important;
}

/* ── Footer ─────────────────────────────────────────────────── */
.footer {
  background: var(--navy);
  border-top: 1px solid rgba(255,255,255,0.06);
}
.footer-inner {
  display: grid;
  grid-template-columns: 1.8fr 1fr 1.2fr;
  gap: 3rem;
  padding-top: 4rem;
  padding-bottom: 3rem;
}
.footer-logo { font-size: 1.3rem; font-weight: 900; color: #fff; margin-bottom: 0.75rem; }
.footer-desc { font-size: 0.85rem; line-height: 1.65; max-width: 280px; color: rgba(255,255,255,0.5); }
.footer-socials { display: flex; gap: 0.6rem; margin-top: 1.25rem; }
.fsoc {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  font-size: 0.7rem; font-weight: 800;
  color: rgba(255,255,255,0.4); text-decoration: none;
  transition: all 0.15s;
}
.fsoc:hover { background: var(--gold); border-color: var(--gold); color: #fff; }

.footer-col { display: flex; flex-direction: column; gap: 0.8rem; }
.footer-col-title {
  font-size: 0.68rem; font-weight: 800; letter-spacing: 0.16em;
  margin-bottom: 0.25rem; color: var(--gold);
  font-family: 'Inter', sans-serif; text-transform: uppercase;
}
.footer-link {
  color: rgba(255,255,255,0.5); text-decoration: none;
  font-size: 0.85rem; font-weight: 500;
  transition: color 0.15s;
}
.footer-link:hover { color: #fff; }

.footer-contact-row { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.83rem; color: rgba(255,255,255,0.5); }
.footer-email { color: rgba(255,255,255,0.5); text-decoration: none; }
.footer-email:hover { color: var(--gold); }

.footer-portal-btn {
  display: inline-flex; align-items: center;
  margin-top: 0.5rem;
  padding: 0.55rem 1.1rem;
  border: 1.5px solid var(--gold);
  border-radius: 8px;
  color: var(--gold);
  font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em;
  text-decoration: none;
  transition: all 0.15s;
  align-self: flex-start;
}
.footer-portal-btn:hover { background: var(--gold); color: #fff; }

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 1.25rem 0;
}
.footer-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
}
.footer-disclaimer { text-align: right; max-width: 500px; font-style: italic; }

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .hero { padding: 6rem 2rem 4rem; min-height: auto; }
  .about-inner { grid-template-columns: 1fr; gap: 3rem; }
  .about-photo-wrap { max-width: 260px; margin: 0 auto; }
  .about-badge { right: 0; }
  .footer-inner { grid-template-columns: 1fr 1fr; }
  .footer-brand { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  .services-section, .testimonials-section, .videos-section,
  .about-section, .contact-section { padding: 4rem 0; }
  .stat-item { padding: 0.5rem 1.5rem; }
  .calc-strip-inner { flex-direction: column; align-items: flex-start; gap: 1.25rem; }
  .footer-inner { grid-template-columns: 1fr; gap: 2rem; }
  .footer-bottom-inner { flex-direction: column; align-items: flex-start; }
  .footer-disclaimer { text-align: left; }
  .videos-scroller { grid-auto-columns: minmax(260px, 85vw); }
}
</style>
