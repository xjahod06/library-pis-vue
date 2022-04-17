import axios from 'axios'
import ApiConnect from "@/services/ApiConnect";

const state = {
    email: null,
    role: null
};

const getters = {
    isAuthenticated: (state) => !!state.email,
    StateUser: (state) => state.user,
};

const actions = {
    async Register({dispatch}, form) {
        let responce = null
        let UserForm = null
        await ApiConnect.post('readers', JSON.stringify(form), ApiConnect.headers).then((response) =>
            UserForm = new DataForm(),
            UserForm.append('email', form.email),
            UserForm.append('password', form.password),
            await dispatch('LogIn', UserForm))
        return responce
    },
    async LogIn({commit}, user) {
        let responce = null
        await ApiConnect.post('readers/authenticate', JSON.stringify(user), ApiConnect.headers).then((response) =>
            console.log(responce)
        )
        //commit("setEmail", user)
        return responce
    },
    async LogOut({ commit }) {
        let user = null;
        commit("logout", user);
      },
};

const mutations = {
    setEmail(state, user) {
        state.emial = user.email;
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