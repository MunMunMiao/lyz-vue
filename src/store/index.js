import Vue from 'vue'
import Vuex from 'vuex'
import gallery from './gallery/index'
import language from './language/index'
import app from './app/index'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        note: import('./note/index'),
        gallery: gallery,
        language: language,
        app: app
    }
})