<template>
	<div class="modal fade" tabindex="-1" role="dialog" id="myDialog">
	  <div class="modal-dialog small" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <slot name="header"></slot>
	      </div>
	      <div class="modal-body">
	        <slot name="body"></slot>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">{{btn[0]}}</button>
	        <button type="button" class="btn btn-primary" v-if="btn.length > 1" @click="saveChange(okButton)">{{btn[1]}}</button>
	      </div>
	    </div>
	  </div>
	</div>
	
</template>

<script>
	export default {
		props:{
			btn:{
				type:Array,
				default:['取消','确定']
			},
			okButton:{
				type:Number,
				default:0
			}

		},
		data () {
			return {
				isShow:true
			}
		},
		mounted () {
			$('#myDialog').modal('show')
				.on('hidden.bs.modal',(e) => {
				this.$emit('close');
			})
		},
		methods:{
			saveChange (flag) {
				$('#myDialog').modal('hide')
				if(flag){
					this.$emit('buy');
					this.$router.push('/orderPage');
				}
				else
					this.$store.commit('isLogin');

			}
		}
	}
	
</script>

<style scoped lang="less">

</style>