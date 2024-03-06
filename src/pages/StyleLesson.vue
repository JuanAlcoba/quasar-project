<template>
  <q-page>
    <h5>Reactividad de claes y estilos</h5>
    <p>
        <q-toggle v-model="isPrimary" label="es primary" />
    </p>
    <!-- para una clase  -->
    <p class="q-pa-lg" :class="{'bg-primary': isPrimary}">
      Un texto cualquiera
    </p>

    <p>
      <q-toggle v-model="isDark" label="Es dark"/>
    </p>
    <!-- mas de una clase aplicarlo con una computed -->
    <p :class="estilo">el fondo de otro color</p>

    <!-- styles inline -->
    <p :style="{'background-color': colorFondo}">cambiando el color de fondo</p>
    <q-color v-model="colorFondo" style="width: 80px;"/>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';

const isPrimary = ref(false)
const isDark = ref(false)
const colorFondo = ref("")

//mas de una clase aplicarlo con una computed
const estilo = computed(() => {
  return {
    "bg-dark": isDark.value,
    "text-white": isDark.value
  }
})

</script>

<style lang="scss" scoped>

</style>
