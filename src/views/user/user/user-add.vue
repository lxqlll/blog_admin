<template>
  <div>
    <el-form ref="form" :model="user" :rules="rules" label-width="80px" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="user.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="user.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="user.sex" placeholder="请选择性别" style="width:100%">
          <el-option v-for="(item,index) in sex" :key="index" :label="item.label" :value="item.value" />
        </el-select>
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
      <el-form-item label="昵称">
        <el-input v-model="user.nickname" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="user.userEmail" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import myUserApi from '@/api/myUserApi'
import { getToken } from '@/utils/auth'
export default {
  props: {
    username: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      sex: [{ 'label': '男', 'value': '1' }, { 'label': '女', 'value': '0' }],
      user: {
        username: ''
      },
      imageUrl: null, // 上传图片回显
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片路径
      headers: {
        Authorization: getToken()
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        header: [
          { type: 'date', required: true, message: '请选择一个头像', trigger: 'change' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        userEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }

        ]
      }
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.$message.success(res.msg)
      this.imageUrl = res.data
      this.user.header = res.data
    },
    cancel() {
      // this.$emit('getList')
      this.$emit('closeAddUser')
    },
    onSubmit() {
      myUserApi.saveOrUpdate(this.user).then(res => {
        this.$emit('closeAddUser')
        this.$message.success(res.msg)
        this.$emit('getList')
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
