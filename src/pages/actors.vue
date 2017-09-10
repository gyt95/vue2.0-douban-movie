<template>
	<div>
		<div class="search-loading" v-show="isLoading"></div>
		<div v-if="!isLoading">
		
			<div class="detail-header">
				<img class="back" src="../assets/返回.png" alt="" @click="back">
				<h3 ref="title" v-text="title"></h3>
				<i><img src="../assets/分享.png" alt=""></i>
			</div>

			<div class="detail-image">
				<img :src="actors.avatars.large">
			</div>

			<div class="detail-content">
				<div class="main-part">
					<div class="left-box">
						<h3 ref="movieName">{{actors.name}}</h3>
						<p ref="movieName">{{actors.name_en}}</p>
					</div>
				</div>
				<p class="works-title">个人简介</p>
				<div class="info-part">
					<span @click="showInfo(actors)" v-if="actors.summary != ''">
						{{actors.summary}}
					</span>
					<div class="info-mid" v-else="actors.summary == '' ">
						<span>
							<h3>性别：</h3>
							<span>{{actors.gender}}</span>
						</span>
						<span>
							<h3>星座：</h3>
							<span>{{actors.constellation}}</span>
						</span>
						<span>
							<h3>出生日期：</h3>
							<span>{{actors.birthday}}</span>
						</span>
						<span>
							<h3>出生地：</h3>
							<span>{{actors.born_place}}</span>
						</span>
					</div>
				</div>
				<p class="works-title">代表作品</p>
				<div class="movies-part">
					<ul>
						<li v-for="items in actors.works">
							<router-link :to="{name:'details',params:{ id:items.subject.id }}">
								<img :src="items.subject.images.small" alt="">
								<p>{{items.subject.title}}</p>
								<star :size="24" :score="items.subject.rating.average"></star>
								<p>{{items.subject.rating.average}}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<v-actor :actorInfo="actorInfo" ref="actors"></v-actor>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	import star from '@/components/star/star'
	import vActor from '@/components/actor'
	export default{
		data(){
			return{
				id:this.$route.params.id,
				scroll:'',
				title:'影人',
				actorInfo:{}
			}
		},
		components:{
			star,vActor
		},
		created(){
			this.actorDetail()
		},
		mounted(){  //实时调用methods的方法
			window.addEventListener('scroll',this.initScroll);
		},
		computed:{
			...mapState([
				'isLoading',
				'actors'
			]),
		},
		methods:{
			actorDetail(){
				this.$store.dispatch('actorAsync',this.id);
			},
			initScroll(){  //滚动时修改详情页标题
				this.scroll = document.body.scrollTop;
				if(this.scroll > 100){
					this.title = this.actors.name;
				}else{
					this.title = '影人';
				}
			},
			back(){
				this.$router.go(-1)
			},
			showInfo(actors){  //将对象存入data选项中，通过动态属性传给子组件，并通过ref来调用子组件的方法(?)
				this.actorInfo = actors;
				console.log(this.actorInfo)
				this.$refs.actors.show();
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
	    width:100%;

    	.main-part{
		    display: flex;
    		justify-content: center;

    		.left-box{
    		    flex: 1;
    			margin-left: 0.8rem;
    			h3{
				    font-size: 1rem;
    			}
    			p{
    				font-size: 0.6rem;
    				color: grey;
    			}
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
		    h2{
		    	display:inline-block;
		    	font-size: 0.6rem;
				width: 5rem;
				font-weight: normal;
				flex:1;
		    }
		    ul{
				list-style: none;
				flex:2;
				span,li{
					display: inline;
				}
		    }
		    .info-mid{
		    	padding-bottom: 1rem;
		    	p{
				    font-size: 0.6rem;
					color: grey;
			    }
			    span{
			    	font-size: 0.6rem;  
					display:flex;
					flex: 2;
			    }
			    h3{
			    	display:inline-block;
			    	font-size: 0.6rem;
					width: 5rem;
					font-weight: normal;
					flex:1;
			    }
			    ul{
					list-style: none;
					flex:2;
					span,li{
						display: inline;
					}
			    }
		    }
		}
	
		.works-title{
			color:grey;
		    font-size: 0.6rem;
		    padding: 0.6rem 0.8rem 0;
		}

		.movies-part{
		    padding: 0.6rem 0.8rem;
	        overflow: hidden;
    		overflow-x: auto;
			ul{
		        height: 7.3rem;
    			width: 410px;
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
					        color: grey;
						}
						img{
							width: 3rem;
						    height: 4.6rem;
						}
					}
				}
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

	.fade-enter-active,.fade-leave-active{
		transform:translateY(0);
		transition: all 0.3s;
	}
	.fade-enter,.fade-leave-active{
		transform:translateY(100%)
	}
</style>