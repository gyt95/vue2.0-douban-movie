<template>
	<div>
		<div class="search-loading" v-show="isLoading"></div>
		<div class="" v-if="!isLoading">
		
			<div class="detail-header">
				<img src="../assets/返回.png" alt="" class="back" @click="back">
				<h3 ref="title" v-text="title"></h3>
				<i><img src="../assets/分享.png" alt=""></i>
			</div>

			<div class="detail-image">
				<v-img :imgUrl="details.images.large"></v-img>
			</div>

			<div class="detail-content">
				<div class="main-part">
					<div class="left-box" @click="showInfo(details)">
						<h3 ref="movieName">{{details.title}}</h3>
						<p>
						{{details.year}}
						<span v-for="(genres,index) in details.genres">
							<span v-if="index < details.genres.length">
								/
							</span>
							{{genres}}
						</span>
						</p>
						<p>原名：{{details.original_title}}</p>
						<p>上映时间：{{details.mainland_pubdate}}</p>
						<p>片长：{{details.durations[0]}}</p>
					</div>
					<div class="right-box">
						<div class="score" v-if="details.rating.average!=0">
							<p>豆瓣评分</p>
							<h3>{{details.rating.average}}</h3>
							<star :size="24" :score="details.rating.average"></star>
							<p>{{details.ratings_count}}人</p>
						</div>
						<div class="score" v-else style="padding:0.6rem 0rem;">
							<p>豆瓣评分</p>
							<star :size="24" :score="details.rating.average" style="padding:0.3rem;"></star>
							<p>暂无评分</p>
						</div>
					</div>
				</div>

				<div class="btn-box">
					<button class="see1" :class="color" @click="record(details)">{{wanted}}</button>
					<button :class="color2" @click="record2(details)">{{seen}}</button>
				</div>

				<div class="ticket-part" @click="gotoBuy">
					<h3>选座购票</h3>
					<span class="arrow">
						&nbsp;>
					</span>
				</div>

				<div class="info-part">
					<p>简介</p>
					<span @click="summaryShow" ref="summary">{{details.summary}}</span>
				</div>

				<div class="actors-part" v-if="details.casts.length>0">
					<p>影人</p>
					<ul>
						<li v-for="actors in details.casts">
							<router-link :to="{name:'actors',params:{ id: actors.id }}">
								<img v-if="actors.avatars!=null" :src="actors.avatars.small" alt="">
								<p>{{actors.name}}</p>
							</router-link>
						</li>
					</ul>
				</div>

				<p class="names">预告片 / 剧照</p>
				<div class="pics-part">
					
					<ul>
						<div @click="watching(details.trailers[0].resource_url)"><span></span></div>
						<img v-if="details.trailers[0] != null" :src="details.trailers[0].medium" alt="" @click="watching(details.trailers[0].resource_url)">
						<li v-for="pics in filteredItems">
							<router-link to="/video">
								<img :src="pics.image" alt="">
								<!-- <p>{{actors.name}}</p> -->
							</router-link>
						</li>
					</ul>
				</div>


				<div class="comments-part">
					<p>短评</p>
					<ul>
						<li v-for="comments in details.popular_comments">
							<div>
								<img :src="comments.author.avatar" alt="">
							</div>
							<div class="content">
								<div class="content-top">
									<span>{{comments.author.name}}</span>
									<star :size="24" :score="comments.rating.value"></star>
									<span class="useful">有用 {{comments.useful_count}}</span>
								</div>
								<span class="content-mid">{{comments.content}}</span>
								<span class="content-down">{{comments.created_at}}</span>
							</div>
						</li>
					</ul>
					<div class="btn-part">
						<button>全部短评{{ details.comments_count }}个</button>
					</div>
				</div>
				
				<div class="reviews-part">
					<p>影评</p>
					<ul>
						<li v-for="(reviews,index) in details.popular_reviews" v-if="index < 5">
							<router-link to="/home">
								<h3>{{ reviews.title }}</h3>
								<div class="content-top">
									<span>{{ reviews.author.name }}</span>
									<star :size="24" :score="reviews.rating.value"></star>
								</div>
								<div class="content-down">
									{{ reviews.summary }}
								</div>
							</router-link>
						</li>
					</ul>
				</div>

				<div class="btn-part" @click="checkReviews">
					<button>全部影评{{ details.reviews_count }}个</button>
				</div>
				<aside class="return-top" @click="backTop" v-if="showBackStatus">
					<p>返回顶部</p>
				</aside>

			</div>

			
		</div>
		<div v-show="canSeeVideo" class="video-mask">
			<div class="video-box">
				<img class="video-close" src="../assets/关闭(白).png" alt="" @click="close()">
				<video id="video" :src="videoUrl" width="100%" height="240" autoplay controls autobuffer></video>
			</div>
		</div>

		<div class="movieMask" v-show="canSeeInfo"></div>
		<movie-info :movieInfo="movieInfo" ref="details" v-on:change="change"></movie-info>
	</div>
