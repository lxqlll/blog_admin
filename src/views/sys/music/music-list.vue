<template>
  <div>
    <br>
    <br>
    <el-form :inline="true" :model="music" class="demo-form-inline" label-width="70px" size="mini">
      <el-form-item label="歌曲名">
        <el-input v-model="page.params.name" placeholder="歌曲名" clearable />
      </el-form-item>
      <el-form-item label="歌手">
        <el-input v-model="page.params.artist" placeholder="歌曲名" clearable />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-select v-model="page.params.enabled" placeholder="状态" clearable>
          <el-option v-for="(item,index) in enableList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryMusic">查询</el-button>
      </el-form-item>
    </el-form>
    <el-divider />
    <br>
    <el-button class="addButton" size="mini" round @click="addMusic">添加</el-button>
    <br>
    <br>
    <el-table :data="page.list" style="width: 100%" @sort-change="theSorting">
      <el-table-column fixed prop="id" label="编号" />
      <el-table-column prop="name" label="歌曲名" />
      <el-table-column prop="artist" label="歌手" />
      <el-table-column prop="url" label="歌曲链接" />
      <el-table-column prop="cover" label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover"
            :preview-src-list="[scope.row.cover]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" sortable="custom" />
      <el-table-column prop="enabled" label="是否启用">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enabled === 1">启用</el-tag>
          <el-tag v-else type="warning">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-button size="mini" type="primary">
                操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="warning" @click="deleteMusicById(scope.row.id)">删除</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="info" @click="queryMusicById(scope.row.id)">查看</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" @click="updateMusicById(scope.row.id)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="danger" @click="disable(scope.row.id)">禁用</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="success" @click="start(scope.row.id)">启用</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <div class="block">
      <el-pagination
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
      <music-add @closeAllVisible="closeAllVisible" @getList="getList" />
    </el-dialog>
  </div>
</template>

<script>
import musicApi from '@/api/musicApi'
import musicAdd from './music-add'
export default {
  components: {
    musicAdd
  },
  data() {
    return {
      showd: false,
      addVisible: false, // 新增对话框
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
      music: {},
      enableList: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val
      this.getList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getList()
      console.log(`当前页: ${val}`)
    },
    disable(id) {
      musicApi.forbidden(id).then(res => {
        this.$message.success(res.msg)
        this.getList()
      }).catch((e) => {
        this.$message.error(e)
      })
    },
    start(id) {
      musicApi.start(id).then(res => {
        this.$message.success(res.msg)
        this.getList()
      }).catch((e) => {
        this.$message.error(e)
      })
    },
    queryMusic() {
      this.page.list = null
      musicApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    },
    theSorting(row, column) {
      if (row.order) {
        console.log(row, column)
        this.page.sortColumn = row.prop
        this.page.sortMethod = row.order
        this.getList()
      }
    },
    deleteMusicById(id) {
      musicApi.deleteById(id).then(res => {
        this.$message.success(res.msg)
        this.getList()
      }).catch((e) => {
        this.$message.error(e)
      })
    },
    addMusic() {
      this.addVisible = true
    },
    closeAllVisible() {
      this.addVisible = false
    },
    getList() {
      musicApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    }
  }
}
</script>

<style>
.addButton {
  margin-left: 18px;
}
</style>
