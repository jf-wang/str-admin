//数据字典
import fetch from '@/util/fetch'


export function itemSetLists() { //ItemSet下的列表
  return fetch({
    url: '/ItemSet/lists',
    method: 'get'
  })
}

