<template>
	<div>
		<div class="choose-header">
			<img src="../assets/登录返回.png" alt="" class="back" @click="back">
			<h3>选择影院</h3>
			<img class="image" src="../assets/搜索.png" alt="">
		</div>
		<div class="choose-date">
			<ul>
				<!-- <li>07.03周一(今天)</li>
				<li>07.04周二(明天)</li> -->
				<li class="date-active">07.23周日(今天)</li>
				<li>07.24周一(明天)</li>
				<li>07.25周二(后天)</li>
				<li>07.26周三</li>
				<li>07.27周四</li>
				<li>07.28周五</li>
			</ul>
		</div>
		<div class="choose-cinema">
			<h3>上映此片的全部影院</h3>
			<ul>
				<li>
					<router-link to="/home">
						<p>橙天嘉禾广州影城</p>
						<span>44.5元起</span>
						<div class="info">
							<span>今日余22场 近期场次11:30</span>
							<span class="range">1.9km</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/home">
						<p>广州五月花电影城</p>
						<span>38元起</span>
						<div class="info">
							<span>今日余11场 近期场次11:40</span>
							<span class="range">7.8km</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/home">
						<p>广州华影青宫电影城</p>
						<span>34元起</span>
						<div class="info">
							<span>今日余14场 近期场次11:20</span>
							<span class="range">8km</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/home">
						<p>广州市一宫电影城</p>
						<span>33元起</span>
						<div class="info">
							<span>今日余14场 近期场次11:00</span>
							<span class="range">8.3km</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/home">
						<p>广州飞扬影城天河城店</p>
						<span>42元起</span>
						<div class="info">
							<span>今日余12场 近期场次11:10</span>
							<span class="range">9.9km</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/home">
						<p>广州UME国际电影城</p>
						<span>39.5元起</span>
						<div class="info">
							<span>今日余21场 近期场次10:05</span>
							<span class="range">11.3km</span>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/home">
						<p>广州中华广场电影城</p>
						<span>39元起</span>
						<div class="info">
							<span>今日余13场 近期场次10:20</span>
							<span class="range">7.9km</span>
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
				
			}
		},
		created(){
			console.log("传来电影id："+this.$route.params.id)
			this.id = this.$route.params.id
		},
		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
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
</style>