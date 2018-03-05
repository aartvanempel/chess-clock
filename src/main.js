import Vue from 'vue'
import store from './store/store'
import App from './components/App/App.vue'

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
