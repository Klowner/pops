<template>
<article class="pops-card pops-card--component" id="{{component.name}}">
    <a :href=`/components/${component.name}` class="pops-card__link">
        <h1 class="pops-card__title">{{ component.name }}</h1>
    </a>

    <iframe class="pops-card__iframe" :src=`/components/${component.name}` onload="resizeIframe(this)" frameborder="0"></iframe>

    <tab-set :active="0">
        <tab header="Overview">
            <div class="pops-card__overview" v-html="component.doc | markdown"></div>
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
        }
    },
    created() {
        socket.on('change', this.updateComponent)
    }
}
</script>
