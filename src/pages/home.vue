<template>
	<div>
		<!-- 搜索模块 -->
		<div class="search-box">
			<router-link to="/city" class="city-text">
				<span v-text="cityText"></span>
				<img src="../assets/向下.png" alt="" style="width: 0.5rem;">
			</router-link>
			<router-link to="/search" class="search-input">
				<img src="../assets/搜索.png" alt="">
				<span>电影 / 电视剧 / 影人</span>
			</router-link>
		</div>

		<!-- 轮播图 -->
		<swiper :options="swiperOption1">
			<swiper-slide>
				<div class="slidebox">
					<div class="image">
						<a href="https://www.douban.com/note/624582895/?from=gallery" target="_blank">
							<img src="../assets/077707da51f7aca.jpg">
						</a>
					</div>
					<div class="text">
						<p>观影报告|面对人工智能，人类何去何从</p>
						<span>——《异形：契约》中与异形无关的那些事</span>
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="slidebox">
					<div class="image">
						<a href="https://www.douban.com/note/623563200/?from=gallery" target="_blank">
							<img src="../assets/eca6933b2a596e4.jpg">
						</a>
					</div>
					<div class="text">
						<p>我可能就是个人工智能</p>
						<span>——《异形：契约》导演雷德利·斯科特专访实录</span>
					</div>
				</div>
			</swiper-slide>
			<div class="swiper-pagination swiper-point" slot="pagination"></div>
		</swiper>

		<!-- swiper模块 -->
		<div class="swiper-main">
			<swiper :options="swiperOption2" ref="swiper">
				<swiper-slide v-for="slide in swiperSlides" :key="slide">
					<v-content :ref="slide" :type="slide" :city="cityText"></v-content>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination" :id="fixed"></div>
			</swiper>
		</div>

		<!-- footer -->
		<v-footer></v-footer>
	</div>
