<template>
  <q-page>
    <div>
      <p>Notyf:<q-btn @click.stop="showNoty" class="q-mx-md" icon="message" round size="sm"></q-btn></p>
      <p>createTable:<q-btn @click.stop="createTable" class="q-mx-md" icon="message" round size="sm"></q-btn></p>
      <p>insertData:<q-btn @click.stop="insertData" class="q-mx-md" icon="message" round size="sm"></q-btn></p>
      <p>getData:<q-btn @click.stop="getData" class="q-mx-md" icon="message" round size="sm"></q-btn></p>
      <p>verifyDb:<q-btn @click.stop="verifyDb" class="q-mx-md" icon="message" round size="sm"></q-btn></p>
    </div>
    <div>
      <h3>Data from SQLite: </h3>
      <div v-if="!data.length">
        No queryes yet
      </div>
      <div v-else v-for="(item, index) in data" :key="index">
        <p>Id: {{ item.id }}</p>
        <p>Nombre: {{ item.nombre }}</p>
        <p>Precio: {{ item.precio }}</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar'
import { getSqlite } from 'src/boot/sqlite';

const $q = useQuasar()
const data = ref([])
function showNoty() {
  try {
    window.sqlitePlugin.echoTest(function () {
      $q.notify({
        color: 'positive',
        message: "SQLITE Funciona",
        icon: "done"
      })
    })
  } catch (e) {
    console.log(e);
    $q.notify({
      color: 'negative',
      message: "Algo anda mal...",
      icon: "report_problem"
    })
  }
}
const sqliteDB = getSqlite();

function verifyDb() {
  alert(sqliteDB);
}

function createTable() {
  try {
    sqliteDB.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS productos (id INTEGER PRIMARY KEY, nombre TEXT, precio REAL)', [], function () {
        alert('Tabla creada correctamente');
      }, function (error) {
        alert('Error al crear la tabla: ' + JSON.stringify(error));
      });
    });
  } catch (e) {
    console.error(e);
    $q.notify({
      color: 'negative',
      message: "Algo anda mal al crear la tabla...",
      icon: "report_problem"
    })
  }
}

function insertData() {
  try {
    sqliteDB.transaction(function (tx) {
      tx.executeSql('INSERT INTO productos (nombre, precio) VALUES (?, ?)', ['Producto 1', 10.99], function () {
        alert('Datos insertados correctamente');
      }, function (error) {
        alert('Error al insertar datos: ' + JSON.stringify(error));
      });
    });
  } catch (e) {
    console.error(e);
    $q.notify({
      color: 'negative',
      message: "Algo anda mal al insertar datos...",
      icon: "report_problem"
    })
  }
}

function getData() {
  try {
    sqliteDB.transaction(function (tx) {
      tx.executeSql('SELECT * FROM productos', [], function (tx, result) {
        // Maneja los resultados obtenidos
        var dataResult = [];
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          dataResult.push(row);
        }
        data.value = dataResult;
        // Aquí puedes hacer lo que quieras con los datos obtenidos
        alert("Datos obtenidos:" + dataResult);
      }, function (error) {
        alert('Error al obtener datos:', error);
      });
    });
  } catch (e) {
    console.error(e);
    $q.notify({
      color: 'negative',
      message: "Algo anda mal al obtener datos...",
      icon: "report_problem"
    })
  }
}

onMounted(() => {
  alert(sqliteDB)
})

</script>

<style lang="scss" scoped></style>
