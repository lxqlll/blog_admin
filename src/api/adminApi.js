import request from '@/utils/request'
var group_name = 'admin'
export default {
  updateAdmin(admin) { // 添加
    return request({
      url: `/${group_name}/updateAdmin`,
      method: 'post',
      data: admin
    })
  },
  getAdmin() { // 添加
    return request({
      url: `/${group_name}/getAdmin`,
      method: 'get'
    })
  }
}
