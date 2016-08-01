<template>
    <div v-if="item.template">{{{ item.template }}}</div>
    <div v-if="item.content">{{{ item.content }}}</div>
</template>

<script>
    function getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&')

        if (!url) {
            url = window.location.href
        }
        
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
        let results = regex.exec(url)
        
        if (!results) {
            return null
        }
        
        if (!results[2]) {
            return ''
        }
        
        return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }

    export default {
        ready() {
            let type = getParameterByName('type')
            let name = getParameterByName('name')
            let url = `/api/${type}?name=${name}`
            
            this.$http.get(url)
                .then((response) => {
                    let data = JSON.parse(response.body)[0]
                    this.item = data
                }, (response) => {
                    console.log(`Could not get ${url}`)
                })
        },
        data() {
            return {
                item: {}
            }
        }
    }
</script>