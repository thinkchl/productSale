<template>
	<div class="layout-container">
		<div class="header">
			<div class="img">
				<img src="../assets/logo.png"  alt="" @click="toIndexPage">
			</div>
			<div class="nav">
				<ul>
					<li v-if="!login"><a href="#" @click="showDialog('isShowLogin')">登录</a></li>
					<li v-if="login"><a href="#" @click="">{{$store.state.userName}}</a></li> |
					<li v-if="!login"><a href="#" @click="showDialog('isShowReg')">注册</a></li>
					<li v-if="login"><a href="#" @click="exitLogin">退出</a></li> |
					<li><a href="#" @click="showDialog('isShowAbout')">关于</a></li>
				</ul>
			</div>
		</div>
		<div class="dialog" v-if="isShowLogin.isShow | isShowReg.isShow | isShowAbout.isShow " >
			<show-dialog @close="hiddenDialog" :btn="buttonName" >
				<h3 slot="header">{{this[currentDialogTitle].title}}</h3>
				<login-form v-if="isShowLogin.isShow | isShowReg.isShow" slot="body" :isLogin="isLogin"></login-form>
				<p slot="body" v-if="isShowAbout.isShow">这是关于</p>
			</show-dialog>
		</div>
		<div class="content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<div class="footer">
			<p>© 2016 Think</p>
		</div>
	</div>
</template>

<script>
	import dialog from './dialog'
	import loginForm from './loginForm.vue'
	import { mapState } from 'vuex'
	export default {
		computed:{
			buttonName () {
				if(this.isShowLogin.isShow) return this.isShowLogin.btn
				if(this.isShowReg.isShow) return this.isShowReg.btn
				if(this.isShowAbout.isShow) return this.isShowAbout.btn
			},
			isLogin () {
				if(this.isShowLogin.isShow) return true;
				if(this.isShowReg.isShow) return false;
			},
			...mapState({
				login:state=>state.isLogin
			}),
		},
		components:{
			showDialog:dialog,
			loginForm
		},
		data () {
			return {
				isShowLogin:{
					isShow:false,
					title:'登录',
					btn:['取消','登录']
				},
				isShowReg:{
					isShow:false,
					title:'注册',
					btn:['取消','注册']
				},
				isShowAbout:{
					isShow:false,
					title:'关于',
					btn:['关闭']
				},
				currentDialogTitle:null
			}
		},
		methods:{
			showDialog (attr) {
				this[attr].isShow = true;
				this.currentDialogTitle = attr;
			},
			hiddenDialog () {
				this.isShowLogin.isShow = false;
				this.isShowReg.isShow = false;
				this.isShowAbout.isShow = false;
			},
			exitLogin () {
				this.$store.commit('isLogin');
			},
			toIndexPage(){
				this.$router.push('/');
			}
		}
	}

</script>

<style lang='less'>
	html,body{
		height: 100%;
	}
	*{
		padding:0;
		margin: 0;
	}
	.img{
		margin-left: 40px;
		display: flex;
		flex-direction:column;
		justify-content:center;
		cursor: pointer;
		img{
			width: 50px;
			height: 50px;
		}
	}
	.layout-container{
		min-height: 100%;
		height: 100%;
		min-width: 1200px;
		width: 100%;
		height: auto !important;
		position: relative;
		background-color: #e5f5e5;
		.dialog{
			z-index: 1;
		}
	}
	.header{
		height: 80px;
		width: 100%;
		background-color: black;
		display: flex;
		justify-content: space-between;
	}
	.nav{
		color: white;
		margin-right: 40px;
		font-size: 1.5rem;
		ul{
			list-style-type: none;
			li{
				display: inline-block;
				line-height: 80px;
				a{
					color: #e5e5e5;
					text-decoration: none;
					&:hover{
						background-color: green;
					}
				}
			}
		}
	}
	.content{
		padding-bottom: 80px;
		display: flex;
		justify-content:center;
	}
	.footer{
		width:100%;
		height: 80px;
		background-color: #e5e5e5;
		line-height: 80px;
		text-align: center;
		position: absolute;
		bottom: 0;
	}
</style>