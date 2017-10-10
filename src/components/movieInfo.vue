<template>
	<transition name="fade" mode="out-in">
		<div class="movieInfo-part" v-show="infoShow">
			<img src="../assets/关闭(黑).png" alt="" @click="hide">
			<div class="info-top">
				<p>影片信息</p>
			</div>
			<div class="info-mid">
				<p>
					<span>片名：</span>
					<span>{{ movieInfo.title }}</span>
				</p>
				<p>
					<span>原名：</span>
					<span>{{ movieInfo.original_title }}</span>
				</p>
				<p>
					<span>又名：</span>
					<span v-for="(item,index) in movieInfo.aka">
						{{ item }}
						<span v-if="index < movieInfo.aka.length-1" style="color:#000;"> / </span>
					</span>
				</p>
				<p>
					<span>导演：</span>
					<!-- <span>{{ movieInfo.directors[0].name }}</span> -->
					<span v-for="(item,index) in movieInfo.directors">
						{{ item.name }}
					</span>
				</p>
				<p>
					<span>编剧：</span>
					<span v-for="(item,index) in movieInfo.writers">
						{{ item.name }}
						<span v-if="index < movieInfo.writers.length-1" style="color:#000;"> / </span>
					</span>
				</p>
				<p>
					<span>主演：</span>
					<span v-for="(item,index) in movieInfo.casts">
						{{ item.name }}
						<span v-if="index < movieInfo.casts.length-1" style="color:#000;"> / </span>
					</span>
				</p>
				<p>
					<span>上映：</span>
					<span v-for="(item,index) in movieInfo.pubdates">
						{{ item }}
						<span v-if="index < movieInfo.pubdates.length-1" style="color:#000;"> / </span>
					</span>
				</p>
				<p>
					<span>类型：</span>
					<span v-for="(item,index) in movieInfo.genres">
						{{ item }}
						<span v-if="index < movieInfo.genres.length-1" style="color:#000;"> / </span>
					</span>
				</p>
				<p>
					<span>片长：</span>
					<!-- <span>{{ movieInfo.durations[0] }}</span> -->
					<span v-for="(item,index) in movieInfo.durations">
						{{ item }}
					</span>
				</p>
				<p>
					<span>地区：</span>
					<!-- <span>{{ movieInfo.countries[0] }}</span> -->
					<span v-for="(item,index) in movieInfo.countries">
						{{ item }}
					</span>
				</p>
				<p>
					<span>语言：</span>
					<!-- <span>{{ movieInfo.languages[0] }}</span> -->
					<span v-for="(item,index) in movieInfo.languages">
						{{ item }}
					</span>
				</p>
			</div>
		</div>
	</transition>
</template>
<script>
	import BScroll from 'better-scroll'
	export default{
		data(){
			return{
				infoShow: false
			}
		},
		props:{
			movieInfo:{
				type: Object //通过动态属性把对象传给子组件，可立即使用
			}
		},
		methods:{
			show(){
				this.infoShow = true;
				this.$nextTick(()=>{
					this.infoShow = true;
					if(!this.scroll){
						this.scroll = new BScroll(this.$el, {
							click: true
						})
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide(){
				this.infoShow = false;
				this.$emit('change',false);
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.movieInfo-part{
		position:fixed;
		background:#fff;
		top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 3;
	    height: 100vh;
	    overflow: auto; 
	    padding: 0.6rem 0.8rem;
		img{
	    	width:1rem;
	    }
	    .info-top{
	    	margin: 0.6rem 0;
	    	p{
    		    font-size: 0.7rem;
    			color: grey;
	    	}
	    }
	    .info-mid{
	    	p{
    		    font-size: 0.8rem;
	    		span:nth-of-type(1){
					color: grey;
	    		}
	    	}

	    }
	}
</style>