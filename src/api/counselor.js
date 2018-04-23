//资源
import fetch from '@/util/fetch'


export function counselorlists() { //获取员工表格数据
  return fetch({
    url: '/counselor/lists',
    method: 'get'
  })
}