</template>
<script>
	import { swiper,swiperSlide } from 'vue-awesome-swiper'
	import vFooter from '../components/footer/footer'
	import vContent from '../components/content'
	import { swiperPlugins } from 'vue-awesome-swiper'

	import { mapState } from 'vuex'
	import { test } from '@/config/utils'
	const TAB_NAME = ['正在热映', '即将上映']

	export default{
		data(){
			return{
				swiperOption1:{
					// autoplay: 1500,
					pagination: '.swiper-pagination',
       				paginationClickable: true,
       			},
       			swiperOption2:{
					pagination: '.swiper-pagination',
       				paginationClickable: true,
       				paginationBulletRender(swiper, index, className) {
			            return `<div class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</div>`;
			        }
       			},
       			swiperSlides: ['ingMovie','willMovie'],
       			scroll:'',//保存滚动位置
       			fixed:'',//动态添加class名
       			city:'',
       			cityText:'未知'
			}
		},
		components:{
			swiper,
			swiperSlide,
			vFooter,
			vContent
		},
		computed: {
		    ...mapState([
		      'homeSelected',
		    ]),
		},
		created(){
			this.city = remote_ip_info['city'];
			if(this.city!=null) {
				this.cityText = this.city;
			}
			const that = this;
			swiperPlugins.debugger = function swiperCallback(swiper){
				return{
					onSlideChangeStart(){ //保存滚动条及type
						const container = that.$refs[that.homeSelected][0].$el;
						that.$store.commit('updateScrollY', {
							type: that.homeSelected,
							scrollY: container.scrollTop
						})
					},
					onSlideChangeEnd(){
						const type = that.swiperSlides[swiper.activeIndex];
						const scrollY = that.$store.state[type].scrollY;
						const container = that.$refs[type][0].$el;
						if (scrollY === 0 && that.$store.state[type].datas.length === 0) {
			            	that.$store.dispatch('dataAsync',type);
			            }
			            that.$store.commit('updateSelected',type);
						container.scrollTop = scrollY;
					}
				}
			}
		},
		mounted(){
			window.addEventListener('scroll',this.initScroll);
		},
		methods:{
			initScroll(){  //监听滚动条来实现导航固定
				this.scroll = document.body.scrollTop;
				if(this.scroll > 170){
					this.fixed = 'fixed'
				}else{
					this.fixed = 'swiper-pagination-clickable swiper-pagination-bullets';
				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.search-box{
		padding: 10px;
		.city-text{
			text-decoration: none;
			color:#333;
		    line-height: 30px;
    		margin: 0 16px;
    		span{
			    font-size: 0.65rem;
			}
		}
		.search-input{
			display: inline-block;
		    text-decoration: none;
		    color: #f2f2f2;
		    background: whitesmoke;
		    border-radius: 5px;
		    width: 11rem;
		    text-align: center;
		    line-height: 1.23rem;
		    margin: 0 auto;
		    span{
	    	    color: #333;
    			font-size: 0.65rem;
    		    //margin-left: 1.2rem;	
		    }
		    img{
	    	    width: 0.6rem;
			    margin-left: 1rem;
		    }
		}
	}

	.slidebox{
		display: flex;
		background: #333;
		.image{
			width: 80%;
			a{
				img{
					width: 80%;
				    padding: 10px 10px 0;
				}
			}
		}
		.text{
		    padding: 10px;
	        color: #fff;
		    p{
				font-weight: bold;
			    font-size: 0.8rem;
			    margin-bottom: 10px;
		    }
		    span{
		    	display: block;
		    	font-size: 0.6rem;
		    }
		}
	}
	.swiper-pagination-bullet-active{
		background: #d3d3d3;
	}

	.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
		bottom: 0;
	}
	.swiper-point{
		bottom: 0;
	    right: 0;
        text-align: right;
	    span{
	    	margin-right: 5px;
	    }
	}



	.swiper-main{
		z-index: 1;
		padding-bottom: 2rem;
		.swiper-pagination-bullet-active{
		    border-bottom: 1.2px solid #000;
		}
		.swiper-slide{
			margin-top: 1.4rem;
			.movie-wrapper{
			    padding: 0.6rem;
			    display: flex;
			    border-bottom: 1px solid lightgrey;
				.movie-route{
					//padding: 0.6rem;
				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: flex;
				    //border-bottom: 1px solid lightgrey;
				    text-decoration: none;
				    color: #000;
				    width: 100%;

				    .movie-pic{
			    	    display: inline-block;
	    				//flex: 1;//用了这个在iphone6 plus出现文字图片部分重叠

	    				img{
	    					width: 4.4rem;
	    					//height: 100%;
	    					height: 6.3rem;
	    				}
				    }

				    .movie-info{
			    	    flex: 2;
	    				padding: 0 0.6rem;
						.casts{
							display: block;
		    				span{
								display: inline;
		    				}
						}
	    				h2{
	    					font-size: 0.8rem;
	    				}
	    				p{
						    display: block;
	    				}
	    				h3{
						    font-size: 0.7rem;
						    font-weight: normal;
						    margin-top: 0.5rem;
	    				}
	    				p,span{
						    font-size: 0.55rem;
						    color: grey;
	    				}
				    }
				}
			    .ticketBuy{
			    	    flex: 1;
					    display: flex;
					    justify-content: center;
					    align-items: center;

					    button{
					    	display: block;
						    width: 2.5rem;
						    height: 1.3rem;
						    border-radius: 4px;
						    border: 1px solid red;
						    background: #fff;
						    color: red;
						    margin-top: -20px;
					        font-size: 0.6rem;
					        outline: 0;
					    }
						
					    .wantTo{
						    border: 1px solid orange;
						    color: orange;
					    }

						.clicked{
							border: 1px solid grey;
							color: grey;
						}
				    }

			}
		}

		.swiper-pagination{
		    display: flex;
		    justify-content: center;
		    height: 1.5rem;
		    border-bottom: 1px solid lightgrey;
		    position: absolute;
		    top: 0;
		    .swiper-pagination-bullet-custom{
		    	//基本都是对小圆点的处理，先flex各一半
	    	    width: 100% !important;
			    flex: 1;
			    //高度填满，并调整为正方形，去除margin
			    height: 100% !important;
			    border-radius: 0 !important;
			    margin: 0 !important;
			    //变为无色，调节文本位置及字体
			    background: inherit;
			    line-height: 1.5rem;
			    font-size: 0.7rem;
			    opacity: 1 !important;
		        color: grey;
		    }
		}
	}


	#fixed{
	    position: fixed;
	    top: 0px;
	    left: 0px;
	    width: 100%;
	    background: #fff;
	}
</style>