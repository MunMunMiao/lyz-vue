<template>

    <div class="login">

        <input v-model="name" :class="{disabled:isLoading}" :disabled=isLoading type="text" :placeholder=" language['username'] " />
        <input v-model="pw" :class="{disabled:isLoading}" :disabled=isLoading type="password" :placeholder=" language['password'] " />
        <button class="btn" :class="{disabled:isLoading}" :disabled=isLoading type="button" v-text=" isLoading ? '...' : language['login'] " v-on:click="login"></button>
        <div class="option">
            <router-link to="/passport/signup">还没有账号?</router-link>
            <router-link to="">忘记密码?</router-link>
        </div>

    </div>

</template>
<style lang="less" scoped>

    .login{
        width: 70%;height: 50%;margin: 0 auto;display: flex;flex-wrap: wrap;justify-content: center;


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
        name: 'login',
        props: [],
        data() {
            return {
                name:'',
                pw:'',
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
                document.title = '::' + this.language['login'] + '::'
            }
        },
        beforeCreate() {

        },
        create() {

        },
        beforeMount() {

        },
        mounted() {

            document.title = '::' + this.language['login'] + '::'

        },
        destroyed() {

        },
        methods: {
            login (){

                let name = this.name.length > 0 ? this.name : false
                let pw = this.pw.length > 0 ? this.pw : false

                if ( name === false || pw === false ){
                    store.commit('openTips', '账号或者密码为空')
                    return
                }

                const form = new FormData()
                form.append('name', name)
                form.append('password', pw)


                this.isLoading = true

                this.$axios
                    .post('/api/user/login', {
                        name: name,
                        password: pw
                    })
                    .then(r => {

                        this.$store.commit('openTips', r.data.message)

                        if ( r.data.status === 1 ){
                            this.$store.dispatch('loadUserData')
                            this.$router.push('/')
                        }

                        this.isLoading = false

                    })


            }

        }

    })
</script>
