import Vue from 'vue'
import Loading from '@/components/Loading'
import App from './App'
import router from './router'
import store from './store'
import filters from '@/utils/filters'
import './registerServiceWorker'
import '../scss/styles.scss'

const components = [
  Loading
]

Vue.config.productionTip = false

components.map(component => {
  Vue.component(component.name, component)
})

for (let key in filters) {
  Vue.filter(key, filters[key])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
