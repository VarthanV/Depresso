import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import SignIn from './views/SignIn.vue'
import MotivationCreate from './views/MotivationCreate.vue'
import MotivationDetail from './views/MotivationDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/create',
      name: 'create',
      component: MotivationCreate
    },
    {
      path: '/motivation/:id',
      name: 'detail',
      component: MotivationDetail
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
