export default {
    path: '/passport',
    meta: {
        auth: false
    },
    redirect: '/passport/login',
    component: () => import('../../../views/passport/index.vue'),
    children: [
        {
            path: 'login',
            meta: {
                auth: false
            },
            component: () => import('../../../views/passport/login.vue'),
        },
        {
            path: 'signup',
            meta: {
                auth: false
            },
            component: () => import('../../../views/passport/signup.vue'),
        },
    ]
}