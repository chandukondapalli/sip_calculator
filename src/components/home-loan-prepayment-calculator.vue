<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <h2>Home Loan Prepayment Calculator</h2>
      <p>Check how much interest and tenure you can save with regular prepayments.</p>
    </div>

    <div :class="$style.grid">
      <label :class="$style.field">
        <span>Loan amount (₹)</span>
        <input v-model.number="principal" type="number" min="100000" step="50000" />
      </label>
      <label :class="$style.field">
        <span>Interest rate (% p.a.)</span>
        <input v-model.number="annualRate" type="number" min="1" max="30" step="0.1" />
      </label>
      <label :class="$style.field">
        <span>Loan tenure (years)</span>
        <input v-model.number="tenureYears" type="number" min="1" max="40" step="1" />
      </label>
      <label :class="$style.field">
        <span>Monthly prepayment (₹)</span>
        <input v-model.number="monthlyPrepayment" type="number" min="0" step="1000" />
      </label>
      <label :class="$style.field">
        <span>Yearly lump-sum prepayment (₹)</span>
        <input v-model.number="yearlyPrepayment" type="number" min="0" step="10000" />
      </label>
      <label :class="$style.field">
        <span>Prepayment starts after (months)</span>
        <input v-model.number="startAfterMonths" type="number" min="0" step="1" />
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
        <div :class="[$style.value, $style.green]">{{ result.monthsSaved }} months</div>
      </div>
      <div :class="$style.metric">
        <div :class="$style.label">Loan closes in</div>
        <div :class="$style.value">{{ result.newTenureMonths }} months</div>
      </div>
    </div>

    <div :class="$style.tableWrap">
      <table :class="$style.table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Total payment</th>
            <th>Total interest</th>
            <th>Tenure</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Without prepayment</td>
            <td>{{ formatCurrency(result.baseTotalPayment) }}</td>
            <td>{{ formatCurrency(result.baseInterest) }}</td>
            <td>{{ result.baseTenureMonths }} months</td>
          </tr>
          <tr>
            <td>With prepayment</td>
            <td>{{ formatCurrency(result.newTotalPayment) }}</td>
            <td>{{ formatCurrency(result.newInterest) }}</td>
            <td>{{ result.newTenureMonths }} months</td>
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
const tenureYears = ref(20);
const monthlyPrepayment = ref(10000);
const yearlyPrepayment = ref(100000);
const startAfterMonths = ref(12);

type SimResult = {
  baseEmi: number;
  baseTotalPayment: number;
  baseInterest: number;
  baseTenureMonths: number;
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
  months: number,
  prepayMonthly: number,
  prepayYearly: number,
  startAt: number
): SimResult => {
  const emi = toEmi(p, annual, months);
  const monthlyRate = annual / 12 / 100;
  const baseTotal = emi * months;
  const baseInterest = baseTotal - p;

  let balance = p;
  let month = 0;
  let totalPaid = 0;
  while (balance > 1 && month < months * 2) {
    month += 1;
    const interest = balance * monthlyRate;
    let principalPaid = emi - interest;
    if (principalPaid > balance) principalPaid = balance;

    let extra = 0;
    if (month > startAt) {
      extra += Math.max(0, prepayMonthly);
      if (month % 12 === 0) {
        extra += Math.max(0, prepayYearly);
      }
      if (extra > balance - principalPaid) {
        extra = Math.max(0, balance - principalPaid);
      }
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
    baseTenureMonths: months,
    newTotalPayment: totalPaid,
    newInterest,
    newTenureMonths,
    interestSaved: Math.max(0, baseInterest - newInterest),
    monthsSaved: Math.max(0, months - newTenureMonths)
  };
};

const result = computed(() =>
  simulateLoan(
    principal.value,
    annualRate.value,
    tenureYears.value * 12,
    monthlyPrepayment.value,
    yearlyPrepayment.value,
    startAfterMonths.value
  )
);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
</script>

<style module>
.wrapper {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  padding: 1rem;
}

.header h2 {
  margin: 0;
}

.header p {
  margin: 0.5rem 0 1rem;
  color: #6b7280;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(220px, 1fr));
  gap: 0.75rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 13px;
}

.field input {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.45rem 0.6rem;
}

.metrics {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}

.metric {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.7rem;
  background: #fafafa;
}

.label {
  font-size: 11px;
  color: #6b7280;
}

.value {
  margin-top: 0.3rem;
  font-size: 1rem;
  font-weight: 700;
}

.green {
  color: #15803d;
}

.tableWrap {
  margin-top: 1rem;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 13px;
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
</style>
