import Vue from 'vue'
import Vuex from 'vuex'

import { getCurrentPosition } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    coords: null
  },
  getters: {
    coords(state) {
      return state.coords
    }
  },
  mutations: {
    SET_POSITION(state, position) {
      state.coords = position
    }
  },
  actions: {
    async get_position({ commit }) {
      if (navigator.geolocation) {
        const { coords } = await getCurrentPosition()
        commit('SET_POSITION', {
          latitude: coords.latitude,
          longitude: coords.longitude
        })
      }
    }
  }
})
