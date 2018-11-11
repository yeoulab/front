import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'

// new homepage
import HomePageNew from '../home/HomePageNew'

// router 에 대한 config
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePageNew }, // home 인 경우 Homepage vue 로 렌더링
    { path: '/login', component: LoginPage }, // login 인 경우 LoginPage Vue 로 렌더링
    { path: '/register', component: RegisterPage }, // register 인 경우 RegisterPage Vue 로 렌더링

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

// 라우팅 되기전에 발생하는 이벤트
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // 아래 publicPages 의 렌더링할 페이지 ( to.path ) 가 존재하는지 확인
  // 존재 한다면, login 인증이 된것.
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  console.log("to");
  console.log(to);
  console.log("from");
  console.log(from);
  console.log("next");
  console.log(next);
  // 로그인이 안된경우, 무조건 /login 으로 렌더링
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})