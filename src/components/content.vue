<template>
	<div class="results" :class="test">
		<div class="loading" v-show="isLoading"></div>
		<ul>
			<li class="movie-wrapper" v-for="(item,index) in datas">
				<div class="movie-date" v-if="type=='willMovie'">
					<span v-if="index==0" class="top-fixed">{{item.mainland_pubdate}}</span>
					<span v-if="index>0&&datas[index].mainland_pubdate!=datas[index-1].mainland_pubdate">{{item.mainland_pubdate}}</span>
				</div>
				
				<div class="movie-card">
					<router-link class="movie-route" :to="{name:'details',params:{ id: item.id }}">
						<div class="movie-pic">
							<img :src="item.images.medium">
						</div>
						<div class="movie-info">
							<h2>{{item.title}}</h2>
							<p>
								<star :size="24" :score="item.rating.average" style="display: inline;"></star>
								{{item.rating.average}}
							</p>
							<!-- 如果要获取单个数组元素，要进行判断，否则报错Cannot read property 'name' of undefined -->
							<p v-if="item.directors.length > 0">导演：{{item.directors[0].name}}</p>
							<span class="casts">主演：
								<span v-for="(cast,index) in item.casts">{{cast.name}}<span v-if="index < 2">/</span></span>
							</span>
							<h3>{{item.collect_count}}人看过</h3>
						</div>
					</router-link>
				

					<div class="ticketBuy">
						<div v-if="type == 'ingMovie'">
							<!-- <router-link to="/home"> -->
								<button data-touch="true" @click="jump(item.id)">购票</button>
							<!-- </router-link> -->
						</div>
						<div v-if="type == 'willMovie'">
							<!-- <router-link to="/home"> -->
								<button class="wantTo" data-touch="true" @click="jump(item.id)">预售</button>
							<!-- </router-link> -->
						</div>
					</div>
				</div>	
			</li>
		</ul>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	import star from './star/star';
	import { fetch,save,test } from '@/config/utils'
	export default{
		props:{ //父级传递数据，那边:type="slide"，这边用props来接收
			type:{
				type: String
			},
			city:{
				type: String
			}
		},
		data(){
			return{
				selectedMovie:{},
				test:'',
				new:[],//新数组
			}
		},
		components:{
			star
		},
		computed:{
			...mapState([
				'isLoading',
				'homeSelected'
			]),
			datas() { //1.相当于datas:function()  2.不需要再在data()中定义数组存放数据
		    	return this.$store.state[this.type].datas;
		    },
		    // allDates(){  //用于过滤掉重复的api数据，不过暂时无用
		    // 	var dateList = this.$store.state[this.type].datas.map(m => m.mainland_pubdate);
		    // 	console.log([...new Set(dateList)])
		    // 	return [...new Set(dateList)];
		    // }
		},
		created(){
			//异步请求数据后，通过计算属性设置datas()，使template中可以使用v-for="item in datas"
			if(this.type == 'ingMovie'){ 
				let type = {}
				type.type = this.type;
				type.city = this.city;
				this.$store.dispatch('dataAsync',type);
			}
			
		},
		mounted(){
			this.initData();
			window.addEventListener('scroll',this.initScroll);
		},
		methods:{
			initData(){
				test();
			},
			initScroll(){
				this.scroll = document.body.scrollTop;
				if(this.scroll > 170){
					this.test = 'test'
				}else{
					this.test = 'results';
				}
			},
			jump(id){
				if(!fetch('userInfo')){
					this.$router.push('/login');
				}else{
					this.$router.push('/chooseCinema/'+id);
				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.results{
		.loading{
			background:url(../assets/loading_green.gif) no-repeat;
			background-size: 100% 100%;
		    width: 2rem;
		    height: 2rem;
	        margin: 0 auto;
	        margin-top: 0.5rem;
		}
		.ticketBuy{
			a{
				text-decoration: none;
			}
			.router-link-active{
				background: red;
			}
		}
	}
	.test{
		//padding-top: 1rem;
	  	height: 100vh;
	  	overflow: auto;
	  	-webkit-overflow-scrolling: touch;
	}

	.active-will{
		background:yellow;
	}
	.active-ing{
		background:red;
	}
</style>