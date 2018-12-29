import axios from 'axios'

export default {
    state: {
        list: [
            {
                id: 123,
                text: '英文'
            },
            {
                id: 1233,
                text: '中文'
            }
        ]
    },
    getters: {
        getLanguageList(state){
            return state.list
        }
    },
    mutations: {
        loadLanguage(state, data){
            state.data = data
        }
    },
    actions: {
        loadLanguage(ctx){

            axios
                .get('/api/language')
                .then(r => {

                })
                .catch(r => {

                })

        }
    }
}
