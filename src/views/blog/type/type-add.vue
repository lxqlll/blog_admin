<template>
  <div>
    <el-form ref="form" :model="type" label-width="80px">
      <el-form-item label="分类名">
        <el-input v-model="type.typeName" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button size="small" @click="colesDrawer()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import typeApi from '../../../api/typeApi'
export default {
  data() {
    return {
      type: {}
    }
  },
  methods: {
    colesDrawer() {
      this.$emit('colesDrawer')
    },
    onSubmit() {
      typeApi.saveOrUpdate(this.type).then(res => {
        this.$message.success('添加成功')
        this.$emit('colesDrawer')
        this.$emit('getTypeList')
      })
    }
  }
}
</script>
