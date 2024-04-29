<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title class="text-center">
        <q-icon name="qr_code_scanner" />
        SCANNER
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-page class="flex items-end">

    <div class="scanner-nav">

      <div class="nav-buttons q-py-sm">
        <q-btn flat dense size="md" glossy round icon="reply" aria-label="Volver" @click="exitScanner" />
        <q-btn flat dense size="md" glossy round :icon="scanning ? 'visibility_off' : 'qr_code_scanner'"
          aria-label="Scanner" @click="toggleScanner" />
        <q-btn flat dense size="md" glossy round icon="flip_camera_ios" aria-label="Volver" @click="flipCamera" />
      </div>
    </div>

  </q-page>
  <!-- <q-footer elevated>
    <q-toolbar>
      <q-toolbar-title>Footer</q-toolbar-title>
    </q-toolbar>
  </q-footer> -->
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router";

const router = useRouter();
const camera = ref(0)
const scanning = ref(false)

const exitScanner = () => {
  if (window.cordova) {
    QRScanner.hide()
    QRScanner.destroy()
  }
  router.push("/");
}

const scannedData = ref('');
// const QRScanner = cordova.plugins.barcodeScanner
const checkCordova = () => {
  try {
    alert(QRScanner);

  } catch (error) {
    alert(error)
  }
};

const prepareScanner = () => {
  try {

    alert(QRScanner)
    QRScanner.prepare((err, status) => {
      if (err) {
        console.error(err);
      }
      if (status.authorized) {
        // Acceso a la cámara concedido, puedes mostrar el escáner
        showScanner();
      } else if (status.denied) {
        // Acceso a la cámara denegado, muestra un mensaje al usuario
        console.error('El acceso a la cámara ha sido denegado.');
      } else {
        // Permiso no obtenido, intenta nuevamente cuando sea apropiado
        console.warn('El permiso para acceder a la cámara no se ha obtenido.');
      }
    });
  } catch (error) {
    alert(`Error: ${error}`)
  }
};

const scanQr = () => {
  try {
    // Start a scan. Scanning will continue until something is detected or
    // `QRScanner.cancelScan()` is called.
    QRScanner.scan(displayContents);

    function displayContents(err, text) {
      if (err) {
        alert(err);
        // an error occurred, or the scan was canceled (error code `6`)
      } else {
        alert(text);
        // QRScanner.destroy()
        exitScanner()
        // The scan completed, display the contents of the QR code:
      }
    }

    // Make the webview transparent so the video preview is visible behind it.
    QRScanner.show();
    // Be sure to make any opaque HTML elements transparent here to avoid
    // covering the video.
  } catch (error) {
    alert(`Error: ${error}`)
  }
};

const toggleScanner = () => {
  QRScanner.destroy()
  // if (scanning.value) {
  //   QRScanner.hide(function (status) {
  //     alert(`status: ${status}`)
  //   });

  //   scanning.value = false
  // } else {
  //   QRScanner.show(function (status) {
  //     alert(`status: ${status}`)
  //   });

  //   scanning.value = true
  // }
}

const flipCamera = () => {
  const cameraValue = camera.value
  QRScanner.useCamera(camera.value, function (err, status) {
    err && console.error(err);
    // alert(`err: ${err},.. status: ${status}`);
    camera.value = cameraValue === 0 ? 1 : 0;
  });

}

onMounted(async () => {
  if (window.cordova) {
    await prepareScanner()
    scanQr()
  }
})
</script>

<style lang="scss" scoped>
.scanner-nav {
  position: fixed;
  right: 70px;
  bottom: 30px;
  left: 70px;
}

.nav-buttons {
  border-radius: 13px;
  background-color: rgb(0, 155, 147);
  display: flex;
  justify-content: space-evenly;
}
</style>
