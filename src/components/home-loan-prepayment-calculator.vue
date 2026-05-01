<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <div :class="$style.eyebrow">Loan payoff planner</div>
      <h2>Home Loan Prepayment Calculator</h2>
      <p>Compare your current schedule with monthly and yearly prepayment strategies.</p>
    </div>

    <div :class="$style.grid">
      <label :class="$style.field">
        <span>Loan amount (Rs)</span>
        <input v-model.number="principal" type="number" min="100000" step="50000" />
      </label>
      <label :class="$style.field">
        <span>Interest rate (% p.a.)</span>
        <input v-model.number="annualRate" type="number" min="1" max="30" step="0.1" />
      </label>
      <label :class="$style.field">
        <span>Total loan tenure (years)</span>
        <input v-model.number="totalTenureYears" type="number" min="1" max="40" step="1" />
      </label>
      <label :class="$style.field">
        <span>Outstanding loan tenure (years)</span>
        <input v-model.number="outstandingTenureYears" type="number" min="1" max="40" step="1" />
      </label>
      <label :class="$style.field">
        <span>Monthly prepayment (Rs)</span>
        <input v-model.number="monthlyPrepayment" type="number" min="0" step="1000" />
      </label>
      <label :class="$style.field">
        <span>Yearly lump-sum prepayment (Rs)</span>
        <input v-model.number="yearlyPrepayment" type="number" min="0" step="10000" />
      </label>
      <label :class="$style.field">
        <span>Monthly prepayment starts after (months)</span>
        <input v-model.number="monthlyStartAfterMonths" type="number" min="0" step="1" />
      </label>
      <label :class="$style.field">
        <span>Yearly prepayment starts after (months)</span>
        <input v-model.number="yearlyStartAfterMonths" type="number" min="0" step="1" />
      </label>
    </div>

    <div :class="$style.metrics">
      <div :class="$style.metric">
        <div :class="$style.label">Regular EMI</div>
        <div :class="$style.value">{{ formatCurrency(result.baseEmi) }}</div>
      </div>
      <div :class="$style.metric">
        <div :class="$style.label">Total interest saved</div>
        <div :class="[$style.value, $style.green]">{{ formatCurrency(result.interestSaved) }}</div>
      </div>
      <div :class="$style.metric">
        <div :class="$style.label">Tenure reduced</div>
        <div :class="[$style.value, $style.green]">{{ formatMonths(result.monthsSaved) }}</div>
      </div>
      <div :class="$style.metric">
        <div :class="$style.label">Loan closes in</div>
        <div :class="$style.value">{{ formatMonths(result.newTenureMonths) }}</div>
      </div>
      <div :class="$style.metric">
        <div :class="$style.label">Tenure already completed</div>
        <div :class="$style.value">{{ formatMonths(result.elapsedMonths) }}</div>
      </div>
    </div>

    <div :class="$style.tableWrap">
      <table :class="$style.table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Total payment</th>
            <th>Total interest</th>
            <th>Remaining tenure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Without prepayment</td>
            <td>{{ formatCurrency(result.baseTotalPayment) }}</td>
            <td>{{ formatCurrency(result.baseInterest) }}</td>
            <td>{{ formatMonths(result.baseTenureMonths) }}</td>
          </tr>
          <tr>
            <td>With prepayment</td>
            <td>{{ formatCurrency(result.newTotalPayment) }}</td>
            <td>{{ formatCurrency(result.newInterest) }}</td>
            <td>{{ formatMonths(result.newTenureMonths) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const principal = ref(5000000);
const annualRate = ref(8.5);
const totalTenureYears = ref(20);
const outstandingTenureYears = ref(15);
const monthlyPrepayment = ref(10000);
const yearlyPrepayment = ref(100000);
const monthlyStartAfterMonths = ref(12);
const yearlyStartAfterMonths = ref(12);

type SimResult = {
  baseEmi: number;
  baseTotalPayment: number;
  baseInterest: number;
  baseTenureMonths: number;
  elapsedMonths: number;
  totalTenureMonths: number;
  newTotalPayment: number;
  newInterest: number;
  newTenureMonths: number;
  interestSaved: number;
  monthsSaved: number;
};

const toEmi = (p: number, annual: number, months: number) => {
  const monthlyRate = annual / 12 / 100;
  if (monthlyRate === 0) return p / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (p * monthlyRate * factor) / (factor - 1);
};

const simulateLoan = (
  p: number,
  annual: number,
  totalMonths: number,
  outstandingMonths: number,
  prepayMonthly: number,
  prepayYearly: number,
  monthlyStartAt: number,
  yearlyStartAt: number
): SimResult => {
  const safeOutstandingMonths = Math.max(1, Math.round(outstandingMonths));
  const safeTotalMonths = Math.max(safeOutstandingMonths, Math.round(totalMonths));
  const emi = toEmi(p, annual, safeOutstandingMonths);
  const monthlyRate = annual / 12 / 100;
  const baseTotal = emi * safeOutstandingMonths;
  const baseInterest = baseTotal - p;
  const monthlyStartMonth = Math.max(0, Math.round(monthlyStartAt));
  const yearlyStartMonth = Math.max(0, Math.round(yearlyStartAt));
  const firstYearlyPrepaymentMonth = yearlyStartMonth + 1;

  let balance = p;
  let month = 0;
  let totalPaid = 0;
  while (balance > 1 && month < safeOutstandingMonths * 2) {
    month += 1;
    const interest = balance * monthlyRate;
    let principalPaid = emi - interest;
    if (principalPaid > balance) principalPaid = balance;

    let extra = 0;
    if (month > monthlyStartMonth) {
      extra += Math.max(0, prepayMonthly);
    }
    if (
      month >= firstYearlyPrepaymentMonth &&
      (month - firstYearlyPrepaymentMonth) % 12 === 0
    ) {
      extra += Math.max(0, prepayYearly);
    }
    if (extra > balance - principalPaid) {
      extra = Math.max(0, balance - principalPaid);
    }

    balance -= principalPaid + extra;
    totalPaid += interest + principalPaid + extra;
  }

  const newTenureMonths = month;
  const newInterest = totalPaid - p;
  return {
    baseEmi: emi,
    baseTotalPayment: baseTotal,
    baseInterest,
    baseTenureMonths: safeOutstandingMonths,
    elapsedMonths: Math.max(0, safeTotalMonths - safeOutstandingMonths),
    totalTenureMonths: safeTotalMonths,
    newTotalPayment: totalPaid,
    newInterest,
    newTenureMonths,
    interestSaved: Math.max(0, baseInterest - newInterest),
    monthsSaved: Math.max(0, safeOutstandingMonths - newTenureMonths)
  };
};

const result = computed(() =>
  simulateLoan(
    principal.value,
    annualRate.value,
    totalTenureYears.value * 12,
    outstandingTenureYears.value * 12,
    monthlyPrepayment.value,
    yearlyPrepayment.value,
    monthlyStartAfterMonths.value,
    yearlyStartAfterMonths.value
  )
);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);

const formatMonths = (months: number) => {
  const roundedMonths = Math.max(0, Math.round(months));
  const years = Math.floor(roundedMonths / 12);
  const remainingMonths = roundedMonths % 12;
  if (years === 0) return `${remainingMonths} months`;
  if (remainingMonths === 0) return `${years} years`;
  return `${years} years ${remainingMonths} months`;
};
</script>

<style module>
.wrapper {
  border: 1px solid #dbe8df;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbf8 100%);
  padding: 1.2rem;
  box-shadow: 0 22px 54px rgba(15, 23, 42, 0.1);
}

.header {
  border-radius: 16px;
  background:
    radial-gradient(circle at 14% 12%, rgba(34, 197, 94, 0.34), transparent 28%),
    linear-gradient(135deg, #0f2b1e, #0b3b2e 52%, #172554);
  color: #ffffff;
  padding: 1.4rem;
  margin-bottom: 1rem;
}

.eyebrow {
  display: inline-block;
  border: 1px solid rgba(187, 247, 208, 0.36);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.11);
  color: #bbf7d0;
  padding: 4px 10px;
  margin-bottom: 0.7rem;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.header h2 {
  margin: 0;
  font-size: clamp(1.35rem, 3vw, 2rem);
}

.header p {
  max-width: 620px;
  margin: 0.5rem 0 0;
  color: #d1fae5;
  line-height: 1.5;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 0.8rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border: 1px solid #dbe8df;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.92);
  padding: 0.8rem;
  color: #334155;
  font-size: 13px;
  font-weight: 700;
}

.field input {
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  padding: 0.58rem 0.65rem;
  background: #ffffff;
  color: #0f172a;
  font: inherit;
}

.field input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.16);
  outline: none;
}

.metrics {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.7rem;
}

.metric {
  border: 1px solid #dbe8df;
  border-radius: 16px;
  padding: 0.85rem;
  background: #ffffff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.label {
  font-size: 11px;
  color: #64748b;
}

.value {
  margin-top: 0.3rem;
  color: #0f172a;
  font-size: clamp(0.95rem, 1.8vw, 1.12rem);
  font-weight: 700;
}

.green {
  color: #15803d;
}

.tableWrap {
  margin-top: 1rem;
  overflow-x: auto;
  border: 1px solid #dbe8df;
  border-radius: 16px;
  background: #ffffff;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid #eef2f7;
  font-size: 13px;
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

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .metrics {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .metrics {
    grid-template-columns: 1fr;
  }
}
</style>
