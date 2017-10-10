<template>
	<div class="my-results">
		<!-- <ul>
			<p v-if="type=='want'" class="record-sum">{{sum_want.length}}部</p>
			<li v-if="sum_want.length>0" v-for="item in want">
				<router-link :to="{name:'details',params:{ id: item.id }}" class="enter">
					<div class="movie-pic">
						<img :src="item.images.small">
					</div>
					<div class="movie-info">
						<h3>{{item.title}}</h3>
						<p v-if="item.rating.average != 0">
							<star :size="24" :score="item.rating.average" style="display: inline;"></star>
							{{item.rating.average}}
						</p>
						<div class="movie-name">
							<p>导演：{{item.directors[0].name}}</p>
							<span class="casts">主演：
								<span v-for="(cast,index) in item.casts">{{cast.name}}<span v-if="index < 2">/</span></span>
							</span>
						</div>
					</div>
				</router-link>
			</li>
			<span v-if="sum_want.length==0">啥也没有</span>
		</ul> -->
		<ul>
			<p v-if="type=='ever'" class="record-sum">{{sum_ever.length}}部</p>
			<p v-if="type=='want'" class="record-sum">{{sum_want.length}}部</p>

			<div class="no-movie" v-if="type=='want'&&sum_want.length==0">
				<img src="../assets/no-movie.png" alt="">
				<span>{{tips}}</span>
			</div>
			<div class="no-movie" v-if="type=='ever'&&sum_ever.length==0">
				<img src="../assets/no-movie.png" alt="">
				<span>{{tips}}</span>
			</div>

			<li v-if="type=='ever'" v-for="item in ever">
				<router-link :to="{name:'details',params:{ id: item.id }}" class="enter">
					<div class="movie-pic">
						<img :src="item.images.small">
					</div>
					<div class="movie-info">
						<h3>{{item.title}}</h3>
						<p v-if="item.rating.average != 0">
							<star :size="24" :score="item.rating.average" style="display: inline;"></star>
							{{item.rating.average}}
						</p>
						<div class="movie-name">
							<p>导演：{{item.directors[0].name}}</p>
							<span class="casts">主演：
								<span v-for="(cast,index) in item.casts">{{cast.name}}<span v-if="index < 2">/</span></span>
							</span>
						</div>
					</div>
				</router-link>
			</li>

			<li v-if="type=='want'&&sum_want!=null" v-for="item in want">
				<router-link :to="{name:'details',params:{ id: item.id }}" class="enter">
					<div class="movie-pic">
						<img :src="item.images.small">
					</div>
					<div class="movie-info">
						<h3>{{item.title}}</h3>
						<p v-if="item.rating.average != 0">
							<star :size="24" :score="item.rating.average" style="display: inline;"></star>
							{{item.rating.average}}
						</p>
						<div class="movie-name">
							<p>导演：{{item.directors[0].name}}</p>
							<span class="casts">主演：
								<span v-for="(cast,index) in item.casts">{{cast.name}}<span v-if="index < 2">/</span></span>
							</span>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import { fetch } from '@/config/utils'
	import { mapState } from 'vuex'
	import star from './star/star';
	export default{
		props:{
			type:{
				type:String
			}
		},
		data(){
			return{
				tips:'你还没有标记相关内容',
				want:[],
				ever:[],
				sum_want:[],
				sum_ever:[]
			}
		},
		computed:{
			...mapState(['mySelected'])
		},
		components:{
			star
		},
		created(){
			if(fetch('wantTo')){
				this.sum_want = JSON.parse(fetch('wantTo'));
			}
			if(fetch('ever')){
				this.sum_ever = JSON.parse(fetch('ever'));
			}
			if(this.type == 'want'){
				//记得要用JSON.parse，否则就是一堆无法显示的JSON格式的数据
				this.want = JSON.parse(fetch('wantTo'))
			}
			if(this.type == 'ever'){
				this.ever = JSON.parse(fetch('ever'))
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.my-results{
		ul{
			background: #F0F1EC;
			.record-sum{
				font-size: 0.6rem;
				padding: 0.6rem;
			}
			.no-movie{
				position: absolute;
			    top: 30%;
			    left: 50%;
			    transform: translate(-50%,-50%);
			    width: 10rem;
			    text-align: center;
		        font-size: 0.8rem;
			    img{
			    	width: 10rem;
			    }
			}

			li{
				background:#fff;
				list-style:none;
			    text-decoration: none;
			    color: #000;
			    //width: 100%;
				padding: 0.5rem;
				border-bottom: 1px solid #f2f2f2;
				.enter{
					color:#000;
					text-decoration:none;
				    display: -webkit-box;
				    display: -ms-flexbox;
				    display: flex;
					.movie-pic{
						img{
							width: 3rem;
						    vertical-align: middle;
						}
				    }

				    .movie-info{
			    	    flex: 2;
						padding: 0 0.6rem;
						.casts{
							display: block;
		    				span{
								display: inline;
		    				}
						}
						h3{
							font-size: 0.8rem;
						}
						p{
						    display: block;
						    padding-top: 0.4rem;
						}
						p,span{
						    font-size: 0.55rem;
						    color: grey;
						}
						.movie-name{
							p{
								padding-top: 0.4rem;
							}
						}
				    }
				}
				    
			}
		}
		
	}

</style>