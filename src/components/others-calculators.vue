<template>
  <div>
    <EvPetrolCalculator v-if="activeTab === 'ev'" />
    <HomeLoanPrepaymentCalculator v-else />
  </div>
</template>

<script setup lang="ts">
import EvPetrolCalculator from './ev-petrol-calculator.vue';
import HomeLoanPrepaymentCalculator from './home-loan-prepayment-calculator.vue';

defineProps<{
  activeTab: 'ev' | 'home-loan';
}>();
</script>
