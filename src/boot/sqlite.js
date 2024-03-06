import { boot } from "quasar/wrappers";
import { ref } from "vue";

let sqlite = null;

export default boot(async (/* { app, router, ... } */) => {
  document.addEventListener("deviceready", () => {
    // Inicializar la base de datos test.db
    const sqliteDB = window.sqlitePlugin.openDatabase({
      name: "test.db",
      location: "default",
    });

    // (test mobile)
    // alert("SQLite database initialized" + sqliteDB);

    // Asignar la instancia de la base de datos a una propiedad global de Vue para que esté disponible en toda la aplicación
    sqlite = sqliteDB;
  });
});

export function getSqlite() {
  return sqlite;
}
