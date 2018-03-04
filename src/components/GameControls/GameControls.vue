<template>
  <section class='game-controls'>
    <div v-if="!gameEnded" class="pause">
      <button @click="togglePause" :class="{'is-paused' : gamePaused}">
        <span class="pause__text">pause</span>
      </button>
    </div>
    <div :class="['reset', {'reset--game-ended': gameEnded}]">
      <button @click="onReset">reset</button>
    </div>
  </section>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    methods: {
      ...mapMutations([
        'togglePause',
        'onReset'
      ])
    },

    computed: {
      ...mapState([
        'gamePaused',
        'gameEnded'
      ])
    }
  }
</script>

<style src="./game-controls.css" scoped></style>
