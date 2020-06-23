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
        <el-button size="small" link="primary" @click="onSubmit">立即修改</el-button>
        <el-button size="small" @click="dialogVisible">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import linkApi from '../../../api/linkApi'
export default {
  props: {
    link: {
      link: Object,
      default: null
    }
    
  },
  methods: {
    dialogVisible() {
      this.$emit('closeDialog')
    },
    onSubmit() {
      console.log(this.link)
      linkApi.saveOrUpdate(this.link).then(res => {
        this.$message.success('修改成功')
        this.$emit('closeDialog')
        this.$emit('getlinkList')
      })
    }
  }
}
</script>
