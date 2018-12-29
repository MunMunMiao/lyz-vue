import gallery from './gallery/index'
import passport from './passport/index'

const rule = [
    {
        path: '/',
        meta: {
            auth: true
        },
        component: () => import('../../views/index/index.vue'),
        children: [
            gallery,
        ]
    },
    passport,
    // note,
    // setting,
    // passport,
    // {
    //     path: '*',
    //     redirect: '/'
    // }
]

export default rule