import request from '@/utils/request'
var group_name = 'music'
export default {
  saveOrUpdate(music) { // 添加或者修改
    return request({
      url: `/${group_name}/saveOrUpdate`,
      method: 'post',
      data: music
    })
  },
  getByPage(page) { // 后台查询
    return request({
      url: `/${group_name}/page`,
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

  getById(id) { // 编号查询
    return request({
      url: `/${group_name}/list/${id}`,
      method: 'get'
    })
  },
  start(id) { // 启用
    return request({
      url: `/${group_name}/start/` + id,
      method: 'put'
    })
  },
  forbidden(id) { // 禁用
    return request({
      url: `/${group_name}/forbidden/` + id,
      method: 'put'
    })
  }
}
