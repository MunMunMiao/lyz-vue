import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';
Vue.use(Vuetify, {
    theme: {
        primary: '#3599ff',
        secondary: '#689bd6',
        accent: '#E53935',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        font: '#555555'
    },
    iconfont: 'mdi',
});
//# sourceMappingURL=vuetify.js.map