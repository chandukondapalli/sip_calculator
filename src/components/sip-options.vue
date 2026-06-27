<template>
  <div>
    <div :class="[$style['sip-options'], menuOpen ? $style['open'] : '']">
      <div
        :class="[$style.option, investmentType === InvestmentTypes.SIP ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.SIP)"
      >SIP</div>

      <div
        :class="[$style.option, investmentType === InvestmentTypes.LUMPSUM ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.LUMPSUM)"
      >Lumpsum</div>

      <div
        :class="[$style.option, investmentType === InvestmentTypes.STEPUP ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.STEPUP)"
      >Step Up SIP</div>

      <div
        :class="[$style.option, investmentType === InvestmentTypes.YEARLY ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.YEARLY)"
      >Yearly SIP</div>

      <div
        :class="[$style.option, investmentType === InvestmentTypes.SWP ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.SWP)"
      >SIP + SWP</div>

      <div
        :class="[$style.option, investmentType === InvestmentTypes.OTHER && otherCalculator === 'ev' ? $style.selected : '']"
        @click="selectOtherCalculator('ev')"
      >EV vs Petrol</div>

      <div
        :class="[$style.option, investmentType === InvestmentTypes.OTHER && otherCalculator === 'home-loan' ? $style.selected : '']"
        @click="selectOtherCalculator('home-loan')"
      >Home Loan</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { InvestmentTypes } from '../constants';
import { useMainStore } from '@/store';
import { storeToRefs } from 'pinia';

const { menuOpen } = storeToRefs(useMainStore());

const emits = defineEmits(['onInvestmentTypeChange', 'onOtherCalculatorChange']);
const investmentType = ref(InvestmentTypes.SIP);
const otherCalculator = ref<'ev' | 'home-loan'>('home-loan');

const onInvestmentTypeChange = (type: InvestmentTypes) => {
  investmentType.value = type;
  emits('onInvestmentTypeChange', type);
  menuOpen.value = false;
};

const selectOtherCalculator = (type: 'ev' | 'home-loan') => {
  otherCalculator.value = type;
  investmentType.value = InvestmentTypes.OTHER;
  emits('onInvestmentTypeChange', InvestmentTypes.OTHER);
  emits('onOtherCalculatorChange', type);
  menuOpen.value = false;
};
</script>

<style module>
.sip-options {
  position: relative;
  z-index: 30;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 8px;
  padding: 1rem 0 0.75rem;
  scrollbar-width: thin;
  scrollbar-color: #10b981 #e6f4ee;
}

.sip-options::-webkit-scrollbar {
  height: 4px;
}
.sip-options::-webkit-scrollbar-track {
  background: #e6f4ee;
  border-radius: 2px;
}
.sip-options::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 2px;
}

.option {
  background-color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  white-space: nowrap;
  flex-shrink: 0;
  text-align: center;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  color: #3a5248;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.option:hover {
  border-color: #10b981;
  color: #10b981;
}

.selected {
  background-color: #0b6e4f;
  color: white;
  border-color: #0b6e4f;
}

@media (max-width: 768px) {
  .sip-options {
    display: none;
  }

  .sip-options.open {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
}
</style>
