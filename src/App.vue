<template>

    <v-app :light="isLight" :dark="isDark">

        <v-header />
        <router-view />

    </v-app>

</template>
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
            'v-header': () => import('./components/header')
        },
        computed: {
            isLight(){
                return this.$store.isLight
            },
            isDark(){
                return this.$store.isDark
            }
        },
        watch: {},
        beforeCreate() {
        },
        create() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        methods: {}
    })

</script>
