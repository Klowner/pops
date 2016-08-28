<template>
    <article class="pops-card pops-card--component" id="{{component.name}}">
        <a :href="url" class="pops-card__link"><h1 class="pops-card__title">{{ component.name }}</h1></a>

        <iframe :src="url" class="pops-card__iframe"></iframe>

        <tab-set :active="0">
            <tab header="Overview">
                <div class="pops-card__overview" v-html="component.doc | markdown"></div>
            </tab>
            <tab header="Template">
                <src-code language="markup" :code="component.template"></src-code>
            </tab>
            <tab header="StyleSheet">
                <src-code language="css" :code="component.style"></src-code>
            </tab>
            <tab header="Script">
                <src-code language="js" :code="component.script"></src-code>
            </tab>
        </tab-set>
    </article>
</template>

<script>
    import Tab from '../Tab.vue'
    import TabSet from '../TabSet.vue'
    import SrcCode from '../SrcCode.vue'

    export default {
        components: {
            Tab,
            TabSet,
            SrcCode
        },
        props: ['component'],
        created() {
            socket.on('components', (data) => {
                if (data.name === this.component.name) {
                    let newComponent = data.components.find((x) => x.name === this.component.name)

                    this.component = newComponent
                }
            })
        },
        computed: {
            url: {
                get() {
                    return `/demo?type=components&name=${this.component.name}`
                }
            }
        }
    }
</script>
