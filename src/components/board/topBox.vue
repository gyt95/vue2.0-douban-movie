<template>
	<div class="board-content">
		<div class="board-loading" v-show="isLoading"></div>
		<ul v-show="!isLoading">
			<li v-for="(item,index) in datas.subjects">
				<router-link :to="{name:'details',params:{id:item.id}}">
					<div class="rank">
						<div class="line"></div>
						<span v-if="datas.start==0">
							<i v-if="index==0" style="color:red">{{index+1}}</i>
							<i v-if="index==1" style="color:coral">{{index+1}}</i>
							<i v-if="index==2" style="color:orange">{{index+1}}</i>
							<i v-if="index>2">{{index+1}}</i>
						</span>
						<span v-else>
							<i>{{datas.count+datas.start+index}}</i>
						</span>
						<div class="line"></div>
					</div>
					<div class="board-movie">
						<div class="movie-pic">
							<img :src="item.images.medium" alt="">
						</div>
						<div class="movie-info">
							<h3>{{item.title}}</h3>
							<p>
								<star :size="24" :score="item.rating.average" style="display: inline;"></star>
								{{item.rating.average}}
							</p>
							<p>导演：{{item.directors[0].name}}</p>
							<span class="casts">演员：
								<span v-for="(cast,index) in item.casts">{{cast.name}}<span v-if="index < item.casts.length-1">/</span></span>
							</span>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import star from '@/components/star/star'
	import { mapState } from 'vuex';
	export default{
		props:{
			type:{
				type:String
			},
		},
		components:{
			star
		},
		computed:{
			...mapState([
				'isLoading',
				'topSelected'
			]),
			datas(){
				return this.$store.state[this.type].datas;
			}
		},
		created(){
			if(this.type=='one'&&this.type==this.topSelected){
				this.$store.dispatch('board2Async',this.type);
			}
		}
	}
</script>