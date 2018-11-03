export default {
    state: {
        user: null
    },
    mutations: {
        loadUserData: function (state, data) {
            state.user = data;
        },
        userExit: function (state) {
            state.user = null;
        }
    },
    actions: {
        loadUserData: function (context, message) {
            // axios
            //     .post('/api/user/getUserData')
            //     .then(r => {
            //
            //         if( r.data.status == 1 ){
            //             context.commit('loadUserData', r.data.content)
            //         }
            //         if ( r.data.status == 0 ){
            //             // this.commit('openTips', r.data.message)
            //         }
            //
            //     })
        },
        userExit: function (context) {
            // axios
            //     .post('/api/user/exit')
            //     .then(r => {
            //         if ( r.data.status === 1 ){
            //             context.commit('exit')
            //             // context.commit('openTips', r.data.message)
            //         }
            //         if ( r.data.status === 0 ){
            //             // context.commit('openTips', r.data.message)
            //         }
            //     })
        }
    }
};