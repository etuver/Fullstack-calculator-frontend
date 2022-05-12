import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    email: '',
    name: '',
    calculations: [],
    nCalculations: 0
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
    },
    ADD_LOG (state, calculation) {
      // @ts-ignore
      state.calculations.push(calculation)
    }
  },
  actions: {
    setToken (context, { token }) {
      context.commit('SET_TOKEN', token)
    },
    setEmail (context, { email }) {
      context.commit('SET_TOKEN', email)
    },
    saveLog ({ commit }, calculation) {
      commit('ADD_LOG', {
        ...calculation,
        id: this.state.nCalculations++
      })
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
