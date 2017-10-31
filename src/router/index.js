import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../components'
import detailPage from '../components/detailPage'
import count from '../components/detail/count'
import analysis from '../components/detail/analysis'
import forecast from '../components/detail/forecast'
import publish from '../components/detail/publish'
import orderPage from '../components/orderPage'

Vue.use(Router)

export default new Router({
	mode:'history',
	base:'/dist/',
	routes: [
		{
			path:'/',
			component:IndexPage
		},
		{
			path:'/orderPage',
			component:orderPage
		},
		{
			path:'/detail',
			component:detailPage,
			redirect:'/detail/count',
			children:[
				{
					path:'count',
					component:count
				},
				{
					path:'analysis',
					component:analysis
				},
				{
					path:'forecast',
					component:forecast
				},
				{
					path:'publish',
					component:publish
				}
			]
		}
	]
})
