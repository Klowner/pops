import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

import marked from 'marked'

Vue.use(VueResource)

Vue.filter('markdown', (value) => marked(value))

new Vue({
  el: 'body',
  components: { App }
})
