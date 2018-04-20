import { userTableData, roleTableData } from '@/mock/admin'
import { baseUrl } from '@/config/env'
import { DIC } from '@/const/dic'
import fetch from '@/util/fetch'
export const getUserData = (page) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: userTableData
    });
  })
}

export const getRoleData = (page) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: roleTableData
    });
  })
}

export const getDic = (type) => {
  return new Promise((resolve, reject) => {
    resolve({
      data: DIC[type]
    });
  })
}
export function getrololists() { //获取员工表格数据
  return fetch({
    url: '/rolo/lists',
    method: 'get'
  })
}
export function getoptionsLists() { //获取默认模块
  return fetch({
    url: '/options/optionsLists',
    method: 'get'
  })
}
export function getstaffList() { //获取用户默认模块
  return fetch({
    url: '/staff/staffList',
    method: 'get'
  })
}

export function gettransferdataList() { //获取所有角色
  return fetch({
    url: '/transferdata/transferdataList',
    method: 'get'
  })
}
