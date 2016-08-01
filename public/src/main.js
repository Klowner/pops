'use strict'

import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import Demo from './Demo.vue'

import marked from 'marked'

Vue.use(VueResource)

Vue.filter('markdown', (value) => marked(value))

if (document.body.id === 'demo') {
    new Vue({
        el: 'body',
        components: { Demo }
    })
} else {
    new Vue({
        el: 'body',
        components: { App }
    })
}
