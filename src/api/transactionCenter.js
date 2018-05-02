//消息中心、
import service from '@/util/fetch'


export function categorylists() { //消息中心类别
  return service({
    url: '/category/categorylists',
    method: 'get'
  })
}

export function messageList() { //获取员工表格数据
  return service({
    url: '/message/messageList',
    method: 'get'
  })
}
export function taskCenteredList() { //任务中心类别
  return service({
    url: '/taskCentered/lists',
    method: 'get'
  })
}

export function getTaskCenteredLists() { //任务中心列表
  return service({
    url: '/taskCentered/taskCenteredLists',
    method: 'get'
  })
}
