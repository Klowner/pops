<template>
  <div class="pops-tab">
    <!-- Nav tabs -->
     <ul class="pops-tab__list" role="tablist">
            <li
                class="pops-tab__list-item"
                v-for="r in renderData"
                v-bind:class="{
                  'active': ($index === active),
                  'disabled': r.disabled
                }"
                @click.prevent="handleTabListClick($index, r)"
                :disabled="r.disabled"
            >
                <a href="#" 
                    class="pops-tab__list-link"
                    v-bind:class="{
                    'pops-tab__list-link--active': ($index === active)
                    }"
                >  
                    <slot name="header"> 
                      {{{r.header}}}
                  </slot> 
                </a>
            </li>
     </ul>

     <!-- Tab panes -->
     <div class="tab-content" v-el:tab-content>
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
            },
            active: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                renderData: []
            }
        },
        methods: {
            handleTabListClick(index, el) {
                if (!el.disabled) this.active = index
            }
        }
    }
</script>