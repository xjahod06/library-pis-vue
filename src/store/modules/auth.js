import axios from 'axios'

const state = {
    user: null,
    role: null,
    id: null
};

const getters = {
    isAuthenticated: (state) => !!state.user,
    StatePosts: (state) => state.posts,
    StateUser: (state) => state.user,
};

const actions = {
    async Register({dispatch}, form) {
        await axios.post('readers', form)
        let UserForm = new DataForm()
        UserForm.append('id', 0)
        UserForm.append('name', form.name)
        UserForm.append('surname', form.surname)
        UserForm.append('email', form.email)
        UserForm.append('city', form.city)
        UserForm.append('street', form.street)
        UserForm.append('houseNumber', form.houseNumber)
        UserForm.append('postcode', form.postcode)
        UserForm.append('role', form.role)
        UserForm.append('password', form.password)
        UserForm.append('fullname', form.fullname)
        await dispatch('Register', UserForm)
    },
    async LogIn({commit}, user) {
        await axios.post('login', user)
        await commit('setUser', user.get("username"))
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