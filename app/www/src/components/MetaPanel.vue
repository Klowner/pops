<template>
<section class="pops-meta-panel">
    <h1 class="pops-meta-panel__name">{{ meta.name }}</h1>
    <p class="pops-meta-panel__summary">
        {{ meta.summary }}
    </p>
    <h2 class="pops-meta-panel__author-heading">Authors</h2>
    <ul class="pops-meta-panel__author-list">
        <li v-for="author in meta.authors" class="pops-meta-panel__author">{{ author }}</li>
    </ul>
</section>
</template>

<script>
export default {
    props: ['meta']
}
</script>
