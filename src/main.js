import './common/css/index.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
// import '../common/css/index.css'
// import './assets/css/iconfont.css'
import qlik from 'components/treeList/qlik';
import tableau from 'components/treeList/tableau';
import custom from 'components/treeList/custom';

import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
	// linkActiveClass: 'active'
});
// 配置路由 用router-view去显示模块儿

router.map({
	'/qlik': {
		component: qlik
	},
	'/tableau': {
		component: tableau
	},
	'/custom': {
		component: custom
	}
});

router.start(app, '#app');
// router.go('/goods');
