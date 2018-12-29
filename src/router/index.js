import Vue from 'vue'
import Router from 'vue-router'
import rule from './rule/index'
import store from '../store/index'
import axios from 'axios'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: rule
})
router.beforeEach((to, from, next) => {

    if ( store.getters.isLogin === false ){

        if ( to.meta.auth === true ){

            axios
                .get('/user/userData')
                .then(r => {

                    if ( r.data.success ){

                        store.commit('setUserData', r.data.content)

                        store.getters.isLogin === true ? next() : next('/passport/login')

                    }
                    if ( !r.data.success ){

                        next('/passport/login')

                    }

                })

        }
        if ( to.meta.auth === false ){

            next()

        }

    }else {

        next()

    }

})
router.beforeResolve((to, from, next) => {

    next()

})
router.afterEach((to, from) => {


})
export default router