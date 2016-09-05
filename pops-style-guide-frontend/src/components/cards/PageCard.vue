<template>
    <article class="pops-card pops-card--page" id="{{page.name}}">
        <a :href=`/pages/${page.name}` class="pops-card__link">
          <h1 class="pops-card__title">{{ page.name }}</h1>
        </a>
        
        <iframe class="pops-card__iframe" :src=`/pages/${page.name}` frameborder="0"></iframe>
    </article>
</template>

<script>
    export default {
        props: ['page'],
        created() {
            socket.on('change', (data) => {
                let newPage = data.pages.find((x) => x.name === this.page.name)

                this.page = newPage
            })
        }
    }
</script>
