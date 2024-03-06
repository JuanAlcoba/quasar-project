<template>
  <div>
    <p>
      hijo N° {{ numero }}:
      <slot></slot>
      <q-btn size="sm" icon="delete" class="q-mx-md" round @click="$emit('eliminar', numero)"></q-btn>
    </p>
  </div>
</template>

<script setup>
defineProps({
  numero: {
    type: Number,
    default: 0,
    required: true
  },
})

</script>

<style lang="scss" scoped>

</style>
