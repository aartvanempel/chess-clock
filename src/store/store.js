import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameStarted: false,
    gamePaused: false,
    gameEnded: false,
    clocks: [
      {
        id: 1,
        selected: false,
      },
      {
        id: 2,
        selected: false,
      }
    ]
  },
  mutations,
  getters
})
