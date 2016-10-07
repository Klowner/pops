<template>
<div class="pops-tab">
    <!-- Nav tabs -->
    <ul class="pops-tab__list" role="tablist">
        <li class="pops-tab__list-item" v-for="(r, index) in renderData" v-bind:class="{
                  'active': (index === active),
                  'disabled': r.disabled
                }" @click.prevent="handleTabListClick(index, r)" :disabled="r.disabled">
            <a href="#" class="pops-tab__list-link" v-bind:class="{
                    'pops-tab__list-link--active': (index === active)
                    }">
                    {{ r.header }}
            </a>
        </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content" ref="tabContent">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    props: {
        navStyle: {
            type: String,
            default: 'tabs'
        },
        effect: {
            type: String,
            default: 'fadein'
        }
    },
    data() {
        return {
            renderData: [],
            active: 0
        }
    },
    methods: {
        handleTabListClick(index, el) {
            if (!el.disabled) this.active = index
        }
    }
}
</script>
