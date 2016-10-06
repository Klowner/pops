<template>
<article class="pops-card pops-card--component" v-bind:id="component.name">
    <a v-bind:href="`/components/${component.name}`" class="pops-card__link">
        <h1 class="pops-card__title">{{ component.name }}</h1>
    </a>

    <iframe class="pops-card__iframe" v-bind:src="`/components/${component.name}`" onload="resizeIframe(this)" frameborder="0"></iframe>

    <tab-set :active="0">
        <tab header="Overview">
            <div class="pops-card__overview" v-html="marked(component.doc)"></div>
        </tab>
        <tab header="Template">
            <pre><code>{{component.template}}</code></pre>
        </tab>
        <tab header="StyleSheet">
            <pre><code>{{component.style}}</code></pre>
        </tab>
        <tab header="Script">
            <pre><code>{{component.script}}</code></pre>
        </tab>
    </tab-set>
</article>
</template>

<script>
import Tab from '../Tab.vue'
import TabSet from '../TabSet.vue'
import marked from 'marked'

export default {
    components: {
        Tab,
        TabSet
    },
    props: ['component'],
    methods: {
        findComponent(components) {
            return components.find((x) => x.name === this.component.name)
        },
        updateComponent(data) {
            this.component = this.findComponent(data.components)
        },
        marked(data) {
            return marked(data);
        }
    },
    created() {
        socket.on('change', this.updateComponent)
    }
}
</script>
