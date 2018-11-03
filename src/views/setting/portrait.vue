<template>

    <div class="portrait">
        <input type="file" ref="userPhoto" v-on:change="readUserPhoto" />
        <div class="photo" v-bind:style=" 'background-image: url('+ img +')' ">
            <div class="tips" v-if="img == ''">点击此添加头像</div>
        </div>
        <button class="reset" v-text="language['reset']" v-on:click="reset"></button>
        <button class="select" v-text="language['select']" v-on:click="add"></button>
        <button class="submit" v-text="language['submit']" v-on:click="setUserPhoto"></button>

    </div>

</template>
<style lang="less" scoped>

    .portrait{
        width: 100%;max-width: 600px;margin: 0 auto;display: flex;flex-wrap: wrap;justify-content: space-around;padding: 20px;box-sizing: border-box;

        .photo{
            width: 100%;height: 500px;line-height:500px;text-align: center;border: 1px solid #e1e1e1;border-radius: 5px;margin-bottom: 20px;background-position: 50%,50%;background-size: contain;background-repeat: no-repeat;

            .tips{color: #555;}

        }
        button{
            border-radius: 5px;width: 8rem;max-width: 150px;height: 40px;color: #fff;cursor: pointer;

            &.reset{}

        }

    }

</style>
<script>

    export default {
        name:'portrait',
        data (){
            return{
                img: ''
            }
        },
        computed:{
            language(){
                return this.$store.state.language.data
            },
            userData(){
                return this.$store.state.system.user
            },
            userDataPhoto(){
                return this.userData.portrait
            }
        },
        mounted (){

            this.img = this.userDataPhoto

        },
        destroyed (){},
        watch:{},
        methods:{
            add (){
                this.$refs.userPhoto.click()
            },
            reset(){

                this.img = this.userDataPhoto
                document.getElementById('userPhoto').value = ''

            },
            readUserPhoto(){

                const img = this.$refs.userPhoto.files[0];
                const fileReader = new FileReader()

                fileReader.readAsDataURL(img)

                fileReader.onload = () => this.img = fileReader.result
                fileReader.onerror = () => this.img = ''

            },
            async setUserPhoto(){

                const oss = new this.$oss()
                const axios = this.$utils.axios
                const fileReader = new FileReader()
                const userPhoto = this.$refs.userPhoto.files[0]

                if ( userPhoto === undefined ){
                    store.commit('openTips', '请选择头像')
                    return false
                }

                let md5 = this.$utils.readFileMd5(userPhoto)
                let name = this.$utils.readTextMd5(md5 + new Date().getTime())

                let re = await oss.put('/user/portrait/' + name, userPhoto)

                axios
                    .put('/api/user/setPortrait', {
                        key: re.name
                    })
                    .then(r => {

                        this.$store.commit('openTips', r.data.message)
                        this.$store.dispatch('loadUserData')

                    })

            },
        }

    }

</script>