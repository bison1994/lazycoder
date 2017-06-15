import Vue from 'vue'
import App from './App'
// import router from './router'
import store from './store'
import vuex from 'vuex'
Vue.use(vuex)

Vue.config.productionTip = false

// 全局注册组件
import slider from './components/slider'
Vue.component('slider', slider)

// 设置一个全局的通讯中介
window.$communicator = new Vue();

new Vue({
  el: '#app',
  // router,
  store,
  template: '<App/>',
  components: { App }
})
