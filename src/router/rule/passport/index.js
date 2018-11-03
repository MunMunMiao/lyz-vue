var passport = [
    {
        path: '/passport',
        name: 'passport',
        redirect: '/passport/login',
        // component: () => import('../../views/passport/index'),
        children: [
            {
                path: 'login',
                name: 'login',
            },
            {
                path: 'signup',
                name: 'signup',
            }
        ]
    },
];
export default passport;