<template>
    <article class="pops-card pops-card--page" id="{{page.name}}">
        <a :href="url" class="pops-card__link"><h1 class="pops-card__title">{{ page.name }}</h1></a>
        <iframe :src="url" class="pops-card__iframe"></iframe>
    </article>
</template>

<script>
    export default {
        props: ['page'],
        created() {
            socket.on('pages', (data) => {
                if (data.name === this.page.name) {
                    let newPage = data.pages.find((x) => x.name === this.page.name)
                    
                    this.page = newPage
                }
            })
        },
        ready() {
            this.url = `/demo?type=pages&name=${this.page.name}`
        },
        data() {
            return {
                url: ''
            }
        }
    }
</script>