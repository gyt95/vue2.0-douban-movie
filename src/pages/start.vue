<template>
	<div>
		<div class="start-post" v-show="startFlag">
			<img src="../assets/start.jpg" alt="">
			<div class="start-text">
				<div class="start-img">
					<img src="../assets/start2.jpg" alt="">					
				</div>
				<span class="start-btn" @click="jump">跳过 {{ this.num }}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				startFlag:false,
				num:3
			}
		},
		created(){
			this.startFlag=true;
			setTimeout(()=>{
				this.$router.push('/home')
			}, 4000);
			let timer = setInterval(()=>{
				this.num--;
				if(this.num < 0){
					clearInterval(timer)
				}
			}, 1000);
		},
		methods:{
			jump(){
				this.$router.push('/home');
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.start-post{
		img{
			width: 100%;
			display:block;
		}
		.start-text{
			position:relative;
			.start-img{
		        position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,50%);
			}
			.start-btn{
		        border-radius: 1rem;
				border: 1px solid #ccc;
				color: grey;
				padding: 0.2rem 0.8rem;
				position: absolute;
				left: 78%;
				font-size: 12px;
				top: 3rem;
			}
		}
	}
</style>