<template>
  <div>
    <br>
    <el-form :inline="true" :model="about" size="mini" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="page.params.aboutTitle" placeholder="输入标题" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-button size="mini" @click="addAbout()">添加</el-button>
    <el-button size="mini" @click="batchDel()">批量删除</el-button>
    <br>
    <br>
    <!-- 表格 -->
    <el-table :data="page.list" style="width: 100%" @sort-change="formatter" @selection-change="handleBatchDelete">
      <el-table-column v-if="selection" label="" type="selection" />
      <el-table-column prop="aboutId" label="编号" width="180" />
      <el-table-column prop="aboutTitle" label="标题" width="180" />
      <el-table-column prop="aboutRead" label="阅读数" sortable="custom" />
      <el-table-column prop="createdTime" label="创建时间" sortable="custom" />
      <el-table-column prop="updateTime" label="更新时间" sortable="custom" />
      <el-table-column prop="enable" label="启用">
        <template slot-scope="scope">
          <template>
            <el-tag v-if="scope.row.enable == 1" type="success">启用</el-tag>
            <el-tag v-if="scope.row.enable == 0" type="info">禁用</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-button size="mini">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="handleEdit(scope.row.aboutId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.aboutId)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="warning" @click="start(scope.row.aboutId)">启用</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="info" @click="toView(scope.row.aboutId)">查看</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" @click="disable(scope.row.aboutId)">禁用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
      :current-page="page.currentPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 新增窗口 -->
    <el-dialog title="新增" :visible.sync="dialogVisible" :before-close="handleClose">
      <about-add @closeAbout="closeAbout" @getByPage="getByPage" />
    </el-dialog>

    <el-dialog title="修改" :visible.sync="updateDialog" :before-close="handleClose">
      <about-update :about="about" @closeAbout="closeAbout" @getByPage="getByPage" />
    </el-dialog>

    <el-dialog title="查看" :visible.sync="viewDialog" :before-close="handleClose">
      <div v-html="about.aboutContent" />
    </el-dialog>
  </div>
</template>

<script>
import aboutApi from '../../../api/aboutApi'
import aboutAdd from './about-add'
import aboutUpdate from './about-update'
export default {
  // Vue实例的components函数
  components: {
    aboutAdd,
    aboutUpdate
  },
  // Vue实例data
  data() {
    return {
      selection: true,
      dialogVisible: false, // 新增窗口
      updateDialog: false,
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        list: [], // 数据
        params: {}, // 条件参数
        sortColumn: '', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      about: {},
      viewDialog: false,
      tableChecked: [], // 被选中的记录数据-----对应“批量删除”传的参数值
      blogIds: []
    }
  },
  // Vue的created函数
  created() {
    this.getByPage()
  },
  // Vue实例的方法
  methods: {
    batchDel() {
      for (let i = 0; i < this.tableChecked.length; i++) {
        this.blogIds.push(this.tableChecked[i].aboutId)
      }
      console.log(this.blogIds)
    },
    handleBatchDelete(val) {
      this.tableChecked = val
    },
    toView(id) {
      aboutApi.getById(id).then(res => {
        this.viewDialog = true
        this.about = res.data
      })
    },
    formatter(row, column) {
      if (row.order) {
        this.page.sortColumn = row.prop
        this.page.sortMethod = row.order
        aboutApi.getByPage(this.page).then(res => {
          this.page = res.data
        })
      }
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      aboutApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      aboutApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    },
    query() {
      console.log(this.page)
      aboutApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    },
    handleEdit(id) {
      this.updateDialog = true
      aboutApi.getById(id).then(res => {
        this.about = res.data
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          aboutApi.deleteById(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getByPage()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 禁用
    disable(id) {
      aboutApi.disable(id).then(res => {
        this.$notify.info({
          title: '禁用',
          message: '禁用成功'
        })
        this.getByPage()
      })
    },
    // 启用
    start(id) {
      aboutApi.start(id).then(res => {
        this.$notify({
          title: '启用',
          message: '启用成功',
          type: 'success'
        })
        this.getByPage()
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 打开新增窗口
    addAbout() {
      this.dialogVisible = true
    },
    closeAbout() {
      this.dialogVisible = false
      this.updateDialog = false
    },
    // 分页查询
    getByPage() {
      aboutApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    }
  }
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
