<template>
	<div>
		<div class="top">
			<h4>数据统计</h4>
			<p>{{desc}}</p>
			<div class="orderInfo">
				<table>
					<tr>
						<td>产品类型：</td>
						<td>
							<template v-for="item,index in types">
								<button class="btn btn-sm" :class="item.active?'btn-success':'btn-default'" 
								@click="changeSelected(index)"
								>{{item.name}}</button>
							</template>
						</td>
					</tr>
					<tr>
						<td>适用地区：</td>
						<td>
							<select v-model="selected">
								<template v-for="item,index in area">
									<option :value="index">{{item}}</option>
								</template>
							</select>
						</td>
					</tr>
					<tr>
						<td>有效时间：</td>
						<td>{{indate}}</td>
					</tr>
					<tr>
						<td>总价：</td>
						<td>{{totalPrice}}</td>
					</tr>
					<tr>
						<td></td>
						<td><button class="btn btn-success" @click="showDialog">立即购买</button></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="bottom">
			<h4>产品说明</h4>
			<p>{{desc}}</p>
			<table>
				<tr v-for="item in lists">
					<td v-for="list in item">{{list}}</td>
				</tr>
			</table>
		</div>
		<my-dialog v-if="showPuyDialog" :btn="['返回','确认支付']" @close="hiddenDialog" @buy="buy" :okButton="1">
			<h4 slot="header">订单支付</h4>
			<div slot="body">
				<order :orderInfo="getOrderInfo"></order>
				<banks></banks>				
			</div>
		</my-dialog>
	</div>
</template>

<script>
	import dialog from '../dialog'
	import banks from '../banks'
	import order from '../orderList'
	export default {
		components:{
			myDialog:dialog,
			banks,
			order
		},
		computed:{
			getOrderInfo () {
				return [
					['产品类型','适用地区','有效时间','总价'],
					[this.getType,this.area[this.selected],'半年',this.totalPrice]
				]
			},
			indate () {
				let types = this.types;
				for(let i = 0;i<types.length;i++){
					if(types[i].active) return types[i].time;
				}
			},
			totalPrice () {
				let types = this.types;
				for(let i = 0;i<types.length;i++){
					if(types[i].active) return types[i].price;
				}				
			},
			getType () {
				let types = this.types;
				for(let i = 0;i<types.length;i++){
					if(types[i].active) return types[i].name;
				}
			}
		},
		data () {
			return {
				showPuyDialog:false,
				selected:0,
				desc:'历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。',
				types:[
					{
						name:'红色版',
						active:true,
						time:'半年',
						price:500
					},
					{
						name:'绿色版',
						active:false,
						time:'永久有效',
						price:2000
					},
					{
						name:'紫色版',
						active:false,
						time:'一个月',
						price:100
					}
				],
				area:['南京','北京','上海','淮安'],
				lists:[
					['安全安保','办公文教','彩票','车辆物流','成人用品','出版传媒','电脑硬件'],
					['电子电工','房地产建筑装修','分类平台','服装鞋帽','箱包饰品','化工原料制品','机械设备'],
					['家庭日用品','家用电器','教育培训','节能环保','金融服务','礼品','旅游住宿'],
					['美容化妆','母婴护理','农林牧渔','软件','商务服务','生活服务','食品保健品'],
					['手机数码','通讯服务设备','网络服务','医疗服务','游戏','运动休闲娱乐','招商加盟']
				]
			}
		},
		methods:{
			changeSelected(index) {
				let types = this.types;
				for(var i = 0;i<types.length;i++){
					types[i].active = false;
				}
				types[index].active = true
			},
			hiddenDialog () {
				this.showPuyDialog = false;
			},
			showDialog () {
				this.showPuyDialog = true;
			},
			buy () {
				let order = this.getOrderInfo[1].slice(0);
				order.unshift('HKKHKSH99980','数据统计',new Date().toLocaleString());
				this.$store.commit('addOrder',{index:0,data:order});
			}
		}
	}
</script>

<style scoped lang="less">
	.top{
		padding:20px 0;
		border-bottom: 20px solid #e8f5e6;
		h4{
			text-indent: 20px;
		}
		p{
			background-color: #f8fcff;
			color: #999999;
			padding: 10px 20px;
			margin:20px 0;
		}
		.orderInfo{
			table{
				margin-left: 20px;
				line-height: 40px;
				td{
					min-width: 120px;
					margin-left: 10px;
					button{
						margin-right: 10px;
					}
				}
			}
		}
	}
	.bottom{
		padding:20px;

		p{
			line-height: 40px;
		}
		table{
			width: 90%;
			line-height: 40px;
			td{
				border:1px solid #e5e5e5;
				text-indent: 10px;
			}
		}
	}
	.puyDialog{
		table{
			width: 100%;
			line-height: 30px;
			font-size: 15px;
			text-align: center;
			border: 1px solid #6fbe91;
			th{
				background-color: #6fbe91;
				color: white;
				text-align: center;
			}
			td{
				border: 1px solid #e5e5e5;

			}
		}
	}
</style>