<template>
    <article class="pops-card pops-card--component" id="{{component.name}}">
        <a :href="url" class="pops-card__link">
          <h1 class="pops-card__title">{{ component.name }}</h1>
        </a>

        <div>{{{ component.template }}}</div>

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
        created() {
            socket.on('components', (data) => {
                if (data.name === this.component.name) {
                    let newComponent = data.components.find((x) => x.name === this.component.name)

                    this.component = newComponent
                }
            })
        }
    }
</script>
