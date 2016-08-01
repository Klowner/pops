<template>
    <article class="pops-card pops-card--component" id="{{component.name}}">
        <a :href="url" class="pops-card__link"><h1 class="pops-card__title">{{ component.name }}</h1></a>

        <iframe :src="url" class="pops-card__iframe"></iframe>

        <tab-set :active="0">
            <tab header="Overview">
                <div class="pops-card__overview" v-if="component.doc" v-html="component.doc | markdown"></div>
                <div class="pops-card__overview" v-if="!component.doc">
                    No overview for {{component.name}}
                </div>
            </tab>
            <tab header="Template">
                <pre><code class="language-markup" v-if="component.template">{{ component.template }}</code></pre>
                <pre><code class="language-markup" v-if="!component.template">No template available for {{ component.name }}</code></pre>
            </tab>
            <tab header="StyleSheet">
                <pre><code class="language-css" v-if="component.style">{{ component.style }}</code></pre>
                <pre><code class="language-css" v-if="!component.style">No style available for {{ component.name }}</code></pre>
            </tab>
            <tab header="Script">
                <pre><code class="language-js" v-if="component.script">{{ component.script }}</code></pre>
                <pre><code class="language-js" v-if="!component.script">No script available for {{ component.name }}</code></pre>
            </tab>
        </tab-set>
    </article>
</template>

<script>
    import Tab from '../Tab.vue'
    import TabSet from '../TabSet.vue'

    export default {
        components: {
            Tab, TabSet
        },
        props: ['component'],
        created() {
            socket.on('components', (data) => {
                if (data.name === this.component.name) {
                    let newComponent = data.components.find((x) => x.name === this.component.name)
                    
                    this.component = newComponent
                    Prism.highlightAll()
                }
            })
        },
        ready() {
            this.url = `/demo?type=components&name=${this.component.name}`
            Prism.highlightAll()
        },
        data() {
            return {
                url: ''
            }
        }
    }
</script>