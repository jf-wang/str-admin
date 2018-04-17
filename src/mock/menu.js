import {
  baseUrl
} from '@/config/env'
const first = [
  {
    id: 13,
    label: "权限测试页",
    href: '/role/index',
    icon: 'icon-quanxian',
    meta: {
      roles: ['admin'],
    },
    children: [],
  }, {
    id: 14,
    label: "数据展示",
    href: '/exhibition/index',
    icon: 'icon-shujuzhanshi2',
    children: [],
  }
  
]
const second = [
  {
    id: 9,
    label: "系统管理",
    icon: 'icon-liuliangyunpingtaitubiao08',
    meta: {

    },
    children: [
      {
        id: 10,
        label: "用户管理",
        href: '/admin/user',
        icon: 'icon-yonghuguanli',
        children: []
      }, {
        id: 11,
        label: "角色管理",
        href: '/admin/role',
        icon: 'icon-jiaoseguanli',
        children: []
      },
      {
        id: 12,
        label: "菜单管理",
        href: '/admin/menu',
        icon: 'icon-caidanguanli',
        children: []
      }
    ]
  }
]
export const menu = [first, second];

