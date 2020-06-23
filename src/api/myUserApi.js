import request from '@/utils/request'
var group_name = 'user'
export default {
  saveOrUpdate(user) { // 添加或者修改
    return request({
      url: `/${group_name}/saveOrUpdate`,
      method: 'post',
      data: user
    })
  },

  getUserName() { // 分页查询
    return request({
      url: `/${group_name}/getUserName`,
      method: 'get'
    })
  },

  passwordReset(userIds) { // 分页查询
    return request({
      url: `/${group_name}/passwordReset`,
      method: 'put',
      data: userIds
    })
  },

  getByPage(page) { // 分页查询
    return request({
      url: `/${group_name}/selectByPage`,
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
  }
}
