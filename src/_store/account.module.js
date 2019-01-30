import { userService } from '../_services';
import { router } from '../_helpers';
import { axios } from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
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
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
        //axios.defaults.headers.common['Authorization'] = undefined;
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
        console.log("register - start");
        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    setTimeout( (user) => {
                        console.log(state.user);
                        dispatch('login', { email: state.user.email, password: state.user.password } )
                    })

                    // router.push('/login');
                    // setTimeout(() => {
                    //     // display success message after route change completes
                    //     dispatch('alert/success', 'Registration successful', { root: true });
                    // })
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
        state.user = user;
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
        stae.user = null;
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
