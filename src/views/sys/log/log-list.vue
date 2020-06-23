<template>
  <div v-loading="loading">
    <br>
    <br>
    <el-form :inline="true" :model="log" class="demo-form-inline" size="mini">
      <el-form-item label="请求地址">
        <el-input v-model="page.params.logUrl" placeholder="请输入请求地址" clearable />
      </el-form-item>
      <el-form-item label="请求IP">
        <el-input v-model="page.params.logIp" placeholder="请输入请求IP" clearable />
      </el-form-item>
      <el-form-item label="请求状态">
        <el-select v-model="page.params.logStatus" placeholder="请选择请求状态" clearable>
          <el-option
            v-for="(item,index) in statusList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="请求方式">
        <el-select v-model="page.params.logMethod" placeholder="请选择请求方式" clearable>
          <el-option
            v-for="(item,index) in methedList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <el-button size="mini" @click="batchDelete">批量删除</el-button>
    <el-button size="mini" @click="exportExcel">全部导出</el-button>
    <br>
    <br>
    <el-table :data="page.list" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column v-if="showd" prop="logId" label="编号" />
      <el-table-column prop="logUrl" label="请求地址" />
      <el-table-column prop="logParams" show-overflow-tooltip label="参数">
        <template slot-scope="scope">
          <template v-if="scope.row.logParams === '[]'">无</template>
          <template v-else>{{ scope.row.logParams }}</template>
        </template>
      </el-table-column>
      <el-table-column prop="logStatus" label="访问状态" width="100">
        <template slot-scope="scope">
          <template>
            <el-tag v-if="scope.row.logStatus == 200" type="success">正常</el-tag>
            <el-tag v-else type="danger">异常</el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="logMessage" label="异常信息" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.logMessage ===null ">
            <el-tag type="info">无数据</el-tag>
          </template>
          <template v-else>{{ scope.row.logMessage }}</template>
        </template>
      </el-table-column>
      <el-table-column prop="logMethod" label="请求方式" width="80" />
      <el-table-column prop="logTime" label="响应时间" width="80" />
      <el-table-column prop="logIp" label="请求ip" />
      <el-table-column prop="createdTime" label="创建时间" />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleted(scope.row.logId)">删除</el-button>
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

  </div>
</template>

<script>
import logApi from '@/api/logApi'
export default {
  data() {
    return {
      showd: false,
      statusList: [{ 'label': '异常', 'value': 400 }, { 'label': '正常', 'value': 200 }],
      methedList:
       [
         { 'label': 'POST', 'value': 'POST' },
         { 'label': 'PUT', 'value': 'PUT' },
         { 'label': 'GET', 'value': 'GET' },
         { 'label': 'DELETE', 'value': 'DELETE' }
       ],
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        list: [], // 数据
        params: {

        }, // 条件参数
        sortColumn: '', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      logId: [],
      log: {},
      loading: false
    }
  },
  created() {
    this.getList() // 加载数据
  },
  methods: {
    exportExcel() {
      this.loading = true
      logApi.exportExcel().then(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        const elink = document.createElement('a')
        elink.download = '系统日志.xlsx'
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
        this.loading = false
      }).catch(() => {
        // this.fullscreenLoading = false
        this.$message.error('导入失败')
      })
    },
    query() {
      if (this.page.params.logStatus === '') {
        this.page.params === null
      }
      logApi.getList(this.page).then(res => {
        this.page = res.data
      })
    },
    batchDelete() {
      const logIdList = []
      this.logId.forEach(element => {
        logIdList.push(element.logId)
      })
      logApi.deleteByIds(logIdList).then(res => {
        this.$message.success(res.msg)
        this.getList()
      })
    },
    handleSelectionChange(val) {
      this.logId = val
      console.log(this.logId)
    },
    deleted(id) {
      logApi.deleteById(id).then(res => {
        this.$message.success(res.msg)
        this.getList()
      })
    },
    handleSizeChange(val) {
      this.page.list = null
      this.page.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page.list = null
      this.page.currentPage = val
      this.getList()
    },
    getList() {
      logApi.getList(this.page).then(res => {
        this.page = res.data
      })
    }
  }
}
</script>

<style>
    .el-tooltip__popper{max-width:30%}
</style>
