<template>
    <pre><code :class="highlight">{{code}}</code></pre>
</template>

<script>
    export default {
        props: ['code', 'language'],
        ready() {
            console.log(this)
            Prism.highlightAll()
        },
        computed: {
            highlight: {
                get() {
                    return `language-${this.language}`
                }
            }
        }
    }
</script>