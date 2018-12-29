<template>

    <div class="gallery">
        

        <transition-group tag="ul" class="content" name="opacity" mode="out-in" ref='list' v-on:scroll.native="loadGalleryMore($event)">

            <li class="no" v-if=" images.length <= 0 " key="-1">
                <!--<span><font-awesome-icon class="icon" :icon="iconImages" style="color: inherit;" /></span>-->
                <span>暂无图片</span>
            </li>

            <v-images v-for=" (l, index) in images " :info="l" :index="index" :key="index"></v-images>

            <li class="loading" v-if="isLoadMore" :key="-2">
                <span>
                    <!--<font-awesome-icon class="icon" :icon="iconLoading" style="color: inherit;" />-->
                </span>
                <span v-text=" language['loading'] + '...' "></span>
            </li>

        </transition-group>


        <div class="tools">

            <button v-on:click="refresh">刷新</button>
            <router-link tag="button" to="/gallery/create">添加</router-link>

        </div>

        <transition name="opacity" mode="out-in">
            <router-view />
        </transition>

    </div>

</template>
<style lang="less" scoped>

    .gallery{
        width: 100vw;height: 100vh;background-color: #fff;

        .content{
            width: 100%;height: 100%;padding: 100px 0;box-sizing: border-box;overflow-y: scroll;overflow-x: hidden;display: grid;grid-template-columns: repeat(auto-fit, 300px);grid-gap: 50px;justify-items: center;justify-content: center;

            .no{width: 100%;height: 200px;line-height: 200px;text-align: center;}
            .loading{
                width: 100%;height: 100px;display: flex;justify-content: center;align-items: center;

                .icon{animation:rotate 1s infinite linear;margin-right: 10px;}
            }

        }
        .tools{
            width: 100%;height: 60px;line-height: 60px;background-color: #fff;padding: 0 5%;display: flex;justify-content: flex-end;box-sizing: border-box;align-items: center;position: fixed;bottom: 0;left: 0;

            button{
                width: 120px;height: 40px;line-height: 40px;text-align: center;border-radius: 5px;cursor: pointer;transition: all .2s ease;background-color: #e1e1e1;margin-left: 20px;

                &:hover{color: #fff;}
            }
        }
    }

</style>
<script>

    // import iconTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
    // import iconImages from '@fortawesome/fontawesome-free-solid/faImages'
    // import iconLoading from '@fortawesome/fontawesome-free-solid/faSpinner'

    export default ({
        name: 'gallery',
        props: [],
        data() {
            return {}
        },
        components: {
            'v-images': () => import('./_image.vue')
        },
        computed: {
            // iconTrashAlt: () => { return iconTrashAlt },
            // iconImages: () => { return iconImages },
            // iconLoading: () => { return iconLoading },
            language(){
                return this.$store.state.language.data
            },
            images(){
                console.log(this.$store)
                return this.$store.state.gallery.data
            },
            isLoadMore(){ return this.$store.state.gallery.isLoadMore },
            finish(){ return this.$store.state.gallery.finish },
            next(){
                let size = this.images.length
                let next = this.images[--size].key
                return next
            }
        },
        watch: {},
        beforeCreate() {},
        create() {},
        beforeMount() {},
        mounted() {
            this.$store.dispatch('loadGallery')
        },
        destroyed(){},
        methods: {
            refresh(){
                this.$store.dispatch('loadGallery')
                this.$refs.list.$el.scrollTop = 0
            },
            loadGalleryMore(e){

                let all = e.target.scrollHeight
                let now = e.target.scrollTop + e.target.clientHeight

                let loadingHeight = all * 0.9

                if ( now >= loadingHeight ){

                    if ( this.isLoadMore === true || this.finish === true ){
                        return
                    }

                    this.$store.dispatch('loadGalleryMore', this.next)

                }

            }
        }

    })
</script>
