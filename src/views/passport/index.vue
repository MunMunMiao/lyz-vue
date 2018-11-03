<template>

    <div class="passport" v-on:mousemove=" move($event) " :style=" 'background-position: '+ bkX +'px '+ bkY +'px;' ">


        <div class="window">
            <div class="logo"></div>
            <router-view class="form" />
        </div>


    </div>

</template>
<style lang="less" scoped>

    .passport{
        width: 100vw;height: 100vh;background-color: #fff;background-image: url(../../assets/images/spiration-light.png);background-position: 0 0;background-repeat: repeat;display: flex;

        .logo{
            width: 100%;height: 30%;background-image: url(../../assets/images/logo.svg);background-position: 50% 50%;background-repeat: no-repeat;
        }
        .window{
            position: fixed;top: 0;bottom: 0;left: 0;right: 0;margin: auto;width: 50vw;height: 60vw;max-width: 500px;max-height: 600px;background-color: #fff;border-radius: 5px;border: 1px solid #e1e1e1;
        }

    }

</style>
<script>

    export default ({
        name: 'passport',
        props: [],
        data() {
            return {
                bkX:'',
                bkY:''
            }
        },
        components: {},
        computed: {
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
        methods: {
            move(e){

                function num(n) {
                    return n < 0 ? Math.abs(n) : '-' + n
                }

                let w = window.innerWidth / 2
                let h = window.innerHeight / 2

                this.bkX = ( e.pageX - w ) * .02
                this.bkY = ( e.pageY - w ) * .02

            }
        }

    })
</script>
