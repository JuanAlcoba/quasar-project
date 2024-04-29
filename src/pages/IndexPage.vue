<template>
  <q-page class="flex flex-center">
    <q-btn to="/scanner-alt">Alt scanner</q-btn>
    <q-btn to="/scanner">scannerPage</q-btn>

  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'


onMounted(() => {
  console.log('home');
})
</script>
