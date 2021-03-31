// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

// Import F7 Styles
import 'framework7/css/framework7.bundle.rtl.css'

// Import Icons and App Custom Styles
import './assets/scss/import.scss'

// Import Vuex
import store from './store'

// Import App Component
import App from './app.vue'

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  store,
  // Register App Component
  components: {
    app: App,
  },
  framework7: {
    iosBackgroundColor: '#00acec',
  },
})
