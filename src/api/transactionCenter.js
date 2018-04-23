//消息中心、
import fetch from '@/util/fetch'


export function categorylists() { //消息中心类别
  return fetch({
    url: '/category/categorylists',
    method: 'get'
  })
}

export function messageList() { //获取员工表格数据
  return fetch({
    url: '/message/messageList',
    method: 'get'
  })
}
export function taskCenteredList() { //任务中心类别
  return fetch({
    url: '/taskCentered/lists',
    method: 'get'
  })
}

export function getTaskCenteredLists() { //任务中心列表
  return fetch({
    url: '/taskCentered/taskCenteredLists',
    method: 'get'
  })
}
