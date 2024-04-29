<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title class="text-center">
        <q-icon name="qr_code_scanner" />
        SCANNER
      </q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-page class="flex flex-center">

    <div v-if="!showCamera">
      NOT CAMERA
    </div>
    <div v-else>
      <qrcode-stream :camera="camera" @detect="onDetect">
      </qrcode-stream>
    </div>


    <div class="scanner-nav">
      <div class="nav-buttons q-py-sm">
        <q-btn flat dense size="md" glossy round icon="reply" aria-label="Volver" @click="exitScanner" />
        <q-btn flat dense size="md" glossy round :icon="showCamera ? 'visibility_off' : 'qr_code_scanner'"
          aria-label="Scanner" @click="toggleCameraValue()" />
        <!-- <q-btn flat dense size="md" glossy round icon="flip_camera_ios" aria-label="Cambiar camara" /> -->
      </div>
      <p class="text-subtitle1" v-if="result">Last result: <b>{{ result }}</b></p>
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
import { QrcodeStream } from 'vue-qrcode-reader'

const router = useRouter();
const camera = ref('auto')
const result = ref(null)
const showCamera = ref(false)

async function onDetect(content) {
  console.warn(content)
  alert(content[0].rawValue)
  result.value = content
  turnCameraOff()
}

function turnCameraOn() {
  camera.value = 'auto'
  showCamera.value = true
}

function turnCameraOff() {
  camera.value = 'off'
  showCamera.value = false
}

function toggleCameraValue() {
  showCamera.value ? turnCameraOff() : turnCameraOn()
}

const exitScanner = () => {
  turnCameraOff()
  router.push("/");
}

onMounted(() => {
  console.log(QrcodeStream);
  turnCameraOn()
  // if (window.cordova) {

  // }
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
