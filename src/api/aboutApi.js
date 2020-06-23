import request from '@/utils/request'
var group_name = 'about'
export default {
  saveOrUpdate(about) { // 添加或者修改
    return request({
      url: `/${group_name}/saveOrUpdate`,
      method: 'post',
      data: about
    })
  },
  getByPage(page) { // 后台查询
    return request({
      url: `/${group_name}/getByPage`,
      method: 'post',
      data: page
    })
  },

  deleteById(id) { // 删除
    return request({
      url: `/${group_name}/deleteById/` + id,
      method: 'delete'
    })
  },

  reading(id) { // 阅读
    return request({
      url: `/${group_name}/reading/` + id,
      method: 'get'
    })
  },

  start(id) { // 启用
    return request({
      url: `/${group_name}/start/` + id,
      method: 'put'
    })
  },

  disable(id) { // 启用
    return request({
      url: `/${group_name}/disable/` + id,
      method: 'put'
    })
  },

  getById(id) { // 编号查询
    return request({
      url: `/${group_name}/getById/${id}`,
      method: 'get'
    })
  }

}
