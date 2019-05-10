import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'main',
      component: Main,
      //二级路由
       children: [
       	{
		      path: '/classify',
		      name: 'classify',
		      component: () => import('./views/Classify.vue')
		    },
		    {
		      path: '/classifyDetail',
		      name: 'classifyDetail',
		      component: () => import('./views/ClassifyDetail.vue')
		    },
		    {
		      path: '/rank',
		      name: 'rank',
		      component: () => import('./views/Rank.vue')
		    },
		    {
		      path: '*',
		      redirect: {name: 'classify'}
		    },
       ]
       
    },
   
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/book/:bid',
      name: 'book',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/BookDetail.vue')
    }
  ]
})
