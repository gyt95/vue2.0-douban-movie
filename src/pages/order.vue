<template>
	<div class="order-box" v-if="datas.data!=null">
		<div class="choose-header">
			<img src="../assets/登录返回.png" alt="" class="back" @click="back">
			<h3>电影票:{{ datas.movie_name }}</h3>
			<img class="image" src="../assets/搜索.png" alt="">
		</div>
		<div class="order-main">
			<div class="order-deadline">
				<span>请在{{remaining}}内完成支付</span>
			</div>
			<div class="order-details">
				<div class="movie-info">
					<h1>{{datas.movie_name}}<span>({{datas.data.type}}{{datas.data.movie_screen}})</span>
					</h1>
					<p>订单号:{{datas.order_id}}</p>
				</div>
				<div class="cinema-info">
					<h3>影院：{{datas.cinema_name}}</h3>
					<h3>场次：2017-{{datas.cinema_date}} {{datas.data.time}}</h3>
					<h3 class="seat">座位：8排05座</h3>
				</div>
				<div class="phone-info">
					<h3 v-if="datas.data.phoneNumber==null">
						<!-- 手机号：<input type="text" placeholder="请填写手机号" v-model="inputNum"> -->
						手机号：<input type="number" placeholder="请填写手机号" v-model.number="phoneNumber">
					</h3>
					<div v-else>
						<h3 style="display:inline-block;">手机号：{{datas.data.phoneNumber}}</h3>
					</div>
					<img v-show="phoneClosed" src="../assets/关闭(黑).png" alt="" @click="closeBtn">
				</div>
				<div class="order-price">
					<h3>票价：<span>{{datas.data.price}}元</span></h3>
					<p><img src="../assets/wechat.png" alt="">微信支付</p>
					<p><img src="../assets/pay.png" alt="">支付宝支付</p>
				</div>
			</div>
			<div class="order-tips">
				<p>温馨提示:</p>
				<p>请在15分钟内完成支付，超出时限所选座位将被自动释放。</p>
				<p>晴核对所选信息，出票后不支持退换服务。</p>
			</div>
		</div>
		<div class="pay-confirm">
			<h2 @click="showMessage2">确认支付￥{{datas.data.price}}</h2>
		</div>

		<div class="mask" v-show="showAlert">
			<div class="modal">
				<p>{{ alertText }}</p>
				<p @click="confirmBtn">确认</p>
			</div>
		</div>
	</div>
