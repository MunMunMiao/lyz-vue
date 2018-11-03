<template>

    <div class="login">

        <input v-model="name" :class="{disabled:isLoading}" :disabled=isLoading type="text" :placeholder=" language['username'] " />
        <input v-model="nickname" :class="{disabled:isLoading}" :disabled=isLoading type="text" :placeholder=" language['nickname'] " />
        <input v-model="pw" :class="{disabled:isLoading}" :disabled=isLoading type="password" :placeholder=" language['password'] " />
        <input v-model="repw" :class="{disabled:isLoading}" :disabled=isLoading type="password" :placeholder=" language['Reenter The Password'] " />
        <button class="btn" :class="{disabled:isLoading}" :disabled=isLoading type="button" v-text=" isLoading ? '...' : language['signup'] " v-on:click="signup"></button>
        <div class="option">
            <router-link to="/passport/login">已有账号?</router-link>
            <router-link to="">忘记密码?</router-link>
        </div>

    </div>

</template>
<style lang="less" scoped>

    .login{
        width: 70%;height: 60%;margin: 0 auto;display: flex;flex-wrap: wrap;justify-content: center;

        .disabled{cursor: not-allowed!important;opacity: .8;}
        input{width: 100%;height: 40px;line-height: 40px;border-bottom: 1px solid #e1e1e1;transition: all .2s ease;}
        .btn{width: 100%;height: 40px;line-height: 40px;color: #fff;border-radius: 5px;cursor: pointer;position: relative;transition: all .2s ease;}
        .option{
            width: 100%;height: 40px;line-height: 40px;display: flex;justify-content: space-between;transition: all .2s ease;
        }

    }

</style>
<script>

    export default ({
        name: 'signup',
        props: [],
        data() {
            return {
                name:'',
                nickname:'',
                pw:'',
                repw:'',
                isLoading: false
            }
        },
        components: {},
        computed: {
            language: function () {
                return this.$store.state.language.data
            }
        },
        watch: {
            language () {
                document.title = '::' + this.language['signup'] + '::'
            }
        },
        beforeCreate() {

        },
        create() {

        },
        beforeMount() {

        },
        mounted() {

            document.title = '::' + this.language['signup'] + '::'

        },
        destroyed() {

        },
        methods: {
            signup (){

                let name = this.name.length > 0 ? this.name : false
                let nickname = this.nickname.length > 0 ? this.nickname : false
                let pw = this.pw.length > 0 ? this.pw : false
                let repw = this.repw.length > 0 ? this.repw : false

                if ( name === false || nickname === false || pw === false || repw === false ){

                    this.$store.commit('openTips', '信息不完整')
                    return

                }

                if ( pw !== repw ){

                    this.$store.commit('openTips', '两次输入的密码不一致')
                    return

                }

                let form = new FormData()
                form.append('name', name)
                form.append('nickname', nickname)
                form.append('password', pw)


                this.isLoading = true


                this.$axios
                    .post('/api/user/signup', form)
                    .then(r => {

                        store.commit('openTips', data.message)

                        if ( r.data.status === 1 ){

                            setTimeout(()=>{
                                router.push('/passport/login')
                            }, 1400)

                        }
                        if ( r.data.status === 0 ){

                            this.isLoading = false

                        }

                    })


            }

        }

    })
</script>
