import Vue from 'vue';
import axios from 'axios';

export const dataAsync = ({
	commit, 
	state
}, type) => {
	let url = '/api/movie';
	if(typeof(type)=='object'){
		url += `/${state[type.type].type}?city=${type.city}&count=100`;
		if(state[type.type].datas.length == 0){
			commit('updateLoading', true);
			axios.get(url)
			.then((res)=>{
				console.log(res.data)
				commit('updateDatas',{
					datas: res.data.subjects,
					type:type.type
				});
				Vue.nextTick(()=>{
					commit('updateLoading', false);
				});
			})
			.catch(function (error) {
			    alert("网络失败");
			});
		}
	}else{
		url += `/${state[type].type}?apikey=0b2bdeda43b5688921839c8ecb20399b&count=50`;
		if(state[type].datas.length == 0){
			commit('updateLoading', true);
			axios.get(url).then((res)=>{
				console.log(res.data)
				commit('updateDatas',{
					datas: res.data.subjects,
					type
				});
				Vue.nextTick(()=>{
					commit('updateLoading', false);
				});
			}).catch(function (error) {
			    alert("网络失败");
			});
		}
	}
	
};

export const searchAsync = ({
	commit,
	state
},query) => {
	//每次都检查state.list并清空，解决“加载新数据时，旧数据仍显示在页面等待更新”的BUG
	//console.log(state.list);
	state.list.subjects = [];
	let url = '/api/movie';
	url += `/search?q=${query}&start=0`;
	commit('updateLoading', true);
	axios.get(url).then((res)=>{
		console.log(res.data)
		commit('updateList',{
			list: res.data
		})
		Vue.nextTick(()=>{
			commit('updateLoading', false);
		})
	}).catch(function (error) {
	    alert("网络失败");
	});
}

export const actorAsync = ({
	commit,
	state
},id) => {
	let url = '/api/movie';
	url += `/celebrity/${id}?apikey=0b2bdeda43b5688921839c8ecb20399b`;
	commit('updateLoading', true);
	axios.get(url).then((res)=>{
		commit('updateActor',{
			actors: res.data
		});
		Vue.nextTick(()=>{
			commit('updateLoading', false);
		});
	}).catch(function (error) {
	    alert("网络失败");
	});
};



export const boardAsync = ({
	commit,
	state
},name) => {
	state.boardTitle = '专题';//先初始化
	state.board.datas = [];
	let url = '/api/movie';
	url += `/${name}`;
	commit('updateLoading', true);
	axios.get(url).then((res)=>{
		commit('updateBoard',{
			datas: res.data,
			name:name
		});
		Vue.nextTick(()=>{
			commit('updateLoading', false);
			commit('updateTitle', {name});
		});
	})
	.catch(function (error) {
	    alert("网络失败");
	});
};



export const board2Async = ({
	commit,
	state
},type) => {
	//传进来的type是对应的store数组名，
	//根据这个找到里面的start属性，拼接到url中进行请求，并commit数据
	if(state.boardTitle!='豆瓣 Top250'){
		state.boardTitle = '专题';//先初始化
	}
	state.board.datas = [];
	let url = '/api/movie';
	url += `/top250?start=${state[type].start}&count=50`;
	commit('updateLoading', true);
	axios.get(url).then((res)=>{
		commit('updateBoard2',{
			datas: res.data,
			type
		});
		Vue.nextTick(()=>{
			commit('updateLoading', false);
			if(state.boardTitle == '专题'){
				commit('updateTitle', {name});
			}
		});
	}).catch(function (error) {
	    alert("网络失败");
	});
};




export const detailsAsync = ({
	commit,
	state
}, id) => {
	let url = '/api/movie/subject';
	url += `/${id}?apikey=0b2bdeda43b5688921839c8ecb20399b`;
	commit('updateLoading', true);
	axios.get(url).then((res)=>{
		commit('updateDetails', {
			details: res.data
		})
		Vue.nextTick(()=>{
			commit('updateLoading', false);
		})
	}).catch(function (error) {
	    alert("网络失败");
	});
}