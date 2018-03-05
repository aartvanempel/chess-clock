import Vue from 'vue'
import store from './store/store'
import App from './components/App/App.vue'

document.ontouchmove = function(e){ e.preventDefault(); }

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
