<template>
  <main :class="$style.home">
    <section :class="$style.hero">
      <div :class="$style.heroCopy">
        <div :class="$style.eyebrow">Personal Finance by Chandu</div>
        <h1>Your motto : Making everyone financially literate.</h1>
        <p>
          Practical guidance for protection, planning, investing, and better financial decisions
          for Indian families and professionals.
        </p>
        <div :class="$style.heroActions">
          <a href="https://forms.gle/EkH6AssiWStjz4Jq5" :class="$style.primaryAction">Connect now</a>
          <a href="https://www.youtube.com/@PersonalFinancebyChandu" :class="$style.secondaryAction"
            >Watch videos</a
          >
        </div>
      </div>
      <div :class="$style.quotePanel">
        <div v-for="quote in financeQuotes" :key="quote.text" :class="$style.quoteCard">
          <p>{{ quote.text }}</p>
          <span>{{ quote.author }}</span>
        </div>
      </div>
    </section>

    <section id="services" :class="$style.section">
      <div :class="$style.sectionHeader">
        <span>Services Provided</span>
        <h2>One place for protection, planning, and wealth decisions.</h2>
      </div>
      <div :class="$style.servicesGrid">
        <article v-for="service in services" :key="service.title" :class="$style.serviceCard">
          <div :class="$style.serviceIcon">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.copy }}</p>
        </article>
      </div>
    </section>

    <section id="testimonials" :class="$style.section">
      <div :class="$style.sectionHeader">
        <span>Client testimonials</span>
        <h2>Guidance that feels practical, calm, and actionable.</h2>
      </div>
      <div :class="$style.testimonialsGrid">
        <article v-for="testimonial in testimonials" :key="testimonial.role" :class="$style.testimonialCard">
          <p>{{ testimonial.copy }}</p>
          <div>
            <strong>{{ testimonial.name }}</strong>
            <span>{{ testimonial.role }}</span>
          </div>
        </article>
      </div>
    </section>

    <section id="videos" :class="$style.section">
      <div :class="$style.videoHeader">
        <div :class="$style.sectionHeader">
          <span>YouTube insights</span>
          <h2>Top videos from Personal Finance by Chandu.</h2>
        </div>
        <a href="https://www.youtube.com/@PersonalFinancebyChandu" :class="$style.channelLink">
          Visit channel
        </a>
      </div>
      <div :class="$style.videoScroller" aria-label="Featured YouTube videos">
        <article v-for="video in videos" :key="video.id" :class="$style.videoCard">
          <iframe
            :src="`https://www.youtube.com/embed/${video.id}`"
            :title="video.title"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <div :class="$style.videoMeta">
            <h3>{{ video.title }}</h3>
            <span>{{ video.views }} views</span>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const financeQuotes = [
  {
    text: 'Do not save what is left after spending, but spend what is left after saving.',
    author: 'Warren Buffett'
  },
  {
    text: 'An investment in knowledge pays the best interest.',
    author: 'Benjamin Franklin'
  },
  {
    text: 'The habit of saving is itself an education.',
    author: 'T. T. Munger'
  }
];

const services = [
  {
    title: 'Term Insurance',
    copy: 'Right-sized cover planning so your family has protection before wealth creation begins.',
    icon: 'TI'
  },
  {
    title: 'Health Insurance',
    copy: 'Coverage review for family medical risks, room limits, waiting periods, and claim comfort.',
    icon: 'HI'
  },
  {
    title: 'Retirement Planning',
    copy: 'Goal-based planning for future monthly income, inflation, and long-term independence.',
    icon: 'RP'
  },
  {
    title: 'Wealth Management',
    copy: 'Structured asset allocation across emergency funds, equity, debt, and major life goals.',
    icon: 'WM'
  },
  {
    title: 'Mutual Fund Portfolio Handling',
    copy: 'Portfolio review, overlap checks, SIP strategy, and disciplined long-term tracking.',
    icon: 'MF'
  }
];

const testimonials = [
  {
    copy: 'The advice was simple to understand and helped us prioritize term insurance, emergency fund, and SIPs in the right order.',
    name: 'Client feedback',
    role: 'Software professional, Hyderabad'
  },
  {
    copy: 'The home loan prepayment explanation made the numbers clear. We finally knew how much extra payment could reduce our tenure.',
    name: 'Client feedback',
    role: 'Home loan borrower'
  },
  {
    copy: 'The portfolio review helped remove confusion and made our mutual fund investments more goal-focused.',
    name: 'Client feedback',
    role: 'Long-term investor'
  }
];

const videos = [
  {
    id: '6ExT_EDvA84',
    title: '2 Lakhs Monthly Income - Software Salary Secrets',
    views: '7.4K'
  },
  {
    id: 'iIcJayqChDQ',
    title: 'Saree business risks?',
    views: '2.9K'
  },
  {
    id: 'QEAwrhp2m8o',
    title: 'Mistakes to avoid while buying a house',
    views: '2.7K'
  },
  {
    id: 'pXBohL6jVMc',
    title: 'Petrol Scarcity Real or Panic?',
    views: '2.5K'
  },
  {
    id: 'rcQKnWyN0pk',
    title: 'Emergency fund ekkada pettali?',
    views: '2.2K'
  }
];
</script>

