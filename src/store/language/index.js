export default {
    state: {
        data: []
    },
    mutations: {
        loadLanguage: function (state, data) {
            state.data = data;
        }
    },
    actions: {
        loadLanguage: function (context, name) {
            console.info('%cLanguage Is On Load......', 'font-size:12px;color:#156a9c;');
            var lang = localStorage.lang;
            if (name !== undefined) {
                //     axios.post('/api/language/get', {
                //         lang: name
                //     })
                //         .then(r => {
                //
                //             let data = r.data.content
                //             let results = {}
                //             for ( let r in data ){
                //                 let key = data[r].keyword
                //                 let value = data[r][name]
                //                 results[key] = value
                //             }
                //
                //             context.commit('loadLanguage', results)
                //
                //             window.localStorage.lang = name
                //             console.info('%cLanguage Is On Done','font-size:12px;color:#156a9c;')
                //             console.info('%cLanguage Is:'+name,'font-size:12px;color:#156a9c;')
                //
                //         })
                //         // .catch(r => console.error(r.data.message))
                return;
            }
            if (lang === '' || lang === undefined) {
                // axios.post('/api/language/get', {
                //     lang: 'en'
                // })
                //     .then(r => {
                //
                //         let data = r.data.content
                //         let results = {}
                //         for ( let r in data ){
                //             let key = data[r].keyword
                //             let value = data[r]['en']
                //             results[key] = value
                //         }
                //
                //         context.commit('loadLanguage', results)
                //         window.localStorage.lang = 'en'
                //         console.info('%cLanguage Is On Done','font-size:12px;color:#156a9c;')
                //         console.info('%cLanguage Is:en','font-size:12px;color:#156a9c;')
                //
                //     })
                // .catch(r => console.error(r.data.message))
            }
            else {
                // axios.post('/api/language/get', {
                //     lang: lang
                // })
                //     .then(r => {
                //
                //         let data = r.data.content
                //         let results = {}
                //         for ( let r in data ){
                //             let key = data[r].keyword
                //             let value = data[r][lang]
                //             results[key] = value
                //         }
                //
                //         context.commit('loadLanguage', results)
                //         window.localStorage.lang = lang
                //         console.info('%cLanguage Is On Done','font-size:12px;color:#156a9c;')
                //         console.info('%cLanguage Is:'+lang,'font-size:12px;color:#156a9c;')
                //
                //     })
                //     .catch(r => console.error(r.data.message))
                return;
            }
        }
    }
};