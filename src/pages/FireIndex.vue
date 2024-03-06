<template>
  <q-page>
    <h3>Anuncios</h3>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="(anuncio, idx) in anuncios" :key="idx">
        <q-card-section>
          <q-img class="col-6" src="https://cdn.quasar.dev/img/parallax1.jpg" />

          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ anuncio.titulo }}</div>
            <div> {{ anuncio.descripcion }}</div>
            <div><b>{{ '$' + anuncio.precio }}</b> </div>
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat icon="edit" color="primary" :to="'/editar/' + anuncio.id">
            Edit
          </q-btn>
          <q-btn flat icon="delete" color="negative" @click="eliminar(anuncio.id)">
            Delete
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <p> Crear anuncio </p>
    <div class="q-pa-md" style="max-width: 400px">

      <!-- @reset="onReset" -->
      <q-form @submit="agregarAnuncio()" class="q-gutter-md">
        <q-input filled v-model="nuevoAnuncio.titulo" label="Titulo" hint="titulo" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <q-input filled v-model="nuevoAnuncio.descripcion" label="descripcion" hint="descripcion" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />


        <q-input filled type="number" v-model="nuevoAnuncio.precio" label="Precio" lazy-rules :rules="[
        val => val !== null && val !== '' || 'Please type your age',
        val => val > 0 && val < 100 || 'Please type a real age'
      ]" />

        <q-input filled v-model="nuevoAnuncio.imagenURL" label="IMAGEN URL" hint="titulo" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from 'src/boot/firebase';
import { useCollection } from 'vuefire'

const anuncios = useCollection(collection(db, 'anuncios'))

const nuevoAnuncio = ref({
  titulo: "",
  descripcion: "",
  precio: 0.0,
  imagenURL: "",
})

async function agregarAnuncio() {
  console.log(nuevoAnuncio.value);
  try {
    const docRef = await addDoc(collection(db, "anuncios"), nuevoAnuncio.value);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getAnuncios() {
  const querySnapshot = await getDocs(collection(db, "anuncios"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

async function eliminar(id) {
  console.log(id);
  await deleteDoc(doc(db, "anuncios", id));
}


onMounted(() => {
  getAnuncios()
  console.log(anuncios);
})

</script>

<style lang="scss" scoped>
h3 {
  margin-bottom: 10px;
}
</style>
