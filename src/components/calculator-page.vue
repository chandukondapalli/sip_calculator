<template>
  <div :class="$style.page">
    <div :class="$style.header">
      <button :class="$style.backBtn" @click="$emit('goto-home')">← Back to Home</button>
      <h1 :class="$style.title">Financial Calculators</h1>
      <p :class="$style.subtitle">Plan your wealth with precision — SIP, Lumpsum, Step-Up SIP, SWP, Home Loan & more</p>
    </div>

    <div :class="$style.container">
      <SipCalculator @update="onValuesUpdated($event)" :class="$style.calc" />
      <template v-if="currentInvestmentType !== InvestmentTypes.OTHER">
        <div :class="$style.chartContainer">
          <Pie :data="data" :options="chartOptions" />
        </div>
        <div :class="$style.barContainer">
          <Bar :data="lineData" :options="barChartOptions" />
        </div>
      </template>
    </div>

    <div v-if="currentInvestmentType !== InvestmentTypes.OTHER" :class="$style.tableWrap">
      <InvestmentTable :investment-details="investmentDetails" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
defineEmits<{ (e: 'goto-home'): void }>()
import SipCalculator from './sip-calculator.vue'
import InvestmentTable from './investment-table.vue'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, ArcElement, BarElement
} from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'
import {
  calculateLump, calculateReturns, calculateSIP, calculateStepUpSIP,
  calculateSWP, calculateYearlySIP, formatCurrencyValue
} from './sip-calculator'
import { InvestmentTypes } from '../constants'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement)

const chartOptions: any = {
  responsive: true, maintainAspectRatio: false,
  plugins: {
    tooltip: { enabled: false },
    legend: { display: true, position: 'bottom', labels: { usePointStyle: true, pointStyle: 'rectRounded' } }
  }
}

const barChartOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: () => '',
        afterLabel: (ctx: any) => [
          `Principal: ${formatCurrencyValue(investmentDetails.value.principal[ctx.dataIndex])}`,
          `Total Wealth: ${formatCurrencyValue(investmentDetails.value.totalReturns[ctx.dataIndex])}`
        ],
        title: () => ''
      }
    }
  },
  scales: {
    x: { display: true, title: { display: true, text: 'Time Period (Years)' }, stacked: true, barPercentage: 1.0, categoryPercentage: 1.0 },
    y: { display: true, title: { display: true, text: 'Future Value' }, ticks: { callback: (v: any) => formatCurrencyValue(v) } }
  }
}

const data = ref<any>({ labels: ['Invested', 'Est. returns'], datasets: [{ backgroundColor: ['#c7d2fe', '#6366f1'], data: [50, 50] }] })
const lineData = ref<any>({ labels: [], datasets: [{ label: 'Est. returns', data: [] }] })
const investmentDetails = ref({ investment: [] as number[], principal: [] as number[], expectedReturns: [] as number[], totalReturns: [] as number[], returnRate: 0, investmentTitle: 'Monthly Investment' })
const investmentValue: Ref<number[]> = ref([])
const expectedReturnsValues = ref([] as number[])
const currentInvestmentType = ref<InvestmentTypes>(InvestmentTypes.OTHER)

const calculateChartData = (totalInvestment: number, estimatedReturns: number, totalReturn: number) => ({
  labels: ['Invested', 'Est. returns'],
  datasets: [{ backgroundColor: ['#c7d2fe', '#6366f1'], data: [(totalInvestment / totalReturn) * 100, (estimatedReturns / totalReturn) * 100] }]
})

const calculateLineData = (investment: number, expectedReturn: number, investmentType: string, years: number, stepup: number, swpReturnRate: number, swpWithdrawl: number, swpTenure: number) => {
  const values: number[] = [], labels: number[] = [], investmentValues: number[] = []
  expectedReturnsValues.value = []; investmentValue.value = []
  for (let i = 1; i <= years; i++) {
    const { totalInvestment, totalReturn, estimatedReturns } = calculateReturns(investmentType, investment, expectedReturn, i, stepup)
    labels.push(i); expectedReturnsValues.value.push(estimatedReturns); investmentValues.push(totalInvestment)
    values.push(investmentType === InvestmentTypes.SWP ? calculateSWP(investment, expectedReturn, i, swpWithdrawl, swpTenure, swpReturnRate, stepup).finalValue : totalReturn)
    investmentValue.value.push((investmentType === InvestmentTypes.STEPUP || investmentType === InvestmentTypes.SWP) ? investment * Math.pow(1 + stepup / 100, i - 1) : investment)
  }
  investmentDetails.value = { ...investmentDetails.value, investment: investmentValue.value, principal: investmentValues, totalReturns: values, expectedReturns: expectedReturnsValues.value, returnRate: expectedReturn, investmentTitle: investmentType === InvestmentTypes.LUMPSUM ? 'Total Investment' : 'Monthly Investment' }
  return { labels, datasets: [{ backgroundColor: '#c7d2fe', label: 'Invested Amount', data: investmentValues }, { backgroundColor: '#6366f1', label: 'Est. returns', data: values }] }
}

const onValuesUpdated = (d: any) => {
  currentInvestmentType.value = d.investmentType
  if (d.investmentType === InvestmentTypes.OTHER) return
  const check = [d.totalInvestment, d.estimatedReturns, d.totalReturn, d.expectedReturn, d.investment, d.years]
  if (check.some(v => isNaN(v) || v === '' || v === 0)) {
    data.value = { labels: ['Invested', 'Est. returns'], datasets: [{ backgroundColor: ['#c7d2fe', '#6366f1'], data: [100, 0] }] }
    lineData.value = { labels: [], datasets: [{ label: 'Est. returns', data: [] }] }
    return
  }
  data.value = calculateChartData(d.totalInvestment, d.estimatedReturns, d.totalReturn)
  lineData.value = calculateLineData(d.investment, d.expectedReturn, d.investmentType, d.years, d.stepup, d.swpReturnRate, d.swpWithdrawl, d.swpTenure)
}
</script>

<style module>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5.5rem 1.25rem 3rem;   /* 5.5rem clears the 72px sticky nav */
  min-height: 100vh;
  background: var(--cream, #f8fffe);
}

.backBtn {
  background: var(--white, #fff);
  border: 1.5px solid rgba(11,110,79,0.2);
  color: var(--navy, #0b6e4f);
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 2px 8px rgba(11,110,79,0.06);
  transition: background 0.15s, box-shadow 0.15s;
  align-self: flex-start;   /* left-align within the flex column header */
}
.backBtn:hover { background: var(--cream-2, #eef8f4); box-shadow: 0 4px 16px rgba(11,110,79,0.1); }

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(10,22,40,0.06);
  position: relative;
}

.title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 900;
  color: var(--navy, #0a1628);
  font-family: 'Playfair Display', serif;
  margin: 0 0 0.5rem;
}

.subtitle {
  color: var(--text-body, #3d4460);
  font-size: 1rem;
  margin: 0;
}

.container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.calc {
  flex: 1 1 340px;
  min-width: 0;
}

.chartContainer {
  flex: 1 1 260px;
  max-width: 300px;
  height: 280px;
  min-width: 0;
  padding-top: 5%;
}

.barContainer {
  flex: 1 1 90%;
  height: 400px;
  position: relative;
}

.tableWrap {
  margin-top: 2rem;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .chartContainer, .barContainer { flex: 1 1 100%; padding: 0; }
}
</style>
