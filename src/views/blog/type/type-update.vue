<template>
  <div>
    <el-form ref="form" :model="type" label-width="80px">
      <el-form-item label="分类名">
        <el-input v-model="type.typeName" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">立即修改</el-button>
        <el-button size="small" @click="dialogVisible">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import typeApi from '../../../api/typeApi'
export default {
  props: {
    type: {
      type: Object,
      default: null
    }
  },
  methods: {
    dialogVisible() {
      this.$emit('closeDialog')
    },
    onSubmit() {
      console.log(this.type)
      typeApi.saveOrUpdate(this.type).then(res => {
        this.$message.success('修改成功')
        this.$emit('closeDialog')
        this.$emit('getTypeList')
      })
    }
  }
}
</script>
