<template>

    <div class="editor">

        <div class="tool">

        </div>
        <div class="wrap">
            <div class="editView">
                <div class="tips">
                    <a class="type">编辑</a>
                </div>
                <textarea v-model="content" v-bind:placeholder="language['Say Something...']"></textarea>
            </div>
            <div class="previewView">
                <div class="tips">
                    <a class="type">视图</a>
                </div>
                <div class="content markdown"  v-html="mdToHTML(content)" v-highlight></div>
            </div>
        </div>

        <div class="function">

            <button v-on:click="submit">
                <font-awesome-icon class="icon" :icon="iconCheck" style="color: inherit;" />
            </button>
            <button v-on:click="del">
                <font-awesome-icon class="icon" :icon="iconTrashAlt" style="color: inherit;" />
            </button>

        </div>

    </div>

</template>
<style lang="less" scoped>

    @import "../../assets/css/markdown.css";

    .editor{
        width: 90%;margin:100px auto 0 auto;border-radius:5px;background-color: #fff;overflow: hidden;

        .tool{
            width:100%;height:40px;line-height:40px;border-bottom: 1px solid #e1e1e1;
        }
        .wrap{
            width: 100%;height: 800px;display: flex;

            .editView{
                width: 50%;border-right: 1px solid #e1e1e1;position: relative;

                textarea{width: 100%;height: 100%;overflow-y: auto;padding: 40px 10px 10px 10px;box-sizing: border-box;}
            }
            .previewView{
                width: 50%;box-sizing: border-box;word-break: break-word;position: relative;

                .content{width: 100%;height: 100%;padding: 40px 10px 10px 10px;word-wrap: break-word;word-break: normal;white-space: pre-wrap;font-family: inherit;font-weight: normal;box-sizing: border-box;overflow-y: auto;}
            }
            .tips{
                width: 100%;height: 40px;background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0));position: absolute;top: 0;z-index: 1;

                .type{position:absolute;top: 5px;left: 10px;display: inline-block;background-color: #e1e1e1;color: #555;font-size: 12px;border-radius: 5px;padding: 2px 10px;}
            }
        }
        .function{
            width:100%;height:40px;line-height:40px;border-top: 1px solid #e1e1e1;display: flex;justify-content: flex-end;

            button{
                width: 40px;height: 40px;background-position: 50% 50%;background-repeat: no-repeat;background-size: cover;cursor: pointer;

            }
        }
    }

</style>
<script>

    import store from '../../store'
    import router from '../../router'
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import iconCheck from '@fortawesome/fontawesome-free-solid/faCheck'
    import iconTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'

    export default ({

        name:'noteEdit',
        data (){
            return{
                tool:{},
                content:''
            }
        },
        components: {
            FontAwesomeIcon
        },
        computed:{
            language() {
                return this.$store.state.language.data
            },
            noteID () {
                return this.$route.params.id
            },
            isEdit () {
                return this.noteID != undefined
            },
            iconCheck: () => { return iconCheck },
            iconTrashAlt: () => { return iconTrashAlt },
        },
        watch:{
            language () {
                document.title = '::' + this.language['note'] + '::'
            }
        },
        mounted (){

            document.title = '::' + this.language['note'] + '::'

            if( this.noteID != undefined ){ this.getNoteData() }

        },
        beforeRouteLeave (to, from, next){

            if ( this.content.length > 0 ){
                store.commit('openTips', '未保存')
                next(false)
            }else {
                next()
            }

        },
        methods:{
            mdToHTML (md){

                const marked = require('marked')

                marked.setOptions({
                    renderer: new marked.Renderer(),
                    gfm: true,
                    tables: true,
                    breaks: true,
                    pedantic: true,
                    sanitize: false,
                    smartLists: true,
                    smartypants: true
                });

                return marked(md)
            },
            del (){

                if ( this.isEdit == true ){

                    let _this = this;
                    store.dispatch('showLoadding')
                    var formData = new FormData();
                    formData.append('del',_this.noteID);

                    this.$axios.post('/api/note/del', formData)
                        .then(r => {
                            store.dispatch('closeLoadding')
                            store.commit('openTips', r.data.message)
                            this.content = ''
                            router.push('/note')
                        })

                }

                return false;

            },
            getNoteData (){

                this.$axios
                    .post('/api/note/get', {
                        id: this.noteID
                    })
                    .then(r => {
                        this.content = r.data.content[0].text
                    })

            },
            submit (){

                let _this = this
                let text = _this.content;
                let formData = new FormData();

                if ( text.length < 1 ){
                    store.commit('openTips','Text Cannot Be Empty😱')
                    return false
                }
                store.dispatch('showLoadding')

                formData.append('text',text);

                if ( _this.isEdit == true ){

                    formData.append('id',_this.noteID);

                    this.$axios
                        .post('/api/note/edit', formData)
                        .then(r => {
                            store.dispatch('closeLoadding')
                            store.commit('openTips', r.data.message)
                        })

                }

                if ( _this.isEdit == false ){

                    this.$axios
                        .post('/api/note/push', formData)
                        .then(r => {
                            store.dispatch('closeLoadding')
                            store.commit('openTips', r.data.message)
                        })

                }

                this.content = ''
                router.push('/note')

            }
        }

    })


</script>