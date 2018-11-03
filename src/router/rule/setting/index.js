var setting = [
    {
        path: '/setting',
        name: 'setting',
        redirect: '/setting/portrait',
        // component: () => import('../../views/setting/index'),
        children: [
            {
                path: 'portrait',
                name: 'portrait',
            },
            {
                path: 'data',
                name: 'data',
            },
            {
                path: 'notice',
                name: 'notice',
            },
            {
                path: 'language',
                name: 'language',
            }
        ]
    },
];
export default setting;