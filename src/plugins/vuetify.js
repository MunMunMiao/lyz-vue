import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import 'vuetify/src/stylus/app.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
    theme: {
        primary: '#0D47A1',
        secondary: '#4082e8',
        accent: '#a10d0d',
        error: '#c01818',
        success: '#388E3C',
        warning: '#FBC02D',
        font: '#212121'
    },
    iconfont: 'mdi',
})