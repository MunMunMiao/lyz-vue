import axios from 'axios'

export default {
    state: {
        dark: false,
        lang: {
            key: 'english',
            value: '美国'
        },
        langs: [
            {
                key: 'english',
                value: '美国'
            },
            {
                key: 'chinaese',
                value: '中国'
            },
        ]
    },
    getters: {
        isLight(state){
            return !state.dark
        },
        isDark(state){
            return state.dark
        },
        langList(state){
            return state.langs
        },
        lang(state){
            return state.lang
        }
    },
    mutations: {
        setDisplayMode(state, value){
            state.dark = value
        },
        setLang(state, value){
            state.lang = value
        },
    },
    actions: {}
}