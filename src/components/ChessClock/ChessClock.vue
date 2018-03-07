<template>
  <section :class="['clock', classObject]">
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
      }
    },

    data() {
      return {
        minutes: 5,
        seconds: 0,
        speed: 1000
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
          this.$emit('firstClick', this.id)
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
          ? this.decrementTime = setInterval(this.countdown, this.speed)
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
        if (!this.gamePaused && this.selected) this.decrementTime = setInterval(this.countdown, this.speed)
      }
    },

    computed: {
      ...mapState([
        'gameStarted',
        'gameEnded',
        'gamePaused'
      ]),

      classObject() {
        return {
          'clock--top': this.id === 1,
          'clock--bottom': this.id === 2,
          'clock--selected': this.selected
        }
      },

      remainingTime() {
        return [this.minutes, this.seconds]
          .map(value => value < 10 ? `0${value}` : value)
          .join(':')
      },

      clockText() {
        const endText = (this.minutes === 0 && this.seconds === 0) ? 'loser' : 'winner'
        return this.gameEnded ? endText : this.remainingTime
      }
    }
  }
</script>

<style src="./chess-clock.css" scoped></style>
