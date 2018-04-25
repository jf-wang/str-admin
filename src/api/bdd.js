//数据字典
import fetch from '@/util/fetch'


export function itemSetLists() { //ItemSet下的列表
  return fetch({
    url: '/ItemSet/lists',
    method: 'get'
  })
}

export function treeLists() { //树的列表
  return fetch({
    url: '/tree/lists',
    method: 'get'
  })
}
