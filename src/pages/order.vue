<template>
	<div>
		<div class="choose-header">
			<img src="../assets/登录返回.png" alt="" class="back" @click="back">
			<h3>电影票:变形金刚5：最后的骑士</h3>
			<img class="image" src="../assets/搜索.png" alt="">
		</div>
		<div class="order-main">
			<div class="order-deadline">
				<span>请在14分52秒内完成支付</span>
			</div>
			<div class="order-details">
				<div class="movie-info">
					<h1>变形金刚5：最后的骑士<span>(原声3D)</span></h1>
					<p>订单号:297100100</p>
				</div>
				<div class="cinema-info">
					<h3>影院：橙天嘉禾广州影城</h3>
					<h3>场次：2017-07-01 周六 13：20</h3>
					<h3 class="seat">座位：8排05座</h3>
				</div>
				<div class="photo-info">
					<h3>手机号：13766666101</h3>
					<img src="../assets/关闭(黑).png" alt="">
				</div>
				<div class="order-price">
					<h3>票价：<span>44.5元</span></h3>
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
			<h2>确认支付￥44.5</h2>
		</div>
	</div>
</template>
<script>
	export default{
		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	//由于能进来这里，一定已经加载了chooseCinema.vue
	//所以不再写choose-header，考虑提取组件

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
			.photo-info{
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
</style>