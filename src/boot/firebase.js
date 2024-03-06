import { boot } from "quasar/wrappers";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { VueFire } from "vuefire";

const firebaseConfig = {
  apiKey: "AIzaSyCo8T4RxzEcCgokNiP54CgBpwzNTofBUrY",
  authDomain: "quasar-app-10fe7.firebaseapp.com",
  projectId: "quasar-app-10fe7",
  storageBucket: "quasar-app-10fe7.appspot.com",
  messagingSenderId: "164630499340",
  appId: "1:164630499340:web:ed214cfd4a0c3829f6de29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(/*settings*/ {}),
});

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  // something to do

  app.use(VueFire, {
    app,
    modules: [],
  });
});

export { db };
