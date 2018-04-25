import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/page/index/'
import BaseRouter from './_router'
const _import = require('./_import');
Vue.use(VueRouter);
export default new VueRouter({
	// mode: 'history',
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
			return {
				x: 0,
				y: to.meta.savedPosition || 0
			}
		}
	},
});
export const asyncRouterMap = [
	{
		path: '/wel',
		component: Layout,
		redirect: '/wel/index',
		children: [
			{
				path: 'index',
				name: '首页',
				component: _import('wel')
			}
		]
	}, {
		path: '/admin',
		component: Layout,
		children: [
			{ path: 'user', name: '用户管理', component: _import('admin/user/index', 'views') },
			{ path: 'role', name: '员工管理', component: _import('admin/role/index', 'views') },
			{ path: 'menu', name: '系统设定', component: _import('admin/menu/index', 'views') },
			{ path: 'bdd', name: '数据字典管理', component: _import('admin/menu/bdd', 'views') },
			{ path: 'userRole', name: '角色配置', component: _import('admin/menu/userRole', 'views') },
			{ path: 'serviceOption', name: '业务选项配置', component: _import('admin/menu/serviceOption', 'views') },
			{ path: 'demo', name: '测试页', component: _import('admin/demo', 'views') }
		]
	}, {
		path: '/transactionCenter',
		component: Layout,
		children: [
			{ path: 'messageCenter', name: '信息中心', component: _import('transactionCenter/messageCenter', 'views') },
			{ path: 'taskCentered', name: '任务中心', component: _import('transactionCenter/taskCentered', 'views') }
		]
	}, {
		path: '/counselor',
		component: Layout,
		children: [
			{ path: 'index', name: '咨询师', component: _import('counselor/index', 'views') }
		]
	}
].concat(BaseRouter)
