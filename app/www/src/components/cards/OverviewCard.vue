<template>
<article id="{{overview.name}}" class="pops-card pops-card--overview">
    <h1 class="pops-card__title">{{ overview.name }}</h1>
    <div>
        {{{ overview.content | markdown }}}
    </div>
</article>
</template>

<script>
export default {
    props: ['overview'],
    methods: {
        findOverview(overviews) {
            return overviews.find((x) => x.name === this.overview.name)
        },
        updateOverview(data) {
            this.overview = this.findOverview(data.overviews)
        }
    },
    created() {
        socket.on('change', this.updateOverview)
    }
}
</script>
