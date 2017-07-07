<template>
	<div>
		<div class="board-header">
			<img src="../assets/登录返回.png" alt="" class="back" @click="back">
			<h3>{{boardTitle}}</h3>
		</div>
		
		<div class="billboard-main">
			<us-box :board="board" v-if="name=='us_box'"></us-box>

			<swiper :options="swiperOption" ref="swiper" v-if="name=='top250'" style="overflow:auto;height:100vh">
				<swiper-slide v-for="slide in swiperSlides" :key="slide">
				<!-- :type绑定的是swiperSlides数组的值 -->
				<!-- :ref绑定slide是为了onSlideChangeStart进行获取 -->
					<top-box :type="slide" :ref="slide"></top-box>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>

		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	import usBox from '@/components/board/usBox'
	import topBox from '@/components/board/topBox'
	import { swiper,swiperSlide } from 'vue-awesome-swiper'
	import { swiperPlugins } from 'vue-awesome-swiper'
	const TAB_NAME = ['1-50', '51-100', '101-150', '151-200', '201-250']
	export default{
		data(){
			return{
				name:this.$route.params.name,
				title:'专题',
				content:{},
				swiperOption:{
					pagination: '.swiper-pagination',
       				paginationClickable: true,
       				paginationBulletRender(swiper, index, className) {
			            return `<div class="${className} swiper-pagination-bullet-custom">${TAB_NAME[index]}</div>`;
			        }
       			},
       			swiperSlides: ['one','two','three','four','five'],
			}
		},
		components:{
			usBox,
			topBox,
			swiper,
			swiperSlide,
		},
		computed:{
			...mapState([
				'board',
				'isLoading',
				'boardTitle',
				'topSelected'
			])
		},
		created(){
			this.init();
			const that = this;
			swiperPlugins.debugger = function swiperCallback(swiper){
				return{
					onSlideChangeStart(){
						const container = that.$refs[that.topSelected][0].$el;
						that.$store.commit('updateScrollY',{
							type: that.topSelected,
							scrollY: container.scrollTop
						})
					},
					onSlideChangeEnd(){
						const type = that.swiperSlides[swiper.activeIndex];
						const scrollY = that.$store.state[type].scrollY;
						const container = that.$refs[type][0].$el;
						if (scrollY === 0 && that.$store.state[type].datas.length === 0) {
			            	that.$store.dispatch('board2Async',type);
			            }
			            that.$store.commit('updateSelected',type);
						container.scrollTop = scrollY;
					}
				}
			}
		},
		methods:{
			init(){
				if(this.$route.params.name=='us_box'){
					this.$store.dispatch('boardAsync',this.name);
				}
			},
			back(){
				this.$router.go(-1)
			},
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.board-loading{
		background:url(../assets/loading_green.gif) no-repeat;
		background-size: 100% 100%;
	    width: 2rem;
	    height: 2rem;
        position: absolute;
	    top: 35%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	}

	.board-header{
		display: flex;
		align-items: center;
	    padding: 0.6rem 0;
	    border-bottom: 1px solid #ccc;
	    position: fixed;
    	width: 100%;
	    background: #fff;
    	z-index: 3;
		.back{
			width: 1rem;
		    margin-left: 0.2rem;
		}
		h3{
		    font-size: 0.8rem;
		    font-weight: normal;
		    line-height: 0;
		    margin-left: 1rem;
		}
	}

	.billboard-main{
    	padding-top: 8%;
		.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
		    bottom: 0;
	        border-bottom: 1px solid #ccc;
		    display: flex;
		    top: 2.2rem;
	        font-size: 0.6rem;
    		line-height: 1.5rem;
    		height: 1.5rem;
    		background: #fff;
		    position: fixed;
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
		}
		.swiper-pagination-bullet-active{
		    border-bottom: 1.2px solid #000;
		}
		.swiper-slide,swiper-slide-prev.swiper-slide-active,swiper-slide-next{
			//height: 19.8rem;
		    overflow: auto;
    		padding-bottom: 4rem;
		}



	}

	.board-content {
		a{
			text-decoration: none;
			color:#333;
			width: 100%;
		}
		ul{
			li{
		        padding: 1.5rem 0 0;
			    display: flex;
			    justify-content: center;
			    align-items: center;
			    flex-direction: column;
			    .rank{
			    	text-align: center;
			    }
			    .line{
					width: 2rem;
				    height: 1px;
				    font-size: 0;
				    background: darkgrey;
				    display: inline-block;
				    margin-bottom: 0.3rem;
				}
				i{
					font-size: 0.8rem;
					color: grey;
				}
				.board-movie{
				    display: flex;
				    margin: 0.8rem;
				    border: 1px solid #ccc;
				    padding: 0.5rem;
				    box-shadow: 0.05rem 0.05rem 0 #ccc;
				    img{
				    	vertical-align: middle;
				    	height: 5rem;
				    }
				}
				.movie-info{
					color: grey;
    				padding: 0 0.5rem;
    				h3{
					    font-size: 0.75rem;
    					color: #333;
    				}
    				p,span{
    					font-size: 0.6rem;
    				}
    				.casts{
    					display: inline-block;
    				}
				}
			}
		}
		
	}
</style>