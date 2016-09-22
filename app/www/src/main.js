import Vue from 'vue'
import VueResource from 'vue-resource'
import marked from 'marked'

import App from './App.vue'

Vue.use(VueResource)

Vue.config.devtools = false

Vue.filter('markdown', (value) => marked(value))

new Vue({
    el: 'body',
    components: {
        App
    }
})