</template>
<script>
	import showMessage from '@/config/test'
	export default{
		data(){
			return{
				phoneNumber:'',
				phoneClosed: false,
				showAlert: false,
				alertText: null,
				countNum: 900 //900s，15分钟
			}
		},
		mounted(){
			this.remainingTime();
		},
		beforeDestory(){
			clearInterval(this.timer);
		},
		created(){
			//假如没有电影信息，跳转到首页(防止页面刷新后报错)
			if(this.$store.state.orderInfo.data==null){
				this.$router.push('/home')
			}
		},
		computed:{
			datas(){
				return this.$store.state.orderInfo;
			},
			// inputNum:{
			// 	get(){
			// 		return this.phoneNumber;
			// 	},
			// 	set(newValue){
			// 		this.phoneNumber = newValue.replace(/[^\d]/g,'');
			// 	}
			// },
			remaining(){
				let min = parseInt(this.countNum / 60); //900s/60s = 15min
				if(min < 10){
					min = '0' + min;
				}
				let second = parseInt(this.countNum % 60);
				if(second < 10){
					second = '0' + second;
				}
				return min + '分' + second + '秒';
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			remainingTime(){
				clearInterval(this.timer);
				this.timer = setInterval(()=>{
					this.countNum--;
					if(this.countNum == 0){
						clearInterval(this.timer);
						//弹窗后，点击确认会跳回到首页
						this.showAlert = true;
						this.alertText = '你未在15分钟内完成支付,很抱歉,你的座位已经取消';
						this.$router.push('/home')
					}
				}, 1000);
			},
			showMessage2(){	
				if(this.phoneNumber==''){
					this.alertText = '手机号输入有误';
					this.showAlert = true;
				}else{
					if(!(/^1[34578]\d{9}$/.test(this.phoneNumber))){
						this.alertText = '手机号输入有误';
						this.showAlert = true;
					}else{
						showMessage('购票请下载豆瓣电影官方app~')
					}
				}	
			},
			confirmBtn(){
				this.showAlert = false;
			},
			closeBtn(){
				this.phoneNumber = '';
			}
		},
		watch:{ //需求是对手机号进行监听，有数字就显示关闭按钮，没有就隐藏关闭按钮。  这里注意了，关闭按钮也要watch，否则无法在监听手机号输入的时候，对phoneClosed进行改变
			phoneNumber:{
				handler(){
					if(this.phoneNumber!=null){
						this.phoneClosed = true
					}
					if(this.phoneNumber==''){
						this.phoneClosed = false
					}
				},
				deep:true
			},
			phoneClosed:{ 
				handler(){

				},
				deep: true
			}
		}	
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.order-box{
		.choose-header{
		    display: flex;
		    align-items: center;
		    justify-content: flex-start;
		    padding: 0.6rem 0;
		    border-bottom: 1px solid #ccc;
		    position: fixed;
		    width: 100%;
		    background: #fff;
		    z-index: 3;
		    img{
	    	    width: 1rem;
	    		margin-left: 0.2rem;
		    }
		    .image{
		    	width: 0.8rem;
	   			margin-right: 0.5rem;
		    }
		    h3{
		    	font-size: 0.8rem;
			    font-weight: normal;
			    line-height: 0;
			    margin-left: 1rem;
			    flex:1;
		    }
		}

		.order-main{
			padding: 2.2rem 0.7rem 2.5rem;
	    	background: #F2F2F2;
	    	.order-deadline{
			    text-align: center;
	    		padding: 0.6rem 0;
	    		span{
				    font-size: 16px;
				    color: #f3b134;
				    font-weight: bold;
	    		}
	    	}
			.order-details{
				background:#fff;
				.movie-info{
					padding: 1rem;
	    			border-bottom: 1px solid #ccc;
	    			h1{
					    font-size: 0.85rem;
	    				margin-bottom: 0.4rem;
	    				span{
	    					color: #ccc;
	    					font-weight: normal;
	    				}
	    			}
	    			p{
				    	font-size: 0.8rem;
	    				color: grey;
	    			}
				}
				.cinema-info{
				    padding: 1rem;
				    h3{
				    	font-weight: normal;
					    font-size: 0.75rem;
					    margin-bottom: 0.8rem;
				    }		    
				    .seat{
			    	    border-bottom: 1px solid #ccc;
					    padding-bottom: 0.8rem;
					    margin-bottom: 0;
				    }
				}
				.phone-info{
					padding: 0 0 1rem;
				    display: flex;
				    flex-direction: row;
				    justify-content: space-between;
				    align-items: center;
				    border-bottom: 1px dashed #ccc;
				    margin: 0 1rem;
				    h3{
			    	    font-weight: normal;
	    				font-size: 0.75rem;
				    }
				    img{
			    	    width: 0.6rem;
				    }
				    input[type=number]{
				    	width: 6rem;
			    	    border: 0;
					    line-height: 1rem;
					    outline: none;
					    display: inline-block;
					    margin-top: -3rem;
					    font-size: 16px;
				    }
				}
			}
			.order-price{
				padding: 1rem;
				h3{
				    font-weight: normal;
				}
				h3,p{
				    font-size: 0.75rem;
	   	 			margin-bottom: 1rem;
				}
				img{
					width:1.2rem;
				    vertical-align: middle;
				    display: inline-block;
	   				margin-right: 1rem;
				}
				span{
				    color: orangered;
				}
			}
			.order-tips{
			    padding: 0.6rem 0;
				p{
					color:grey;
					font-size: 0.6rem;
				}
			}
		}
		.pay-confirm{
			position:fixed;
			height:50px;
			width:100%;
			background:#509DED;
			bottom: 0;
			h2{
			    color: #fff;
			    font-size: 1rem;
			    text-align: center;
		        position: absolute;
			    margin: 0 auto;
			    top: 50%;
			    left: 50%;
			    transform: translate(-50%,-50%);
			}
		}

		.mask{
			position: fixed;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    z-index: 30;
		    background: rgba(55,55,55,0.6);
		}

		.modal{
		    position: absolute;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    margin: auto;
		    background: #fff;
		    width: 8rem;
		    height: 3rem;
		    font-size: 16px;
		    border-radius: 4px;
		    padding: 0.5rem 0.8rem;
		    p:last-child{
	    		text-align: right;
			    color: steelblue;
			    margin-top: 1rem;
		    }
		}
	}
</style>