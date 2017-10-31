<template>
	<div>
		<form class="form-horizontal">
		  <div class="form-group">
		    <div class=" col-sm-offset-1 col-sm-10">
		      <input v-model="userName" type="email" class="form-control"  placeholder="用户名" @change="$store.commit('userName',userName)">
		    </div>
		  </div>
		  <div class="form-group">
		    <div class="col-sm-offset-1 col-sm-10">
		      <input v-model="password" type="password" class="form-control" placeholder="密码" @change="$store.commit('password',password)">
		    </div>
		  </div>
		 	<div class="form-group" v-if="!isLogin">
		    <div class="col-sm-offset-1 col-sm-10">
		      <input v-model="prePassword" type="password" class="form-control" placeholder="确认密码" @change="$store.commit('prePassword',prePassword)">
		    </div>
		  </div>
		  <div class="form-group">
		    <div class="col-sm-offset-1 col-sm-6">
		      <div class="checkbox" v-if="isLogin">
		        <label >
		          <input type="checkbox"> 记住密码
		        </label>
		      </div>
		    </div>
		  </div>
		</form>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				userName : '',
				password : '',
				prePassword: ''
			}
		},
		props:{
			isLogin:{
				type:Boolean,
				default:true
			}
		},
		methods:{

		}
	}
</script>

<style>
	

</style>