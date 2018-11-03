import axios from 'axios'

axios.defaults.withCredentials = true

export default {
    install: function (Vue: void, options: void) {
        Vue.prototype.$axios = axios
    }
};