import { userService } from '../_services';
import { router } from '../_helpers';
import { axios } from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
console.log("account.module.js 에 있는 user");
console.log(user);
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }
const actions = {
    login({ dispatch, commit }, { email, password }) {
        commit('loginRequest', { email });

        userService.login(email, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/home');
                    //axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                    //axios.defaults.headers.common['Authorization'] = undefined;
                }
            );
        console.log(user);
        console.log("userSErvice.long");
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
        //axios.defaults.headers.common['Authorization'] = undefined;
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        console.log("user : " + user);
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
