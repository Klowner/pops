<template>
    <article class="pops-card pops-card--page" id="{{page.name}}">
        <h1 class="pops-card__title">{{ page.name }}</h1>
        <div>
            {{{ page.content }}}
        </div>
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
        }
    }
</script>