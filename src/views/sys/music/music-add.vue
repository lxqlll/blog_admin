<template>
  <div>
    <el-form ref="form" :model="muscic" label-width="80px">
      <el-form-item label="歌曲名">
        <el-input v-model="muscic.name" />
      </el-form-item>
      <el-form-item label="歌手">
        <el-input v-model="muscic.artist" />
      </el-form-item>
      <el-form-item label="歌曲链接">
        <!-- <el-input v-model="muscic.url" /> -->
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceedFile"
          :file-list="fileList"
          :headers="headers"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
      <el-form-item label="歌词">
        <el-input v-model="muscic.lrc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import muscicApi from '@/api/musicApi'
export default {
  data() {
    return {
      fileList: [],
      muscic: {},
      imageUrl: '', // 上传图片回显
      uploadUrl: process.env.VUE_APP_UPLOAD_URL, // 上传图片路径
      headers: {
        Authorization: getToken()
      }
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceedFile(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleAvatarSuccess(res, file) {
      this.$message.success(res.msg)
      this.imageUrl = res.data
      this.muscic.cover = res.data
    },
    cancel() {
      this.$emit('closeAllVisible')
    },
    onSubmit() {
      muscicApi.saveOrUpdate(this.muscic).then(res => {
        this.$emit('closeAllVisible')
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
