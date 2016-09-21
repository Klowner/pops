<template>
<div class="pops">
    <side-nav v-bind:groups='groups'>
    </side-nav>
    <div class="pops__content">
        <meta-panel v-bind:meta='meta'>
        </meta-panel>
        <main-list v-bind:db='db'></main-list>
    </div>
</div>
</template>

<script>
import SideNav from './components/SideNav.vue'
import MainList from './components/MainList.vue'
import MetaPanel from './components/MetaPanel.vue'

export default {
    components: {
        SideNav,
        MainList,
        MetaPanel
    },
    methods: {
        getGroups(data) {
            let keys = Object.keys(data)
            let filter = (key) => ({
                name: key,
                items: data[key]
            })

            return keys.map(filter)
        },
        requestSuccess(response) {
            let data = JSON.parse(response.body)

            this.db = data
            this.meta = data.meta
            this.groups = this.getGroups(data)
        },
        requestFailure() {
            console.log('Could not get /api/db')
        }
    },
    ready() {
        this.$http.get('/api/db').then(this.requestSuccess, this.requestFailure)
    },
    data() {
        return {
            db: {},
            groups: [],
            meta: {}
        }
    }
}
</script>
