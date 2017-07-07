<template>
	<div>
	
	</div>
</template>
<script>
	import axios from 'axios'
	export default{
		data(){
			return{
				url:'/api/movie/subject/',
				id:this.$route.params.id,
				reviewsDetail:{}
			}
		},
		created(){
			this.init();
		},
		methods:{
			init(){
				axios.get(this.url+this.id+'/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b').then((res)=>{
					this.reviewsDetail = res.data;
					console.log(this.reviewsDetail)
					// this.showLoading = false;
				})
			}
		}
	}

</script>