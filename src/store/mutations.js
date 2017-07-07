
export const updateDatas = (state,{ type,datas }) => {
	state[type].datas = datas;	
};

export const updateLoading = (state, isLoading) => {
	state.isLoading = isLoading;
};

export const updateSelected = (state, selected) => {
	if(selected=='one'||selected=='two'){
		state.topSelected = selected;
	}else{
		state.homeSelected = selected;
	}
}

export const updateScrollY = (state,{ type,scrollY }) => {
	state[type].scrollY = scrollY;
};

export const updateDetails = (state,{ details }) => { 
	state.details = details;
};

export const updateList = (state,{ list }) => {
	state.list.title = list.title;
	state.list.total = list.total;
	state.list.subjects = list.subjects;
}

export const login = (state) => {
	console.log(state.username,state.password);
};

export const updateActor = (state,{ actors }) => {
	state.actors = actors;
};

export const updateBoard = (state,{ datas,name }) => {
	state.board.datas = datas;
	state.board.name = name;
}

export const updateTitle = (state,{ name })=>{
	if(name == 'us_box'){
		state.boardTitle = '北美票房榜';
	}
	else{
		state.boardTitle = '豆瓣 Top250';
	}
}

export const updateMySelected = (state, selected) => {
	state.mySelected = selected;
}

export const updateBoard2 = (state,{ type,datas }) => {
	state[type].datas = datas;	
};