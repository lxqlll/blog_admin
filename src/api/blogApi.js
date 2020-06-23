import request from '@/utils/request'
var group_name = 'blog'
export default {
  saveOrUpdate(blog) { // 添加或者修改
    return request({
      url: `/${group_name}/saveOrUpdate`,
      method: 'post',
      data: blog
    })
  },
  getByPage(page) { // 后台查询
    return request({
      url: `/${group_name}/pageBlog`,
      method: 'post',
      data: page
    })
  },

  deleteById(id) { // 删除
    return request({
      url: `/${group_name}/deleteBlog/` + id,
      method: 'delete'
    })
  },

  getById(id) { // 编号查询
    return request({
      url: `/${group_name}/getBlogById/${id}`,
      method: 'get'
    })
  }
}
