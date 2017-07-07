<template>
	<transition name="fade" mode="out-in">
		<div class="actorsInfo-part" v-show="infoShow">
			<img src="../assets/关闭(黑).png" alt="" @click="hide">
			<div class="info-top">
				<h3 ref="movieName">{{actorInfo.name}}</h3>
				<p ref="movieName">{{actorInfo.name_en}}</p>
			</div>
			<div class="info-mid">
				<span>
					<h3>性别：</h3>
					<span>{{actorInfo.gender}}</span>
				</span>
				<span>
					<h3>星座：</h3>
					<span>{{actorInfo.constellation}}</span>
				</span>
				<span>
					<h3>出生日期：</h3>
					<span>{{actorInfo.birthday}}</span>
				</span>
				<span>
					<h3>出生地：</h3>
					<span>{{actorInfo.born_place}}</span>
				</span>
				<span v-if="actorInfo.aka.length!=0">
					<h3>更多中文名：</h3>
					<ul>
						<li v-for="(items,index) in actorInfo.aka">
							<span>{{items}}</span>
							<span v-if="index<actorInfo.aka.length-1">/</span>
						</li>
					</ul>
				</span>
			</div>
			<span class="summary">
				{{actorInfo.summary}}
			</span>
		</div>
	</transition>
</template>
<script>
	import BScroll from 'better-scroll'
	export default{
		data(){
			return{
				infoShow:false
			}
		},
		props:{
			actorInfo:{
				type:Object
			}
		},
		methods:{
			show(){
				this.infoShow = true;
				this.$nextTick(()=>{
					this.infoShow = true;
					if(!this.scroll){
						this.scroll = new BScroll(this.$el,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}

				})
			},
			hide(){
				this.infoShow = false;
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.actorsInfo-part{
		position: fixed;
	    background: #fff;
	    top: 0;
	    z-index: 3;
	    padding: 0.6rem 0.8rem;
        height: 96vh;
    	overflow: auto;
	    img{
	    	width:1rem;
	    }
	    .info-top{
    	    padding: 1rem 0;
	    	h3{
			    font-size: 1rem;
			}
			p{
				font-size: 0.6rem;
				color: grey;
			}
	    } 
	    .info-mid{
	    	padding-bottom: 1rem;
	    	p{
			    font-size: 0.6rem;
				color: grey;
		    }
		    span{
		    	font-size: 0.6rem;  
				display:flex;
				flex: 2;
		    }
		    h3{
		    	display:inline-block;
		    	font-size: 0.6rem;
				width: 5rem;
				font-weight: normal;
				flex:1;
		    }
		    ul{
				list-style: none;
				flex:2;
				span,li{
					display: inline;
				}
		    }
	    }
	    .summary{
		    font-size: 0.6rem;
		    display: inline-block;
		    line-height: 1rem;
	    }
	    
	}
</style>