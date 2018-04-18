import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  routerMode
} from '@/config/env';
import store from '@/store'
import {
  getStore,
  getSessionStore,
  vaildUtil
} from '@/util/yun'



import Myiframe from '@/components/iframe/iframe.vue'
import Layout from '@/page/index/'
import errorPage404 from '@/components/errorPage/404.vue';
import errorPage403 from '@/components/errorPage/403.vue';
import errorPage500 from '@/components/errorPage/500.vue';
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
	{path: '/login',name: '登录页',component: _import('login/index')},
	{path: '/lock',name: '锁屏页',component: _import('lock/index')},
	{path: '*',redirect: '/404',hidden: true},
	{path: '/404',component: errorPage404,name: '404'},
  {path: '/403',component: errorPage403,name: '403'},
  {path: '/500',component: errorPage500,name: '500'},
  {path: '/wel/index',name: '主页',redirect: '/wel'},
  {
		path: '/wel/index',
    component: Layout, 
    redirect: '/wel/index',
    children: [{path: 'index',name: '首页',component: _import('wel')}]
  }, {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [{path: 'index',name: '个人信息',component: _import('info/index', 'views')}]
  }, {
    path: '/role',
    component: Layout,
    redirect: '/role/index',
    children: [{path: 'index',name: '权限测试页',component: _import('role', 'views')}]
  }, {
    path: '/exhibition',
    component: Layout,
    redirect: '/exhibition/index',
    children: [{path: 'index',name: '数据展示',component: _import('exhibition/index', 'views')}]
  },{
    path: '/admin',
    component: Layout,
    children: [
			{path: 'user',name: '用户管理',component: _import('admin/user/index', 'views')},
			{path: 'role',name: '员工管理',component: _import('admin/role/index', 'views')},
			{path: 'menu',name: '系统设定',component: _import('admin/menu/index', 'views')}
		]
  },{
    path: '/transactionCenter',
    component: Layout,
    children: [
			{path: 'messageCenter',name: '信息中心',component: _import('transactionCenter/messageCenter', 'views')},
			{path: 'taskCentered',name: '任务中心',component: _import('transactionCenter/taskCentered', 'views')}
		]
  },{
    path: '/counselor',
    component: Layout,
    children: [
			{path: 'index',name: '咨询师',component: _import('counselor/index', 'views')}
		]
  }
]
