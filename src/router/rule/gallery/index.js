var gallery = [
    {
        path: '/gallery',
        name: 'gallery',
        // component: () => import('../../../views/gallery/index'),
        children: [
            {
                path: 'create',
                name: 'create',
            },
            {
                path: 'view/:key',
                name: 'view',
            }
        ]
    }
];
export default gallery;