export default {
    state: {
        data: null
    },
    getters: {
        isLogin(state){
            return state.data === null ? false : true
        },
        getUserData(state){

            return state.data

        }
    },
    mutations: {
        setUserData(state, data){
            state.data = data
        },
        userSignOut(state){
            state.date = null
        },
    },
    actions: {}
}