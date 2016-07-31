<template>
    <section class="pops-dropdown">
        <input type="checkbox" id="{{ group.name }}" />
        <label for="{{ group.name }}" class="pops-dropdown__title">{{ group.name }}</label>
        <nav class="pops-dropdown__inner">
            <ul class="pops-dropdown__list">
                <li v-for="item in group.items" class="pops-dropdown__list-item">
                    <a class="pops-dropdown__list-link" href="#{{ item.name }}">{{ item.name }}</a>
                </li>
            </ul>
        </nav>
    </section>
</template>

<script>
    export default {
        props: ['group']
    }
</script>