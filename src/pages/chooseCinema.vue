<template>
	<div class="choose-cinema-box">
		<div class="choose-header">
			<img src="../assets/登录返回.png" alt="" class="back" @click="back">
			<h3>选择影院</h3>
			<img class="image" src="../assets/搜索.png" alt="">
		</div>
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
		<div class="choose-cinema">
			<h3 @click="test()">上映此片的全部影院</h3>
			<ul>
				<li v-for="item in datas.data">
					<router-link :to="{name:'chooseEvent',params:{id:item.cinema_id}}">
						<p>{{item.name}}</p>
						<span>{{item.price}}元起</span>
						<div class="info">
							<span v-if="item.today_remain!=''">今日余{{item.today_remain}}场 近期场次{{item.recent_time}}</span>
							<span v-else></span>
							<span class="range">{{item.distance}}km</span>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
	
</template>
<script>
	export default{
		datas(){
			return{
				// id:''
			}
		},
		created(){
			// console.log("传来电影id："+this.$route.params.id)
			// this.id = this.datas.data.id
			this.init();
		},
		computed:{
			datas(){
				return this.$store.state.mockList;
			}
		},
		methods:{
			back(){
				this.$router.go(-1)
			},
			init(){
				this.$store.dispatch('mockAsync');
			},
			test(){
				console.log(this.$store.state.mockList)
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.choose-cinema-box{
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

		.choose-date{
		    position: fixed;
		    background: lightgrey;
		    width: 100%;
		    padding-top: 2.3rem;

		    overflow: hidden;
		    overflow-x: scroll;
		    -webkit-overflow-scrolling: touch;

		        z-index: 2;
		    ul{
		    	//width: 720px;
	    	    list-style: none;

		        padding: 0 0.5rem;
	    		line-height: 1.3rem;

		        overflow-x: scroll;
	            white-space: nowrap;//不要写死width，用这个一行显示li即可
	    	    li{
	    	    	display: inline-block;
				    font-size: 0.8rem;
				    padding: 0 0.5rem;
	    	    }
		    }
		}
		.wp::-webkit-scrollbar {
		    display: none;
		}
		.choose-cinema{
			position: absolute;
	    	top: 3.6rem;
		    width: 100%;
	    	a{
	    		text-decoration: none;
	    		color: #333;
	    	}
	    	h3{
			    font-size: 0.8rem;
			    font-weight: normal;
			    border-bottom: 1px solid #ccc;
		        padding: 0.5rem 0 0.5rem 0.5rem;
	    	}
	    	ul{
	    		display: flex;
	    		flex-direction: column;
	    		padding-bottom: 30px;
	    		li{
	    			border-bottom: 1px solid #ccc;
	    			//width: 100%;
	    			padding: 0.5rem;
	    			font-size: 0.8rem;
	    			p{
	    				font-size: 0.8rem;
					    font-weight: normal;
					    color: #000;
	    			}
					span{
					    display: block;
					    font-size: 0.6rem;
					    color: grey;
					}
					.info{
						display:flex;
						justify-content:space-between;
						flex-direction:row;
						//padding: 0 0.8rem 0 0;
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