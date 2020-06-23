import request from '@/utils/request'
var group_name = 'log'
export default {

  getList(page) { // 分页查询
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

  deleteByIds(logIdList) { // 分页查询
    return request({
      url: `/${group_name}/deleteByIds`,
      method: 'delete',
      data: logIdList
    })
  },
  exportExcel() {
    return request({
      url: `/${group_name}/export/`,
      method: 'post',
      responseType: 'blob'
    })
  }
}
