import Vue from 'vue';
import Router from 'vue-router';
import rule from './rule/index';
Vue.use(Router);
var router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: rule
});
// router.beforeEach((to, from, next) => {
//
//     if ( store.state.system.user === null ){
//
//         axios.post('/api/user/getUserData')
//             .then(r => {
//
//                 if( r.data.status == 1 ){
//                     store.commit('loadUserData', r.data.content)
//                 }
//                 if ( r.data.status == 0 ){
//                     store.commit('openTips', r.data.message)
//                 }
//
//                 // 未登录状态
//                 if ( store.state.system.user === null ){
//                     if ( to.fullPath === '/passport/login' || to.fullPath === '/passport/signup' ){
//                         next()
//                     }else {
//                         next('/passport/login')
//                     }
//                 }
//                 // 登录状态
//                 if ( store.state.system.user !== null ){
//                     if ( to.fullPath === '/passport/login' || to.fullPath === '/passport/signup' ){
//                         next('/')
//                     }else {
//                         next()
//                     }
//                 }
//
//
//             })
//
//     }else {
//         next()
//     }
//
// })
// router.beforeResolve((to, from, next) => {
//
//     next()
//
// })
// router.afterEach((to, from) => {
//
//
// })
export default router;