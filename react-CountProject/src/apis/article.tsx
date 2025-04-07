// 文章相关的请求模块
import { request } from "@/utils"
// 获取文章列表
export function getChannelAPI () {
  return request({
    url: '/channels',
    method: 'GET',
  })
}
export function createArticleAPI (data: any) {
  return request({
    url:'/mp/articles?draft=false',
    method: 'POST',
    data,
  }) 
}

export function getArticleListAPI (params: any) {
  return request({
    url: '/mp/articles',
    method: 'GET',
    params,
  })
}
export function delArticleAPI (id: number) {
  return request({
    url: `/mp/articles/${id}`,
    method: 'DELETE',
  }) 
}
