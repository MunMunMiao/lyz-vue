var rule = [
    {
        path: '/',
        name: 'index',
        component: () => import('../../views/index/index')
    },
    // note,
    // gallery,
    // setting,
    // passport,
    {
        path: '*',
        redirect: '/'
    }
];
export default rule;