<template>
  <div class="app-container calendar-list-container">
    <!--<div class="main-titles">-->
    <!--<div>会员账户表</div>-->
    <!--<div class="add-box">-->
    <!--<el-button class="filter-item add-btns" size="mini" style="margin-left: 10px;" @click="handleCreate">{{ $t('table.add') }}</el-button>-->
    <!--</div>-->
    <!--</div>-->
    <!-- 搜索条件 -->
    <el-form ref="listQuery" :inline="true" :model="listQuery" label-width="120px">
      <div class="filter-container">

        <!--        <el-form-item label="会员ID:">-->
        <!--          <el-input v-model="listQuery.memberId" size="small" class="filter-item" placeholder="会员ID" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="总积分:">-->
        <!--        <el-input v-model="listQuery.totalIntegral" size="small" class="filter-item" placeholder="总积分" />-->
        <!--        </el-form-item>-->
        <el-form-item label="会员名称:">
          <el-input v-model="listQuery.memberName" size="small" class="filter-item" placeholder="会员名称" />
        </el-form-item>
        <el-button type="primary" class="filter-item other-btns" @click="handleFilter">{{ $t('table.search') }}</el-button>
        <el-button type="danger" class="filter-item other-btns" style="margin-left:30px" @click="handleEmpty">{{ $t('table.empty') }}</el-button>

      </div>
    </el-form>

    <!-- 数据列表 -->
    <div class="table-box">
      <div class="table-customtitle">查询结果</div>
      <br>
      <el-table :key="tableKey" v-loading.body="listLoading" :data="dataList" :header-cell-style="{background:'#F5F5F5'}" border fit highlight-current-row style="width: 100%">
        <el-table-column label="序号" type="index" width="50" />
        <!--        <el-table-column align="center" label="会员ID">-->
        <!--          <template slot-scope="scope">-->
        <!--            <span>{{ scope.row.memberId }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column align="center" label="会员名称">
          <template slot-scope="scope">
            <span>{{ scope.row.memberName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总积分">
          <template slot-scope="scope">
            <span>{{ scope.row.totalIntegral }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="当前积分">
          <template slot-scope="scope">
            <span>{{ scope.row.integral }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <!--            <el-button type="primary" class="filter-item other-btns" @click="handleView(scope.row)">{{ $t('table.view') }}</el-button>-->

            <el-button type="primary" class="filter-item other-btns" @click="handleUpdate(scope.row, 0)">新增</el-button>
            <el-button type="primary" class="filter-item other-btns" @click="handleUpdate(scope.row), 1">删减</el-button>

            <!--            <el-button type="danger" class="filter-item other-btns" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>-->

          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container">
        <el-pagination
          background
          :current-page.sync="listQuery.page"
          :page-sizes="[10,20,30,50]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 新增或编辑弹窗 -->
    <el-dialog :title="$t('table.'+textMap[dialogStatus])" :visible.sync="dialogAddOrUpdateVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <!--        <el-form-item label="会员ID" prop="memberId">-->
        <!--          <el-input v-model="form.memberId" placeholder="请输入会员ID" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="总积分" prop="totalIntegral">-->
        <!--          <el-input v-model="form.totalIntegral" placeholder="请输入总积分" />-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="当前积分" prop="integral">-->
        <!--          <el-input v-model="form.integral" placeholder="请输入当前积分" />-->
        <!--        </el-form-item>-->
        <el-form-item label="添加积分" prop="integral">
          <el-input v-model="form.score" placeholder="请输入当前积分" />
        </el-form-item>
        <el-form-item label="添加原因" prop="integral">
          <el-input v-model="form.mark" placeholder="请输入当前积分" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" :loading="saveLoading" type="primary" @click="create('form')">{{ $t('table.confirm') }}
        </el-button>
        <el-button v-else type="primary" :loading="saveLoading" @click="update('form')">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 查看窗口 -->
    <el-dialog :title="$t('table.'+textMap[dialogStatus])" :visible.sync="dialogInfoVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <!--        <el-form-item label="会员ID" prop="memberId">-->
        <!--          <el-input v-model="form.memberId" readonly="readonly" />-->
        <!--        </el-form-item>-->
        <el-form-item label="总积分" prop="totalIntegral">
          <el-input v-model="form.totalIntegral" readonly="readonly" />
        </el-form-item>
        <el-form-item label="当前积分" prop="integral">
          <el-input v-model="form.integral" readonly="readonly" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelView('form')">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj, editScore } from '@/api/admin/memberAccount'

export default {
  name: 'MemberAccount',
  data() {
    return {
      isAdd: false,
      message: '会员账户表',
      form: {
        memberId: '',
        totalIntegral: '',
        integral: '',
        score: 0,
        mark: ''
      },
      rules: {
        memberId: [{
          required: true,
          message: '请输入会员ID',
          trigger: 'blur'
        }],
        totalIntegral: [{
          required: true,
          message: '请输入总积分',
          trigger: 'blur'
        }],
        integral: [{
          required: true,
          message: '请输入当前积分',
          trigger: 'blur'
        }]
      },
      dataList: [],
      total: null,
      saveLoading: false,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        memberId: '',
        totalIntegral: '',
        integral: '',
        score: 0,
        mark: ''
      },
      dialogAddOrUpdateVisible: false,
      dialogInfoVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'edit',
        create: 'create',
        view: 'view'
      },
      tableKey: 0
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.listLoading = true
      page(this.listQuery).then(res => {
        const data = res.data
        this.dataList = data.items
        this.total = data.count
        this.listLoading = false
      }).catch(() => {
        this.dataList = []
        this.total = 0
        this.listLoading = false
      })
    },
    // 清空查询条件
    handleEmpty() {
      this.listQuery.page = 1
      this.listQuery.memberId = undefined
      this.listQuery.totalIntegral = undefined
      this.listQuery.integral = undefined,
      this.listQuery.score = undefined,
      this.listQuery.mark = undefined
    },
    // 搜索
    handleFilter() {
      this.listQuery.page = 1
      this.getDataList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getDataList()
    },
    // 新增操作
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogAddOrUpdateVisible = true
    },
    // 编辑操作
    handleUpdate(row, e) {
      e === 0 ? this.isAdd = true : this.isAdd = false
      getObj(row.memberId).then(res => {
        const data = res.data
        this.form.memberId = data.memberId
        this.form.totalIntegral = data.totalIntegral
        this.form.integral = data.integral
        this.form.score = data.score
        this.form.mark = data.mark
        this.dialogAddOrUpdateVisible = true
        this.dialogStatus = 'update'
      })
    },
    // 查看操作
    handleView(row) {
      getObj(row.memberId).then(res => {
        const data = res.data
        this.form.memberId = data.memberId
        this.form.totalIntegral = data.totalIntegral
        this.form.integral = data.integral
        this.form.score = data.score
        this.form.mark = data.mark
        this.dialogInfoVisible = true
        this.dialogStatus = 'view'
      })
    },
    // 删除操作
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: this.$t('table.confirm'),
        cancelButtonText: this.$t('table.cancel'),
        type: 'warning'
      }).then(() => {
        delObj(row.memberId).then(() => {
          this.getDataList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    // 新增提交
    create(formName) {
      const set = this.$refs
      this.saveLoading = true
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogAddOrUpdateVisible = false
            this.getDataList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.saveLoading = false
          }).catch(() => {
            this.saveLoading = false
          })
        } else {
          this.saveLoading = false
          return false
        }
      })
    },
    update(formName) {
      const set = this.$refs
      this.saveLoading = true
      set[formName].validate(valid => {
        if (valid) {
          let add = '+'
          if (this.isAdd) {
            add = '+'
          } else {
            add = '-'
          }
          editScore({
            integral: Number(this.form.score),
            remark: this.form.mark,
            memberId: this.form.memberId,
            operate: add
          }).then(res => {
            this.dialogAddOrUpdateVisible = false
            this.getDataList()
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
            this.saveLoading = false
          })
          // putObj(this.form).then(() => {
          //   this.dialogAddOrUpdateVisible = false
          //   this.getDataList()
          //   this.$notify({
          //     title: '成功',
          //     message: '修改成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          //   this.saveLoading = false
          // }).catch(() => {
          //   this.saveLoading = false
          // })
        } else {
          this.saveLoading = false
          return false
        }
      })
    },
    cancel(formName) {
      this.dialogAddOrUpdateVisible = false
      this.$refs[formName].resetFields()
    },
    cancelView(formName) {
      this.dialogInfoVisible = false
      this.$refs[formName].resetFields()
    },
    resetTemp() {
      this.form = {
        memberId: '',
        totalIntegral: '',
        integral: '',
        score: 0
      }
    }
  }
}
</script>
