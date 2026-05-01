<template>
  <div :class="$style.wrapper">
    <div :class="$style.hero">
      <div :class="$style.channelTag">Personal Finance by Chandu</div>
      <h1 :class="$style.title">EV vs Petrol Scooter <span>5-Year Cost Calculator</span></h1>
      <p :class="$style.subtitle">
        Enter your daily usage and compare total 5-year cost with break-even timeline.
      </p>
      <div :class="$style.badges">
        <span :class="$style.badge">Petrol: ₹1.2L</span>
        <span :class="$style.badge">EV: ₹1.7L</span>
        <span :class="$style.badge">2026 baseline assumptions</span>
      </div>
    </div>

    <div :class="$style.main">
      <h3 :class="$style.sectionTitle">Enter Your Details</h3>
      <div :class="$style.card">
        <div :class="$style.sliderGroup">
          <div :class="$style.sliderTop">
            <span :class="$style.sliderName">Daily ride distance</span>
            <span :class="$style.sliderValue">{{ Math.round(dailyKm) }} km</span>
          </div>
          <input v-model.number="dailyKm" type="range" min="2" max="100" step="1" />
          <div :class="$style.sliderHints"><span>2 km</span><span>100 km</span></div>
        </div>
        <div :class="$style.divider"></div>
        <div :class="$style.sliderGroup">
          <div :class="$style.sliderTop">
            <span :class="$style.sliderName">Petrol price (₹/litre)</span>
            <span :class="$style.sliderValue">₹{{ Math.round(petrolPrice) }}</span>
          </div>
          <input v-model.number="petrolPrice" type="range" min="85" max="130" step="1" />
          <div :class="$style.sliderHints"><span>₹85</span><span>₹130</span></div>
        </div>
        <div :class="$style.divider"></div>
        <div :class="$style.sliderGroup">
          <div :class="$style.sliderTop">
            <span :class="$style.sliderName">Electricity price (₹/unit)</span>
            <span :class="$style.sliderValue">₹{{ elecPrice.toFixed(1) }}</span>
          </div>
          <input v-model.number="elecPrice" type="range" min="4" max="12" step="0.5" />
          <div :class="$style.sliderHints"><span>₹4</span><span>₹12</span></div>
        </div>
      </div>

      <div
        :class="[
          $style.verdict,
          result.beMonths === Infinity || result.beMonths > 60
            ? $style.verdictPetrol
            : result.beMonths <= 48
              ? $style.verdictEv
              : $style.verdictNeutral
        ]"
      >
        <div :class="$style.verdictTitle">{{ verdictTitle }}</div>
        <div :class="$style.verdictSub">{{ verdictSub }}</div>
      </div>

      <div :class="$style.metrics">
        <div :class="$style.metric">
          <div :class="$style.metricNum">{{ metricsBreakEvenKm }}</div>
          <div :class="$style.metricUnit">km</div>
          <div :class="$style.metricLabel">Break-even distance</div>
        </div>
        <div :class="[$style.metric, $style.primaryMetric]">
          <div :class="$style.metricNum">{{ metricsBreakEvenMonths }}</div>
          <div :class="$style.metricUnit">months</div>
          <div :class="$style.metricLabel">Break-even time</div>
        </div>
        <div :class="$style.metric">
          <div :class="$style.metricNum">{{ metricsSavings }}</div>
          <div :class="$style.metricUnit">in 5 years</div>
          <div :class="$style.metricLabel">EV total savings</div>
        </div>
      </div>

      <div :class="[$style.card, $style.tightCard]">
        <div :class="$style.progressHeader">
          <span>Day 1</span>
          <span>5 Years</span>
        </div>
        <div :class="$style.progressTrack">
          <div :class="$style.progressFill" :style="{ width: `${progressPercent}%` }"></div>
        </div>
        <div :class="$style.progressNote">{{ progressNote }}</div>
      </div>

      <h3 :class="$style.sectionTitle">5-Year Cost Breakdown</h3>
      <div :class="[$style.card, $style.tableCard]">
        <table :class="$style.table">
          <thead>
            <tr>
              <th>Cost Item</th>
              <th>Petrol</th>
              <th>EV</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Purchase price</td><td>₹1,20,000</td><td>₹1,70,000</td></tr>
            <tr><td>Fuel/Charging</td><td>{{ fmtFull(result.petrolFuel5) }}</td><td>{{ fmtFull(result.evFuel5) }}</td></tr>
            <tr><td>Servicing</td><td>₹35,000</td><td>₹10,000</td></tr>
            <tr><td>Insurance</td><td>₹20,000</td><td>₹20,000</td></tr>
            <tr :class="$style.totalRow">
              <td>Total (5 Years)</td>
              <td>{{ fmtFull(result.petrolTotal5) }}</td>
              <td>{{ fmtFull(result.evTotal5) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 :class="$style.sectionTitle">Daily km Decision Table</h3>
      <div :class="[$style.card, $style.tableCard]">
        <table :class="$style.table">
          <thead>
            <tr>
              <th>Daily km</th>
              <th>Break-even</th>
              <th>5-year saving</th>
              <th>Decision</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in decisionRows" :key="row.km" :class="row.selected ? $style.selectedRow : ''">
              <td>{{ row.km }} km/day{{ row.selected ? ' ◀' : '' }}</td>
              <td>{{ row.breakEvenText }}</td>
              <td :class="row.savingClass === 'positive' ? $style.positive : $style.negative">
                {{ row.savingText }}
              </td>
              <td><span :class="[$style.pill, $style[row.pillClass]]">{{ row.pillText }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const PETROL_BUY = 120000;
const EV_BUY = 170000;
const EXTRA = EV_BUY - PETROL_BUY;
const PETROL_KMPL = 45;
const EV_KM_UNIT = 10;
const PETROL_SVC_YR = 7000;
const EV_SVC_YR = 2000;

const dailyKm = ref(20);
const petrolPrice = ref(107);
const elecPrice = ref(7);

const fmt = (n: number) => {
  if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
};

const fmtFull = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

const compute = (daily: number, petrol: number, elec: number) => {
  const petrolPerKm = petrol / PETROL_KMPL;
  const evPerKm = elec / EV_KM_UNIT;
  const annualKm = daily * 365;
  const svcSavingPerKm = (PETROL_SVC_YR - EV_SVC_YR) / annualKm;
  const totalSavPerKm = petrolPerKm - evPerKm + svcSavingPerKm;

  const beKm = totalSavPerKm > 0 ? Math.round(EXTRA / totalSavPerKm) : Infinity;
  const beDays = totalSavPerKm > 0 ? Math.round(EXTRA / (totalSavPerKm * daily)) : Infinity;
  const beMonths = Number.isFinite(beDays) ? Math.round(beDays / 30) : Infinity;

  const petrolFuel5 = petrolPerKm * annualKm * 5;
  const evFuel5 = evPerKm * annualKm * 5;
  const petrolTotal5 = PETROL_BUY + petrolFuel5 + PETROL_SVC_YR * 5 + 20000;
  const evTotal5 = EV_BUY + evFuel5 + EV_SVC_YR * 5 + 20000;
  const saving5 = petrolTotal5 - evTotal5;

  return { beKm, beMonths, petrolFuel5, evFuel5, petrolTotal5, evTotal5, saving5 };
};

const result = computed(() => compute(dailyKm.value, petrolPrice.value, elecPrice.value));

const metricsBreakEvenKm = computed(() =>
  result.value.beKm === Infinity ? 'N/A' : result.value.beKm.toLocaleString('en-IN')
);
const metricsBreakEvenMonths = computed(() =>
  result.value.beMonths === Infinity ? '60+' : `${result.value.beMonths}`
);
const metricsSavings = computed(() =>
  result.value.saving5 > 0 ? fmt(result.value.saving5) : `-${fmt(-result.value.saving5)}`
);

const verdictTitle = computed(() => {
  if (result.value.beMonths === Infinity || result.value.beMonths > 60) return 'Petrol is better';
  if (result.value.beMonths <= 30) return 'EV is a smart choice';
  if (result.value.beMonths <= 48) return 'EV is still a good choice';
  return 'Very close call';
});

const verdictSub = computed(() => {
  if (result.value.beMonths === Infinity || result.value.beMonths > 60) {
    return `At ${Math.round(dailyKm.value)} km/day, break-even is beyond 5 years. Petrol is practical.`;
  }
  if (result.value.beMonths <= 30) {
    return `Break-even in ${result.value.beMonths} months and saves ${fmtFull(result.value.saving5)} in 5 years.`;
  }
  if (result.value.beMonths <= 48) {
    return `Break-even in ${result.value.beMonths} months with healthy long-term savings.`;
  }
  return `Break-even in ${result.value.beMonths} months. EV works better if charging is convenient.`;
});

const progressPercent = computed(() => {
  if (result.value.beMonths === Infinity) return 0;
  return Math.min(98, Math.round((60 / result.value.beMonths) * 100));
});

const progressNote = computed(() => {
  if (result.value.beMonths === Infinity) return 'No break-even within 5 years.';
  if (result.value.beMonths <= 60) {
    return `Break-even in ${result.value.beMonths} months, then monthly usage is net saving.`;
  }
  return `Break-even takes ${result.value.beMonths} months.`;
});

const decisionRows = computed(() => {
  const rows = [10, 15, 20, 25, 30, 40, 50, 60, 80, 100];
  return rows.map((km) => {
    const res = compute(km, petrolPrice.value, elecPrice.value);
    const selected = Math.round(dailyKm.value) === km;
    let pillText = 'EV ~';
    let pillClass = 'pillAmber';
    if (res.beMonths === Infinity || res.beMonths > 60) {
      pillText = 'Petrol';
      pillClass = 'pillRed';
    } else if (res.beMonths <= 36) {
      pillText = 'EV';
      pillClass = 'pillGreen';
    }

    return {
      km,
      selected,
      breakEvenText: res.beMonths === Infinity ? 'Never' : `${res.beMonths} months`,
      savingText: res.saving5 > 0 ? fmtFull(res.saving5) : `-${fmtFull(-res.saving5)}`,
      savingClass: res.saving5 > 0 ? 'positive' : 'negative',
      pillText,
      pillClass
    };
  });
});
</script>

<style module>
.wrapper {
  border: 1px solid #d9eadf;
  border-radius: 18px;
  background:
    linear-gradient(180deg, #ffffff 0%, #f7fbf8 48%, #ffffff 100%);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.1);
  overflow: hidden;
}

.hero {
  position: relative;
  background:
    radial-gradient(circle at 16% 18%, rgba(34, 197, 94, 0.35), transparent 28%),
    linear-gradient(135deg, #102617 0%, #0b3b2e 48%, #112542 100%);
  color: #fff;
  padding: 2.2rem 1.3rem 2rem;
  text-align: center;
}

.channelTag {
  display: inline-block;
  border: 1px solid rgba(187, 247, 208, 0.35);
  background: rgba(255, 255, 255, 0.1);
  color: #bbf7d0;
  font-size: 11px;
  border-radius: 100px;
  padding: 5px 12px;
  margin-bottom: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
}

.title {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  line-height: 1.1;
}

.title span {
  color: #bbf7d0;
  display: block;
}

.subtitle {
  color: #d1fae5;
  margin: 0.6rem auto 1rem;
  max-width: 520px;
  line-height: 1.5;
}

.badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.badge {
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: 5px 11px;
  font-size: 11px;
  font-weight: 700;
}

.main {
  padding: 1.2rem;
}

.sectionTitle {
  margin: 1rem 0 0.65rem;
  color: #475569;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 800;
}

.card {
  border: 1px solid #dbe8df;
  border-radius: 16px;
  padding: 1.05rem;
  margin-bottom: 0.9rem;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.07);
}

.tightCard {
  padding: 0.8rem 1rem;
}

.sliderGroup {
  margin-bottom: 0.95rem;
}

.sliderTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 10px;
}

.sliderName {
  font-size: 13px;
  color: #334155;
  font-weight: 700;
}

.sliderValue {
  flex: 0 0 auto;
  min-width: 74px;
  border-radius: 999px;
  background: #ecfdf5;
  color: #047857;
  padding: 5px 10px;
  text-align: center;
  font-weight: 600;
}

.sliderGroup input[type='range'] {
  width: 100%;
  display: block;
  height: 18px;
  margin: 0;
  accent-color: #10b981;
  cursor: pointer;
}

.sliderGroup input[type='range']::-webkit-slider-runnable-track {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #16a34a, #22c55e 55%, #93c5fd);
}

.sliderGroup input[type='range']::-webkit-slider-thumb {
  width: 22px;
  height: 22px;
  margin-top: -7px;
  border: 3px solid #0f172a;
  border-radius: 50%;
  background: #ffffff;
  box-shadow:
    0 0 0 4px rgba(255, 255, 255, 0.85),
    0 5px 14px rgba(15, 23, 42, 0.28);
  appearance: none;
}

.sliderGroup input[type='range']::-moz-range-track {
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(90deg, #16a34a, #22c55e 55%, #93c5fd);
}

.sliderGroup input[type='range']::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: 3px solid #0f172a;
  border-radius: 50%;
  background: #ffffff;
  box-shadow:
    0 0 0 4px rgba(255, 255, 255, 0.85),
    0 5px 14px rgba(15, 23, 42, 0.28);
}

.sliderHints {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #64748b;
  margin-top: 7px;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #dbe8df, transparent);
  margin: 0.8rem 0;
}

.verdict {
  border: 1px solid #d1d5db;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 0.9rem;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
}

.verdictEv {
  background: linear-gradient(135deg, #dcfce7, #f0fdf4);
  border-color: #86efac;
}

.verdictPetrol {
  background: linear-gradient(135deg, #fee2e2, #fff7ed);
  border-color: #fca5a5;
}

.verdictNeutral {
  background: linear-gradient(135deg, #fef3c7, #fffbeb);
  border-color: #fcd34d;
}

.verdictTitle {
  font-weight: 700;
  margin-bottom: 4px;
  color: #0f172a;
  font-size: 1.05rem;
}

.verdictSub {
  font-size: 13px;
  color: #334155;
  line-height: 1.45;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 0.9rem;
}

.metric {
  border: 1px solid #dbe8df;
  border-radius: 16px;
  text-align: center;
  padding: 0.95rem 0.8rem;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.primaryMetric {
  border-color: #34d399;
  background: linear-gradient(180deg, #ecfdf5, #ffffff);
}

.metricNum {
  font-size: clamp(1.15rem, 2.8vw, 1.55rem);
  font-weight: 700;
  color: #0f172a;
}

.metricUnit,
.metricLabel {
  font-size: 11px;
  color: #64748b;
}

.progressHeader {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #6b7280;
  margin-bottom: 6px;
}

.progressTrack {
  height: 12px;
  border-radius: 999px;
  background: #e2e8f0;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  background: linear-gradient(90deg, #16a34a, #22c55e, #38bdf8);
  border-radius: inherit;
}

.progressNote {
  font-size: 11px;
  color: #6b7280;
  margin-top: 6px;
}

.tableCard {
  padding: 0;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.table th,
.table td {
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
  text-align: left;
}

.table th {
  background: #f8fafc;
  color: #475569;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table th:not(:first-child),
.table td:not(:first-child) {
  text-align: right;
}

.totalRow td {
  font-weight: 700;
  border-top: 2px solid #dbe8df;
  background: #f8fafc;
}

.selectedRow {
  background: #ecfdf5;
}

.positive {
  color: #16a34a;
}

.negative {
  color: #dc2626;
}

.pill {
  display: inline-block;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
}

.pillGreen {
  background: #dcfce7;
  color: #14532d;
}

.pillRed {
  background: #fee2e2;
  color: #991b1b;
}

.pillAmber {
  background: #fef3c7;
  color: #92400e;
}

@media (max-width: 640px) {
  .main {
    padding: 0.9rem;
  }

  .sliderTop {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.45rem;
  }

  .metrics {
    grid-template-columns: 1fr 1fr;
  }

  .metrics .metric:last-child {
    grid-column: span 2;
  }
}
</style>
