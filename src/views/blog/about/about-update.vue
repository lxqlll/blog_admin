<template>
  <div>
    <el-form ref="form" :model="about" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="about.aboutTitle" clearable />
      </el-form-item>
      <el-form-item label="内容">
        <tinymce v-model="about.aboutContent" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="closeAbout">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import aboutApi from '../../../api/aboutApi' // 导入关于我们api
import tinymce from '../../../components/Tinymce/index'
export default {
  components: {
    tinymce
  },
  props: {
    about: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
    }
  },
  methods: {
    closeAbout() {
      this.$emit('closeAbout')
    },
    onSubmit() { // 新增方法
      aboutApi.saveOrUpdate(this.about).then(res => {
        this.$message.success('修改成功')
        this.$emit('closeAbout')
        this.$emit('getByPage')
      })
    }
  }
}
</script>
