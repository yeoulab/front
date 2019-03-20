import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'

// new homepage
import HomePageNew from '../home/HomePageNew'
import FirstPage from '../home/FirstPage'

// new tab
import BottomMenu from '../home/BottomMenu'

import CurrentTodos from '../home/todo/CurrentTodos'
import TodoStatistic from '../home/todo/TodoStatistic'
import InsertTodo from '../home/todo/InsertTodo'
import ConfirmTodos from '../home/todo/ConfirmTodos'
// router 에 대한 config
Vue.use(Router);

export const router = new Router({
    // mode: 'history',
    routes: [{
            path: '/home',
            component: HomePageNew,
            children: [{
                path: 'current',
                component: InsertTodo,
            }, {
                path: 'chart',
                component: TodoStatistic
            }, {
                path: 'complete',
                component: ConfirmTodos,
            }]
        }, // home 인 경우 Homepage vue 로 렌더링
        { path: '/login', component: LoginPage }, // login 인 경우 LoginPage Vue 로 렌더링
        { path: '/register', component: RegisterPage }, // register 인 경우 RegisterPage Vue 로 렌더링
        { path: '/home2', component: BottomMenu },
        { path: '/', component: FirstPage },
        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

// 라우팅 되기전에 발생하는 이벤트
router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    // 아래 publicPages 의 렌더링할 페이지 ( to.path ) 가 존재하는지 확인
    // 존재 한다면, login 인증이 된것.
    const publicPages = ['/', '/login', '/register', '/home'];
    // 라우팅 하려는 vue 가 publicPage 에 포함이 되는지
    // const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // 첫 페이지로 이동 시, 로그인이 돼 있으면 home 으로 이동
    if (to.path === "/" && loggedIn) {
        return next('/home');
    }

    if (to.path === "/home" && !loggedIn) {
        return next('/login');
    }

    // 로그인이 안된경우, 무조건 /login 으로 렌더링
    // if (authRequired && !loggedIn) {
    //     return next('/login');
    // }
    // else {
    //     return next('/');
    // }

    next();
})