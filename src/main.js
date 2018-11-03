import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './plugins/vuetify';
import './plugins/fontawesome';
import axios from './plugins/axios';
import utils from './plugins/utils';
Vue.use(axios);
Vue.use(utils);
Vue.config.productionTip = false;
new Vue({
    router: router,
    store: store,
    render: () => template(App)
}).$mount('app');
//# sourceMappingURL=main.js.map