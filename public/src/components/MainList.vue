<template>
    <main class="pops-main-list">
        <section class="pops-main-list__overviews">
            <h2 class="pops-main-list__heading">Overview</h2>

            <overview-card v-for="overview in db.overviews" v-bind:overview="overview"></overview-card>
        </section>
        
        <section class="pops-main-list__components">
            <h2 class="pops-main-list__heading">Components</h2>

            <component-card v-for="component in db.components" v-bind:component="component"></component-card>
        </section>
        
        <section class="pops-main-list__patterns">
            <h2 class="pops-main-list__heading">Patterns</h2>

            <pattern-card v-for="pattern in db.patterns" v-bind:pattern="pattern"></pattern-card>
        </section>
        
        <section class="pops-main-list__pages">
            <h2 class="pops-main-list__heading">Pages</h2>

            <page-card v-for="page in db.pages" v-bind:page="page"></page-card>
        </section>
    </main>
</template>

<script>
    import ComponentCard from './cards/ComponentCard.vue'
    import OverviewCard from './cards/OverviewCard.vue'
    import PatternCard from './cards/PatternCard.vue'
    import PageCard from './cards/PageCard.vue'

    export default {
        components: {
            ComponentCard, OverviewCard, PatternCard, PageCard
        },
        props: ['db']
    }
</script>