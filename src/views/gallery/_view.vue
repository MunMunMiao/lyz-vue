<template>

    <div class="view" v-on:resize="console.log('yes')" v-on:keyup.esc="goBack">

        <div class="head">

            <div class="title">
                <span class="text" v-text="remarks"></span>
            </div>
            <div class="fn">

                <router-link tag="button" to="/gallery">
                    <!--<font-awesome-icon class="icon" :icon="iconTimes" size="lg" style="color: inherit;" />-->
                </router-link>

            </div>

        </div>
        <div class="body">

            <transition name="opacity"  mode="out-in">
                <img class="img" :src="url" :alt="remarks">
            </transition>

        </div>

    </div>

</template>
<style lang="less" scoped>

    .view{
        width: 100vw;min-height: 100vh;background-color: rgba(0, 0, 0, .8);position: fixed;top: 0;left: 0;z-index: 1000;


        .head{
            width: 100%;height: 60px;line-height: 60px;padding: 0 20px;box-sizing: border-box;display: flex;justify-content: space-between;

            .title{


                .text{max-width: 50vw;color: #fff;font-weight: bold;font-size: 20px;display: inline-block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
            }
            .fn{


                button{color: #fff;}
            }
        }
        .body{
            width: 100%;height: ~'calc(100vh - 60px)';padding: 50px 0;box-sizing: border-box;display: flex;justify-content: center;flex-wrap: wrap;overflow-x: hidden;overflow-y: scroll;

            img{margin: 0 auto;display: block;max-width: 100%;max-height: 100%;}
        }
    }

</style>
<script>

    // import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    // import iconTimes from '@fortawesome/fontawesome-free-solid/faTimes'

    export default ({
        name: 'view',
        props: [],
        data() {
            return {
                attr: {
                    width: null,
                    height: null
                },
                url: '',
                remarks: '',
                time: 0
            }
        },
        components: {
            // FontAwesomeIcon
        },
        computed: {
            // iconTimes: () => { return iconTimes },
            key() { return this.$route.params.key }
        },
        watch: {
            image(nVal, oVal){
                this.getImageObject()
            }
        },
        beforeCreate() {

        },
        create() {

        },
        beforeMount() {

        },
        mounted() {

            this.getImage()

            const _this = this
            window.onkeyup = function (e) {
                console.log(232)
                if (e.keyCode === 27){
                    _this.goBack()
                }

            }

        },
        beforeDestroy() {

        },
        destroyed(){

            window.onkeyup = null

        },
        methods: {
            getImage(){

                const axios = this.$utils.axios
                axios
                    .get('/api/gallery/imageInfo', {
                        params: {
                            key: this.key
                        }
                    })
                    .then(r => {

                        if ( r.data.status === 1 ){
                            this.url = r.data.content.url
                            this.remarks = r.data.content.url
                            this.time = r.data.content.time
                        }
                        if ( r.data.status === 0 ){
                            this.$store.commit('openTips', r.data.message)
                        }

                    })

            },
            goBack(){
                this.$router.push('/gallery')
            }
        }

    })
</script>
