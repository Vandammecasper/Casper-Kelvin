import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './router'

import useFirebase from './composables/useFirebase'

import { setupCalendar } from 'v-calendar';

const app = createApp(App)
const { restoreUser } = useFirebase()

app.use(setupCalendar, {})
// app.use(router)

// app.mount('#app')

;(async () => {
    await restoreUser()
  
    app.use(router)
    app.mount('#app')
  })()