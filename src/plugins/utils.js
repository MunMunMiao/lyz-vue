var utils = {
    getProgress: function (fn) {
        return function (p) {
            fn(Math.round((p.loaded * 100) / p.total));
        };
    }
};
export default {
    install: function (Vue, options) {
        Vue.prototype.$utils = utils;
    }
};
//# sourceMappingURL=utils.js.map