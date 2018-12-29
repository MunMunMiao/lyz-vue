export default {
    path: 'gallery',
    meta: {
        auth: true
    },
    component: () => import('../../../views/gallery/index.vue')
}