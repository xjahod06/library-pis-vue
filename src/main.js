import { createApp } from 'vue'
// import the root component App from a single-file component.
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

app.mount('#app')

console.log(app)