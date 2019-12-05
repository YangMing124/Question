// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App' 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import VueResource from 'vue-resource'
// import axios from 'axios'
// import qs from 'qs'


// axios.defaults.baseURL = 'http://localhost:8080'//后端api地址，例如https://localhost:8443/api

// Vue.config.productionTip = false;
// Vue.prototype.$axios = axios
// Vue.prototype.qs = qs  
// Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
