import request from '@/utils/request'
var group_name = 'link'
export default {
  saveOrUpdate(link) { // 添加或者修改
    return request({
      url: `/${group_name}/saveOrUpdate`,
      method: 'post',
      data: link
    })
  },

  getlist(type) { //  前台查询
    return request({
      url: `/${group_name}/getLink`,
      method: 'get',
      data: type
    })
  },

  deleteById(id) { // 删除
    return request({
      url: `/${group_name}/deleteLink/` + id,
      method: 'delete'
    })
  },

  getById(id) { // 编号查询
    return request({
      url: `/${group_name}/getLinkById/${id}`,
      method: 'get'
    })
  }
}
