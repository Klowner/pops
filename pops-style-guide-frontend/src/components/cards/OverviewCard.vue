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
        created() {
            socket.on('change', (data) => {
                console.log(data)
                let newOverview = data.overviews.find((x) => x.name === this.overview.name)

                this.overview = newOverview
            })
        }
    }
</script>