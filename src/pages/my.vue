<template>
	<div>
		<div class="header" :class="bg">
			<div class="setting" v-if="login">
				<img src="../assets/更多.png" alt="" @click="setting">
			</div>
			<div class="no-login" v-if="!login">
				<img src="../assets/头像.png" alt="">
				<router-link to="/login"><span>请登录</span></router-link>
			</div>
			<div class="yes-login" v-if="login">
				<img src="../assets/avatar.jpg" alt="">
				<div class="title">
					<span v-text="name"></span>
					<router-link to="/ticket"><h3>我的电影票</h3></router-link>
				</div>
			</div>
		</div>
		
		<div class="my-middle">
			<swiper :options="swiperOption" style="height:20rem;">
				<swiper-slide v-for="slide in swiperSlides" :key="slide">
					<v-record v-if="login" :ref="slide" :type="slide"></v-record>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination" style="font-size: 0.8rem;background:#fff"></div>
			</swiper>
		</div>

		<div class="mask" v-show="modalShow">
			<div class="modal">
				<h3>豆瓣电影</h3>
				<div class="content">
					<span>确定退出登录？</span>
				</div>
				<div class="btns">
					<button @click="op(1)">取消</button>
					<button @click="op(2)">确定</button>	
				</div>
			</div>
		</div>

		<v-footer></v-footer>
	</div>
</template>
<script>
	import vFooter from '../components/footer/footer'
	import { swiper,swiperSlide } from 'vue-awesome-swiper'
	import { swiperPlugins } from 'vue-awesome-swiper'

	const TAB_NAME = ['想看', '看过']
	import { fetch,save,remove } from '../config/utils'
	import vRecord from '../components/record'
	export default{
		data(){
			return{
				login: false,//判断是否登录
				swiperOption:{
					pagination: '.swiper-pagination',
       				paginationClickable: true,
       				paginationBulletRender(swiper, index, className) {
			            return `<div class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</div>`;
			        }
				},
				swiperSlides : ['want','ever'],
				name:'请登录', 
				userInfo:[],     //获取用户信息
				modalShow:false, //判断模态框状态
				bg:''
			}
		},
		components:{
			swiper,
			swiperSlide,
			vFooter,
			vRecord
		},
		mounted(){
			if(fetch('userInfo')){ //如果保存有账户密码，先判断是否登录过
				this.userInfo = JSON.parse(fetch('userInfo'));
				if(this.userInfo){
					this.login = true;
					this.name = this.userInfo.username;
					this.bg = 'bg';
				}
			}else{
				console.log("??")
			}
			//搞了半天都返回的是json字符串，一直获取不到username，后来想起来要用JSON.parse...
			// let userInfo = fetch('userInfo');
			// if(userInfo != null){
			// 	this.login = true;
			// 	this.name = userInfo.username;
			// }
		},
		created(){
			const that = this;
			swiperPlugins.debugger = function swiperCallback(swiper){
				return{
					onSlideChangeStart(){ 
					},
					onSlideChangeEnd(){
					}
				}
			}
		},
		methods:{
			setting(){
				this.modalShow = true;
			},
			op(type){
				if(type == '1'){
					this.modalShow = false; //关闭模态框
				}
				if(type == '2'){
					remove('userInfo');
					this.login = false;
					this.modalShow = false;
					this.bg = ''
				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.header{
	    padding-bottom: 1rem;
	    background: mediumseagreen;
		background-size:100% 100%;
		height: 6rem;
	    display: flex;
	    align-items: center;
	    justify-content: center;
        flex-direction: column;
	    .setting{
	        width: 100%;
			img{
	    		width: 1.5rem;
			    float: right;
	    	}
	    }
		.no-login{
		    width: 100%;
		    display: flex;
			img{
			    width: 3.5rem;
			    height: 3.5rem;
			    margin-left: 0.5rem;
			}
			span{
			    color: #fff;
			    display: inline-block;
			    padding: 1rem 0.3rem;
			    font-size: 1rem;
			}
		}
		.yes-login{
			width: 100%;
		    display: flex;
		    img{
			    width: 3.5rem;
			    height: 3.5rem;
			    border-radius: 50%;
			    margin-left: 0.5rem;
			}
			.title{
				margin-left: 0.5rem;
				display: flex;
    			flex-direction: column;
    			span,h3{
					color: #fff;
					font-size: 0.6rem;
				}
				h3{	
		    		font-weight: normal;
		    		border: 1px solid;
	    		    margin-top: 0.3rem;
	    		    padding: 0.2rem 0.5rem;
    				border-radius: 4px;
				}
				span{
					font-size: 1rem;
				}
				a{
					text-decoration: none;
				}
			}
			
		}
	}

	.my-middle{
		background: #F0F1EC;
		.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
		    bottom: 0;
		    display: flex;
		    top: 0;
	        font-size: 0.8rem;
    		line-height: 1.5rem;
    		height: 1.5rem;
    		background: #fff;
		}

		
		.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
	        margin: 0 0.3rem;
		    flex: 1;
		    border-radius: 0;
		    background: #fff;
		    z-index:3;
		    height: 1.5rem;
		}
		.swiper-wrapper{
		    margin-top: 1.5rem;
		    background: #F0F1EC;
		}
		.swiper-pagination-bullet-active{
		    border-bottom: 1.2px solid #000;
		}
		.swiper-slide,swiper-slide-prev,.swiper-slide-active,swiper-slide-next{
			//height: 19.8rem;
			background: #F0F1EC;
		    //overflow: auto;
    		padding-bottom: 4rem;
		}
	}

	.mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index:30;
		background: rgba(55,55,55,0.6);
	}

	.modal{
		width:10rem;
		height:6rem;
		background: #fff;
		position: absolute;

		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;

		top:50%;
		left:50%;
		transform:translate(-50%,-50%);

    	border-radius: 4px;
		h3{
			font-size: 0.8rem;
			display: block;
		}
		span{
			font-size: 0.65rem;
		}
		h3,.content{
		    width: 100%;
    		text-indent: 0.6rem;
		}
		.btns{
		    width: 100%;
    		text-align: right;
    		button{
				padding:0 0.6rem;
				background: #fff;
			    border: 0;
			    color: steelblue;
			    outline: 0;
			}
		}
		
	}

	.bg{
		background:url(../assets/bg.jpg) no-repeat;
		background-size: 100% 100%;
	}
</style>