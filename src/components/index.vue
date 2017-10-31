<template>
	<div class="index-content">
		<div class="left">
			<div class="left-top">
				<div class="title">全部产品</div>
				<div class="bottom-line" v-for="val in product">
					<h4>{{val.name}}</h4>
					<ul>
						<li v-for="item in val.data">
							<a :href="item.link">{{item.name}}</a>
							<span v-if="item.hot">HOT</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="left-bottom">
				<div class="title">最新消息</div>
				<div class="list-news">
					<ul>
						<li  v-for="item in news">
							<a :href="item.link">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="right-top">
				<slide-show></slide-show>
			</div>
			<div class="right-bottom">
				<div class="board-list col-xs-6" v-for="(item,index) in boardList">
					<img :src="item.img" >
					<div class="details">
						<h3 class="title">{{item.title}}</h3>
						<p class="desc">{{item.desc}}</p>
						<router-link tag="button" class="btn btn-success" 
						@click="buy(index)" 
						:to="{ path:'detail/'+$store.state.detailProductLink[index].path}"
						@click.native="$store.commit('selected',index)">立即购买</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import slideShow from "./slideShow"
	export default {
		methods:{
			buy (index) {
				this.$store.commit('selected',index);
			}
		},
		components:{
			slideShow,
		},
		data () {
			return {
				product:[
					{
						name:"PC产品",
						data:[
							{
								name:'数据统计',
								link: 'http://weixin.com',
								hot:0
							},
							{
								name:'数据预测',
								link: 'http://twitter.com',
								hot:0
							},
							{
								name:'流量分析',
								link: 'http://maps.com',
								hot:1
							},
							{
								name:'广告发布',
								link: 'http://phone.com',
								hot:0
							}
						]
					},
					{
						name:"手机应用类",
						data:[
							{
								name:'91助手',
								link: 'http://starcraft.com',
								hot:0
							},
							{
								name:'产品助手',
								link: 'http://warcraft.com',
								hot:0
							},
							{
								name:'智能地图',
								link: 'http://overwatch.com',
								hot:1
							},
							{
								name:'团队语音',
								link: 'http://hearstone.com',
								hot:0
							}
							
						]
					}
				],
				news:[
					{
						name:'新闻1',
						link:'http://baidu.com',
						hot:0
					},
					{
						name:'新闻2',
						link:'http://qq.com',
						hot:0
					},
					{
						name:'新闻3',
						link:'http://oracle.com',
						hot:1
					},
					{
						name:'新闻4',
						link:'http://linux.com',
						hot:0
					}
				],
				boardList:[
					{
						img:require('../assets/images/1.png'),
						title:'开放产品',
						desc:'开放产品是一款开放产品'
					},
					{
						img:require('../assets/images/2.png'),
						title:'品牌营销',
						desc:'品牌营销帮助你的产品更好的找到定位'
					},
					{
						img:require('../assets/images/3.png'),
						title:'使命必达',
						desc:'使命必达快速迭代永远保持最前端的速度'
					},
					{
						img:require('../assets/images/4.png'),
						title:'勇攀高峰',
						desc:'帮你勇闯高峰，到达事业的顶峰'
					}
				]
			}
		}
	}
</script>

<style scoped lang='less'>
	.index-content{
		display: flex;
		justify-content:center;
		flex-direction:row;
		.left{
			margin: 10px ;
			width: 300px;
			ul{
				list-style-type: none;
				margin-left: 20px;
				line-height: 25px;
				padding-bottom: 15px;
				font-size: 0.9rem;
				span{
					background-color: red;
					color:white;
					margin-left: 5px;
				}
				a{
					text-decoration: none;
					color:black;
					font-size: 1.5rem;
				}
			}
			.left-top{
				background-color: white;
				h4{
					padding-left: 10px;
					line-height: 60px;
				}
				.title{
					background-color: green;
					color: white;
					line-height: 35px;
					padding-left: 10px;
				}
				.bottom-line{
					border-bottom: 1px solid #e5e5e5;
				}
			}
			.left-bottom{
				background-color: white;
				margin-top: 20px;
				ul{
					margin-top: 20px;
				}
				.title{
					background-color: green;
					color: white;
					line-height: 35px;
					padding-left: 10px;
				}
			}
		}
		.right{
			margin: 10px auto;
			width: 800px;
			.right-top{
				border: 2px solid #e5f5e5;
			}
			.right-bottom{
				display: flex;
				flex-wrap:wrap;
				margin-top: 10px;
				.board-list{
					padding:0;
					display: flex;
					background-color: white;
					border:2px solid #e5f5e5;
					h3{
						line-height: 40px;
					}
					img{
						width: 100px;
						height: 100px;
						margin: 20px;
					}
				}
			}
		}
	}


</style>