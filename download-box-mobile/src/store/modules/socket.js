import io from 'socket.io-client'
import config from '@/config'

const socket = io(config.api.socketApiPrefix)

const state = {
  connection: false,
  globalStat: {},
  waiting: [],
  downloading: [],
  stopped: [],
}

const getters = {
  all: state => {
    return [...state.downloading, ...state.waiting, ...state.stopped]
  },
}

// actions
const actions = {
  createConnection({ commit }) {
    let room = '111333'
    socket.on('connect', function() {
      socket.emit('room', room)
      commit('setConnection', true)
    })
  },

  globalStat({ commit }) {
    socket.on('globalStat', payload => {
      commit('globalStat', JSON.parse(payload))
    })
  },

  tellWaiting({ commit }) {
    socket.on('waiting', payload => {
      commit('setWaiting', JSON.parse(payload))
    })
  },

  tellStopped({ commit }) {
    socket.on('stopped', payload => {
      commit('setStopped', JSON.parse(payload))
    })
  },

  tellActive({ commit }) {
    socket.on('downloading', payload => {
      commit('setActive', JSON.parse(payload))
    })
  },
}

// mutations
const mutations = {
  setConnection(state, payload) {
    state.connection = payload
  },

  globalStat(state, payload) {
    state.globalStat = payload
  },

  setWaiting(state, payload) {
    state.waiting = payload
  },

  setStopped(state, payload) {
    state.stopped = payload
  },

  setActive(state, payload) {
    state.downloading = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
