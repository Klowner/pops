<template>
    <aside class='pops-side-nav'>
        <div class="pops-side-nav__inner">
            <dropdown v-for='group in groups' v-bind:group='group'></dropdown>
        </div>
    </aside>
</template>

<script>
    import Dropdown from './Dropdown.vue'

    export default {
        components: {
            Dropdown
        },
        props: ['groups']
    }
</script>
