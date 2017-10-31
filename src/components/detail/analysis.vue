<template>
	<div>
		<div class="top">
			<h4>流量分析</h4>
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
						<td>产品类型：</td>
						<td>
							<select v-model="selected">
								<option v-for="item,index in types" :value="index">{{item.name}}</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>有效时间：</td>
						<td>
							<template v-for="item,index in indate">
								<button class="btn btn-sm" :class="item.active?'btn-success':'btn-default'"
								@click="changeSelected('indate',index)">{{item.name}}</button>
							</template>
						</td>
					</tr>
					<tr>
						<td>产品版本：</td>
						<td>
							<template v-for="item,index in versions">
								<button class="btn btn-sm" :class="item.active?'btn-success':'btn-default'"
								@click="changeSelected('versions',index)">{{item.name}}</button>
							</template>
						</td>
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
			<p>{{info}}</p>
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
			totalPrice () {
				let types = this.types;
				let indate = this.indate;
				let versions = this.versions;
				let price = types[this.selected].price;
				let indateRadix = 0;
				let versionRadix = 0; 
				for(let i = 0 ;i<indate.length;i++){
					if(indate[i].active){
						indateRadix = indate[i].radix;
						break;
					} 
				}	
				for(let i = 0 ;i<versions.length;i++){
					if(versions[i].active){
						versionRadix = versions[i].radix;
						break;
					} 
				}	
				return this.count*price*indateRadix*versionRadix;
			},
			getIndate () {
				let indate = this.indate;
				for(let i = 0;i<indate.length;i++){
					if(indate[i].active) return indate[i].name;
				}
			},
			getVersion () {
				let versions = this.versions;
				for(let i = 0 ;i < versions.length; i++){
					if(versions[i].active) return versions[i].name;
				}
			},
			getOrderInfo(){
				return [
					['购买数量','产品类型','有效时间','产品版本','总价'],
					[this.count,this.types[this.selected].name,this.getIndate,this.getVersion,this.totalPrice]
				]
			}
		},
		data () {
			return {
				showPuyDialog:false,
				count:1,
				desc:'是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的',
				selected:'0',
				types:[
					{
						name:'入门版',
						price:340
					},
					{
						name:'中级版',
						price:560
					},
					{
						name:'高级版',
						price:670
					}
				],
				indate:[
					{
						name:'半年',
						active:true,
						radix:1
					},
					{
						name:'一年',
						active:false,
						radix:2
					},
					{
						name:'三年',
						active:false,
						radix:6
					}
				],
				versions:[
					{
						name:'客户版',
						active:true,
						radix:1
					},
					{
						name:'代理商版',
						active:false,
						radix:.8
					},
					{
						name:'专家版',
						active:false,
						radix:1
					}
				],
				area:['南京','北京','上海','淮安'],
				info:'2020年的一天，在你驱车前往公司的路上，导航系统通过预测交通流量，会自动帮你选择一条最合适的交通路线；车内推荐系统会根据你的饮食习惯预测你可能会喜欢吃什么，并推荐沿途的早餐店；你的电子社交助理已经为你自动选择了你可能感兴趣的社交网信息；当车内系统预测到你驾车有些分心时，座椅会自动震动进行提醒…… 以上这些情景不是科幻大片独有的，它们有的已经或会在未来的某一天成为现实。而这一切所倚靠的就是预测分析技术。 大数据时代下，作为其核心，预测分析已在商业和社会中得到广泛应用。随着越来越多的数据被记录和整理，未来预测分析必定会成为所有领域的关键技术。 作为预测分析领域的专家，埃里克·西格尔博士深谙预测分析界已经实现和正在发生的事情、面临的问题和将来可能的前景。在《大数据预测》一书中，他结合预测分析的应用实例，对其进行了深入、细致且全面的解读。 关于预测分析，你想了解的全部，你的生活以及这个世界会因为预测分析改变到什么程度，《大数据预测》都会告诉你。'
			}
		},
		methods:{
			changeSelected(flag,index) {
				let temp = this[flag];
				for(var i = 0;i<temp.length;i++){
					temp[i].active = false;
				}
				temp[index].active = true
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
				order.unshift('HKKHKSH99980','流量分析',new Date().toLocaleString());
				this.$store.commit('addOrder',{index:2,data:order});
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
	}
</style>