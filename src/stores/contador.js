import { defineStore } from 'pinia'
import { Notify } from 'quasar'

export const useCounterStore = defineStore('contador', {
  state: () => ({
    counter: 0
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    },
    cleance() {
      this.counter = 0
      Notify.create("Limpiando data storage")
    }
  }
})
