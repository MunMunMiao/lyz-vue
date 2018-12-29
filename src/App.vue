<template>

    <v-app :light="isLight" :dark="isDark">

        <transition name="opacity" mode="out-in">
            <router-view />
        </transition>

    </v-app>

</template>
<style>

    .v-input__slot{margin: 0!important;}
    .theme--light.v-tabs__bar{background-color: initial!important;}
    .v-icon{transition: none!important;}
    .v-list{transition: none!important;}
    .v-list__tile__title, .v-list__tile__sub-title{transition: none!important;}

    html, body{
        overflow: hidden;
        width: 100vw;
        height: 100vh;
    }

</style>
<style lang="less" scoped>


</style>
<script>

    export default ({
        name: 'App',
        props: [],
        data() {
            return {}
        },
        components: {
        },
        computed: {
            isLight(){
                return this.$store.getters.isLight
            },
            isDark(){
                return this.$store.getters.isDark
            }
        },
        watch: {
            isDark(){
                window.localStorage.setItem('dark', this.$store.getters.isDark.toString())
            }
        },
        beforeCreate() {
        },
        create() {
        },
        beforeMount() {

            if ( window.localStorage.getItem('dark') ){

                if ( window.localStorage.getItem('dark') === 'true'  ){
                    this.$store.commit('setDisplayMode', true)
                }else {
                    this.$store.commit('setDisplayMode', false)
                }

            }else {

                this.$store.commit('setDisplayMode', true)

            }

        },
        mounted() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        methods: {

        }
    })

</script>
