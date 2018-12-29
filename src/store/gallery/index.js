import axios from 'axios'

export default {
    state: {
        data: [],
        page: 1,
        pageSize: 20,
        loading: false,
        loaded: false,
    },
    getters: {
        getGalleryList(state) {
            return state.data
        }
    },
    mutations: {
        pushGalleryData(state, data) {

            state.loaded = data.complete
            state.page = state.page + 1

            for ( let i in data.list ) {
                state.data.push(data.list[i])
            }

        },
        spliceGalleryData(state, index) {

            state.data.splice(index, 1)

        }
    },
    actions: {
        loadGallery(context) {

            if ( context.state.loaded === true || context.state.loading === true ){
                return
            }

            context.state.loading = true

            axios
                .get('/gallery', {
                    params: {
                        page: context.state.page,
                        pageSize: context.state.pageSize,
                    }
                })
                .then(r => {

                    if ( r.data.success ){
                        context.commit('pushGalleryData', r.data.content)
                        context.state.loading = false
                    }
                    if ( !r.data.success ){
                        context.state.loading = false
                        context.state.finish = true
                    }

                })

        }
    }
};