</template>
<script>
	import axios from 'axios'
	import { mapState } from 'vuex'
	import star from '@/components/star/star'
	import BScroll from 'better-scroll'
	import { showBack, animate } from '@/config/utils'
	import { fetch,save } from '@/config/utils'
	import vImg from '@/components/lazyImg'
	import movieInfo from '@/components/movieInfo'
	export default{
		components:{
			star,
			vImg,
			movieInfo
		},
		data(){
			return{
				url:'/api/movie/subject/',
				id:this.$route.params.id, //获取url的id
				showBackStatus:false, //回到顶部是否显示
				summaryFlag:false, //简介是否展开显示
				scroll:'', //监听滚动条，动态修改标题
				title:'电影', //标题
				wantTo:JSON.parse(fetch('wantTo')), //“想看”电影数组
				single:{}, //当前点击的电影数据
				ever:JSON.parse(fetch('ever')),
				single2:{},
				color:'',
				color2:'',
				wanted:'想看',
				seen:'看过',
				videoUrl:'',
				canSeeVideo:false,
				movieInfo:{},
				canSeeInfo:false
			}
		},
		computed:{
			...mapState([
				'isLoading',
				'details'
			]),
			filteredItems(){  /*用于限制剧照显示张数,vue2.0规定，取代limtBy*/
				return this.details.photos.slice(0,5);
			}
		},
		created(){
			this.$store.dispatch('detailsAsync',this.id)
			for(let i=0;i<this.wantTo.length;i++){
				console.log(999)
				if(this.wantTo[i].id==this.id && fetch('userInfo')){
					this.color='clicked';
					this.wanted="已想看";
					console.log(this.color)
				}
			}
			for(let i=0;i<this.ever.length;i++){
				if(this.ever[i].id==this.id && fetch('userInfo')){
					this.color2='clicked';
					this.seen="已看过";
				}
			}
		},
		mounted(){  //实时调用methods的方法
			this.initData();
			window.addEventListener('scroll',this.initScroll);
		},
		methods:{
			initData(){  //显示回到顶部按钮
				showBack(status => {
					this.showBackStatus = status;
				})
			},
			backTop(){  //回到顶部
				animate(document.body,{ scrollTop:'0'}, 400, 'ease-out');
			},
			summaryShow(){  //简介显示与隐藏
				if(!this.summaryFlag){
					this.$refs.summary.style.cssText = '-webkit-line-clamp: inherit';
					this.summaryFlag = true;
				}else{
					this.$refs.summary.style.cssText = '';
					this.summaryFlag = false;
				}
			},
			initScroll(){  //滚动时修改详情页标题
				this.scroll = document.body.scrollTop;
				if(this.scroll > 100){
					this.title = this.details.title;
				}else{
					this.title = '电影';
				}
			},
			back(){  //返回
				this.$router.go(-1)
			},
			checkReviews(){  //查看影评
				const rid = this.details.id
				this.$router.push({name:'reviews',params:{id:rid}})
			},
			record(newItem){
				this.single = newItem;
				if(fetch('userInfo')){
					if(fetch('wantTo')){
						let checkRepeat = false;
						this.wantTo.forEach((item,index)=>{
							if(item.id==this.single.id){
								checkRepeat = true;
								this.color = '';
								this.wanted = '想看';
								this.wantTo.splice(index,1);
								save('wantTo',this.wantTo)
								console.log('取消收藏');
							}
						})
						if(!checkRepeat){
							this.color = 'clicked';
							this.wanted = '已想看';
							this.wantTo.push(this.single);
							save('wantTo',this.wantTo);
							console.log('收藏成功！')
						}
					}else{
						if(this.wantTo==null){
							this.wantTo=[]
						}
						this.color = 'clicked';	
						this.wanted = '已想看';		
						this.wantTo.push(this.single);
						save('wantTo',this.wantTo);
					}
					
				}else{ 
					this.$router.push('/login')
				}
			},
			record2(newItem){
				this.single2 = newItem;
				if(fetch('userInfo')){
					if(fetch('ever')){
						let checkRepeat = false;
						this.ever.forEach((item,index)=>{
							if(item.id==this.single2.id){
								checkRepeat = true;
								this.color2 = '';
								this.seen = '看过';
								console.log('取消收藏');
								this.ever.splice(index,1);
								save('ever',this.ever)
							}
						})
						if(!checkRepeat){
							this.color2 = 'clicked';
							this.seen = '已看过';
							this.ever.push(this.single2);
							save('ever',this.ever);
							console.log('收藏成功！')
						}
					}else{
						if(this.ever==null){
							this.ever=[]
						}
						this.color2 = 'clicked';
						this.seen = '已看过';
						this.ever.push(this.single2);
						save('ever',this.ever);
					}
				}else{ 
					this.$router.push('/login')
				}
			},
			watching(url){
				console.log(url);
				this.videoUrl = url;
				this.canSeeVideo = 'true';
			},
			close(){
				let video = document.getElementById('video');
				video.pause();
				this.canSeeVideo = '';
			},
			showInfo(details){
				this.canSeeInfo = true;
				this.movieInfo = details;
				this.$refs.details.show();
			},
			change(){
				setTimeout(()=>{
					this.canSeeInfo = false;
				}, 350)
			},
			gotoBuy(){
				this.$router.push({name:'chooseCinema', params:{id:this.details.id}})
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.search-loading{
		background:url(../assets/loading_green.gif) no-repeat;
		background-size: 100% 100%;
	    width: 2rem;
	    height: 2rem;
        margin: 0 auto;    
        position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	}
	.detail-header{
		height: 1.8rem;
	    background: #333;
	    display: flex;
	    justify-content: space-between;
	    color: #fff;
	    position: fixed;
	    width: 100% !important;
		z-index: 2;
		.back{
			width: 1.3rem;
    	    height: 1.3rem;
		    display: inline-block;
		    padding: 0.3rem;
		}
	    h3{
    	    font-size: 0.85rem;
		    font-weight: normal;
		    line-height: 1.8rem;
	    }
	    i{
	    	font-size: 0.7rem;
		    padding: 0 0.3rem;
		    line-height: 2.3rem;
		    img{
    	    	width: 1rem;
		    }
	    }
	}

	.detail-image{
	    padding-top: 1.8rem;
	    height: 11rem;
	    width: 100%;
	    background: #333;

	    img{
    	    width: 7rem;
		    position: absolute;
		    top: 25%;
		    left: 50%;
		    transform: translate(-50%,-50%);
	    }
	}

	.detail-content{
	    position: absolute;
    	top: 13.8rem;
	    //padding: 0 0.4rem;
        width: 100%;

    	.main-part{
		    display: flex;
    		justify-content: center;

    		.left-box{
    		    flex: 1.5;
    			margin-left: 0.8rem;
    			h3{
				    font-size: 1rem;
    			}
    			p{
    				font-size: 0.6rem;
    				color: grey;
    			}
    		}
    		.right-box{
    			flex: 1;
    			text-align: center;
    			.score{
				    margin: 0.8rem 1rem 0.3rem 1.8rem;
    				box-shadow: -0.1px 0.5px 2px 0.5px lightgrey;
    			}
    			p{
				    font-size: 0.5rem;
    				color: grey;
    			}
    			h3{
				    font-size: 1.3rem;
   					font-weight: normal;
    			}
    		}
    	}

    	.btn-box{
			display: flex;
			padding: 1rem;

			button{
				border: 1px solid orange;
			    color: orange;
			    background: #fff;
			    height: 1.5rem;
			    border-radius: 3px;
			    font-size: 0.6rem;
			    flex: 1;
			    outline: 0;
			}
			.see1{
				margin-right: 0.5rem;
			}
			.clicked{
				border:1px solid #ccc;
				color: grey;
			}
		}

		.ticket-part{
		    display: flex;
		    justify-content: space-between;
		    padding: 0.6rem 0.8rem;
		    border-bottom: 1px solid #f2f2f2;
		    h3,span{
	    	    font-size: 0.7rem;
				display: inline-block;
		    }
		    .arrow{
		    	color:#ccc;
		    	margin-right: 0.2rem;
		    }
		}

		.info-part{
		    padding: 0.6rem 0.8rem;
		    p{
	    	    font-size: 0.6rem;
				color: grey;
		    }
		    span{
		    	font-size: 0.6rem;  
			    overflow: hidden;
			    display: -webkit-box;
			    -webkit-box-orient: vertical;
			    -webkit-line-clamp: 5;
		    }
		}

		.actors-part{
		    padding: 0.6rem 0.8rem;
			p{
	    	    font-size: 0.6rem;
				color: grey;
		    }
			ul{
			    overflow: hidden;
			    height: 6rem;
			    width: 100%;
				li {
				    display: inline-block;
				    margin: 0 0.05rem 0;
				    a{
				    	display: block;
				    	text-decoration: none;
				    	p{
							font-size: 0.6rem;
						    white-space: nowrap;
						    text-overflow: ellipsis;
						    overflow: hidden;
						    width: 3rem;
						    margin-right: 0.3rem;
					        text-align: center;
						}
						img{
							width: 3.5rem;
						}
				    }
					
				}
			} 
		}
		.names{
		    padding: 0.6rem 0.8rem 0 0.8rem;
    	    font-size: 0.6rem;
			color: grey;
	    }
		.pics-part{
		    //padding: 0.6rem 0.8rem;
	        padding: 0 0.6rem 0rem 0.8rem;
		    overflow: hidden;
		    overflow-x: auto;
			
			ul{
			    height: 5.3rem;
			    width: 6*8.5rem;
			    position: relative;
				li {
				    display: inline-block;
				    margin: 0 0.25rem 0 0;
				    a{
				    	display: block;
				    	text-decoration: none;
				    	p{
							font-size: 0.6rem;
						    white-space: nowrap;
						    text-overflow: ellipsis;
						    overflow: hidden;
						    width: 3rem;
						    margin-right: 0.3rem;
					        text-align: center;
						}
				    }
				}
				img{
				    //width: 8rem;
					height: 5.3rem;
				}
				div{
					position: absolute;
				    display: block;
				    width: 30px;
				    height: 30px;
				    border-radius: 50%;
				    background: #000;
				    opacity: 0.6;
				    top: 2rem;
				    left: 3.8rem;
				    span{
				    	//三角形原理看张鑫旭博客
					    display: block;
					    border-top: 10px solid transparent;
					    border-left: 15px solid #fff;
					    border-bottom: 10px solid transparent;
					    left: 10px;
					    position: absolute;
					    top: 5px;
				    }
				}
			} 
		}

		.comments-part{
			padding: 0.6rem 0.8rem 0.2rem;
			border-bottom: 1px solid #f2f2f2;
			p{
			    font-size: 0.6rem;
			    color: grey;
			}
			ul{
				list-style: none;
				li{
					display: flex;
    				padding: 0.4rem 0;
					img{
						border-radius: 50%;
					}
					.content{
					    padding: 0 0 0 0.4rem;
				        flex: 2;
						.content-top{
						    display: flex;	
						}
						.star{
							padding-left: 0.2rem;
						}
						.star-item{
						    display: flex;
						    padding-top: 0.1rem;
						}
						.useful{
							flex: 2;
    						text-align: right;
						}
					}
					span{
						display: block;
						font-size: 0.5rem;
						color: grey;
					}
					.content-top,.content-mid,content-down{
						padding: 0.2rem 0;
					}
				}
			}
		}

		.reviews-part{
			a{
				color: #333;
				text-decoration: none;
				display: block;
			}
		    padding: 0.6rem 1rem 0;
			p{
			    font-size: 0.6rem;
			    color: grey;
			}
			ul{
				list-style: none;
				li{
					h3{
						font-size: 0.7rem;
					}
					span{
						display: block;
						font-size: 0.5rem;
						color: grey;
					}
					.star{
						padding-left: 0.2rem;
					}
					.star-item{
					    display: flex;
					    padding-top: 0.1rem;
					}
					.content-top{
						display: flex;
						margin: 0.3rem 0;
					}
					.content-down{
						word-wrap:break-word;//防止出现一堆连续的英文时会溢出
						font-size: 0.5rem;
						color: grey;
					    width: 13.5rem;
					}
				}
			}
			//h3,span{
			//	margin-top:0.5rem;
			//}
			h3{
				margin-top: 1rem;
			}

		}
		.btn-part{
			button{
				background: #fff;
			    border: 0;
			    display: block;
			    color: #42bd56;
			    font-size: 0.7rem;
			    margin: 0 auto;
			    height: 1.6rem;
			    width: 100%;
			}
		}
		.return-top{
		    position: fixed;
		    bottom: 3rem;
		    right: 1rem;
		    background: lightskyblue;
		    color: #fff;
		    border-radius: 50%;
		    p{
	    	    font-size: 0.7rem;
			    width: 2rem;
			    height: 2rem;
			    text-align: center;
			    padding: 0.3rem;
		    }
		}
		
	}
	.video-mask{
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    z-index: 30;
	    background: rgba(55, 55, 55, 1);
	    .video-box{
		    width: 100%;
		    z-index: 40;
		    height: 100%;
		    video{
	    	    top: 24%;
    			position: absolute;
		    }
		    .video-close{
		    	width: 1.5rem;
			    position: absolute;
			    right: 0;
		    }
		}
	}

	.movieMask{
	    position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    margin: auto;
	    background: #333;
	    z-index: 3;
	    opacity: 0.8;
	}


	.fade-enter-active,.fade-leave-active{
		transform:translateY(0);
		transition: all 0.3s;
	}
	.fade-enter,.fade-leave-active{
		transform:translateY(100%)
	}
</style>