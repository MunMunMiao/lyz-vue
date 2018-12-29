import Vue from 'vue'
import Vuex from 'vuex'

import note from './note/index'
import gallery from './gallery/index'
import language from './language/index'
import user from './user/index'
import app from './app/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        note,
        gallery,
        language,
        app,
        user
    }
})