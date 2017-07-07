<template>
	<div class="" v-infinite-scroll="loadMore">
		<div class="search-loading" v-show="isLoading"></div>
		<div class="search-input2">
			<img src="../assets/搜索.png" alt="" @click="search">
			<input type="text" placeholder="搜索电影/电视剧/影人" @keyup.enter="search()" v-model.trim="query">
			<span @click="back">取消</span>
		</div>

		<div v-if="list.subjects.length > 0" class="list-box">
			<p class="keyword">{{ list.title }}</p>
			<ul>
				<li v-for="item in list.subjects" v-if="item.casts.length > 0">
					<router-link :to="{name:'details', params:{id:item.id}}" class="search-info">
						<div class="main">
							<img :src="item.images.small" alt="">
						</div>
						<div class="main">
							<h3>{{item.title}}</h3>
							<p class="score">{{item.rating.average}}</p>
							<p class="people">导演：<span v-for="direct in item.directors">{{direct.name}}</span></p>
							<p class="people">主演：
								<span v-for="(cast,index) in item.casts">{{cast.name}}<span v-if="index < 2">/</span></span>
							</p>
						</div>
					</router-link>
				</li>
			</ul>
			
		</div>
	</div>
	
</template>
<script>
	import { mapState } from 'vuex'
	import InfiniteScroll from 'vue-infinite-scroll'
	export default{
    	directives: {InfiniteScroll},
		data(){
			return{
				query:'',
				list:{
					subjects: []
				}
			}
		},
		computed:{
			...mapState([
				'isLoading'
			])
		},
		mounted(){
			this.query = this.$route.query.query;
		},
		watch:{
			'$route': 'loadAgain'
		},
		methods:{
			loadAgain(){
				this.list.subjects = [];
				this.query = this.$route.query.query;
				this.loadMore();
			},
			loadMore(){
				let start = this.list.subjects.length;
				this.$store.dispatch('searchAsync',this.query).then(()=>{
					this.list = this.$store.state.list;
				});
			},
			search(){
				if(this.query == ''){
					alert('请输入内容啊')
				}else{
					let history = fetch('searchHistory');
					if(history){ //如果记录不为空
						let checkrepeat = false;
						this.searchHistory = JSON.parse(history);
						this.searchHistory.forEach(item=>{
							//后面忘了push到历史记录数组中，导致报错：forEach is not a function
							if(item == this.query){  //如果有重复
								checkrepeat = true;
							}
						})
						if(!checkrepeat) {
							this.searchHistory.unshift(this.query)
							this.$router.push({name: 'searchList',query:{query:this.query}});
						}
					}else{
						this.searchHistory.unshift(this.query)
						this.$router.push({name: 'searchList',query:{query:this.query}});	
					}
					save('searchHistory', this.searchHistory);
				}
				
			},
			back(){
				this.$router.push('/search')
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.search-input2{
	    height: 2rem;
    	background: #42bd56;	
		img{
		    width: 0.8rem;
		    position: absolute;
		    top: 0.5rem;
		    left: 0.8rem;
		}
    	input{
	       display: inline-block;
	       height: 1.3rem;
	       border: 0;
	       width: 12rem;
	       border-radius: 4px;
	       margin: 0.3rem 11px;
	       text-indent: 1.6rem;
	       outline: none;
	       font-size: 0.6rem;
	       text-indent: 1.5rem;
    	}
    	span{
		    color: #fff;
		    text-decoration: none;
		    font-size: 0.7rem;
    	}
	}

	.hot-search{
	    color: grey;
    	font-size: 0.7rem;
	}

	.keyword{
		font-size: 0.8rem;
	    padding: 0.3rem;
	}
	.list-box{
		ul li{
		    display: inline;

		    .search-info{
			    display: flex;
			    text-decoration: none;
			    color: #000;
			    .main{
			    	padding: 0.3rem;
			    	h3,p{
			    		font-size: 0.6rem;
			    	}
			    }
			}
		}

	}
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
</style>