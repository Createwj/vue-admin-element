<template>
  <div class="app-container calendar-list-container">
    <div class="main-titles">
      <div>订单表</div>
      <div class="add-box">
        <el-button class="filter-item add-btns" size="mini" style="margin-left: 10px;" @click="handleCreate">{{ $t('table.add') }}</el-button>
      </div>
    </div>
    <message-notice :message="message" />
    <!-- 搜索条件 -->
    <el-form ref="listQuery" :model="listQuery" label-width="120px">
      <div class="filter-container">

        <el-form-item label="订单ID:">
          <el-input v-model="listQuery.orderId" size="small" class="filter-item" placeholder="订单ID" />
        </el-form-item>
        <el-form-item label="内容ID:">
          <el-input v-model="listQuery.conId" size="small" class="filter-item" placeholder="内容ID" />
        </el-form-item>
        <el-form-item label="内容名称:">
          <el-input v-model="listQuery.conName" size="small" class="filter-item" placeholder="内容名称" />
        </el-form-item>
        <el-form-item label="内容类型:">
          <el-input v-model="listQuery.conType" size="small" class="filter-item" placeholder="内容类型" />
        </el-form-item>
        <el-form-item label="支付模式:">
          <el-input v-model="listQuery.payModel" size="small" class="filter-item" placeholder="支付模式" />
        </el-form-item>
        <el-form-item label="支付金额:">
          <el-input v-model="listQuery.payPrice" size="small" class="filter-item" placeholder="支付金额" />
        </el-form-item>
        <el-form-item label="支付积分:">
          <el-input v-model="listQuery.payIntegral" size="small" class="filter-item" placeholder="支付积分" />
        </el-form-item>
        <el-form-item label="支付时间:">
          <el-input v-model="listQuery.payTime" size="small" class="filter-item" placeholder="支付时间" />
        </el-form-item>
        <el-form-item label="订单流水号:">
          <el-input v-model="listQuery.orderNumber" size="small" class="filter-item" placeholder="订单流水号" />
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-input v-model="listQuery.orderSta" size="small" class="filter-item" placeholder="订单状态" />
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
        <el-table-column align="center" label="订单ID">
          <template slot-scope="scope">
            <span>{{ scope.row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容ID">
          <template slot-scope="scope">
            <span>{{ scope.row.conId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容名称">
          <template slot-scope="scope">
            <span>{{ scope.row.conName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="内容类型">
          <template slot-scope="scope">
            <span>{{ scope.row.conType }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支付模式">
          <template slot-scope="scope">
            <span>{{ scope.row.payModel }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支付金额">
          <template slot-scope="scope">
            <span>{{ scope.row.payPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支付积分">
          <template slot-scope="scope">
            <span>{{ scope.row.payIntegral }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支付时间">
          <template slot-scope="scope">
            <span>{{ scope.row.payTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单流水号">
          <template slot-scope="scope">
            <span>{{ scope.row.orderNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="订单状态">
          <template slot-scope="scope">
            <span>{{ scope.row.orderSta }}</span>
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
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" placeholder="请输入订单ID" />
        </el-form-item>
        <el-form-item label="内容ID" prop="conId">
          <el-input v-model="form.conId" placeholder="请输入内容ID" />
        </el-form-item>
        <el-form-item label="内容名称" prop="conName">
          <el-input v-model="form.conName" placeholder="请输入内容名称" />
        </el-form-item>
        <el-form-item label="内容类型" prop="conType">
          <el-input v-model="form.conType" placeholder="请输入内容类型" />
        </el-form-item>
        <el-form-item label="支付模式" prop="payModel">
          <el-input v-model="form.payModel" placeholder="请输入支付模式" />
        </el-form-item>
        <el-form-item label="支付金额" prop="payPrice">
          <el-input v-model="form.payPrice" placeholder="请输入支付金额" />
        </el-form-item>
        <el-form-item label="支付积分" prop="payIntegral">
          <el-input v-model="form.payIntegral" placeholder="请输入支付积分" />
        </el-form-item>
        <el-form-item label="支付时间" prop="payTime">
          <el-input v-model="form.payTime" placeholder="请输入支付时间" />
        </el-form-item>
        <el-form-item label="订单流水号" prop="orderNumber">
          <el-input v-model="form.orderNumber" placeholder="请输入订单流水号" />
        </el-form-item>
        <el-form-item label="订单状态" prop="orderSta">
          <el-input v-model="form.orderSta" placeholder="请输入订单状态" />
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
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="form.orderId" readonly="readonly" />
        </el-form-item>
        <el-form-item label="内容ID" prop="conId">
          <el-input v-model="form.conId" readonly="readonly" />
        </el-form-item>
        <el-form-item label="内容名称" prop="conName">
          <el-input v-model="form.conName" readonly="readonly" />
        </el-form-item>
        <el-form-item label="内容类型" prop="conType">
          <el-input v-model="form.conType" readonly="readonly" />
        </el-form-item>
        <el-form-item label="支付模式" prop="payModel">
          <el-input v-model="form.payModel" readonly="readonly" />
        </el-form-item>
        <el-form-item label="支付金额" prop="payPrice">
          <el-input v-model="form.payPrice" readonly="readonly" />
        </el-form-item>
        <el-form-item label="支付积分" prop="payIntegral">
          <el-input v-model="form.payIntegral" readonly="readonly" />
        </el-form-item>
        <el-form-item label="支付时间" prop="payTime">
          <el-input v-model="form.payTime" readonly="readonly" />
        </el-form-item>
        <el-form-item label="订单流水号" prop="orderNumber">
          <el-input v-model="form.orderNumber" readonly="readonly" />
        </el-form-item>
        <el-form-item label="订单状态" prop="orderSta">
          <el-input v-model="form.orderSta" readonly="readonly" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelView('form')">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj } from '@/api/admin/order'
import MessageNotice from '@/components/Notice/MessageNotice'

export default {
  name: 'Order',
  components: { MessageNotice },
  data() {
    return {
      message: '订单表',
      form: {
        orderId: '',
        conId: '',
        conName: '',
        conType: '',
        payModel: '',
        payPrice: '',
        payIntegral: '',
        payTime: '',
        orderNumber: '',
        orderSta: ''
      },
      rules: {
        orderId: [{
          required: true,
          message: '请输入订单ID',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        conId: [{
          required: true,
          message: '请输入内容ID',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        conName: [{
          required: true,
          message: '请输入内容名称',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        conType: [{
          required: true,
          message: '请输入内容类型',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        payModel: [{
          required: true,
          message: '请输入支付模式',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        payPrice: [{
          required: true,
          message: '请输入支付金额',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        payIntegral: [{
          required: true,
          message: '请输入支付积分',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        payTime: [{
          required: true,
          message: '请输入支付时间',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        orderNumber: [{
          required: true,
          message: '请输入订单流水号',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        orderSta: [{
          required: true,
          message: '请输入订单状态',
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
        orderId: '',
        conId: '',
        conName: '',
        conType: '',
        payModel: '',
        payPrice: '',
        payIntegral: '',
        payTime: '',
        orderNumber: '',
        orderSta: ''
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
      this.listQuery.orderId = undefined
      this.listQuery.conId = undefined
      this.listQuery.conName = undefined
      this.listQuery.conType = undefined
      this.listQuery.payModel = undefined
      this.listQuery.payPrice = undefined
      this.listQuery.payIntegral = undefined
      this.listQuery.payTime = undefined
      this.listQuery.orderNumber = undefined
      this.listQuery.orderSta = undefined
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
      getObj(row.orderId).then(res => {
        const data = res.data
        this.form.orderId = data.orderId
        this.form.conId = data.conId
        this.form.conName = data.conName
        this.form.conType = data.conType
        this.form.payModel = data.payModel
        this.form.payPrice = data.payPrice
        this.form.payIntegral = data.payIntegral
        this.form.payTime = data.payTime
        this.form.orderNumber = data.orderNumber
        this.form.orderSta = data.orderSta
        this.dialogAddOrUpdateVisible = true
        this.dialogStatus = 'update'
      })
    },
    // 查看操作
    handleView(row) {
      getObj(row.orderId).then(res => {
        const data = res.data
        this.form.orderId = data.orderId
        this.form.conId = data.conId
        this.form.conName = data.conName
        this.form.conType = data.conType
        this.form.payModel = data.payModel
        this.form.payPrice = data.payPrice
        this.form.payIntegral = data.payIntegral
        this.form.payTime = data.payTime
        this.form.orderNumber = data.orderNumber
        this.form.orderSta = data.orderSta
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
        delObj(row.orderId).then(() => {
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
        orderId: '',
        conId: '',
        conName: '',
        conType: '',
        payModel: '',
        payPrice: '',
        payIntegral: '',
        payTime: '',
        orderNumber: '',
        orderSta: ''
      }
    }
  }
}
</script>
