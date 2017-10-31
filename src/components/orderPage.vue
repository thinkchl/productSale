<template>
	<div class="container">
		<h4>您的产品</h4>
		<span>选择产品：</span>
		<select v-model="selected" @change="updateStore">
			<option v-for="item,index in $store.state.orderList" :value="index">{{$store.state.orderList[index].name}}</option>
		</select>
		<span>开始日期：</span>
		<input type="text" id="startDate" onkeydown="return false">
		<span>结束日期：</span>
		<input type="text" id="endDate" onkeydown="return false">
		<span>关键词：</span>
		<input type="text">
		<order class="orderList" :orderInfo="$store.state.orderList[selected].order"></order>		
	</div>
</template>

<script>
	import order from './orderList'
	import { mapState } from 'vuex'
	export default {
		components:{
			order
		},
		computed:{
			...mapState({
				select:state=>state.orderSelected
			})
		},
		data () {
			return {
				selected:this.$store.state.orderSelected
			}
		},
		methods:{
			updateStore () {
				this.$store.commit('orderSelected',this.selected);
			}
		},
		watch:{
			select:{
				handler:function(val,oldVal){
					this.selected = val;
				}
			}
		},
		mounted () {
			let date=new Date(1998,7,8);
			let arr = ['startDate','endDate'];
			for(let i = 0 ;i<arr.length;i++){
				$("#"+arr[i]).datepicker({
					changeYear:true,
					changeMonth:true,
					yearRange:"1900:2030",
					dateFormat:"yy年mm月dd日 DD",
					dayNames:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],//设置星期几的长名称
					dayNamesShort:["日","一","二","三","四","五","六"],//设置星期几的短名称
					dayNamesMin:["日","一","二","三","四","五","六"],//设置列首的名称
					minDate:date,
					maxDate:"+5y",
					buttonText:"选择日期",
					duration:1000,
					numberOfMonths:1,
					firstDay:0,
					showWeek:true,
					isRTL:true

				});
			}

		}
	}
</script>

<style scoped lang="less">
	.container{
		.orderList{
			margin-top: 20px;
			z-index: 0;
		}
	}
	#ui-datepicker-div{
		z-index: 2344 !important;
	}
</style>