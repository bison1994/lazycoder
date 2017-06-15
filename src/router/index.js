import Vue from 'vue'
import Router from 'vue-router'
import H5 from '@/components/viewport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/h5'
    },
    {
    	path: '/h5',
      name: 'H5',
      component: H5
    }
  ]
})
