<template>
	<div class="board-content">
		<div class="board-loading" v-show="isLoading"></div>
		<ul v-show="!isLoading">
			<li v-for="item in board.datas.subjects">
				<router-link :to="{name:'details',params:{id:item.subject.id}}">
					<div class="rank">
						<div class="line"></div>
						<i v-if="item.rank==1" style="color:red">{{item.rank}}</i>
						<i v-if="item.rank==2" style="color:coral">{{item.rank}}</i>
						<i v-if="item.rank==3" style="color:orange">{{item.rank}}</i>
						<i v-if="item.rank>3">{{item.rank}}</i>
						<div class="line"></div>
					</div>
					<div class="board-movie">
						<div class="movie-pic">
							<img :src="item.subject.images.medium" alt="">
						</div>
						<div class="movie-info">
							<h3>{{item.subject.title}}</h3>
							<p>
								<star :size="24" :score="item.subject.rating.average" style="display: inline;"></star>
								{{item.subject.rating.average}}
							</p>
							<p>导演：{{item.subject.directors[0].name}}</p>
							<span class="casts">演员：
								<span v-for="(cast,index) in item.subject.casts">{{cast.name}}<span v-if="index < item.subject.casts.length-1">/</span></span>
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
			board:{
				type:Object
			}
		},
		components:{
			star
		},
		computed:{
			...mapState([
				'isLoading'
			])
		}
	}
</script>