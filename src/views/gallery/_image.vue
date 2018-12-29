<template>

    <div class="image-card">

        <div class="image">

            <div class="images" :style=" `background-image: url(${url});background-color: #${data.tones}` ">

                <canvas ref="image_canvas" class="blur" :class="{close: url !== ''}"></canvas>

            </div>

            <img class="image-node" ref="image_node">

        </div>

        <div class="text">



        </div>

    </div>

</template>
<style lang="less" scoped>

    .image-card{
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transition: all .2s ease;

        &:hover{box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2)}

        .image{
            width: 100%;
            height: 80%;
            transition: inherit;

            .images{
                width: 100%;
                height: 100%;
                transition: inherit;
                background-size: cover;
                background-position: 50% 50%;
                background-repeat: no-repeat;

                .blur{
                    width: 100%!important;
                    height: 100%!important;
                    transition: inherit;

                    &.close{
                        opacity: 0;
                    }
                }
            }
            .image-node{
                display: none;
            }
        }
        .text{
            width: 100%;
            height: 20%;
            background-color: #fff;
        }
    }

</style>
<script>

    import StackBlur from 'stackblur-canvas'

    export default ({
        name: '',
        props: [
            'data'
        ],
        data() {
            return {
                url: '',
            }
        },
        components: {},
        computed: {},
        watch: {},
        beforeCreate() {

        },
        create() {

        },
        beforeMount() {

        },
        mounted(){

            this.getImage()

        },
        beforeDestroy(){},
        destroyed(){},
        methods: {
            getImage(){

                let _this = this
                let image = this.$refs.image_node
                let image_canvas = this.$refs.image_canvas

                image.crossOrigin = ''
                image.onload = function(){

                    StackBlur.image(
                        image,
                        image_canvas,
                        10,
                        true
                    )

                    let org = new Image()
                    org.crossOrigin = ''
                    org.onload = function(e){

                        setTimeout(function () {
                            _this.url = _this.data.url
                        }, 1000)

                    }
                    org.src = _this.data.url

                }
                image.src = this.data.blurry

            },
            deleteGallery(){

                const axios = this.$utils.axios

                axios
                    .delete('/api/gallery', {
                        params: {
                            key: this.info.key
                        }
                    })
                    .then(r => {

                        if ( r.data.status === 1 ){
                            this.$store.commit('openTips', r.data.message)
                            this.$store.commit('deleteGallery', this.index)
                        }
                        if ( r.data.status === 0 ){
                            this.$store.commit('openTips', r.data.message)
                        }

                    })

            },
            view(){
                this.$router.push('/gallery/view/' + this.info.key)
            },
            getDateYYYYMMDD(t){
                return this.$utils.getDateYYYYMMDD(t)
            },
            getDateHHMMSS(t){
                return this.$utils.getDateHHMMSS(t)
            }
        }

    })
</script>
