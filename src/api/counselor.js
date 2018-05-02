//资源
import service from '@/util/fetch'


export function counselorlists() { //获取员工表格数据
  return service({
    url: '/counselor/lists',
    method: 'get'
  })
}

