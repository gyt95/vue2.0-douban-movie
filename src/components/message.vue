<template>
	<div v-show="isShow" class="message">
		{{ msg }}
	</div>
</template>
<script>
	export default{
		data(){
			return {
				isShow: true
			}
		},
		mounted(){
			//监听data选项,2s隐藏并销毁组件，同时触发生命周期相关钩子
			setTimeout(()=>{
				this.isShow = false;
				this.$nextTick(()=>{
					this.$destroy();
				})
			},2000)
			
		},
		destroyed(){  //在组件销毁之后把插入的对应dom移除
			this.$el.remove();
		}
	}
</script>
<style scoped>
	.message {
        position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    text-align: center;
	    color: #fff;
	    z-index: 888;
	    font-size: 16px;
	    padding: 0.3rem;
	    background: #000;
	    width: 6rem;
	}
</style>