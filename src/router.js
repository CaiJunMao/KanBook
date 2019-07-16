import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

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
		      component: () => import('./views/Classify.vue'),
		    },
		    {
		      path: '/classifyDetail',
		      name: 'classifyDetail',
		      component: () => import('./views/ClassifyDetail.vue'),
		      //首页顶部和底部的隐藏标志，即到classifyDetail时，隐藏main的top和buttom
		      meta:{hideTop:true,hideBottom:true}
		    },
		    {
		      path: '/bookDetail/:bid',
		      name: 'bookDetail',
		      component: () => import('./views/BookDetail.vue'),
		      meta:{hideTop:true,hideBottom:true}
		      
		    },
		    {
		    	//传两个参数
		      path: '/bookRead/:link&&:resouceId&&:bookName&:chaNum',
		      name: 'bookRead',
		      component: () => import('./views/BookRead.vue'),
		      meta:{hideTop:true,hideBottom:true}
		    },
		    {
		      path: '/rank',
		      name: 'rank',
		      component: () => import('./views/Rank.vue'),
		    },
		     {
		      path: '/search',
		      name: 'search',
		      component: () => import('./views/Search.vue'),
		      meta:{hideTop:true}
		    },
		    {
		      path: '/searchResult/:key',
		      name: 'searchResult',
		      component: () => import('./views/SearchResult.vue'),
		       meta:{hideTop:true,hideBottom:true}
		    },
		    {
		      path: '*',
		      redirect: {name: 'classify'}
		    },
       ]
       
    },
  ]
})
