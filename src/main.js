import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import VueLocalStorage from 'vue-localstorage'
import './plugins/vuetify'

import axios from './plugins/axios'
import utils from './plugins/utils'

Vue.use(axios)
Vue.use(utils)
Vue.use(VueLocalStorage, {
    name: 'ls',
    bind: true
})

Vue.config.productionTip = false

new Vue({
    router: router,
    store: store,
    render: template => template(App)
}).$mount('app')