<template>
  <div class="app-container calendar-list-container">
    <div class="main-titles">
      <div>会员表</div>
      <br>
      <div class="add-box">
        <el-button type="primary" class="filter-item add-btns" size="mini" style="margin-left: 10px;" @click="handleCreate">{{ $t('table.add') }}</el-button>
      </div>
    </div>
    <br>
    <!-- 搜索条件 -->
    <el-form ref="listQuery" :inline="true" :model="listQuery" label-width="120px">
      <div class="filter-container">

        <!--<el-form-item label="会员ID:">-->
        <!--<el-input v-model="listQuery.memberId" size="small" class="filter-item" placeholder="会员ID" />-->
        <!--</el-form-item>-->
        <el-form-item label="会员账号:">
          <el-input v-model="listQuery.memberAccount" size="small" class="filter-item" placeholder="会员账号" />
        </el-form-item>
        <el-form-item label="会员手机号:">
          <el-input v-model="listQuery.memberPhone" size="small" class="filter-item" placeholder="会员手机号" />
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
        <el-table-column align="center" label="会员ID">
          <template slot-scope="scope">
            <span>{{ scope.row.memberId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员账号">
          <template slot-scope="scope">
            <span>{{ scope.row.memberAccount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员昵称">
          <template slot-scope="scope">
            <span>{{ scope.row.memberName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员性别">
          <template slot-scope="scope">
            <span>{{ scope.row.memberSex }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员类型">
          <template slot-scope="scope">
            <span>{{ scope.row.memberType }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员手机号">
          <template slot-scope="scope">
            <span>{{ scope.row.memberPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员头像">
          <template slot-scope="scope">
            <img :src="scope.row.memberPhoto" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column align="center" label="会员状态">
          <template slot-scope="scope">
            <span>{{ scope.row.memberStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="最近登录时间">
          <template slot-scope="scope">
            <span>{{ scope.row.lastLoginTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册时间">
          <template slot-scope="scope">
            <span>{{ scope.row.registerTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册来源">
          <template slot-scope="scope">
            <span>{{ scope.row.registerResource }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" class="filter-item other-btns" @click="handleView(scope.row)">{{ $t('table.view') }}</el-button>

            <el-button type="primary" class="filter-item other-btns" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>

            <el-button type="danger" class="filter-item other-btns" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>

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
        <el-form-item label="会员账号" prop="memberAccount">
          <el-input v-model="form.memberAccount" placeholder="请输入会员账号" />
        </el-form-item>
        <el-form-item label="会员昵称" prop="memberName">
          <el-input v-model="form.memberName" placeholder="请输入会员昵称" />
        </el-form-item>
        <el-form-item label="会员性别" prop="memberSex">
          <el-input v-model="form.memberSex" placeholder="请输入会员性别" />
        </el-form-item>
        <el-form-item label="会员类型" prop="memberType">
          <el-input v-model="form.memberType" placeholder="请输入会员类型" />
        </el-form-item>
        <el-form-item label="会员手机号" prop="memberPhone">
          <el-input v-model="form.memberPhone" placeholder="请输入会员手机号" />
        </el-form-item>
        <el-form-item label="会员头像" prop="memberPhoto">
          <el-input v-model="form.memberPhoto" placeholder="请输入会员头像" />
        </el-form-item>
        <el-form-item label="会员状态" prop="memberStatus">
          <el-input v-model="form.memberStatus" placeholder="请输入会员状态" />
        </el-form-item>
        <el-form-item label="最近登录时间" prop="lastLoginTime">
          <el-input v-model="form.lastLoginTime" placeholder="请输入最近登录时间" />
        </el-form-item>
        <el-form-item label="注册时间" prop="registerTime">
          <el-input v-model="form.registerTime" placeholder="请输入注册时间" />
        </el-form-item>
        <el-form-item label="注册来源" prop="registerResource">
          <el-input v-model="form.registerResource" placeholder="请输入注册来源" />
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
        <el-form-item label="会员账号" prop="memberAccount">
          <el-input v-model="form.memberAccount" readonly="readonly" />
        </el-form-item>
        <el-form-item label="会员昵称" prop="memberName">
          <el-input v-model="form.memberName" readonly="readonly" />
        </el-form-item>
        <el-form-item label="会员性别" prop="memberSex">
          <el-input v-model="form.memberSex" readonly="readonly" />
        </el-form-item>
        <el-form-item label="会员类型" prop="memberType">
          <el-input v-model="form.memberType" readonly="readonly" />
        </el-form-item>
        <el-form-item label="会员手机号" prop="memberPhone">
          <el-input v-model="form.memberPhone" readonly="readonly" />
        </el-form-item>

        <el-form-item label="会员头像" prop="memberPhoto">
          <el-input v-model="form.memberPhoto" readonly="readonly" />
        </el-form-item>
        <el-form-item label="会员状态" prop="memberStatus">
          <el-input v-model="form.memberStatus" readonly="readonly" />
        </el-form-item>
        <el-form-item label="最近登录时间" prop="lastLoginTime">
          <el-input v-model="form.lastLoginTime" readonly="readonly" />
        </el-form-item>
        <el-form-item label="注册时间" prop="registerTime">
          <el-input v-model="form.registerTime" readonly="readonly" />
        </el-form-item>
        <el-form-item label="注册来源" prop="registerResource">
          <el-input v-model="form.registerResource" readonly="readonly" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelView('form')">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj } from '@/api/admin/member'
import MessageNotice from '@/components/Notice/MessageNotice'

export default {
  name: 'Member',
  components: { MessageNotice },
  data() {
    return {
      message: '会员表',
      form: {
        memberId: '',
        memberAccount: '',
        memberName: '',
        memberSex: '',
        memberType: '',
        memberPhone: '',
        memberPwd: '',
        memberPhoto: '',
        memberStatus: '',
        openId: '',
        unionId: '',
        lastLoginTime: '',
        registerTime: '',
        registerResource: ''
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
        memberAccount: [{
          required: true,
          message: '请输入会员账号',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        memberName: [{
          required: true,
          message: '请输入会员昵称',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        memberSex: [{
          required: true,
          message: '请输入会员性别',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        memberType: [{
          required: true,
          message: '请输入会员类型',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        memberPhone: [{
          required: true,
          message: '请输入会员手机号',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        memberPhoto: [{
          required: true,
          message: '请输入会员头像',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        memberStatus: [{
          required: true,
          message: '请输入会员状态',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        lastLoginTime: [{
          required: true,
          message: '请输入最近登录时间',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        registerTime: [{
          required: true,
          message: '请输入注册时间',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        registerResource: [{
          required: true,
          message: '请输入注册来源',
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
        memberAccount: '',
        memberName: '',
        memberSex: '',
        memberType: '',
        memberPhone: '',
        memberPwd: '',
        memberPhoto: '',
        memberStatus: '',
        openId: '',
        unionId: '',
        lastLoginTime: '',
        registerTime: '',
        registerResource: ''
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
      this.listQuery.memberAccount = undefined
      this.listQuery.memberName = undefined
      this.listQuery.memberSex = undefined
      this.listQuery.memberType = undefined
      this.listQuery.memberPhone = undefined
      this.listQuery.memberPwd = undefined
      this.listQuery.memberPhoto = undefined
      this.listQuery.memberStatus = undefined
      this.listQuery.openId = undefined
      this.listQuery.unionId = undefined
      this.listQuery.lastLoginTime = undefined
      this.listQuery.registerTime = undefined
      this.listQuery.registerResource = undefined
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
      getObj(row.memberId).then(res => {
        const data = res.data
        this.form.memberId = data.memberId
        this.form.memberAccount = data.memberAccount
        this.form.memberName = data.memberName
        this.form.memberSex = data.memberSex
        this.form.memberType = data.memberType
        this.form.memberPhone = data.memberPhone
        this.form.memberPwd = data.memberPwd
        this.form.memberPhoto = data.memberPhoto
        this.form.memberStatus = data.memberStatus
        this.form.openId = data.openId
        this.form.unionId = data.unionId
        this.form.lastLoginTime = data.lastLoginTime
        this.form.registerTime = data.registerTime
        this.form.registerResource = data.registerResource
        this.dialogAddOrUpdateVisible = true
        this.dialogStatus = 'update'
      })
    },
    // 查看操作
    handleView(row) {
      getObj(row.memberId).then(res => {
        const data = res.data
        this.form.memberId = data.memberId
        this.form.memberAccount = data.memberAccount
        this.form.memberName = data.memberName
        this.form.memberSex = data.memberSex
        this.form.memberType = data.memberType
        this.form.memberPhone = data.memberPhone
        this.form.memberPwd = data.memberPwd
        this.form.memberPhoto = data.memberPhoto
        this.form.memberStatus = data.memberStatus
        this.form.openId = data.openId
        this.form.unionId = data.unionId
        this.form.lastLoginTime = data.lastLoginTime
        this.form.registerTime = data.registerTime
        this.form.registerResource = data.registerResource
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
        memberAccount: '',
        memberName: '',
        memberSex: '',
        memberType: '',
        memberPhone: '',
        memberPwd: '',
        memberPhoto: '',
        memberStatus: '',
        openId: '',
        unionId: '',
        lastLoginTime: '',
        registerTime: '',
        registerResource: ''
      }
    }
  }
}
</script>
