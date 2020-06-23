<template>
  <div>
    <br>
    <br>
    <!-- 条件查询表单 -->
    <el-form :inline="true" :model="blog" class="demo-form-inline" size="mini">
      <el-form-item label="标题" prop="blogTitle">
        <el-input v-model="page.params.blogTitle" placeholder="标题" clearable />
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="page.params.typeId" placeholder="分类" clearable filterable>
          <el-option v-for="(item,index) in typeList" :key="index" :label="item.typeName" :value="item.typeId" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 分割线 -->
    <el-divider size="mini" />
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" class="add-button" @click="operDialog()">添加分类</el-button>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="page.list" style="width: 100%" @sort-change="columnOrder">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="编号">
              <span>{{ props.row.blogId }}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ props.row.blogTitle }}</span>
            </el-form-item>
            <el-form-item label="点赞">
              <span>{{ props.row.blogGoods }}</span>
            </el-form-item>
            <el-form-item label="阅读">
              <span>{{ props.row.blogRead }}</span>
            </el-form-item>
            <el-form-item label="收藏">
              <span>{{ props.row.blogCollection }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.typeName }}</span>
            </el-form-item>
            <el-form-item label="评论">
              <span>{{ props.row.blogComment }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.createdTime }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.updateTime }}</span>
            </el-form-item>
            <el-form-item label="来源">
              <span>{{ props.row.blogSource }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.blogRemark }}</span>
            </el-form-item>
            <el-form-item label="封面">
              <span>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="props.row.blogImage"
                  :preview-src-list="[props.row.blogImage]"
                />
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column v-if="false" show-overflow-tooltip label="编号" prop="blogId" />
      <el-table-column show-overflow-tooltip label="标题" prop="blogTitle" />
      <el-table-column label="封面" prop="blogImage">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.blogImage"
            :preview-src-list="[scope.row.blogImage]"
          />
        </template>
      </el-table-column>
      <el-table-column label="点赞" prop="blogGoods" sortable="custom" />
      <el-table-column label="阅读" prop="blogRead" sortable="custom" />
      <el-table-column label="收藏" prop="blogCollection" sortable="custom" />
      <el-table-column label="评论" prop="blogComment" sortable="custom" />
      <el-table-column show-overflow-tooltip label="分类" prop="typeName" sortable="custom" />
      <el-table-column label="文章来源" prop="blogSource" />
      <el-table-column show-overflow-tooltip label="创建时间" prop="createdTime" sortable="custom" />
      <el-table-column show-overflow-tooltip label="更新时间" prop="updateTime" sortable="custom" />
      <el-table-column label="备注" prop="blogRemark" />
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
                <el-button size="mini" @click="handleEdit(scope.row.blogId)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" @click="handleD(scope.row.blogId)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" @click="queryContent(scope.row.blogId)">查看</el-button>
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

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addDialog">
      <blog-add @closeDialog="closeDialog" @getList="getList" />
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="updateDialog">
      <blog-update :blog="blog" @closeDialog="closeDialog" @getList="getList" />
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="查看" :visible.sync="queryBlogContent">
      <div v-html="blog.blogContent" />
    </el-dialog>
  </div>
</template>

<script>
import blogApi from '../../../api/blogApi'
import blogAdd from './blog-add'
import blogUpdate from './blog-update'
export default {
  components: {
    blogAdd, blogUpdate
  },
  data() {
    return {
      loading: false,
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        list: [], // 数据
        params: {
          blogTitle: ''
        }, // 条件参数
        sortColumn: '', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      addDialog: false, // 打开新增窗口
      updateDialog: false,
      blog: {},
      typeList: [],
      queryBlogContent: false
    }
  },
  created() {
    this.getList()
    this.loadingData()
    setTimeout(() => {
      this.typeList = this.$store.getters.typeList
      console.log(this.typeList)
    }, 1500)
  },
  methods: {
    queryContent(id) {
      blogApi.getById(id).then(res => {
        this.blog = res.data
        this.queryBlogContent = true
      })
    },
    columnOrder(e) {
      if (e.order) {
        this.page.sortColumn = e.prop
        this.page.sortMethod = e.order
        this.getList()
      } else {
        this.page.sortColumn = ''
        this.page.sortMethod = 'asc'
      }
    },
    onSubmit() {
      this.page.list = null
      blogApi.getByPage(this.page).then(res => {
        const list = res.data
        this.page = list
      })
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getList()
    },
    // 删除方法
    handleD(id) { // 编辑方法
      this.updateDialog = true
      blogApi.getById(id).then(res => {
        this.blog = res.data
      })
    },
    handleEdit(id) { // 删除方法
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        blogApi.deleteById(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    loadingData() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    // 打开新增窗口
    operDialog() {
      this.addDialog = true
    },
    // 关闭新增窗口
    closeDialog() {
      this.addDialog = false
      this.updateDialog = false
    },
    // 查询所有
    getList() {
      blogApi.getByPage(this.page).then(res => {
        const list = res.data
        this.page = list
      })
    }
  }
}
</script>

<style>
.add-button {
  margin-bottom: 15px;
  margin-left: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-tooltip__popper {
  max-width: 30%;
  line-height: 30px;
}
.demo-form-inline{
   margin-left: 15px;
}
</style>
