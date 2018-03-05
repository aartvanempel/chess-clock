export default {
  selectedHalf(state) {
    const selectedClock = state.clocks.find(clock => clock.selected)
    if (selectedClock) {
      return selectedClock.id === 1
        ? 'top'
        : 'bottom'
    }
  }
}
