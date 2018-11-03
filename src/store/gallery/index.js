export default {
    state: {
        data: [],
        isLoadMore: false,
        finish: false
    },
    getters: {
        list: function (state, getters) {
            return state.data;
        }
    },
    mutations: {
        getGallery: function (state, data) {
            for (var i in state.data) {
                state.data.splice(i, 1);
            }
            for (var i in data) {
                state.data.push(data[i]);
            }
        },
        pushGallery: function (state, data) {
            for (var i in data) {
                state.data.push(data[i]);
            }
        },
        deleteGallery: function (state, index) {
            state.data.splice(index, 1);
        }
    },
    actions: {
        loadGallery: function (context) {
            context.state.isLoadMore = true;
            // axios
            //     .get('/api/gallery')
            //     .then(r => {
            //
            //         if ( r.data.status === 1 ){
            //             context.commit('getGallery', r.data.content)
            //             context.state.isLoadMore = false
            //         }
            //         if ( r.data.status === 0 ){
            //             // context.commit('openTips', r.data.message)
            //             context.state.isLoadMore = false
            //         }
            //
            //     })
        },
        loadGalleryMore: function (context, key) {
            context.state.isLoadMore = true;
            // axios
            //     .get('/api/gallery', {
            //         params: {
            //             key: key
            //         }
            //     })
            //     .then(r => {
            //
            //         if ( r.data.status === 1 ){
            //             context.commit('pushGallery', r.data.content)
            //             context.state.isLoadMore = false
            //         }
            //         if ( r.data.status === 0 ){
            //             // context.commit('openTips', r.data.message)
            //             context.state.isLoadMore = false
            //             context.state.finish = true
            //         }
            //
            //     })
        }
    }
};