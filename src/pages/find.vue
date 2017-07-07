<template>
	<div>
		<router-link to="/search" class="search-input3">
			<img src="../assets/搜索.png" alt="">
			<span>电影 / 电视剧 / 影人</span>
		</router-link>

		<div class="billboard-box">
			<p>精选榜单</p>
			<router-link :to="{name:'billboard',params:{name:'top250'}}">
				<img src="../assets/board1.jpg" alt="">
			</router-link>
			<router-link :to="{name:'billboard',params:{name:'us_box'}}">
				<img src="../assets/board2.jpg" alt="">
			</router-link>
		</div>
		
		<div class="recommend-box">
			<div class="hot-recommend">
				<a href="https://erebor.douban.com/redirect/?ad=186614&uid=&bid=y_-ELINqZ-s&unit=movie_home_left_bottom&crtr=3%3A%2F&mark=&hn=daisy9c&sig=6e67390d4698c17d087994f72fc4d915d65554c8805dc937c187ecfdf02b14f607ab6202b8104b9ed45b714390a21aa4dc84ec91c17b73e3c12ebcff023de091&pid=debug_fbbb9a6c7aa7f2cdd66900bdee9ecb92ac690ae5&target=https%3A%2F%2Fwww.douban.com%2Fbiz%2Fsony" target="_blank">
					<img src="../assets/4740d58e67bfefd.jpg" alt="" width="100%">
				</a>
			</div>
		</div>
		<div class="interested-box">
			
		</div>
		<div class="choose-box">
			<p>选电影</p>
			<div class="type">
				<ul>
					<li><router-link to="/home">经典</router-link></li>
					<li><router-link to="/home">豆瓣高分</router-link></li>
					<li><router-link to="/home">冷门佳片</router-link></li>
				</ul>
			</div>
			<div class="type">
				<ul>
					<li><router-link to="/home">剧情</router-link></li>
					<li><router-link to="/home">爱情</router-link></li>
					<li><router-link to="/home">喜剧</router-link></li>
					<li><router-link to="/home">科幻</router-link></li>
					<li><router-link to="/home">动作</router-link></li>
					<li><router-link to="/home">悬疑</router-link></li>
					<li><router-link to="/home">治愈</router-link></li>
				</ul>
			</div>
			<div class="type">
				<ul style="border:0">
					<li><router-link to="/home">日本</router-link></li>
					<li><router-link to="/home">韩国</router-link></li>
				</ul>
			</div>
		</div>
		<!-- footer -->
		<v-footer></v-footer>
	</div>
</template>
<script>
	import vFooter from '../components/footer/footer'
	export default{
		data(){
			return{
				
			}
		},
		components:{
			vFooter
		},
		methods:{
			
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.search-input3{
		display: inline-block;
	    text-decoration: none;
	    color: #f2f2f2;
	    background: whitesmoke;
	    border-radius: 5px;
	    text-align: center;
	    line-height: 1.23rem;
        width: 15rem;
    	margin: 0.5rem;
	    span{
    	    color: #333;
			font-size: 0.65rem;
		    margin-left: 1.7rem;
	    }
	    img{
		    width: 0.6rem;
		    position: absolute;
		    top: 0.92rem;
		    left: 4.8rem;
		}
	}
	.billboard-box{
		p{
		    padding: 0 0.5rem;
   			font-size: 0.8rem;
		}
		img{
			width: 45%;
		    display: inline-block;
		    float: left;
		    margin: 0.35rem;
		}
	}
	.choose-box{
		    margin-bottom: 2rem;
		p{
		    padding: 0 0.5rem;
   			font-size: 0.8rem;
		}
		.type{
			ul{
			    border-bottom: 1px solid #f2f2f2;
    			padding: 0.5rem 0.5rem 0;
				li{
					display:inline-block;
				    margin-bottom: 0.5rem;
					a{
					    color: limegreen;
					    font-size: 0.6rem;
					    text-decoration: none;
					    padding: 0.2rem 0.6rem;
					    border-radius: 15px;
					    border: 1px solid limegreen;
					    display: inline-block;
					}
				}
			}
		}
	}
</style>