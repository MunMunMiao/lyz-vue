<template>

    <div class="create">

        <div class="mask"></div>
        <div class="form">

            <div class="header">
                <div class="title">添加</div>
                <router-link tag="button" class="close" to="/gallery">
                    <!--<font-awesome-icon class="icon" :icon="iconTimes" size="lg" style="color: inherit;" />-->
                </router-link>
            </div>

            <div class="content">

                <ul class="list">

                    <li class="image" v-for=" (value, key, index) in list ">

                        <div class="txt">
                            <span class="index" v-text="++key"></span>
                            <span class="name" v-text="value.name"></span>
                        </div>

                        <div class="status">
                            <span v-if=" value.status === 0 ">Pending</span>
                            <span v-if=" value.status === 1 ">Processing</span>
                            <span v-if=" value.status === 2 ">Uploading</span>
                            <span v-if=" value.status === 3 ">Complete</span>
                            <span v-if=" value.status === 4 ">Skip</span>
                            <span v-if=" value.status === 5 ">Error</span>
                        </div>

                    </li>

                </ul>

            </div>

            <div class="footer">

                <div>
                    <transition name="opacity" mode="out-in">
                        <div v-if=" list.length > 0 " v-text="list.length"></div>
                    </transition>
                </div>
                <div class="fn">
                    <button v-on:click=" list = []; input = '' ">清空</button>
                    <button v-on:click="select">选择</button>
                    <button v-on:click="submit">提交</button>
                    <router-link tag="button" to="/gallery">取消</router-link>
                </div>

            </div>

        </div>

        <input type="file" multiple v-on:change="change" ref="input" />

    </div>

</template>
<style lang="less" scoped>

    .create{
        width: 100vw;height: 100vh;position: fixed;top: 0;left: 0;z-index: 1000;

        .mask{width: 100%;height: 100%;}
        .form{
            width: 800px;background-color: #fff;border-radius: 5px;position: absolute;top: 100px;left: 0;right: 0;margin: auto;

            .header{
                width: 100%;height: 60px;line-height: 60px;border-bottom: 1px solid #e1e1e1;display: flex;justify-content: space-between;align-items: center;padding: 0 5%;box-sizing: border-box;

                .title{font-size: 18px;}
                .close{display: flex;justify-content: space-between;align-items: center;cursor: pointer;}
            }
            .content{
                width: 100%;height: 60vh;display: flex;justify-content: center;align-items: flex-start;flex-wrap: wrap;padding: 30px;box-sizing: border-box;overflow-y: auto;overflow-x: hidden;align-content: flex-start;

                .list{
                    width: 100%;display: flex;flex-wrap: wrap;

                    .image{
                        width: 100%;height: 40px;line-height: 40px;margin-bottom: 10px;border-bottom: 1px solid #e1e1e1;display: flex;justify-content: space-between;

                        .txt{

                            .index{font-weight: bold;}
                        }
                        .status{font-weight: bold;}
                    }
                }
            }
            .footer{
                width: 100%;height: 60px;border-top: 1px solid #e1e1e1;display: flex;justify-content: space-between;align-items: center;padding: 0 5%;box-sizing: border-box;

                button{
                    width: 100px;height: 40px;line-height: 40px;cursor: pointer;transition: all .2s ease;border-radius: 5px;margin-left: 20px;background-color: #e1e1e1;

                    &:hover{color: #fff;}
                }
            }
        }
    }

</style>
<script>

    // import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    // import iconTimes from '@fortawesome/fontawesome-free-solid/faTimes'

    export default ({
        name: 'create',
        props: [],
        data() {
            return {
                input: '',
                list: [],
            }
        },
        components: {
            // FontAwesomeIcon
        },
        computed: {
            // iconTimes: () => { return iconTimes }
        },
        watch: {},
        beforeCreate() {

        },
        create() {

        },
        beforeMount() {

        },
        mounted(){
        },
        beforeDestroy() {
            this.$set(this.$store.state.gallery, 'data', [])
            this.$store.dispatch('loadGallery')
        },
        destroyed() {},
        methods: {
            change(){

                let files = this.$refs.input.files
                let list = []

                for ( let i=0; i < files.length; i++ ){

                    list.push({
                        name: files[i].name,
                        isUpload: false,
                        status: 0
                    })
                }

                this.list = list

            },
            async submit(){

                const axios = this.$utils.axios
                let files = this.$refs.input.files
                let allFileSize = files.length

                // 0 等待
                // 1 预处理
                // 2 上传中
                // 3 完成
                // 4 跳过
                // 5 错误

                for ( let i = 0; i < allFileSize; i++ ){

                    let file = files[i]

                    if ( this.list[i].isUpload === false && this.list[i].status !== 4 ){

                        this.list[i].status = 1
                        let md5 = await this.$utils.readFileMd5(file)
                        let name = await this.$utils.readTextMd5(md5 + new Date().getTime())

                        let isEmpty = await this.isEmpty(md5)

                        if ( !isEmpty ){

                            this.list[i].status = 4
                            this.submit()
                            break

                        }

                        this.list[i].status = 2

                        let putFile = await this.putFile(name, file)

                        if ( !putFile ){
                            this.list[i].status = 5
                            break
                        }

                        axios
                            .post('/api/gallery', {
                                key: name,
                                md5: md5
                            })
                            .then(r=> {

                                this.list[i].status = 3
                                this.list[i].isUpload = true

                                if ( i !== allFileSize ){
                                    this.submit()
                                }

                            })
                            .catch(r => {

                                this.list[i].status = 5

                            })

                        break

                    }

                }

            },
            async putFile(name, file){

                const client = new this.$oss()

                return client
                    .create()
                    .catch(r => {

                        return false

                    })
                    .then(r => {

                        return client.put('/images/' + name, file)

                    })
                    .catch(r => {

                        console.log(r)
                        return false

                    })
                    .then(r => {

                        return true

                    })

            },
            async isEmpty(md5){

                return this.$utils.axios.get('/api/gallery/isempty', {
                        params: {
                            md5: md5
                        }
                    })
                    .then(r => {

                        if ( r.data.status === 1 ){ return true }
                        if ( r.data.status === 0 ){ return false }

                    })
                    .catch(r => {

                        console.log(r)
                        return false

                    })

            },
            empty(index){
                this.$refs.input.value = ''
            },
            select(){
                this.$refs.input.click()
            }
        }

    })
</script>
