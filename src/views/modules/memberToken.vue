<template>
  <div class="app-container calendar-list-container">
    <div class="main-titles">
      <div>会员token</div>
      <div class="add-box">
        <el-button class="filter-item add-btns" size="mini" style="margin-left: 10px;" @click="handleCreate">{{ $t('table.add') }}</el-button>
      </div>
    </div>
    <message-notice :message="message" />
    <!-- 搜索条件 -->
    <el-form ref="listQuery" :model="listQuery" label-width="120px">
      <div class="filter-container">

        <el-form-item label="会员ID:">
          <el-input v-model="listQuery.memberId" size="small" class="filter-item" placeholder="会员ID" />
        </el-form-item>
        <el-form-item label="openID:">
          <el-input v-model="listQuery.openId" size="small" class="filter-item" placeholder="openID" />
        </el-form-item>
        <el-form-item label="会员token:">
          <el-input v-model="listQuery.token" size="small" class="filter-item" placeholder="会员token" />
        </el-form-item>
        <el-form-item label="过期时间:">
          <el-input v-model="listQuery.expiredTime" size="small" class="filter-item" placeholder="过期时间" />
        </el-form-item>
        <div class="seach-configbtn">
          <el-button class="filter-item other-btns" @click="handleFilter">{{ $t('table.search') }}</el-button>
          <el-button class="filter-item other-btns" style="margin-left:30px" @click="handleEmpty">{{ $t('table.empty') }}</el-button>
        </div>
      </div>
    </el-form>

    <!-- 数据列表 -->
    <div class="table-box">
      <div class="table-customtitle">查询结果</div>
      <el-table :key="tableKey" v-loading.body="listLoading" :data="dataList" :header-cell-style="{background:'#F5F5F5'}" border fit highlight-current-row style="width: 100%">
        <el-table-column label="序号" type="index" width="50" />
        <el-table-column align="center" label="会员ID">
          <template slot-scope="scope">
            <span>{{ scope.row.memberId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="openID">
          <template slot-scope="scope">
            <span>{{ scope.row.openId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员token">
          <template slot-scope="scope">
            <span>{{ scope.row.token }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="过期时间">
          <template slot-scope="scope">
            <span>{{ scope.row.expiredTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <span class="list-btns" @click="handleView(scope.row)">{{ $t('table.view') }}</span>
            <span class="list-btns" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</span>
            <span class="list-delete-btn" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</span>
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
        <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="form.memberId" placeholder="请输入会员ID" />
        </el-form-item>
        <el-form-item label="openID" prop="openId">
          <el-input v-model="form.openId" placeholder="请输入openID" />
        </el-form-item>
        <el-form-item label="会员token" prop="token">
          <el-input v-model="form.token" placeholder="请输入会员token" />
        </el-form-item>
        <el-form-item label="过期时间" prop="expiredTime">
          <el-input v-model="form.expiredTime" placeholder="请输入过期时间" />
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
        <el-form-item label="会员ID" prop="memberId">
          <el-input v-model="form.memberId" readonly="readonly" />
        </el-form-item>
        <el-form-item label="openID" prop="openId">
          <el-input v-model="form.openId" readonly="readonly" />
        </el-form-item>
        <el-form-item label="会员token" prop="token">
          <el-input v-model="form.token" readonly="readonly" />
        </el-form-item>
        <el-form-item label="过期时间" prop="expiredTime">
          <el-input v-model="form.expiredTime" readonly="readonly" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelView('form')">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj } from '@/api/admin/memberToken'
import MessageNotice from '@/components/Notice/MessageNotice'

export default {
  name: 'MemberToken',
  components: { MessageNotice },
  data() {
    return {
      message: '会员token',
      form: {
        memberId: '',
        openId: '',
        token: '',
        expiredTime: ''
      },
      rules: {
        memberId: [{
          required: true,
          message: '请输入会员ID',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        openId: [{
          required: true,
          message: '请输入openID',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        token: [{
          required: true,
          message: '请输入会员token',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        expiredTime: [{
          required: true,
          message: '请输入过期时间',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
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
        openId: '',
        token: '',
        expiredTime: ''
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
      page(this.listQuery).then(data => {
        this.dataList = data.ITEMS
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
      this.listQuery.openId = undefined
      this.listQuery.token = undefined
      this.listQuery.expiredTime = undefined
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
    handleUpdate(row) {
      getObj(row.memberId).then(data => {
        this.form.memberId = data.memberId
        this.form.openId = data.openId
        this.form.token = data.token
        this.form.expiredTime = data.expiredTime
        this.dialogAddOrUpdateVisible = true
        this.dialogStatus = 'update'
      })
    },
    // 查看操作
    handleView(row) {
      getObj(row.memberId).then(data => {
        this.form.memberId = data.memberId
        this.form.openId = data.openId
        this.form.token = data.token
        this.form.expiredTime = data.expiredTime
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
          putObj(this.form).then(() => {
            this.dialogAddOrUpdateVisible = false
            this.getDataList()
            this.$notify({
              title: '成功',
              message: '修改成功',
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
        openId: '',
        token: '',
        expiredTime: ''
      }
    }
  }
}
</script>
