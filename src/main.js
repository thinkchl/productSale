// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layout from './components/layout'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import $ from 'jquery'
import vueResource from 'vue-resource'
import store from './store'
import './assets/jqueyui/jquery-ui.css'
import './assets/jqueyui/jquery-ui'
import './assets/jqueyui/jquery-ui-datepicker-zh_CN'

Vue.config.productionTip = false
Vue.use(vueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<layout/>',
  components: { layout }
})
