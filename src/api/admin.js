import { userTableData, roleTableData } from '@/mock/admin'
import { baseUrl } from '@/config/env'
import { DIC } from '@/const/dic'
import service from '@/util/fetch'
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
  return service({
    url: '/rolo/lists',
    method: 'get'
  })
}
export function getoptionsLists() { //获取默认模块
  return service({
    url: '/options/optionsLists',
    method: 'get'
  })
}
export function getstaffList() { //获取用户默认模块
  return service({
    url: '/staff/staffList',
    method: 'get'
  })
}

export function gettransferdataList() { //获取所有角色
  return service({
    url: '/transferdata/transferdataList',
    method: 'get'
  })
}
