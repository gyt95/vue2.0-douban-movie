import Vue from 'Vue';
const Message = Vue.extend(require('../components/message.vue'));

const showMessage = (msg) =>{
	const instance = new Message({ //new一个Message实例对象
		data: {msg}
	})
	const $vm = instance.$mount(); //手动挂载组件实例
	document.querySelector('body').appendChild($vm.$el); //将组件的DOM插到指定位置
}

export default showMessage;