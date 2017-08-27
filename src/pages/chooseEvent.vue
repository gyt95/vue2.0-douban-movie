<template>
	<div class="choose-event-box">
		<div class="choose-header">
			<img src="../assets/登录返回.png" alt="" class="back" @click="back">
			<h3>橙天嘉禾广州影城</h3>
			<img class="image" src="../assets/搜索.png" alt="">
		</div>
		<div class="post-list">
			<ul>
				<li>
					<img src="https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2496088130.jpg" alt="">
				</li>
				<li>
					<img src="https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2494135894.jpg" alt="">
				</li>
				<li>
					<img src="https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2492869476.jpg" alt="">
				</li>
				<li>
					<img src="https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2494948513.jpg" alt="">
				</li>
			</ul>
			<div class="special"></div>
		</div>
		<div class="selected-movie">
			<div class="movie-title">
				<h1>星际特工：千星之城</h1>
			</div>
			<div class="arrow">
				<img src="../assets/向下.png" alt="">
			</div>
		</div>
		<div class="choose-event">
			<div class="choose-date">
				<ul>
					<li class="date-active">08.26周六(今天)</li>
					<li>08.27周日(明天)</li>
					<li>08.28周一(后天)</li>
					<li>08.29周二</li>
					<li>08.30周三</li>
					<li>08.31周四</li>
				</ul>
			</div>
			<div class="event-list">
				<ul>
					<li>
						<router-link :to="{name:'order',params:{id:2}}">
							<h3>17:20</h3>
							<span>原声 </span>
							<span>3D</span>
							<p>137分钟</p>
							<h1>￥49.5</h1>
						</router-link>
					</li>
					<li>
						<router-link :to="{name:'order',params:{id:2}}">
							<h3>17:20</h3>
							<span>原声 </span>
							<span>3D</span>
							<p>137分钟</p>
							<h1>￥49.5</h1>
						</router-link>
					</li>
					<li>
						<router-link :to="{name:'order',params:{id:2}}">
							<h3>17:20</h3>
							<span>原声 </span>
							<span>3D</span>
							<p>137分钟</p>
							<h1>￥49.5</h1>
						</router-link>
					</li>
					<li>
						<router-link :to="{name:'order',params:{id:2}}">
							<h3>17:20</h3>
							<span>原声 </span>
							<span>3D</span>
							<p>137分钟</p>
							<h1>￥49.5</h1>
						</router-link>
					</li>
					<li>
						<router-link :to="{name:'order',params:{id:2}}">
							<h3>17:20</h3>
							<span>原声 </span>
							<span>3D</span>
							<p>137分钟</p>
							<h1>￥49.5</h1>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				
			}
		},
		created(){
			
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.choose-event-box{
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

		.post-list{
			padding-top: 2.3rem;
			background: #333;
		    overflow: hidden;
    		overflow-x: scroll;
		    margin-bottom: 1rem;

			ul{
			    width: 28rem;
		        position: relative;
    			left: 100px;
				li{
					display:inline-block;
				    opacity: 0.5;
				    margin-right:1rem;
					img{
						width:5rem;
						height:7rem;
					}
				}
				li.active{
					opacity:1;
					img{
						width:6rem;
						height:8rem;
					}
				}
			}
			.special{
				z-index:1;
				position:absolute;
				width:6rem;
				height:8.5rem;
				border:2px solid white;
			    top: 27%;
			    left: 50%;
			    transform: translate(-50%,-50%);
			    img{
			    	width:6rem;
					height:8.5rem;
			    }
			}
		}

		.selected-movie{
		    padding: 1.5rem 0.8rem 0.8rem;
		    .movie-title{
		    	display:inline-block;
		    	h1{
		    		font-size: 1rem;
		    	}	
		    }
		    .arrow {
	    		line-height: 1rem;
    			float: right;
		    	img{
		    		transform: rotate(-90deg);
				    width: 1rem;
				    display: inline-block;
				    text-align: right;

				    vertical-align: middle;
			    }
		    }
		    
		}

		.choose-event{
			.choose-date{
				padding-top:0;
			    background: whitesmoke;
			    width: 100%;

			    overflow: hidden;
			    overflow-x: scroll;
			    -webkit-overflow-scrolling: touch;
		        z-index: 2;
			    ul{
			    	padding: 0;
			    	border-bottom: 1px solid lightgrey;
		    	    list-style: none;
		    		line-height: 1.3rem;

			        overflow-x: scroll;
		            white-space: nowrap;//不要写死width，用这个一行显示li即可
		    	    li{
		    	    	display: inline-block;
					    font-size: 0.8rem;
					    padding: 0.2rem 0.5rem;
		    	    }
			    }
			}

			.event-list{
				background: whitesmoke;
	    		padding: 0.5rem;

	    		ul li{
				    border: 1px solid blue;
				    display: inline-block;
				    background: #fff;
				    margin-bottom: 0.5rem;
				    a{
			    	    text-decoration: none;
					    display: block;
					    padding: 0.2rem 0.8rem 0.2rem 0.4rem;
				    }
				    h3{
			    	    color: #000;
				    }
				    span{
			    	    color: blue;
	    				font-size: 0.7rem;
				    }
				    p{
			    	    color: grey;
	    				font-size: 0.6rem;
				    }
				    h1{
			    	    font-size: 1.2rem;
					    color: orange;
					    font-weight: normal;
					    text-indent: -0.2rem;
				    }
	    		}
			}
		}
		.date-active{
			color:blue;
			border-bottom:1.5px solid blue;
		}
	}
	
</style>