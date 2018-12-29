<template>

    <div class="index">

        <v-toolbar dense height="50">

            <router-link tag="div" class="logo" to="/">
                <v-img :src="logo" width="35"></v-img>
            </router-link>

            <v-spacer></v-spacer>

            <v-btn depressed flat to="/note">Note</v-btn>
            <v-btn depressed flat to="/gallery">Gallery</v-btn>

            <v-menu offset-y :close-on-content-click="false" max-width="250">

                <v-btn icon fab small round slot="activator">
                    <v-avatar size="40">
                        <v-img :src=" userData['portrait'] || '' " :lazy-src=" userData['portrait'] || '' " />
                    </v-avatar>
                </v-btn>

                <v-list>

                    <v-list-tile>

                        <v-list-tile-avatar>
                            <v-img :src=" userData['portrait'] || '' " :lazy-src=" userData['portrait'] || '' " />
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>MunMun Miao</v-list-tile-title>
                            <v-list-tile-sub-title>wunonglin@gmail.com</v-list-tile-sub-title>
                        </v-list-tile-content>

                    </v-list-tile>

                </v-list>

                <v-divider></v-divider>

                <v-list one-line>

                    <v-list-tile @click="">

                        <v-list-tile-avatar>
                            <v-icon>mdi-earth</v-icon>
                        </v-list-tile-avatar>

                        <!--<v-list-tile-content>-->
                        <!--<v-select :items="languageList" item-value="id" item-text="text" full-width flat></v-select>-->
                        <!--</v-list-tile-content>-->

                        <v-list-tile-action>
                            <v-select :items="languageList" item-value="id" item-text="text" full-width flat hide-details single-line></v-select>
                        </v-list-tile-action>

                    </v-list-tile>

                    <v-list-tile @click="displayMode = !displayMode">

                        <v-list-tile-avatar>
                            <v-icon>mdi-circle-slice-4</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>深色模式</v-list-tile-content>

                        <v-list-tile-action>
                            <v-switch color="primary" :value="displayMode"></v-switch>
                        </v-list-tile-action>

                    </v-list-tile>

                    <v-list-tile @click="">

                        <v-list-tile-avatar>
                            <v-icon>mdi-settings</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>设置</v-list-tile-content>

                    </v-list-tile>

                    <v-list-tile @click="exit">

                        <v-list-tile-avatar>
                            <v-icon>mdi-exit-run</v-icon>
                        </v-list-tile-avatar>

                        <v-list-tile-content>退出</v-list-tile-content>

                    </v-list-tile>

                </v-list>

            </v-menu>

        </v-toolbar>

        <router-view class="wrap" />

    </div>

</template>
<style lang="less" scoped>

    /deep/ .v-input__slot{padding: 0!important;}

    header{


        .content{
            width: 100%;display: flex;justify-content: space-between;align-items: center;


        }
    }

    .wrap{
        height: calc(100vh - 50px);
    }

</style>
<script>

    import logo from '../../assets/images/logo.svg'

    export default ({
        name: 'index',
        props: [],
        data() {
            return {}
        },
        components: {},
        computed: {
            logo(){
                return logo
            },
            languageList(){
                return this.$store.getters.getLanguageList
            },
            lang(){
                return this.$store.getters.lang
            },
            displayMode: {
                get(){
                    return this.$store.getters.isDark
                },
                set(value){
                    this.$store.commit('setDisplayMode', value)
                }
            },
            userData(){
                return this.$store.getters.getUserData
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
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        methods: {
            exit(){

                this.$axios
                    .post('/user/exit')
                    .then(r => {

                        if ( r.data.success ){
                            this.$store.commit('userSignOut')
                            this.$router.push('/passport/login')
                        }

                    })

            }
        }
    })

</script>
