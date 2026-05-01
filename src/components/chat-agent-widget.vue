<template>
  <div>
    <button :class="$style.fab" @click="openGoogleForm">
      Connect with Chandu
    </button>
  </div>
</template>

<script setup lang="ts">
const GOOGLE_FORM_URL = 'https://forms.gle/EkH6AssiWStjz4Jq5';

const openGoogleForm = () => {
  window.location.href = GOOGLE_FORM_URL;
};
</script>

<style module>
.fab {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  border: none;
  border-radius: 999px;
  background: #16a34a;
  color: #fff;
  padding: 0.75rem 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
}
</style>
