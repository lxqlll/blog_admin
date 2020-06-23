<template>
  <div>
    <el-form :model="admin" size="small" label-width="80px" style="width:95%">

      <el-form-item label="密码">
        <el-input v-model="admin.password" type="password" clearable @focus="clear" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import adminApi from '@/api/adminApi'
import md5 from 'js-md5'
export default {
  props: {
    admin: {
      type: Object,
      default: null
    }
  },

  methods: {
    clear() {
      this.admin.password = null
    },
    cancel() {
      this.$emit('closeUpdatePassDialog')
    },
    submitForm() {
      this.admin.password = md5(this.admin.password)
      console.log(this.admin)
      adminApi.updateAdmin(this.admin).then(res => {
        this.$emit('closeUpdatePassDialog')
        this.$message.success(res.msg)
      })
    }
  }
}
</script>
