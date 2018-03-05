export default {
  startGame(state) {
    state.gameStarted = true
  },

  endGame(state) {
    state.gameEnded = true
    state.clocks.forEach(clock => clock.selected = false)
  },

  toggleSelected(state, id) {
    state.clocks.forEach(clock => clock.selected = clock.id !== id)
  },

  togglePause(state) {
    state.gamePaused = !state.gamePaused
  },

  onReset(state) {
    state.gameStarted = false
    state.gameEnded = false
    state.gamePaused = false
    state.clocks.forEach(clock => clock.selected = false)
  }
}
