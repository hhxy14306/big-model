export default [
    {
        path: '/',
        redirect: '/infer',
        hideInMenu: true
    },
    {
        path: '/login',
        component: 'login',
        layout: false,
        hideInMenu: true
    },
    {
        name: '推理',
        icon: 'inferIcon',
        customIcon: {
            fill: 'white',
            width: '.2rem',
            height: '.2rem'
        },
        path: '/infer',
        component: 'infer',
    },
    {
        name: '资源',
        icon: 'resourceIcon',
        customIcon: {
            fill: 'white',
            width: '.2rem',
            height: '.2rem',
        },
        path: '/resource',
        component: 'resource',
    },
    {
        name: '日志',
        icon: 'logIcon',
        customIcon: {
            fill: 'white',
            width: '.2rem',
            height: '.2rem',
        },
        path: '/log',
        component: 'log',
    },
    {
        name: '告警',
        icon: 'warnIcon',
        customIcon: {
            fill: 'white',
            width: '.2rem',
            height: '.2rem',
        },
        path: '/warn',
        component: 'warn',
    },
    {
        name: '影像可视化',
        icon: 'studioVisualizeIcon',
        href: 'http://baidu.com',
        customIcon: {
            fill: 'white',
            width: '.2rem',
            height: '.2rem',
        },
        path: '/studio-visualize',
        //node-info: './studio-visualize',
    },
    {
        name: '用户管理',
        icon: 'userMgt',
        customIcon: {
            fill: 'white',
            width: '.2rem',
            height: '.2rem',
        },
        path: '/user-mgt',
        component: 'user-mgt',
    },
    // {
    //     name: '仓库信息',
    //     icon: 'warehouse',
    //     customIcon: {
    //         fill: 'white',
    //         width: '.2rem',
    //         height: '.2rem',
    //     },
    //     path: '/warehouse',
    //    component: 'warehouse'
    // },
]
