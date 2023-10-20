export default [
    {
        path: '/',
        redirect: '/resource-mgt',
        hideInMenu: true
    },
    {
        path: '/login',
        component: 'login',
        layout: false,
        hideInMenu: true
    },
    {
        name: '资源管理',
        icon: 'inferIcon',
        customIcon: {
            fill: 'white',
            width: '.2rem',
            height: '.2rem'
        },
        path: '/resource-mgt',
        component: 'infer',
    },
    {
        name: '算子管理',
        icon: 'resourceIcon',
        customIcon: {
            fill: 'white',
            width: '.2rem',
            height: '.2rem',
        },
        path: '/warehouse-mgt',
        component: 'warehouse-mgt',
    },
    // {
    //     name: '资源',
    //     icon: 'resourceIcon',
    //     customIcon: {
    //         fill: 'white',
    //         width: '.2rem',
    //         height: '.2rem',
    //     },
    //     path: '/resource',
    //     component: 'resource',
    // },
    {
        name: '任务管理',
        icon: 'logIcon',
        customIcon: {
            fill: 'white',
            width: '.2rem',
            height: '.2rem',
        },
        path: '/task-mgt',
        component: 'task-mgt',
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
    // {
    //     name: '告警',
    //     icon: 'warnIcon',
    //     customIcon: {
    //         fill: 'white',
    //         width: '.2rem',
    //         height: '.2rem',
    //     },
    //     path: '/warn',
    //     component: 'warn',
    // },
    // {
    //     name: '用户管理',
    //     icon: 'userMgt',
    //     customIcon: {
    //         fill: 'white',
    //         width: '.2rem',
    //         height: '.2rem',
    //     },
    //     path: '/user-mgt',
    //     component: 'user-mgt',
    // },
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
