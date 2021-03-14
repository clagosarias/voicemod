import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select'

Vue.config.productionTip = false
Vue.component('v-select', vSelect)

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
