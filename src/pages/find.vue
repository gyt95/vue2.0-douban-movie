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
	
</style>