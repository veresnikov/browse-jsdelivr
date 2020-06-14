import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/api'

const LIMIT = 10

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packages: [], // список пакетов
    package: null, // данные пакета
    total: null, // сколько всего пакетов найдено
    modal: false, // статус модального окна
    limit: LIMIT, // сколько записей на странице
    fetching: { // статусы загрузки
      search: false, // страницы поиска
      package: false // модального окна
    },
    error: null // сообщение об ошибке
  },
  mutations: {
    SET_PACKAGES (state, { packages, total }) {
      state.packages = packages
      state.total = total
    },
    SET_PACKAGE (state, payload) {
      state.package = payload
    },
    SET_ERROR (state, payload) {
      state.error = payload
    },
    CHANGE_MODAL (state, payload) {
      state.modal = payload
    },
    CHANGE_FETCHING_STATUS (state, { type, value }) {
      if (type in state.fetching) state.fetching[type] = value
    }
  },
  actions: {
    async search ({ state, commit, dispatch }, { text = 'nuxt', from = 0 }) {
      try {
        commit('SET_ERROR', null)
        // if (state.fetching.search) return
        commit('CHANGE_FETCHING_STATUS', { type: 'search', value: true })

        const params = {
          text,
          size: state.limit,
          from
        }
        const { data: { objects, total } } = await axios.get('http://registry.npmjs.com/-/v1/search', { params })
        const packages = objects.map(_ => _.package)

        commit('SET_PACKAGES', { packages, total })
        commit('CHANGE_FETCHING_STATUS', { type: 'search', value: false })
      } catch (error) {
        console.error(error)
        commit('CHANGE_FETCHING_STATUS', { type: 'search', value: false })
        commit('SET_ERROR', error.message)
      }
    },
    async showPackage ({ state, commit }, name) {
      try {
        commit('SET_ERROR', null)
        if (!name) throw new Error('Не задано имя пакета!')
        if (state.fetching.search) return

        const selectedPackage = state.packages.find(p => p.name === name)
        commit('SET_PACKAGE', selectedPackage)
        commit('CHANGE_MODAL', true)
      } catch (error) {
        console.error(error)
        commit('SET_ERROR', error.message)
      }
    }
  }
})
