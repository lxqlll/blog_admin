<template>
  <div>
    <br>
    <el-button link="primary" size="small" class="add-button" @click="openDrawer()">添加链接</el-button>
    <!-- 列表 -->
    <el-table :data="linkList" border style="width: 100%">
      <el-table-column prop="linkId" label="编号" />
      <el-table-column prop="linkName" label="名称" />
      <el-table-column prop="linkUrl" label="链接地址" />
      <el-table-column prop="createdTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-button size="mini">操作<i class="el-icon-arrow-down el-icon--right" /></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" @click="handleEdit(scope.row.linkId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" link="danger" @click="handleDelete(scope.row.linkId)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" link="danger" plain disabled>世界和平</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided />
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加组件 -->
    <el-drawer title="添加" :visible.sync="drawer" :direction="direction">
      <link-add class="addlink" @getlinkList="getlinkList" @colesDrawer="colesDrawer" />
    </el-drawer>

    <!-- 修改组件 -->
    <el-dialog title="修改" :visible.sync="updateDialog" width="30%">
      <link-update :link="link" @closeDialog="closeDialog" @getlinkList="getlinkList" />
    </el-dialog>
  </div>
</template>

<script>
import linkApi from '../../../api/linkApi' // 导入分类接口
import linkAdd from './link-add' // 添加
import linkUpdate from './link-update'
export default {
  components: {
    linkAdd,
    linkUpdate
  },
  data() {
    return {
      linkList: [], // 分类数据数组
      drawer: false, // 添加抽屉div
      direction: 'rtl', // 控制方向
      link: {}, // 分类对象
      updateDialog: false // 修改对话框
    }
  },
  created() {
    this.getlinkList()
  },
  methods: {
    getlinkList() {
      //  查询所有
      linkApi.getlist().then(res => {
        this.linkList = res.data
        console.log(this.linkList)
      })
    },
    handleDelete(id) {
      // 通过编号删除
      this.$confirm('此操作将删除该链接, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        link: 'warning'
      })
        .then(() => {
          linkApi.deleteById(id).then(res => {
            this.$message.success(res.msg)
            this.getlinkList()
          })
        })
        .catch(() => {
          this.$message.error('取消删除')
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
      linkApi.getById(id).then(res => {
        const linkEntity = res.data
        this.link = linkEntity
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
.addlink {
  margin-right: 20px;
}
</style>
