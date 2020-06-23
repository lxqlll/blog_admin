<template>
  <div>
    <br>
    <el-button type="primary" size="small" class="add-button" @click="openDrawer()">添加分类</el-button>
    <!-- 列表 -->
    <el-table :data="typeList" border style="width: 100%">
      <el-table-column prop="typeId" label="编号" />
      <el-table-column prop="typeName" label="分类" />
      <el-table-column prop="typeBlogCount" label="博客数" />
      <el-table-column prop="enable" label="启用">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enable == 1">已启用</el-tag>
          <el-tag v-if="scope.row.enable == 0" type="info">未启用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-button size="mini">操作<i class="el-icon-arrow-down el-icon--right" /></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" @click="handleEdit(scope.row.typeId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.typeId)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.enable===0" size="mini" type="primary" @click="stater(scope.row.typeId)">启用</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button v-if="scope.row.enable===1" size="mini" type="primary" @click="disabled(scope.row.typeId)">禁用</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" plain disabled>世界和平</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided />
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加组件 -->
    <el-drawer title="添加帖子分类" :visible.sync="drawer" :direction="direction">
      <type-add class="addType" @getTypeList="getTypeList" @colesDrawer="colesDrawer" />
    </el-drawer>

    <!-- 修改组件 -->
    <el-dialog title="修改" :visible.sync="updateDialog" width="30%">
      <type-update :type="type" @closeDialog="closeDialog" @getTypeList="getTypeList" />
    </el-dialog>
  </div>
</template>

<script>
import typeApi from '../../../api/typeApi' // 导入分类接口
import typeAdd from './type-add' // 添加
import typeUpdate from './type-update'
export default {
  components: {
    typeAdd,
    typeUpdate
  },
  data() {
    return {
      typeList: [], // 分类数据数组
      drawer: false, // 添加抽屉div
      direction: 'rtl', // 控制方向
      type: {}, // 分类对象
      updateDialog: false // 修改对话框
    }
  },
  created() {
    this.getTypeList()
  },
  methods: {
    getTypeList() {
      //  查询所有
      typeApi.listBack().then(res => {
        this.typeList = res.data
        console.log(this.typeList)
      })
    },
    handleDelete(id) {
      // 通过编号删除
      this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          typeApi.deleteById(id).then(res => {
            this.$message.success(res.msg)
            this.getTypeList()
          })
        })
        .catch(() => {
          this.$message.error('取消删除')
        })
    },
    stater(id) {
      // 启用分类
      this.$confirm('是否启用分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          typeApi.start(id).then(res => {
            this.$notify({
              title: '启用成功',
              message: '真令人愉快',
              type: 'success'
            })
            this.getTypeList()
          })
        })
        .catch(() => {
          this.$message.info('你选择了取消')
        })
    },
    disabled(id) {
      // 禁用分类

      this.$confirm('是否禁用用分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          typeApi.disable(id).then(res => {
            this.$notify({
              title: '禁用成功',
              message: '这也许很糟糕',
              type: 'warning'
            })
            this.getTypeList()
          })
        })
        .catch(() => {
          this.$message.info('你选择了取消')
        })
    },
    openDrawer() {
      // 打开抽屉
      this.drawer = true
      this.direction = 'ltr' // 从左往右
    },
    colesDrawer() {
      // 关闭抽屉
      this.drawer = false
    },
    handleEdit(id) {
      // 打开对话框 编号查询
      typeApi.getById(id).then(res => {
        const typeEntity = res.data
        console.log(typeEntity)
        this.type = typeEntity
        this.updateDialog = true
      })
    },
    closeDialog() {
      // 关闭对话框
      this.updateDialog = false
    }
  }
}
</script>

<style>
.add-button {
  margin-bottom: 15px;
  margin-left: 10px;
}
.addType {
  margin-right: 20px;
}
</style>
