<template>
  <div>
    <el-form ref="form" :model="link" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="link.linkName" />
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="link.linkUrl" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" link="primary" @click="onSubmit">立即创建</el-button>
        <el-button size="small" @click="colesDrawer()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import linkApi from '../../../api/linkApi'
export default {
  data() {
    return {
      link: {}
    }
  },
  methods: {
    colesDrawer() {
      this.$emit('colesDrawer')
    },
    onSubmit() {
      linkApi.saveOrUpdate(this.link).then(res => {
        this.$message.success('添加成功')
        this.$emit('colesDrawer')
        this.$emit('getlinkList')
      })
    }
  }
}
</script>
