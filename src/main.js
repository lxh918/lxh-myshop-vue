// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';

import store from "@/store/index.js";

Vue.config.productionTip = false;

import "@/assets/common.css";

import axios from "axios";

// 引入elementui
import {MessageBox,Icon,Button,Input} from "element-ui";

Vue.use(Button);
Vue.use(Input);

Vue.prototype.$alert=MessageBox.alert;

Vue.prototype.$http=axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App ,Icon,Input},
  template: '<App/>'
})
