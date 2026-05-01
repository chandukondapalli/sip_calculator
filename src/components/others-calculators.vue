<template>
  <div>
    <div :class="$style.subNav">
      <button
        :class="[$style.subTab, activeTab === 'ev' ? $style.activeSubTab : '']"
        @click="activeTab = 'ev'"
      >
        EV vs Petrol
      </button>
      <button
        :class="[$style.subTab, activeTab === 'home-loan' ? $style.activeSubTab : '']"
        @click="activeTab = 'home-loan'"
      >
        Home Loan Prepayment
      </button>
    </div>
    <EvPetrolCalculator v-if="activeTab === 'ev'" />
    <HomeLoanPrepaymentCalculator v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EvPetrolCalculator from './ev-petrol-calculator.vue';
import HomeLoanPrepaymentCalculator from './home-loan-prepayment-calculator.vue';

const activeTab = ref<'ev' | 'home-loan'>('ev');
</script>

<style module>
.subNav {
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0 1rem;
  flex-wrap: wrap;
}

.subTab {
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 8px;
  padding: 0.45rem 0.9rem;
  font-weight: 500;
  cursor: pointer;
}

.activeSubTab {
  background: #ecfdf5;
  border-color: #10b981;
  color: #065f46;
}
</style>
