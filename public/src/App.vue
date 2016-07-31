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
        ready() {
            this.$http.get('/api/db')
                .then((response) => {
                    let data = JSON.parse(response.body)
                    let keys = Object.keys(data)
                    let groups = keys.map((key) => {
                        return {
                            name: key,
                            items: data[key]
                        }
                    })

                    this.db = data
                    this.groups = groups
                }, (response) => {
                    console.log('Could not get /api/db')
                })
        },
        data() {
            return {
                db: {},
                groups: []
            }
        }
    }
</script>