<template>
<div role='tabpanel' class='pops-tab__inner' v-bind:class='{hide:!show}' v-show='show' :transition='transition'>
    <slot></slot>
</div>
</template>

<script>
export default {
    props: {
        header: {
            type: String
        },
        disabled: Boolean
    },
    data() {
        return {
            index: 0,
            show: false
        }
    },
    computed: {
        show() {
            return (this.$parent.active == this.index)
        },
        transition() {
            return this.$parent.effect
        },
        disabledNormalized() {
            return (typeof this.disabled !== 'string' ? val :
                val === 'true' ? true :
                val === 'false' ? false :
                val === 'null' ? false :
                val === 'undefined' ? false : val);
        }
    },
    created() {
        this.$parent.renderData.push({
            header: this.header,
            disabled: this.disabled
        })
    },
    mounted() {
        for (var c in this.$parent.$children) {
            if (this.$parent.$children[c].$el == this.$el) {
                this.index = c
                break
            }
        }
    },
    beforeDestroy() {
        this.$parent.renderData.splice(this.index, 1)
    }
}
</script>
