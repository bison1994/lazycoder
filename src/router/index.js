import Vue from 'vue'
import Router from 'vue-router'
import H5 from '@/_h5/index'
import style from '@/_h5/panel-style'
import event from '@/_h5/panel-event'
import animate from '@/_h5/panel-animate'
import widget from '@/_h5/panel-widget'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/h5/style'
    },
    {
    	path: '/h5',
      name: 'H5',
      component: H5,
      children: [{
      	path: '/h5/style',
      	component: style
      },
      {
      	path: '/h5/event',
      	component: event
      },
      {
      	path: '/h5/animate',
      	component: animate
      },
      {
      	path: '/h5/widget',
      	component: widget
      }]
    }
  ]
})
