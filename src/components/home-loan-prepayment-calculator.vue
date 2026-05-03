<template>
  <div :class="$style.wrapper">
    <div :class="$style.header">
      <h2>Home Loan Prepayment Calculator</h2>
      <p>Check how much interest and tenure you can save with regular prepayments.</p>
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

const getBalanceAfterMonths = (p: number, annual: number, emi: number, elapsedMonths: number) => {
  const monthlyRate = annual / 12 / 100;
  let balance = p;

  for (let month = 0; month < elapsedMonths && balance > 1; month += 1) {
    const interest = balance * monthlyRate;
    const principalPaid = Math.min(balance, Math.max(0, emi - interest));
    balance -= principalPaid;
  }

  return Math.max(0, balance);
};

const simulateRemainingLoan = (
  openingBalance: number,
  annual: number,
  emi: number,
  maxMonths: number,
  prepayMonthly: number,
  prepayYearly: number,
  monthlyStartAt: number,
  yearlyStartAt: number
) => {
  const monthlyRate = annual / 12 / 100;
  const monthlyStartMonth = Math.max(0, Math.round(monthlyStartAt));
  const yearlyStartMonth = Math.max(0, Math.round(yearlyStartAt));
  const firstYearlyPrepaymentMonth = yearlyStartMonth + 1;
  let balance = Math.max(0, openingBalance);
  let month = 0;
  let totalPaid = 0;
  let totalInterest = 0;

  while (balance > 1 && month < Math.max(1, maxMonths)) {
    month += 1;
    const interest = balance * monthlyRate;
    const regularPrincipalPaid = Math.min(balance, Math.max(0, emi - interest));
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

    const extraPrincipalPaid = Math.min(Math.max(0, balance - regularPrincipalPaid), extra);
    const principalPaid = regularPrincipalPaid + extraPrincipalPaid;
    balance -= principalPaid;
    totalInterest += interest;
    totalPaid += interest + principalPaid;

    if (principalPaid <= 0) break;
  }

  return {
    tenureMonths: month,
    totalPayment: totalPaid,
    totalInterest,
    remainingBalance: balance
  };
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
  const safeTotalMonths = Math.max(1, Math.round(totalMonths));
  const safeOutstandingMonths = Math.min(
    safeTotalMonths,
    Math.max(0, Math.round(outstandingMonths))
  );
  const safePrincipal = Math.max(0, p);
  const emi = safePrincipal > 0 ? toEmi(safePrincipal, annual, safeTotalMonths) : 0;
  const elapsedMonths = Math.max(0, safeTotalMonths - safeOutstandingMonths);
  const openingBalance = getBalanceAfterMonths(safePrincipal, annual, emi, elapsedMonths);
  const maxSimulationMonths = Math.max(safeTotalMonths * 2, safeOutstandingMonths + 120);
  const base = simulateRemainingLoan(openingBalance, annual, emi, maxSimulationMonths, 0, 0, 0, 0);
  const withPrepayment = simulateRemainingLoan(
    openingBalance,
    annual,
    emi,
    maxSimulationMonths,
    prepayMonthly,
    prepayYearly,
    monthlyStartAt,
    yearlyStartAt
  );

  return {
    baseEmi: emi,
    baseTotalPayment: base.totalPayment,
    baseInterest: base.totalInterest,
    baseTenureMonths: base.tenureMonths,
    elapsedMonths,
    totalTenureMonths: safeTotalMonths,
    newTotalPayment: withPrepayment.totalPayment,
    newInterest: withPrepayment.totalInterest,
    newTenureMonths: withPrepayment.tenureMonths,
    interestSaved: Math.max(0, base.totalInterest - withPrepayment.totalInterest),
    monthsSaved: Math.max(0, base.tenureMonths - withPrepayment.tenureMonths)
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
  border: 1px solid #cfe7dc;
  border-radius: 12px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfefc 100%);
  padding: 1rem;
}

.header {
  border-bottom: 1px solid #d9f0e3;
  background: linear-gradient(90deg, #ecfdf5, #eff6ff);
  margin: -1rem -1rem 1rem;
  padding: 1rem;
  border-radius: 12px 12px 0 0;
}

.header h2 {
  margin: 0;
  color: #064e3b;
}

.header p {
  margin: 0.5rem 0 1rem;
  color: #475569;
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
  color: #334155;
  font-size: 13px;
}

.field input {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.45rem 0.6rem;
  background: #ffffff;
}

.field input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.14);
  outline: none;
}

.metrics {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.6rem;
}

.metric {
  border: 1px solid #dbe8df;
  border-radius: 10px;
  padding: 0.7rem;
  background: #f8fffb;
}

.label {
  font-size: 11px;
  color: #6b7280;
}

.value {
  margin-top: 0.3rem;
  color: #0f172a;
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

.table th {
  background: #f0fdf4;
  color: #475569;
}

.table tbody tr:nth-child(even) {
  background: #f8fafc;
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
