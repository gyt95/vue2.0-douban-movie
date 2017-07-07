<template>
	<div>
		<div class="login-content">
			<div class="setting">
				<img src="../assets/登录返回.png" alt="" @click="back">
			</div>
			<transition name="loginFade" mode="out-in">
				<div class="loginLoading" v-show="loginLoading">
					<h3>正在登录...</h3>
				</div>
			</transition>
			<transition name="fade" mode="out-in">
				<div class="tips" v-show="tips" ref="tips">
					<h3>{{text}}</h3>
				</div>
			</transition>
			<div class="login-header">
				欢迎来到豆瓣
			</div>
			<div class="input">
				<input type="text" v-model="username" placeholder="账号">
				<input type="password" v-model="password" placeholder="密码">
			</div>
			<button @click="onSubmit">登录</button>
		</div>
	</div>
</template>
<script>
	import { fetch,save } from '@/config/utils'
	export default{
		data(){
			return{
				username: '',
				password: '',
				items:{
					username:'',
					password:''
				},
				loginLoading:false,
				tips:false,
				text:''
			}
		},
		methods:{
			back(){
				this.$router.back()
			},
			onSubmit(){
				if(this.username == '' || this.password == ''){
					this.tips = true;
					this.text = '提示：账号密码都为test';
					setTimeout(()=>{
						this.tips = false;
					}, 1200)
				}else{
					this.loginLoading = true;
					if(this.username == 'test' && this.password == 'test'){
						this.$store.state.username = this.username;
						this.$store.state.password = this.password;
						this.$store.commit("login");
						this.items.username = this.username;
						this.items.password = this.password;
						save('userInfo',this.items);
						this.loginLoading = true;
						setTimeout(()=>{
							this.loginLoading = false;
							this.$router.push({name: 'my'})
						}, 1000)
						
					}else{
						this.loginLoading = false;
						this.tips = true;
						this.text = '账号或密码错误！无法跳转'
						setTimeout(()=>{
							this.tips = false;
						}, 1200)
					}
				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.login-content{
	    display: flex;
    	flex-direction: column;
    	.setting{
    		img{
			    width: 1.5rem;
			    padding: 0.3rem;
			}
    	}
    	.login-header{
			color: #00B51D;
		    padding: 1.8rem 0;
		    font-size: 1.6rem;
		    text-align: center;
    	}
    	.input{
    		padding: 0.8rem;
    		input{
				display: block;
			    width: 100%;
			    height: 1.4rem;
			    border: 0;
			    border-bottom: 1px solid darkgrey;
			    margin-bottom: 1rem;
			    text-indent: 0.5rem;
			    outline: none;
			    font-size: 0.8rem;
    		}
    	}
    	button{
		    display: block;
		    background: #00B51D;
		    color: #fff;
		    margin: 0 0.8rem;
		    height: 2rem;
		    border: 0;
		    border-radius: 4px;
		    outline: 0;
		    font-size: 0.8rem;
    	}
    	.loginLoading{
		    margin: 0 auto;
		    font-size: 0.5rem;
		    font-weight: normal;
		    background: #42BD56;
		    color: #fff;
		    padding: 0.4rem 0.8rem;
		    border-radius: 1rem;
	        position: absolute;
    		top: 2rem;
    		left: 38%;
    	}
    	.tips{
	        margin: 0 auto;
		    font-size: 0.5rem;
		    background: #ccc;
		    color: #fff;
		    padding: 0.4rem 0.6rem 0.4rem 0.8rem;
		    border-radius: 1rem;
		    position: absolute;
		    top: 2rem;
		    left: 25%;
		    h3 img{
	    	    width: 0.8rem;
    			vertical-align: middle;
		    }
    	}

    	
	  	.fade-enter-active, .fade-leave-active {
		    transform:translateY(0);
		    transition: 0.8s;
		}
		.fade-enter, .fade-leave-active {
		    transform:translateY(-100%);
		}


		.loginFade-enter-active, .loginFade-leave-active {
		    transform:translateY(0);
		    transition: 0.8s;
		}
		.loginFade-enter, .loginFade-leave-active {
		    transform:translateY(-100%);
		}
	}
</style>