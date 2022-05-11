import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    email: '',
    name: ''
  },
  getters: {
    token (state) {
      return state.token
    },
    isLoggedIn (state) {
      return state.token !== ''
    },
    name (state) {
      return state.name
    },
    email (state) {
      return state.email
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_EMAIL (state, email) {
      state.email = email
    }
  },
  actions: {
    setToken (context, { token }) {
      context.commit('SET_TOKEN', token)
    },
    setEmail (context, { email }) {
      context.commit('SET_TOKEN', email)
    },
    setUserInfo (
      context,
      { email }
    ) {
      context.commit('SET_EMAIL', email)
    }
  },
  modules: {
  }
})
