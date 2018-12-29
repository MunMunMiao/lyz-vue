<template>

    <div class="note">

        <transition-group name="opacity" mode="out-in" tag="ul" class="list">
            <li class="article" v-for=" (l, index) in note" v-bind:key="index" ref="block">

                <div class="subject markdown" v-html="mdToHTML(l.text)" v-highlight></div>
                <div class="box">
                    <div class="info">
                        <div class="text">
                            <span id="year" v-text=" new Date(l.updataTime).getFullYear() "></span> {{ language['year'] }}
                            <span id="month" v-text=" new Date(l.updataTime).getMonth() "></span> {{ language['month'] }}
                            <span id="day" v-text=" new Date(l.updataTime).getDate() "></span> {{ language['day'] }}
                        </div>
                        <div class="text">
                            <span id="hour" v-text=" new Date(l.updataTime).getHours() "></span> {{ language['hour'] }}
                            <span id="minute" v-text=" new Date(l.updataTime).getMinutes() "></span> {{ language['minute'] }}
                            <span id="second" v-text=" new Date(l.updataTime).getSeconds() "></span> {{ language['second'] }}
                        </div>
                        <div class="text" v-text=" 'IP:' + l.ip "></div>
                    </div>
                    <div class="function">
                        <div class="button" v-on:click="del(l.id)" v-text=" language['delete'] "></div>
                        <router-link class="button" tag="div" v-bind:to=" '/note/edit/'+l.id " v-text=" language['edit'] "></router-link>
                    </div>
                </div>

            </li>
        </transition-group>

        <div class="fn">

            <router-link to="/note/edit/create" tag="button" class="add">
                <!--<font-awesome-icon :icon="iconPlus" style="color: inherit;" />-->
            </router-link>
            <button class="backTop" v-on:click="backTop">
                <!--<font-awesome-icon :icon="iconChevronUp" style="color: inherit;" />-->
            </button>

        </div>

    </div>

</template>
<style lang="less" scoped>

    .note{
        width: 100vw;height: 100vh;font-size: 14px;overflow: scroll;

        .list{
            width: 100%;margin: 0 auto;position: relative;padding: 100px 0;

            .article{
                width: 80%;max-width: 1000px;margin: 0 auto 50px auto;border-radius:5px;min-height: 30px;line-height: 30px;text-align: justify;color: #555;font-weight: 600;position: relative;background-color: #fff;padding: 30px;box-sizing: border-box;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

                &:last-child{margin-bottom: 0;}
                .subject{word-wrap: break-word;word-break: normal;white-space: pre-wrap;font-family: inherit;font-weight: normal;margin: 0;}

            }
            .box{
                width: 100%;height: 100px;display: flex;justify-content: space-between;align-content: flex-end;align-items: flex-end;

                .info{
                    line-height: 2;

                    .text{font-size: 12px;font-style: italic;color: #bbb;float: left;transition: color .2s ease;cursor: default;width: 100%;font-weight: normal;position: relative;

                    }
                }
                .function{
                    display: flex;justify-content: space-between;align-content: center;

                    .button{margin-left: 10px;cursor: pointer;font-weight: normal}
                }
            }

        }

        .fn{
            position: fixed;bottom: 5%;right: 2%;width: 50px;border-radius: 5px;overflow: hidden;display: flex;flex-wrap: wrap;

            button{
                width: 100%;height: 50px;background-color: #fff;cursor: pointer;transition: all .2s ease;

                &:hover{color: #fff;}
            }
        }

    }

</style>
<style>
    @import "../../assets/css/markdown.css";
</style>
<script>

    // import iconChevronUp from '@fortawesome/fontawesome-free-solid/faChevronUp'
    // import iconPlus from '@fortawesome/fontawesome-free-solid/faPlus'

    export default ({

        name: 'note',
        data() {
            return {
            }
        },
        components: {

        },
        computed: {
            note (){
                return this.$store.state.note.list
            },
            language(){
                return this.$store.state.language.data
            },
            // iconChevronUp: () => { return iconChevronUp },
            // iconPlus: () => { return iconPlus },
            allNoteHeight(){
                // this.note.length *
            }
        },
        watch: {
            language(){
                document.title = '::' + this.language['note'] + '::'
            }
        },
        mounted() {

            document.title = '::' + this.language['note'] + '::'

            this.$store.dispatch('loadNote')

        },
        methods: {
            mdToHTML: md => {

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
            del(n){

                this.$axios
                    .post('/api/note/del', {
                        id: n
                    }, {
                        onUploadProgress: utils.getProgress(p => {
                            this.$store.commit('showLoadingBar', p)
                        }),
                        onDownloadProgress: utils.getProgress(p => {
                            this.$store.commit('showLoadingBar', p)
                        })
                    })
                    .then(r => {
                        this.$store.dispatch('closeLoadding')
                        this.$store.commit('openTips', r.data.message)
                        this.$store.dispatch('loadNote')
                    })


            },
            backTop: () => {
                window.backTop()
            }
        }

    })


</script>