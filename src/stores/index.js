import axiosInstance from '..//libs/axios-instance'
import { createStore } from 'vuex'
import { setCookie } from '..//libs/utils'
import Cookies from 'js-cookie'

export default createStore({
  state: {
    isSidebarMinimized: false,
    authUser: {},
  },
  mutations: {
    setAuthUser(state, user) {
      var obj = { ...user }
      state.authUser = obj
    },
    setLogout(state) {
      state.permissions = null
      state.authUser = null
    },
    updateSidebarMinimized(state, payload) {
      state.isSidebarMinimized = payload.value
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const authData = await axiosInstance.post('login', {
          username: credentials.username,
          password: credentials.password,
        })
        if (authData.data.access_token) {
          setCookie('accessToken', authData.data.access_token)
          return authData.data
        }
      } catch (error) {
        return error
      }
    },
    async getUser({ commit }) {
      let usr = {}
      await axiosInstance
        .get('me')
        .then((res) => {
          commit('setAuthUser', res.data.data)
          usr = res.data.data
        })
        .catch((e) => e.response)
      return usr
    },
    async prepareLogout({ commit }, server = true) {
      if (server) {
        await axiosInstance.post('logout').catch(({ response }) => {
          if (response.status == 401) {
            Cookies.remove('user')
            Cookies.remove('permissions')
            Cookies.remove('accessToken')
            commit('setLogout')
          }
        })
      }
      Cookies.remove('user')
      Cookies.remove('permissions')
      Cookies.remove('accessToken')
      commit('setLogout')
    },
  },
})
