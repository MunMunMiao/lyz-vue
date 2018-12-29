<template>

    <div class="passport" :style=" 'background-image: url(' + bk + ')' ">

        <router-view class="box" />

    </div>

</template>
<style lang="less" scoped>

    .passport {
        width: 100%;
        height: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;

        .box{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 500px;
            height: 600px;
            margin: auto;
        }
    }

</style>
<script>

    import bk from '../../assets/images/b39a0d73380673.5c07a3bd2b2b6.jpg'

    export default ({
        name: 'passport',
        props: [],
        data() {
            return {}
        },
        components: {},
        computed: {
            bk(){
                return bk
            }
        },
        watch: {
        },
        beforeCreate() {

        },
        create() {

        },
        beforeMount() {

        },
        mounted() {
        },
        destroyed() {

        },
        methods: {}

    })
</script>
