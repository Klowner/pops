<template>
    <article class="pops-card pops-card--pattern" id="{{pattern.name}}">
        <a :href="url" class="pops-card__link"><h1 class="pops-card__title">{{ pattern.name }}</h1></a>

        <iframe :src="url" class="pops-card__iframe"></iframe>

        <tab-set :active="0">
            <tab header="Overview">
                <div class="pops-card__overview" v-if="pattern.doc" v-html="pattern.doc | markdown"></div>
                <div class="pops-card__overview" v-if="!pattern.doc">
                    No overview for {{pattern.name}}
                </div>
            </tab>
            <tab header="Template">
                <pre><code class="language-markup" v-if="pattern.template">{{ pattern.template }}</code></pre>
                <pre><code class="language-markup" v-if="!pattern.template">No template available for {{ pattern.name }}</code></pre>
            </tab>
            <tab header="StyleSheet">
                <pre><code class="language-css" v-if="pattern.style">{{ pattern.style }}</code></pre>
                <pre><code class="language-css" v-if="!pattern.style">No style available for {{ pattern.name }}</code></pre>
            </tab>
            <tab header="Script">
                <pre><code class="language-js" v-if="pattern.script">{{ pattern.script }}</code></pre>
                <pre><code class="language-js" v-if="!pattern.script">No script available for {{ pattern.name }}</code></pre>
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
        props: ['pattern'],
        created() {
            socket.on('patterns', (data) => {
                if (data.name === this.pattern.name) {
                    let newPattern = data.patterns.find((x) => x.name === this.pattern.name)
                    
                    this.pattern = newPattern

                    Prism.highlightAll()
                }
            })
        },
        ready() {
            this.url = `/demo?type=patterns&name=${this.pattern.name}`
            Prism.highlightAll()
        },
        data() {
            return {
                url: ''
            }
        }
    }
</script>