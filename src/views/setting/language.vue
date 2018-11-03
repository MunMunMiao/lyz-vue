<template>

    <ul class="language">

        <li class="title">
            <div class="text id" v-text="language['id']"></div>
            <div class="text" v-text="language['keyword']"></div>
            <div class="text" v-text="language['english']"></div>
            <div class="text" v-text="language['chinese']"></div>
            <div class="text" v-text="language['korean']"></div>
            <div class="text" v-text="language['japanese']"></div>
            <div class="text" v-text="language['delete']"></div>
        </li>

        <li class="content" v-for="l in lang">
            <input class="text id" v-model="l.id" disabled />
            <input class="text" v-model="l.keyword" />
            <input class="text" v-model="l.en" />
            <input class="text" v-model="l.cn" />
            <input class="text" v-model="l.kr" />
            <input class="text" v-model="l.jp" />
            <button class="text delete" v-text="language['delete']" v-on:click="del(l.id)"></button>
        </li>

        <li class="button">
            <button v-on:click="reset">初始化</button>
            <button>还原</button>
            <button>提交</button>
        </li>

    </ul>


</template>
<style lang="less" scoped>

    .language{
        width: 100%;margin: 0 auto;

        .id{width: 50%!important;}

        li{
            display: flex;width: 100%;line-height: 40px;

            &:last-child{box-shadow: none;}
            &.title{


                .text{
                    width: 100%;line-height: 40px;text-align: center;padding: 4px 6px;;color: #fff;

                    &:last-child{box-shadow: none;}
                }

            }
            &.content{

                .text{
                    width: 100%;text-align: center;padding: 4px 6px;border: 1px solid transparent;border-bottom-color: #e1e1e1;border-right-color: #e1e1e1;

                    &:last-child{box-shadow: none;}
                    &:hover,&:focus{border: 1px solid @colro;}
                    &.delete{
                        cursor: pointer;transition: all .2s ease;

                        &:hover{color: #fff;}
                    }
                }

            }
            &.button{
                width:100%;height:100px;display: flex;justify-content: space-around;align-items: center;

                button{width: 150px;height: 40px;line-height: 40px;border-radius: 5px;color: #fff;cursor: pointer;}
            }

        }


    }

</style>
<script>

    export default {
        name:'language',
        data (){
            return{
                lang:''
            }
        },
        computed:{
            language:function() {
                return this.$store.state.language.data
            },
            userData:function () {
                return this.$store.state.userData.data
            }
        },
        mounted (){

            document.title = '::' + this.language['language'] + '::'
            document.querySelector('.title').innerText = this.language['language']

            this.getLanguageData()

        },
        beforeUpdate () {

        },
        watch:{
            language () {
                document.title = this.language['language']
                document.querySelector('.title').innerText = this.language['language']
            },
            userData () {
                this.nickname = this.userData.nickname
                this.email = this.userData.email
                this.gender = this.userData.gender
            }
        },
        destroyed (){

            document.querySelector('.title').innerText = ''

        },
        methods:{
            getLanguageData (){

                this.$axios
                    .post('/api/language/get')
                    .then(r => {

                        if ( r.data.status === 1 ){
                            this.lang = r.data.content
                        }
                        if ( r.data.status === 0 ){
                            this.$store.commit('openTips', r.data.message)
                        }

                    })

            },
            del(id){

                this.$axios
                    .post('/api/language/del', {
                        id: id
                    })
                    .then(r => {

                        if ( r.data.status === 1 ){
                            this.$store.commit('openTips', r.data.message)
                            this.getLanguageData()
                        }
                        if ( r.data.status === 0 ){
                            this.$store.commit('openTips', r.data.message)
                        }

                    })

            },
            reset(){

                this.$axios
                    .post('/api/language/reset')
                    .then(r => {

                        if ( r.data.status === 1 ){
                            this.$store.commit('openTips', r.data.message)
                            this.getLanguageData()
                            this.$store.dispatch('loadLanguage')
                        }
                        if ( r.data.status === 0 ){
                            this.$store.commit('openTips', r.data.message)
                        }

                    })

            }

        }

    }

</script>
