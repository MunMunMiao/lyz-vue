<template>
  
    <div class="main">

        <ul class="pageList">

            <div class="openText" v-on:click="openText = !openText" v-if="openText"> < </div>
            <div class="openText" v-on:click="openText = !openText" v-if="!openText"> > </div>

            <!--普通用户-->
            <router-link to="/setting/portrait" tag="li" active-class="active">
                <a class="box">
                    <!--<font-awesome-icon class="icon" :icon="iconUser" style="color: inherit;" />-->
                    <span class="text" v-if="openText" v-text="language['portrait']"></span>
                </a>
            </router-link>
            <router-link to="/setting/data" tag="li" active-class="active">
                <a class="box">
                    <!--<font-awesome-icon class="icon" :icon="iconFileAlt" style="color: inherit;" />-->
                    <span class="text" v-if="openText" v-text="language['data']"></span>
                </a>
            </router-link>
            <router-link to="/setting/safety" tag="li" active-class="active">
                <a class="box">
                    <!--<font-awesome-icon class="icon" :icon="iconShieldAlt" style="color: inherit;" />-->
                    <span class="text" v-if="openText" v-text="language['safety']"></span>
                </a>
            </router-link>
            <router-link to="/setting/notice" tag="li" active-class="active">
                <a class="box">
                    <!--<font-awesome-icon class="icon" :icon="iconComment" style="color: inherit;" />-->
                    <span class="text" v-if="openText" v-text="language['notice']"></span>
                </a>
            </router-link>
            <!--普通用户-->
            <div class="line"></div>


            <!--管理员用户-->
            <router-link to="#" tag="li" v-if="userData.admin == 1" active-class="active">
                <a class="box">
                    <!--<font-awesome-icon class="icon" :icon="iconFileAlt" style="color: inherit;" />-->
                    <span class="text" v-if="openText" >测试</span>
                </a>
            </router-link>
            <!--管理员用户-->
            <div class="line"></div>


            <!--ROOT用户-->
            <router-link to="/setting/language" tag="li" v-if="userData.root == 1" active-class="active">
                <a class="box">
                    <!--<font-awesome-icon class="icon" :icon="iconGlobe" style="color: inherit;" />-->
                    <span class="text" v-if="openText" v-text="language['language']"></span>
                </a>
            </router-link>
            <!--ROOT用户-->

        </ul>

        <div class="wrap">

            <div class="title"></div>

            <transition name="opacity"  mode="out-in">
                <router-view />
            </transition>

        </div>

    </div>

</template>
<style lang="less" scoped>

    .main{
        width: 80%;margin: 100px auto;background-color: #fff;border-radius: 5px;box-shadow: 0 0 20px rgba(0,0,0,.6);display: flex;overflow: hidden;

        .pageList{
            width: auto;height: auto;line-height: 50px;border-right: 1px solid #e1e1e1;position: relative;


            li{
                position: relative;

                &:after, &.border:after{content: '';position: absolute;top: 0;left: 0;width: 4px;height: 100%;transform: translateX(-100%);transition: all .2s ease;}

                &:hover:after, &.active:after{transform: translateX(0%);}

            }

            .line{width: 100%;height: 1px;background-color: #e1e1e1;}
            .box{
                width: 100%;height: 100%;padding: 10px 20px;box-sizing: border-box;display: flex;justify-content: left;align-items: center;

                .icon{width: 40px;height: 40px;transform: scale(.5);}
                .text{width: 90px;height: 40px;line-height: 40px;display: block;}
            }
            .openText{position: absolute;right: 0;top: 0;bottom: 0;margin: auto;width: 10px;height: 20px;line-height: 20px;color: #fff;padding: 8px 4px;border-radius: 5px 0 0 5px;cursor: pointer;font-weight: bold;z-index: 10;}
        }

        .wrap{
            width: 100%;height: 100%;

            .title{width: 100%;background-color: #fff;color: #555;height: 60px;line-height: 60px;text-align: center;font-size: 24px;box-shadow: 0 1px #e1e1e1;}
        }

    }

</style>
<script>

    import store from '../../store'
    // import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    // import iconUser from '@fortawesome/fontawesome-free-solid/faUser'
    // import iconFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt'
    // import iconShieldAlt from '@fortawesome/fontawesome-free-solid/faShieldAlt'
    // import iconComment from '@fortawesome/fontawesome-free-solid/faComment'
    // import iconGlobe from '@fortawesome/fontawesome-free-solid/faGlobe'

    export default {
        name:'setting',
        data (){
            return{
                openText:false
            }
        },
        components: {
            // FontAwesomeIcon
        },
        computed:{
            language(){
                return this.$store.state.language.data
            },
            userData(){
                return this.$store.state.system.user
            },
            isLogin(){
                return this.userData !== null
            },
            // iconUser: () => { return iconUser },
            // iconFileAlt: () => { return iconFileAlt },
            // iconShieldAlt: () => { return iconShieldAlt },
            // iconComment: () => { return iconComment },
            // iconGlobe: () => { return iconGlobe }
        },
        mounted (){

            document.title = '::' + this.language['settings'] + '::'
            document.querySelector('.title').innerText = this.language['settings']


            if ( this.userDataPhoto != 'undefined' || this.userDataPhoto != '' ){
                this.img = this.userDataPhoto
            }
        },
        destroyed (){

            document.querySelector('.title').innerText = ''

        },
        watch:{
            language:function () {
                document.title = this.language['portrait']
                document.querySelector('.title').innerText = this.language['portrait']
            },
            userDataPhoto:function () {
                this.img = this.userDataPhoto
            }
        },
        methods:{

        }

    }

</script>