<template>
  <section :class="classObject">
      <button
        :disabled="gamePaused || gameEnded"
        @click="onClick">
        {{ clockText }}
      </button>
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    props: {
      id: {
        type: Number,
        required: true
      },
      selected: {
        type: Boolean,
        required: true
      },
      setStartingHalf: {
        type: Function,
        required: true
      }
    },

    data() {
      return {
        minutes: 5,
        seconds: 0
      }
    },

    methods: {
      ...mapMutations([
        'startGame',
        'endGame',
        'toggleSelected'
      ]),

      onClick() {
        if (!this.gameStarted) {
          this.startGame()
          this.setStartingHalf(this.id)
        }

        this.toggleSelected(this.id)
      },

      countdown() {
        if (this.minutes === 0 && this.seconds === 0) {
          this.endGame()
          clearInterval(this.decrementTime)
          return
        }

        if (this.seconds === 0) {
          this.minutes--
          this.seconds = 59
        } else this.seconds--
      }
    },

    watch: {
      selected() {
        this.selected
          ? this.decrementTime = setInterval(this.countdown, 1000)
          : clearInterval(this.decrementTime)
      },

      gameStarted() {
        if (!this.gameStarted) {
          this.minutes = 5
          this.seconds = 0
        }
      },

      gamePaused() {
        this.gamePaused && clearInterval(this.decrementTime)
        if (!this.gamePaused && this.selected) this.decrementTime = setInterval(this.countdown, 1000)
      }
    },

    computed: {
      ...mapState([
        'gameStarted',
        'gameEnded',
        'gamePaused'
      ]),

      classObject() {
        return [
          'clock',
          `clock--${this.id}`,
          {
            'clock--selected': this.selected
          }
        ]
      },

      remainingTime() {
        const minutes = this.minutes < 10
          ? `0${this.minutes}`
          : this.minutes

        const seconds = this.seconds < 10
          ? `0${this.seconds}`
          : this.seconds

        return `${minutes}:${seconds}`
      },

      clockText() {
        const endText = (this.minutes === 0 && this.seconds === 0) ? 'loser' : 'winner'
        return this.gameEnded ? endText : this.remainingTime
      }
    }
  }
</script>

<style src="./chess-clock.css" scoped></style>