<style module>
.home {
  width: min(1180px, calc(100% - 2rem));
  margin: 1.2rem auto 0;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
  gap: 1rem;
  align-items: stretch;
  border: 1px solid #dbe8df;
  border-radius: 24px;
  background:
    radial-gradient(circle at 12% 18%, rgba(34, 197, 94, 0.28), transparent 28%),
    linear-gradient(135deg, #0f2b1e 0%, #0b3b2e 52%, #172554 100%);
  padding: 1.2rem;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.14);
}

.heroCopy {
  padding: clamp(1.2rem, 4vw, 2.4rem);
  color: #ffffff;
}

.eyebrow,
.sectionHeader span {
  display: inline-block;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.eyebrow {
  border: 1px solid rgba(187, 247, 208, 0.35);
  background: rgba(255, 255, 255, 0.12);
  color: #bbf7d0;
  padding: 5px 12px;
}

.hero h1 {
  max-width: 760px;
  margin: 0.9rem 0 0;
  font-size: clamp(2rem, 5.4vw, 4.6rem);
  line-height: 0.98;
  letter-spacing: 0;
}

.hero p {
  max-width: 620px;
  margin: 1rem 0 0;
  color: #d1fae5;
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  line-height: 1.6;
}

.heroActions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.4rem;
}

.primaryAction,
.secondaryAction,
.channelLink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.72rem 1rem;
  font-size: 13px;
  font-weight: 900;
  text-decoration: none;
}

.primaryAction {
  background: #ffffff;
  color: #047857;
}

.secondaryAction,
.channelLink {
  border: 1px solid #86efac;
  color: #bbf7d0;
}

.quotePanel {
  display: grid;
  gap: 0.75rem;
}

.quoteCard {
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.12);
  padding: 1rem;
  color: #ffffff;
  backdrop-filter: blur(12px);
}

.quoteCard p {
  margin: 0;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.45;
}

.quoteCard span {
  display: block;
  margin-top: 0.7rem;
  color: #bbf7d0;
  font-size: 12px;
  font-weight: 800;
}

.section {
  margin-top: 1rem;
  border: 1px solid #dbe8df;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.9);
  padding: 1.2rem;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);
}

.sectionHeader {
  max-width: 720px;
}

.sectionHeader span {
  background: #ecfdf5;
  color: #047857;
  padding: 5px 11px;
}

.sectionHeader h2 {
  margin: 0.7rem 0 0;
  color: #0f172a;
  font-size: clamp(1.35rem, 3vw, 2.1rem);
  line-height: 1.12;
}

.servicesGrid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1rem;
}

.serviceCard,
.testimonialCard,
.videoCard {
  border: 1px solid #dbe8df;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
}

.serviceCard {
  padding: 1rem;
}

.serviceIcon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, #047857, #16a34a 58%, #38bdf8);
  color: #ffffff;
  font-weight: 900;
}

.serviceCard h3,
.videoMeta h3 {
  margin: 0.8rem 0 0;
  color: #0f172a;
  font-size: 1rem;
  line-height: 1.25;
}

.serviceCard p,
.testimonialCard p {
  margin: 0.55rem 0 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
}

.testimonialsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  margin-top: 1rem;
}

.testimonialCard {
  padding: 1rem;
}

.testimonialCard strong,
.testimonialCard span {
  display: block;
}

.testimonialCard strong {
  margin-top: 0.9rem;
  color: #0f172a;
}

.testimonialCard span {
  margin-top: 0.2rem;
  color: #047857;
  font-size: 12px;
  font-weight: 800;
}

.videoHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.channelLink {
  flex: 0 0 auto;
  border-color: #10b981;
  color: #047857;
}

.videoScroller {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(280px, 420px);
  gap: 0.9rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scroll-snap-type: x proximity;
}

.videoCard {
  overflow: hidden;
  scroll-snap-align: start;
}

.videoCard iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: block;
  border: 0;
  background: #0f172a;
}

.videoMeta {
  padding: 0.85rem;
}

.videoMeta span {
  display: block;
  margin-top: 0.35rem;
  color: #047857;
  font-size: 12px;
  font-weight: 800;
}

@media (max-width: 980px) {
  .hero,
  .servicesGrid,
  .testimonialsGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .home {
    width: calc(100% - 1rem);
  }

  .hero,
  .section {
    border-radius: 18px;
    padding: 0.8rem;
  }

  .heroCopy {
    padding: 1rem;
  }

  .videoHeader {
    flex-direction: column;
  }

  .videoScroller {
    grid-auto-columns: minmax(260px, 86vw);
  }
}
</style>
