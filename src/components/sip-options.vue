<template>
  <div>
    <div :class="[$style['sip-options'], menuOpen ? $style['open'] : '']">
      <div
        :class="[$style.option, investmentType === InvestmentTypes.SIP ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.SIP)"
      >
        SIP
      </div>
      <div
        :class="[$style.option, investmentType === InvestmentTypes.LUMPSUM ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.LUMPSUM)"
      >
        Lumpsum
      </div>
      <div
        :class="[$style.option, investmentType === InvestmentTypes.STEPUP ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.STEPUP)"
      >
        Step Up SIP
      </div>
      <div
        :class="[$style.option, investmentType === InvestmentTypes.YEARLY ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.YEARLY)"
      >
        Yearly SIP
      </div>
      <div
        :class="[$style.option, investmentType === InvestmentTypes.SWP ? $style.selected : '']"
        @click="onInvestmentTypeChange(InvestmentTypes.SWP)"
      >
        SIP + SWP
      </div>
      <div :class="$style.dropdown">
        <button
          type="button"
          :class="[$style.option, investmentType === InvestmentTypes.OTHER ? $style.selected : '']"
          @click="toggleOtherMenu"
        >
          Others
          <span :class="$style.chevron">⌄</span>
        </button>
        <div v-if="otherMenuOpen" :class="$style.dropdownMenu">
          <button
            type="button"
            :class="[$style.dropdownItem, otherCalculator === 'ev' ? $style.activeDropdownItem : '']"
            @click="selectOtherCalculator('ev')"
          >
            EV vs Petrol
          </button>
          <button
            type="button"
            :class="[
              $style.dropdownItem,
              otherCalculator === 'home-loan' ? $style.activeDropdownItem : ''
            ]"
            @click="selectOtherCalculator('home-loan')"
          >
            Home Loan Prepayment
          </button>
        </div>
      </div>
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
const investmentType = ref(InvestmentTypes.OTHER);
const otherCalculator = ref<'ev' | 'home-loan'>('home-loan');
const otherMenuOpen = ref(false);

const onInvestmentTypeChange = (type: InvestmentTypes) => {
  investmentType.value = type;
  otherMenuOpen.value = false;
  emits('onInvestmentTypeChange', type);
  menuOpen.value = false;
};

const toggleOtherMenu = () => {
  otherMenuOpen.value = !otherMenuOpen.value;
  investmentType.value = InvestmentTypes.OTHER;
  emits('onInvestmentTypeChange', InvestmentTypes.OTHER);
};

const selectOtherCalculator = (type: 'ev' | 'home-loan') => {
  otherCalculator.value = type;
  investmentType.value = InvestmentTypes.OTHER;
  otherMenuOpen.value = false;
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
  justify-content: center;
  flex-direction: row;
  margin: 1rem;
  overflow: visible;
  scrollbar-width: thin;
  flex-wrap: wrap;
}

.option {
  background-color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  flex: 0 0 100px;
  text-align: center;
  border: 2px solid #fff;
  border-radius: 4px;
  box-shadow: 0px 1px 1px 0px #0000001a;
  margin-right: 10px;
  margin-bottom: 5px;
  cursor: pointer;
}

.dropdown {
  position: relative;
  margin-right: 10px;
  margin-bottom: 5px;
}

.dropdown .option {
  margin: 0;
}

.chevron {
  margin-left: 6px;
  font-size: 14px;
  line-height: 1;
}

.dropdownMenu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 100;
  width: 210px;
  border: 1px solid #dbe8df;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
  padding: 0.35rem;
}

.dropdownItem {
  width: 100%;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #334155;
  padding: 0.65rem 0.75rem;
  text-align: left;
  font-weight: 700;
  cursor: pointer;
}

.dropdownItem:hover,
.activeDropdownItem {
  background: #ecfdf5;
  color: #047857;
}

.selected {
  background-color: #10b981;
  color: white;
}

@media (max-width: 768px) {
  .sip-options {
    display: none;
    flex-direction: column;
  }

  .sip-options.open {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .option {
    flex: 1 1 auto;
    width: 80%;
  }

  .dropdown {
    width: 80%;
    margin-right: 0;
  }

  .dropdown .option {
    width: 100%;
  }

  .dropdownMenu {
    position: absolute;
    right: 0;
    top: calc(100% + 8px);
    width: 100%;
    margin-top: 0.45rem;
  }
}
</style>
