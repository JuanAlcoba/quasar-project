<template>
  <q-page>
    <!-- PADRE -->
    <div v-for="(tarea, idx) in  tareas" :key="idx">
      <TareaDetalle :numero="idx" @eliminar="eliminarTarea">
        {{ tarea.nombre }}
      </TareaDetalle>
    </div>
    <div>
      <p>DARKs:<q-btn @click.stop="toggleMode" class="q-mx-md" icon="contrast" round size="sm"></q-btn></p>
      <p>Notyf:<q-btn @click.stop="showNoty" class="q-mx-md" icon="message" round size="sm"></q-btn></p>
    </div>
  </q-page>
</template>

<script setup>
import TareaDetalle from 'src/components/TareaDetalle.vue';
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()

function showNoty() {
  $q.notify({
    color: 'positive',
    message: "Notify funciona!",
    icon: "done"
  })
}

function toggleMode() {
  $q.dark.toggle()
}

const tareas = ref([
  { nombre: "aprender Vue", completado: false },
  { nombre: "aprender Firebase", completado: false },
  { nombre: "aprender CSS", completado: false },
  { nombre: "aprender HTML", completado: false },
  { nombre: "aprender PHP", completado: false },
])

function eliminarTarea(num) {
  console.log(num);
  tareas.value.splice(num, 1)
}

</script>

<style lang="scss" scoped></style>
