import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		orderSelected:0,
		orderList:[
			{
				name:'数据统计',
				order:[
					['订单号','购买产品','购买日期','产品类型','适用地区','有效时间','总价']
				]
			},
			{
				name:'数据预测',
				order:[
					['订单号','购买产品','购买日期','购买数量','媒介','有效时间','总价']
				]
			},
			{
				name:'流量分析',
				order:[
					['订单号','购买产品','购买日期','购买数量','产品类型','有效时间','产品版本','总价']
				]
			},
			{
				name:'广告发布',
				order:[
					['订单号','购买产品','购买日期','购买数量','行业','产品版本','有效时间','总价']
				]
			}
		],
		userName : '',
		password : '',
		prePassword: '',
		isLogin:false,
		detailProductLink: [
	        {
	          name: '数据统计',
	          path: 'count',
	          icon: require('../assets/images/1.png')
	        },
	        {
	          name: '数据预测',
	          path: 'forecast',
	          icon: require('../assets/images/2.png')
	        },
	        {
	          name: '流量分析',
	          path: 'analysis',
	          icon: require('../assets/images/3.png')
	        },
	        {
	          name: '广告发布',
	          path: 'publish',
	          icon: require('../assets/images/4.png')
        	}
      	],
      	currentLinkIndex:0
	},
	mutations:{
		orderSelected (state,index) {
			state.orderSelected = index;
		},
		userName(state,data){
			state.userName = data;
		},
		password(state,data){
			state.password = data;
		},
		prePassword(state,data){
			state.prePassword = data;
		},
		isLogin(state){
			state.isLogin = !state.isLogin;
		},
		selected(state,index){
			state.currentLinkIndex = index;
		},
		addOrder(state,data){
			state.orderList[data.index].order.push(data.data);
			state.orderSelected = data.index;
		}
	}
});