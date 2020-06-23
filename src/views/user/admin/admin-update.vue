<template>
  <div>
    <br>
    <br>
    <el-form :model="admin" size="small" label-width="80px" style="width:95%">
      <el-form-item label="账号">
        <el-input v-model="admin.username" />
      </el-form-item>

      <el-form-item label="密码">
        <el-button size="small" @click="openUpdatePassDialog()">修改密码</el-button>
      </el-form-item>

      <el-form-item label="姓名">
        <el-input v-model="admin.name" />
      </el-form-item>

      <el-form-item label="签名">
        <el-input v-model="admin.signature" type="textarea" />
      </el-form-item>

      <el-form-item label="介绍">
        <el-input v-model="admin.comment" type="textarea" />
      </el-form-item>

      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :headers="headers"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即创建</el-button>

      </el-form-item>
    </el-form>

    <el-dialog
      title="修改密码"
      :visible.sync="updatePassDialog"
      width="30%"
    >
      <admin-update-password :admin="admin" @closeUpdatePassDialog="closeUpdatePassDialog" />
    </el-dialog>
  </div>
</template>

<script>
import adminApi from '@/api/adminApi'
import { getToken } from '@/utils/auth'
import adminUpdatePassword from './admin-update-password'
export default {
  components: {
    adminUpdatePassword
  },
  data() {
    return {
      updatePassDialog: false,
      imageUrl: null, // 上传图片回显
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片路径
      headers: {
        Authorization: getToken()
      },
      admin: {} // 分类数据数组
    }
  },
  created() {
    this.getAdmin()
  },
  methods: {
    closeUpdatePassDialog() {
      this.updatePassDialog = false
    },
    openUpdatePassDialog() {
      this.updatePassDialog = true
    },
    submitForm() {
      this.admin.password = null
      adminApi.updateAdmin(this.admin).then(res => {
        this.$message.success(res.msg)
        this.imageUrl = res.data.header
        this.getAdmin()
      })
    },
    handleAvatarSuccess(res, file) {
      this.$message.success(res.msg)
      this.imageUrl = res.data
      this.admin.header = res.data
    },
    getAdmin() {
      adminApi.getAdmin().then(res => {
        this.admin = res.data
        this.imageUrl = res.data.header
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
