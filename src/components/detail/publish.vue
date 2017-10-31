<template>
	<div>
		<div class="top">
			<h4>广告发布</h4>
			<p>{{desc}}</p>
			<div class="orderInfo">
				<table>
					<tr>
						<td>购买数量：</td>
						<td class="count">
							<button class="btn btn-default" 
							@click="sub">-</button><input readonly v-model="count" type="text" maxlength="2"><button class="btn btn-default"
							@click="add">+</button>
						</td>
					</tr>
					<tr>
						<td>行业：</td>
						<td>
							<select v-model="selected">
								<option v-for="item,index in trade" :value="index">{{item}}</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>产品版本：</td>
						<td>
							<template v-for="item,index in versions">
								<button class="btn btn-sm" :class="item.active?'btn-success':'btn-default'"
								@click="changeSelected(index)">{{item.name}}</button>
							</template>
						</td>
					</tr>
					<tr>
						<td>有效时间：</td>
						<td>半年</td>
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
					['购买数量','行业','产品版本','有效时间','总价'],
					[this.count,this.trade[this.selected],this.getVersion,'半年',this.totalPrice]
				]
			},
			getVersion () {
				let versions = this.versions;
				let temp = [];
				for(let i = 0 ;i < versions.length; i++){
					if(versions[i].active) temp.push(versions[i].name); 
				}
				return temp.toString();
			},
			totalPrice () {
				let versions = this.versions;
				let price = 0;
				for(let i = 0;i<versions.length;i++){
					if(versions[i].active) price+=versions[i].price;
				}				
				return price*this.count;
			}
		},
		data () {
			return {
				showPuyDialog:false,
				selected:'0',
				count:1,
				desc:'广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。',
				trade:['出版业','媒体','金融','互联网','游戏'],
				versions:[
					{
						name:'初级版',
						active:true,
						price:150
					},
					{
						name:'中级版',
						active:false,
						price:200
					},
					{
						name:'高级版',
						active:false,
						price:300
					},
					{
						name:'专家版',
						active:false,
						price:400
					}
				],
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
				let versions = this.versions;
				let selectedCount = 0;
				if(versions[index].active){
					for(let i = 0;i<versions.length;i++){
						if(versions[i].active){
							selectedCount++;
						}
					}
					if(selectedCount===1) return;				
				}
				versions[index].active = !versions[index].active;
			},
			add () {
				this.count++
				if(this.count>99) this.count = 99;
			},
			sub () {
				this.count--
				if(this.count<1) this.count = 1;
			},
			showDialog () {
				this.showPuyDialog = true;
			},
			hiddenDialog () {
				this.showPuyDialog = false;
			},
			buy () {
				let order = this.getOrderInfo[1].slice(0);
				order.unshift('HKKHKSH99980','广告发布',new Date().toLocaleString());
				this.$store.commit('addOrder',{index:3,data:order});
				console.log(this.$store.state.orderList)
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
				.count{
					line-height: 2.2rem;
					button{
						margin-right: 0;
					}
					input{
						width: 35px;
						text-align: center;
					}
				}
			}
		}
	}
	.bottom{
		padding:20px;
		table{
			width: 90%;
			line-height: 40px;
			td{
				border:1px solid #e5e5e5;
				text-indent: 10px;
			}
		}
	}
</style>