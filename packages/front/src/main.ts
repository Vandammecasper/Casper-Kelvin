import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './router'

import useFirebase from './composables/useFirebase'
import useCustomUser from './composables/useCustomUser'

import { setupCalendar } from 'v-calendar';

const app = createApp(App)
const { restoreUser, firebaseUser } = useFirebase()
const { restoreCustomUser} = useCustomUser()

app.use(setupCalendar, {})
// app.use(router)

// app.mount('#app')

;(async () => {
    await restoreUser()
    if (firebaseUser.value) {
      await restoreCustomUser()
    }
  
    app.use(router)
    app.mount('#app')
  })()