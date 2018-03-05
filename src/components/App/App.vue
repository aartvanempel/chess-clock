<template>
  <main :class="['app-container', classObject]">
    <h1>chess clock</h1>
    <game-controls></game-controls>
    <chess-clock
      v-for="clock in clocks"
      :key="clock.id"
      :id="clock.id"
      :selected="clock.selected"
      :setStartingHalf="setStartingHalf">
    </chess-clock>
  </main>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import ChessClock from '../ChessClock/ChessClock'
  import GameControls from '../GameControls/GameControls'

  export default {
    components: {
      ChessClock,
      GameControls
    },

    data() {
      return {
        startingHalf: null
      }
    },

    methods: {
      setStartingHalf(id) {
        id === 1
          ? this.startingHalf = 'bottom'
          : this.startingHalf = 'top'
      }
    },

    watch: {
      gameStarted() {
        if (!this.gameStarted || this.gameEnded) this.startingHalf = null
      }
    },

    computed: {
      ...mapState([
        'gameStarted',
        'gameEnded',
        'clocks'
      ]),

      ...mapGetters([
        'selectedHalf'
      ]),

      classObject() {
        return {
          'game-started': this.gameStarted,
          'game-ended': this.gameEnded,
          'top-started': this.startingHalf === 'top',
          'top-selected': this.selectedHalf === 'top',
          'bottom-started': this.startingHalf === 'bottom',
          'bottom-selected': this.selectedHalf === 'bottom'
        }
      }
    }
  }
</script>

<style src="./app.scss" lang="scss"></style>
