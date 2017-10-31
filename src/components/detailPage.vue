<template>
	<div>
		<div class="left pull-left">
			<img :src="$store.state.detailProductLink[$store.state.currentLinkIndex].icon">
			<ul>
				<template v-for="(item,index) in $store.state.detailProductLink">
					<router-link tag="li" :to="{ path: item.path }"
					@click.native="$store.commit('selected',index)" 
					:key="index">{{item.name}}</router-link>
				</template>

			</ul>
		</div>
		<div class="right pull-right">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="less">
	.left{
		background-color: white;
		width: 200px;
		text-align: center;
		margin: 20px;
		img{
			margin-top: 20px;
		}
		ul{
			list-style-type: none;
			line-height: 40px;
			margin-top: 20px;
			text-align: center;
			padding:0;
			li{
				&:hover{
					cursor: pointer;
					background-color: #e5e5e5;
				}
			}
			.router-link-active{
				background-color: #6fbe91 !important;
				color: white;
			}
		}
	}
	.right{
		background-color: white;
		width: 920px;
		margin:20px;
		margin-left: 0;

	}

</style>