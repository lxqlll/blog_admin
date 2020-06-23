<template>
  <div>
    <br>
    <el-form :inline="true" :model="user" class="demo-form-inline" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="page.params.username" placeholder="用户名" clearable />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="page.params.username" placeholder="姓名" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="page.params.sex" placeholder="性别" clearable>
          <el-option
            v-for="(item,index) in sexList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="page.params.nickname" placeholder="昵称" clearable />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="page.params.userEmail" placeholder="邮箱" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider />

    <el-button size="mini" class="backGauge" @click="addUser">添加</el-button>
    <el-button size="mini" class="backGauge" @click="pasReset">密码重置</el-button>
    <br>
    <br>
    <el-table :data="page.list" style="width: 100%" @selection-change="handleSelectionChange" @sort-change="columnOracle">
      <el-table-column type="selection" width="55" />
      <el-table-column v-if="showd" prop="userId" label="编号" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="name" label="姓名" width="80" />
      <el-table-column prop="sex" label="性别" width="90" sortable="custom">
        <template slot-scope="scope">
          <template>
            <el-tag v-if="scope.row.sex == 1" type="success">男</el-tag>
            <el-tag v-if="scope.row.sex == 0" type="info">女</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="header" label="头像">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.header"
            :preview-src-list="[scope.row.header]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100" />
      <el-table-column prop="userEmail" label="邮箱" />
      <el-table-column prop="createdTime" label="创建时间" sortable="custom" />
      <el-table-column prop="updateTime" label="修改时间" sortable="custom" />
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
                <el-button size="mini" @click="deleted(scope.row.userId)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" @click="updated(scope.row.userId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided />
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog title="新增" :visible.sync="addDialogVisible">
      <user-add :username="username" @getList="getList" @closeAddUser="closeAddUser" />
    </el-dialog>

    <el-dialog title="修改" :visible.sync="updateDialogVisible">
      <user-update :user="user" @getList="getList" @closeAddUser="closeAddUser" />
    </el-dialog>
  </div>
</template>

<script>
import myUserApi from '@/api/myUserApi'
import userAdd from './user-add'
import userUpdate from './user-update'
export default {
  components: {
    userAdd,
    userUpdate
  },
  data() {
    return {
      showd: false,
      addDialogVisible: false, // 新增对话框
      updateDialogVisible: false,
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
      username: '',
      userIds: [],
      user: {},
      sexList: [
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    pasReset() {
      const userIdList = []
      this.userIds.forEach(element => {
        userIdList.push(element.userId)
      })
      myUserApi.passwordReset(userIdList).then(res => {
        this.$message.success(res.msg)
      })
    },
    handleSelectionChange(val) {
      this.userIds = val
    },
    updated(id) {
      myUserApi.getById(id).then(res => {
        this.updateDialogVisible = true
        this.user = res.data
      })
    },
    query() {
      this.getList()
    },
    columnOracle(row, column) {
      if (row.order) {
        this.page.sortColumn = row.prop
        this.page.sortMethod = row.order
        this.getList()
      }
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getList()
    },
    deleted(id) {
      myUserApi.deleteById(id).then(res => {
        this.$message.success(res.msg)
        this.getList()
      })
    },
    // 新增用户
    addUser() {
      this.addDialogVisible = true
    },
    closeAddUser() {
      this.addDialogVisible = false
      this.updateDialogVisible = false
    },
    getList() {
      myUserApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    }
  }
}
</script>
