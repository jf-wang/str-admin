import { userTableData, roleTableData } from '@/mock/admin'
import { baseUrl } from '@/config/env'
import { DIC } from '@/const/dic'
import fetch from '@/util/fetch'
export const getUserData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: userTableData });
    })
}

export const getRoleData = (page) => {
    return new Promise((resolve, reject) => {
        resolve({ data: roleTableData });
    })
}

export const getDic = (type) => {
    return new Promise((resolve, reject) => {
        resolve({ data: DIC[type] });
    })
}
export function getrololists() {
  return fetch({
    url: '/rolo/lists',
    method: 'get'
  })
}