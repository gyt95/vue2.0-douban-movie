import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const state = {
	isLoading: false,
	homeSelected: 'ingMovie',  //首页的2个tab
	ingMovie:{  //正在热映
		datas:[],
		scrollY: 0,
		type: 'in_theaters'
	},
	willMovie:{  //即将上映
		datas:[],
		scrollY: 0,
		type: 'coming_soon'
	},
	board:{  //票房榜
		datas:[],
		name: ''
	},
	details:{}, //指定电影数据
	list:{
		title: '',
		total: 0,
		subjects: []
	},
	username:'', 
	password:'',
	actors:{},  //指定影人数据
	boardTitle:'专题', //榜单原标题
	mySelected: 'want',  //个人中心的2个tab
	want:{   //“想看”
		type: 'want'
	},
	ever:{  //“看过”
		type: 'ever'
	},
	topSelected:'one',  //top250的5个tab
	one:{datas:[],start:0,scrollY:0},
	two:{datas:[],start:50,scrollY:0},
	three:{datas:[],start:100,scrollY:0},
	four:{datas:[],start:150,scrollY:0},
	five:{datas:[],start:200,scrollY:0},
	mockList:[],
	eventList:[]
};



export default new Vuex.Store({
	state,
	actions,
	mutations
});