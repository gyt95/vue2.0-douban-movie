<template>
	<div>
		<div class="ticket-header">
			<img src="../assets/登录返回.png" alt="" class="back" @click="back">
			<h3>我的电影票</h3>
		</div>
		<div class="ticket-main">
			<div class="tips">
				<p>你还没有购买过电影票</p>
				<span>在线选座，随时购买，无需排队</span>
			</div>
			<div class="back-home">
				<router-link to="/home">查看上映电影</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		methods:{
			back(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.ticket-header{
		display: flex;
		align-items: center;
	    padding: 0.6rem 0;
	    border-bottom: 1px solid #ccc;
	    position: fixed;
    	width: 100%;
	    background: #fff;
    	z-index: 1;
		.back{
			width: 1rem;
		    margin-left: 0.2rem;
		}
		h3{
		    font-size: 0.8rem;
		    font-weight: normal;
		    line-height: 0;
		    margin-left: 1rem;
		}
	}

	.ticket-main{
		position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    width: 100% !important;
	    .tips{
		    p{
		    	font-size: 0.7rem;
		    }
		    span{
		    	font-size: 0.6rem;
			    color: grey;
			    display: inline-block;
			    margin-top: 0.6rem;
			    margin-bottom: 1.5rem;
		    }
	    }
	    .tips,.back-home{
	    	display: flex;
		    justify-content: center;
		    align-items: center;
		    flex-direction: column;
	    }
	    a{
    	    color: #00B51D;
		    text-decoration: none;
		    padding: 0.5rem 1rem;
		    border: 1px solid #00B51D;
		    display: inline-block;
		    font-size: 0.6rem;
		    border-radius: 4px;
	    }
	}
</style>