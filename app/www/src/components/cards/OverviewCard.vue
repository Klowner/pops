<template>
<article v-bind:id="overview.name" class="pops-card pops-card--overview">
    <h1 class="pops-card__title">{{ overview.name }}</h1>
    <div v-html="markdown(overview.content)"></div>
</article>
</template>

<script>
import marked from 'marked';
export default {
    props: ['overview'],
    methods: {
        findOverview(overviews) {
            return overviews.find((x) => x.name === this.overview.name)
        },
        updateOverview(data) {
            this.overview = this.findOverview(data.overviews)
        },
        markdown(data) {
            return marked(data);
        }
    },
    created() {
        socket.on('change', this.updateOverview)
    }
}
</script>
