import Vue from 'vue';
import VeeValidate from 'vee-validate';
import ElementUI from 'element-ui';
// import './element-variables.scss'

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';
import BootstrapVue from 'bootstrap-vue'

Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(ElementUI);

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

// =================================================================================
// google api 의 client libaray 와 Oauth2 의 라이브러리를 load한다.
// gapi.client.init 에서 auth2 library 를 로드하기 때문에 optional 한 파라미터다.
// https://www.googleapis.com/auth/userinfo.profile
// https://www.googleapis.com/auth/contacts.readonly
// https://www.googleapis.com/auth/calendar.readonly 
gapi.load('client:auth2', () => {
    gapi.client.init({
        apiKey: 'AIzaSyAwgiVKcVyhuDkNb6UVCv5UM296fH73vu8',
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: '266701870310-nt5rnr20s11ssvur86t4imndpk0un94j.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/user.emails.read' // https://www.googleapis.com/auth/contacts.readonly' // https://www.googleapis.com/auth/contacts.readonly
    }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    })
});

function updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    console.log("isSignedIn : " + isSignedIn);
    if (isSignedIn) {
        console.log("makeApiCall Start");
        makeApiCall();
    }
}

function makeApiCall() {
    // Make an API call to the People API, and print the user's given name.
    gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
    }).then(function(response) {
        console.log(response);
        console.log('Hello, ' + response.result.names[0].givenName);
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
    });
}
// =================================================================================

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
