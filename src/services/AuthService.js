import axios from 'axios'
import Vue from 'vue'
import createPersistedState from "vuex-persistedstate";
import auth from ".services/modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
  },
  plugins: [createPersistedState()],
});