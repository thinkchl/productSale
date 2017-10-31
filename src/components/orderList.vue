<template>
	<div>
		<table>
			<tr v-for="trs,index in orderInfo">
				<template v-for="tds in trs">
					<th v-if="index===0">{{tds}}</th>
					<td v-if="index!==0">{{tds}}</td>
				</template>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		props:{
			orderInfo:{
				type:Array,
				default:[]
			}
		}
	}
</script>

<style scoped lang="less">
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
</style>