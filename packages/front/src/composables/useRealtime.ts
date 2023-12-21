import { type Socket, io } from 'socket.io-client'
import useFirebase from './useFirebase'

const { firebaseUser } = useFirebase()

const getToken = async () => {
  return await firebaseUser.value?.getIdToken()
}

// import.meta.env.VITE_REALTIME_URL
const socket: Socket = io('http://[::1]:3004', {
  extraHeaders: {
    Authorization: `Bearer ${getToken()}`,
  },
})

const emit = (event: string, data: any) => {
  socket.emit(event, data)
}

const on = (event: string, callback: (data: any) => void) => {
  socket.on(event, callback)
}

export default () => {
  return {
    socket,

    emit,
    on,
  }
}