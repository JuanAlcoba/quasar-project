<template>
  <q-page>
    <div>
        <h6> Propiedades Reactivas con Vue 3</h6>
      </div>
      <hr>
      <q-input v-model="nuevaTarea"></q-input>
      <q-input v-model="fecha"></q-input>
      <q-btn @click="agregar">Agregar</q-btn>
      <ul>
        <li v-for="(tarea, idx) in tareas" :key="idx">
          {{ `${tarea.fecha} - ${tarea.nombre}` }}
        </li>
      </ul>
      <b>la cuenta es: {{ cuenta }}</b>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, onUpdated } from 'vue';
// variables o Propiedades
const tareas = ref([])
const fecha = ref('')
const nuevaTarea = ref('')
const cuenta = computed(() => {
  let acc = 0
  tareas.value.forEach(el => acc++)
  return acc
})


//metodos
function agregar() {
  tareas.value.push({ nombre: nuevaTarea.value, fecha: fecha.value })
  nuevaTarea.value = ''
  fecha.value = ''
}

onMounted(() => {
  //una vez que todo el DOM fue cargado
  console.log('montado')
})

onUnmounted(() => {
  //Al cambiar de vista
  console.log('Desmontado')
})

onUpdated(() => {
  //se ejecuta cuando se actualiza el dom por algun cambio reactivo
  console.log('Updated')
})

</script>

<style lang="scss" scoped>

</style>
