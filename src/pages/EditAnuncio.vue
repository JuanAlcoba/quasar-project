<template>
  <q-page>
    <p> Editar anuncio </p>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form
        @submit="editar()"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="nuevoAnuncio.titulo"
          label="Titulo"
          hint="titulo"
          lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
            filled
            v-model="nuevoAnuncio.descripcion"
            label="descripcion"
            hint="descripcion"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']"
          />


        <q-input
          filled
          type="number"
          v-model="nuevoAnuncio.precio"
          label="Precio"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your age',
            val => val > 0 && val < 100 || 'Please type a real age'
          ]"
        />

        <q-input
          filled
          v-model="nuevoAnuncio.imagenURL"
          label="IMAGEN URL"
          hint="titulo"
          lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, updateDoc, getDoc} from "firebase/firestore";
import { db } from 'src/boot/firebase';

const route = useRoute()
const docRef = ref({})
const nuevoAnuncio = ref({
  titulo: "",
  descripcion: "",
  precio: 0.0,
  imagenURL: "",
})

async function cargarDatos() {

  docRef.value = doc(db, "anuncios", route.params.id);
  const docSnap = await getDoc(docRef.value);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    nuevoAnuncio.value = docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

async function editar() {
  await updateDoc(docRef.value, nuevoAnuncio.value)
}

onMounted(() => {
  console.log(route.params.id);
  cargarDatos()
})

</script>

<style lang="scss" scoped>

</style>
