import axios from 'axios'
import ApiConnect from "@/services/ApiConnect";

const state = {
    email: null,
    role: null
};

const getters = {
    isAuthenticated: (state) => !!state.user,
    StatePosts: (state) => state.posts,
    StateUser: (state) => state.user,
};

const actions = {
    async Register({dispatch}, form) {
        await ApiConnect.post('readers', JSON.stringify(form), ApiConnect.headers)
        let UserForm = new DataForm()
        UserForm.append('email', form.email)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
    },
    async LogIn({commit}, user) {
        await ApiConnect.post('readers/authenticate', JSON.stringify(user), ApiConnect.headers)
    },
    async LogOut({ commit }) {
        let user = null;
        commit("logout", user);
      },
};

const mutations = {
    setUser(state, username) {
        state.user = username;
      },
      logout(state, user) {
        state.user = user;
      },
};

export default {
    state,
    getters,
    actions,
    mutations
};