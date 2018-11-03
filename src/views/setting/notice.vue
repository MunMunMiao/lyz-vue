<template>

    <ul class="notice">

        <li></li>

    </ul>

</template>
<style lang="less" scoped>

    .notice{
        width: 100%;margin: 0 auto;padding: 20px;box-sizing: border-box;



    }

</style>
<script>

    import store from '../../store'

    export default {
        name:'notice',
        data (){
            return{

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

            document.title = '::' + this.language['notice'] + '::'
            document.querySelector('.title').innerText = this.language['notice']

        },
        beforeUpdate () {

        },
        watch:{
            language () {
                document.title = this.language['portrait']
                document.querySelector('.title').innerText = this.language['portrait']
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

        }

    }

</script>