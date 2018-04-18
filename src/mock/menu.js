import {
  baseUrl
} from '@/config/env'
const first = [
  {
    id: 1,
    label: "事务中心",
    href: '/transactionCenter/messageCenter',
    icon: 'icon-quanxian',
    meta: {
      roles: ['admin'],
    },
    children: [ {
        id: 11,
        label: "消息中心",
        href: '/transactionCenter/messageCenter',
        icon: 'icon-yonghuguanli',
        children: []
      }, {
        id: 12,
        label: "任务中心",
        href: '/transactionCenter/taskCentered',
        icon: 'icon-jiaoseguanli',
        children: []
      }],
  },
  {
    id: 2,
    label: "资源",
    href: '/counselor/index',
    icon: 'icon-quanxian',
    meta: {
      roles: ['admin'],
    },
    children: [ {
        id: 21,
        label: "咨询师",
        href: '/counselor/index',
        icon: 'icon-jiaoseguanli',
        children: []
      }],
  }, {
    id: 3,
    label: "系统管理",
    href: '/exhibition/index',
    icon: 'icon-shujuzhanshi2',
    children: [ {
        id: 33,
        label: "系统设定",
        href: '/admin/menu',
        icon: 'icon-caidanguanli',
        children: []
        // children: [  {
        //       id: 231,
        //       label: "用户管理",
        //       href: '/admin/user',
        //       icon: 'icon-yonghuguanli',
        //       children: []
        //     }, {
        //       id: 232,
        //       label: "员工管理",
        //       href: '/admin/role',
        //       icon: 'icon-jiaoseguanli',
        //       children: []
        //     },
        //     {
        //       id: 233,
        //       label: "菜单管理",
        //       href: '/admin/menu',
        //       icon: 'icon-caidanguanli',
        //       children: []
        //     }]
      }, {
        id: 31,
        label: "用户管理",
        href: '/admin/user',
        icon: 'icon-yonghuguanli',
        children: []
      }, {
        id: 32,
        label: "员工管理",
        href: '/admin/role',
        icon: 'icon-jiaoseguanli',
        children: []
      }],
  }
  
]
const second = [
 
]
export const menu = [first, second];

