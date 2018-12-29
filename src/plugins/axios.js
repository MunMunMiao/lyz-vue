import axios from 'axios'

axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true

export default {
    install: function (Vue, options) {
        Vue.prototype.$axios = axios
    }
}