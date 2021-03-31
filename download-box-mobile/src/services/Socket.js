import io from 'socket.io-client'
import config from '@/config'

const socket = io(config.api.socketApiPrefix)

const tellActive = (callback = () => {}) => {
  return dispatch => {
    socket.on('downloading', payload => {
      dispatch({
        type: UPDATED_DOWNLOADING,
        payload: JSON.parse(payload),
      })
    })
  }
}

const tellWait = (callback = () => {}) => {
  return dispatch => {
    socket.on('waiting', payload => {
      dispatch({
        type: UPDATED_WAIT,
        payload: JSON.parse(payload),
      })
    })
  }
}

const tellStop = (callback = () => {}) => {
  return dispatch => {
    socket.on('stopped', payload => {
      dispatch({
        type: UPDATED_STOP,
        payload: JSON.parse(payload),
      })
    })
  }
}

export default {
  connection,
  getGlobalStat,
  tellActive,
  tellStop,
  tellWait,
}
