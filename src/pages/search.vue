<template>
	<div>
		<div class="search-input2">
			<img src="../assets/搜索.png" alt="" @click="search">
			<input type="text" placeholder="搜索电影/电视剧/影人" @keyup.enter="search()" v-model.trim="query">
			<router-link to="/home"><span>取消</span></router-link>
		</div>

		<div class="search-history" v-if="searchHistory.length&&showHistory">
			<div class="history-title">
				<p>搜索历史</p>
				<p @click="clearAll">清除</p>
			</div>
			<ul>
			<!-- 注意，vue2.0语法规定index放在items后面，放在前面{{items}}结果就是索引值了，因为它默认第一个参数 -->
				<li v-for="(items,index) in searchHistory">
					<span @click="hotSearch(items)">{{items}}</span>
					<img src="../assets/关闭(黑).png" alt="" @click="remove(index)">
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import { fetch,save,remove } from '@/config/utils';
	export default{
		data(){
			return{
				query:'',
				searchHistory: [],  //搜索历史记录数组
				showHistory: true, //默认显示搜索历史记录
			}
		},
		mounted(){
			if(fetch('searchHistory')) {
				this.searchHistory = JSON.parse(fetch('searchHistory'));
			}
		},
		methods:{
			search(){
				if(this.query == ''){
					alert('请输入内容啊')
				}else{
					let history = fetch('searchHistory');
					if(history){ //如果记录不为空
						let checkrepeat = false;
						this.searchHistory = JSON.parse(history);
						this.searchHistory.forEach(item=>{
							//后面忘了push到历史记录数组中，导致报错：forEach is not a function
							if(item == this.query){  //如果有重复
								checkrepeat = true;
								this.$router.push({name: 'searchList',query:{query:this.query}});
							}
						})
						if(!checkrepeat) {
							this.searchHistory.unshift(this.query)
							this.$router.push({name: 'searchList',query:{query:this.query}});
						}
					}else{
						this.searchHistory.unshift(this.query)
						this.$router.push({name: 'searchList',query:{query:this.query}});	
					}
					save('searchHistory', this.searchHistory);
				}
				
			},
			remove(index){
				//删除从该索引开始的1个元素，返回删除后的这个数组
				this.searchHistory.splice(index,1);
				save('searchHistory', this.searchHistory)
			},
			clearAll(){
				this.searchHistory = []
				save('searchHistory', this.searchHistory)
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.search-input2{
	    height: 2rem;
    	background: #42bd56;	
		img{
		    width: 0.8rem;
		    position: absolute;
		    top: 0.5rem;
		    left: 0.8rem;
		}
    	input{
	       display: inline-block;
	       height: 1.3rem;
	       border: 0;
	       width: 12rem;
	       border-radius: 4px;
	       margin: 0.3rem 11px;
	       text-indent: 1.6rem;
	       outline: none;
	       font-size: 0.6rem;
	       text-indent: 1.5rem;
    	}
    	a{
		    color: #fff;
		    text-decoration: none;
		    font-size: 0.7rem;
    	}
	}

	.search-history{
		.history-title{
		    display: flex;
		    justify-content: space-between;
		    padding: 0.6rem;
		    background: #F0F1EC;
		    p{
		    	color: grey;
		    	font-size: 0.7rem;
		    }
		}

		ul{
	    	list-style: none;
			li{ 
			    display: flex;
			    justify-content: space-between;
			    align-items: center;
				padding: 0.6rem;
				border-bottom: 1px solid #f2f2f2;
				img{
					width: 0.6rem;
				}
				span{
					font-size: 0.7rem;
					width: 95%;
				}
			}
	    }
	}
</style>