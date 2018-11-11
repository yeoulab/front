import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

Vue.use(VeeValidate);

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

// index.js 에 해당 app 에 관한 궁금한 사항들을 모두 적음
// 1. login 파일을 어떻게 entry 로 했는지?
// --> router.js 에 beforeEach 메소드에서
//    login 정보를 판단해서 login 정보가 없으면 /login 으로 routing
// 2. login 후에 어떻게 / 으로 들어가는지?
// --> login 처리 하는 account.module.js 에서
//     login action 후 then 구문에서 / 으로 routing 처리 함
// 3. 어떻게 api 들을 호출 전에 jwt 를 체크하는지?
// --> auth-header.js 에서 jwt token 정보를 가져오는 공통함수를 호출하여
//    모든 api 호출 전 header function 을 호출한다