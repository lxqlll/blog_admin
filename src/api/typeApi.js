import request from '@/utils/request'
var group_name = 'type'
export default {
  saveOrUpdate(type) { // 添加或者修改
    return request({
      url: `/${group_name}/saveOrUpdate`,
      method: 'post',
      data: type
    })
  },
  listBack(type) { // 后台查询
    return request({
      url: `/${group_name}/list`,
      method: 'get',
      data: type
    })
  },
  getlist(type) { //  前台查询
    return request({
      url: `/${group_name}/getType`,
      method: 'get',
      data: type
    })
  },
  start(id) { // 启用
    return request({
      url: `/${group_name}/stater/${id}`,
      method: 'put'
    })
  },
  deleteById(id) { // 删除
    return request({
      url: `/${group_name}/deleteById/` + id,
      method: 'delete'
    })
  },
  disable(id) { // 禁用
    return request({
      url: `/${group_name}/disabled/${id}`,
      method: 'put'
    })
  },
  getById(id) { // 编号查询
    return request({
      url: `/${group_name}/getTypeById/${id}`,
      method: 'get'
    })
  }
}
