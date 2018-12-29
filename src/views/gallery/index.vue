<template>

    <div class="gallery">

        <v-btn icon fixed color="primary" bottom right fab @click="upload = !upload">
            <v-icon>mdi-floppy</v-icon>
        </v-btn>

        <v-dialog v-model="upload">

            <v-card>

                <v-card-title>

                </v-card-title>
                <v-card-text>

                </v-card-text>
                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="accent" @click="upload = false">关闭</v-btn>
                    <v-btn color="primary">上传</v-btn>

                </v-card-actions>

            </v-card>

        </v-dialog>

        <div class="images" @scroll="loadGallery($event)">

            <w-img class="imgge" v-for="(data, index) in galleryList" :key="index" :data="data" />

        </div>

    </div>

</template>
<style lang="less" scoped>

    .gallery{


        .images{
            width: 100%;
            height: 100%;
            padding: 20px 0;
            box-sizing: border-box;
            overflow-y: scroll;
            overflow-x: hidden;
            display: grid;
            grid-template-columns: repeat(auto-fit, 300px);
            grid-gap: 50px;
            justify-items: center;
            justify-content: center;

            .imgge{
                width: 100%;
                height: 400px;
                border-radius: 2px;
                overflow: hidden;
                cursor: pointer;
                position: relative;
                z-index: 0;
            }
        }
    }

</style>
<script>

    export default ({
        name: 'gallery',
        props: [],
        data() {
            return {
                upload: false,
            }
        },
        components: {
            'w-img': () => import('./_image.vue')
        },
        computed: {
            galleryList(){
                return this.$store.getters.getGalleryList
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

            this.$store.dispatch('loadGallery')

        },
        beforeDestroy() {
        },
        destroyed() {
        },
        methods: {
            loadGallery(e){

                let all = e.target.scrollHeight
                let now = e.target.scrollTop + e.target.clientHeight

                let loadingHeight = all * 0.9

                if ( now >= loadingHeight ){

                    if ( this.isLoadMore === true || this.finish === true ){
                        return
                    }

                    this.$store.dispatch('loadGallery')

                }

            }
        }
    })

</script>
