<template>
    <side-nav v-bind:groups='groups'></side-nav>
    <main-list v-bind:db='db'></main-list>
</template>

<script>
    import SideNav from './components/SideNav.vue'
    import MainList from './components/MainList.vue'

    export default {
        components: {
            SideNav, MainList
        },
        methods: {
            getGroups(data) {
                let keys = Object.keys(data)
                let filter = (key) => ({name: key, items: data[key]})

                return keys.map(filter)
            },
            requestSuccess(response) {
                let data = JSON.parse(response.body)

                this.db = data
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
            return {db: {}, groups: []}
        }
    }
</script>
