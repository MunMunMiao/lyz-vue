<template>

    <li class="block">

        <div ref="image" class="image" v-on:click="view" :style=" 'background-image: url(' + url +')' + ';' + 'background-color: #' + info.tones ">

            <transition name="opacity">
                <canvas ref="image_canvas" class="blur" v-if=" url === '' "></canvas>
            </transition>

        </div>

        <img ref="image" class="image node">


        <div class="more">
            <div class="content">
                <div class="name" v-text=" info.remarks " v-if=" info.remarks !== '' "></div>
                <div class="time" v-text=" getDateYYYYMMDD(info.time) + ' ' + getDateHHMMSS(info.time) "></div>
            </div>
            <div class="fn">
                <button v-on:click="deleteGallery">
                    <font-awesome-icon class="icon" :icon="iconTrashAlt" style="color: inherit;" />
                </button>
            </div>
        </div>

    </li>

</template>
<style lang="less" scoped>

    .block{
        width: 300px;height: 400px;border-radius: 5px;cursor: pointer;box-sizing: border-box;transition: all .2s ease;overflow: hidden;position: relative;

        &:hover{transform: scale(1.01);}
        &:hover .more{opacity: 1;}
        .image{
            width: 100%;height: 100%;background-size: cover;background-position: 50% 50%;background-repeat: no-repeat;

            .none{display: none;}
            .blur{ width: 100%!important;height: 100%!important;}
        }
        .more{
            position: absolute;bottom: 0;left: 0;width: 100%;background-color: rgba(255, 255, 255, .9);opacity: 0;transition: all .5s ease;

            .content{
                width: 100%;height: 30%;padding: 0 10px;box-sizing: border-box;

                .time{text-align: right;display: flex;justify-content: flex-end;}
                .line{word-wrap: break-word;padding: 10px 0;display: flex;justify-content: space-between;}
                .hr{margin: 0 5px;}
            }
            .fn{
                width: 100%;height: 10%;padding: 10px;box-sizing: border-box;display: flex;justify-content: flex-end;

                button{cursor: pointer;padding: 0 10px;}
            }
        }
    }

</style>
<script>

    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import iconTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
    import iconImages from '@fortawesome/fontawesome-free-solid/faImages'
    import StackBlur from 'stackblur-canvas'

    export default ({
        name: 'images',
        props: [
            'info',
            'index'
        ],
        data() {
            return {
                url: ''
            }
        },
        components: {
            FontAwesomeIcon
        },
        computed: {
            iconTrashAlt: () => { return iconTrashAlt },
        },
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
                let image = this.$refs.image
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
                            _this.url = _this.info.url
                        }, 1000)

                    }
                    org.src = _this.info.url

                }
                image.src = this.info.blurry

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
