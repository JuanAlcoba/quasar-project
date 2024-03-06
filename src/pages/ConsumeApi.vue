<template>
  <q-page>
    <p>Traer usuarios:<q-btn @click.stop="obtener" class="q-mx-md" icon="person" round size="sm"></q-btn></p>
    <div>
      <p>DATOS:</p>
      <p>{{ datos }}</p>
    </div>
    <div>
        <p>Contador LOCAL:<q-btn @click.stop="contador++" class="q-mx-md" icon="person" round size="sm"></q-btn></p>
        la cuenta es: {{ contador }}
        <span> Storage? <q-btn @click.stop="guardarEnLocalstorage" class="q-mx-md" icon="storage" round size="sm"></q-btn></span>
      </div>
    <div>
      <p>Contador PINIA:<q-btn @click.stop="store.increment()" class="q-mx-md" icon="person" round size="sm"></q-btn></p>
      la cuenta es: {{ store.counter }}
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { useCounterStore } from 'stores/contador';
import { useQuasar } from 'quasar'

const $q = useQuasar()
const contador = ref(0)

function guardarEnLocalstorage() {
  try {
    $q.localStorage.set('counter', JSON.stringify(contador.value))
    $q.notify({
      color: 'positive',
      message: "Dato guardado correctamente",
      icon: "done"
    })
  } catch (e) {
    $q.notify({
      color: 'negative',
      message: "Error al guardar dato, no se conecto al storage",
      icon: "report_problem"
    })
  }
}

onMounted(() => {
  const storedValue = $q.localStorage.getItem('counter')
  console.log(JSON.parse(storedValue));
  console.warn(JSON.parse(storedValue))
  contador.value = storedValue ? JSON.parse(storedValue) : 0
})

const datos = ref([])
const store = useCounterStore()
function obtener() {
  api.get("")
    .then((response => {
      console.log(response.data);
      datos.value= response.data.results
    }))
    .catch((error) => {
      console.log(error);
  })
}
</script>

<style lang="scss" scoped>

</style>
