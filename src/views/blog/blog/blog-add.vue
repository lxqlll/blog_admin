<template>
  <div>
    <el-form ref="form" :model="blog" label-width="80px" size="small">
      <el-form-item label="标题">
        <el-input v-model="blog.blogTitle" />
      </el-form-item>
      <el-form-item label="封面">
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
      <el-form-item label="分类">
        <el-select v-model="blog.blogType" style="width:100%" placeholder="请选择类型">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item.typeName"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <tinymce v-model="blog.blogContent" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="blog.blogRemark" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import blogApi from '../../../api/blogApi'
import typeApi from '../../../api/typeApi' // 导入分类接口
import tinymce from '../../../components/Tinymce/index'
import { getToken } from '@/utils/auth'
export default {
  components: {
    tinymce
  },
  data() {
    return {
      blog: {},
      typeList: {},
      imageUrl: null, // 上传图片回显
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片路径
      headers: {
        Authorization: getToken()
      }
    }
  },
  created() {
    this.type()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$message.success(res.msg)
      this.imageUrl = res.data
      this.blog.blogImage = res.data
    },
    cancel() {
      // 取消新增窗口
      this.$emit('closeDialog')
    },
    type() {
      // 查询分类列表
      typeApi.getlist().then(res => {
        this.typeList = res.data
        console.log(this.type)
      })
    },
    onSubmit() {
      // 添加博客
      console.log(this.blog)
      blogApi.saveOrUpdate(this.blog).then(res => {
        this.$message.success(res.msg)

        this.$emit('closeDialog')
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
    border-color: #409EFF;
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
