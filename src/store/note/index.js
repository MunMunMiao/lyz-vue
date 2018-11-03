export default {
    state: {
        list: ''
    },
    mutations: {
        loadNote: function (state, list) {
            state.list = list;
        },
        clearNote: function (state) {
            state.list = '';
        }
    },
    actions: {
        loadNote: function (context) {
            // axios.post('/api/note/get', '', {
            //     onUploadProgress: utils.getProgress(p => {
            //         context.commit('showLoadingBar', p)
            //     }),
            //     onDownloadProgress: utils.getProgress(p => {
            //         context.commit('showLoadingBar', p)
            //     })
            // })
            //     .then(r => {
            //
            //         if ( r.data.status == 1 ) {
            //             context.commit('loadNote', r.data.content)
            //         }
            //
            //         if ( r.data.status == 0 ) {
            //             context.commit('clearNote')
            //             context.commit('openTips', r.message)
            //         }
            //
            //     })
            //     .catch(() => {
            //         context.commit('closeLoadingBar')
            //     })
        }
    }
};