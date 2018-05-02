//数据字典
import service from '@/util/fetch'


export function itemSetLists() { //ItemSet下的列表
  return service({
    url: '/ItemSet/lists',
    method: 'get'
  }) 
}

export function treeLists() { //树的列表
  return service({
    url: '/tree/lists',
    method: 'get'
  })
}
