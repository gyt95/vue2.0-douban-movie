// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './config/rem';
import store from './store';
import FastClick from 'fastclick';
import VueLazyload from 'vue-lazyload';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueLazyload, {
    error: require('./assets/lazyimg.png'),
    loading: require('./assets/lazyimg.png'),
    attempt: 1
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
