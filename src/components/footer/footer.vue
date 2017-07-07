<template>
	<div class="footer">
		<router-link to="/home">
			<i class="iconfont icon-kandianying"></i>
			<span>热映</span>
		</router-link>
		<router-link to="/find">
			<i class="iconfont icon-yanjing"></i>
			<span>找片</span>
		</router-link>
		<router-link to="/my">
			<i class="iconfont icon-yonghu"></i>
			<span>我的</span>
		</router-link>
	</div>
</template>
<script>
	
</script>
<style lang="scss">
	.footer{
	    position: fixed;
	    bottom: 0;
	    width: 100%;
	    display: flex;
	    border-top: 1px solid #ccc;
        background: #fff;
    	z-index: 2;

		a{
			text-decoration: none;
			color: #ccc;
		    flex: 1;
	        text-align: center;
    		padding: 0 0 5px;

	        span{
        	    font-size: 0.5rem;
    			display: block;
	        }
		}
		.router-link-active {
			color:#333
		}
	}
</style>