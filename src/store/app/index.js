export default {
    state: {
        light: true
    },
    getters: {
        isLight: function (state) {
            return state.light;
        },
        isDark: function (state) {
            return !state.light;
        },
    },
    mutations: {},
    actions: {}
};