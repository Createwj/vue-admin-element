<template>
  <div class="app-container calendar-list-container">
    <div class="main-titles">
      <div>商品表</div>
      <br>
      <div class="add-box">
        <el-button type="primary" class="filter-item add-btns" style="margin-left: 10px;" @click="handleCreate">{{ $t('table.add') }}</el-button>
      </div>
    </div>
    <br>
    <!-- 搜索条件 -->
    <el-form ref="listQuery" :inline="true" :model="listQuery" label-width="120px">
      <div class="filter-container">
        <el-form-item label="商品名称:">
          <el-input v-model="listQuery.productName" size="small" class="filter-item" placeholder="商品名称" />
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
        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品图片">
          <template slot-scope="scope">
            <!--            <picUpload v-model="scope.row.productImg" />-->
            <img :src="scope.row.productImg" width="50" height="50" alt="">
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品简介">
          <template slot-scope="scope">
            <span>{{ scope.row.productSummary }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column align="center" label="商品详情">-->
        <!--          <template slot-scope="scope">-->
        <!--            <span>{{ scope.row.productDesc }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column align="center" label="商品价格">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品积分">
          <template slot-scope="scope">
            <span>{{ scope.row.integral }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品库存">
          <template slot-scope="scope">
            <span>{{ scope.row.productNumber }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column align="center" label="商品状态">-->
        <!--          <template slot-scope="scope">-->
        <!--            <span>{{ scope.row.productSta }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <!--            <el-button type="primary" class="filter-item other-btns" @click="handleView(scope.row)">{{ $t('table.view') }}</el-button>-->

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

        <el-form-item label="商品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品图片" prop="productImg">
          <picUpload v-model="form.productImg" />
          <!--          <el-input v-model="form.productImg" placeholder="请输入商品图片" />-->
        </el-form-item>
        <el-form-item label="商品简介" prop="productSummary">
          <el-input v-model="form.productSummary" placeholder="请输入商品简介" />
        </el-form-item>
        <!--<el-form-item label="商品详情" prop="productDesc">-->
        <!--<el-input v-model="form.productDesc" placeholder="请输入商品详情" />-->
        <!--</el-form-item>-->
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入商品价格" />
        </el-form-item>
        <el-form-item label="商品积分" prop="integral">
          <el-input v-model="form.integral" placeholder="请输入商品积分" />
        </el-form-item>
        <el-form-item label="商品库存" prop="productNumber">
          <el-input v-model="form.productNumber" type="number" placeholder="请输入商品库存" />
        </el-form-item>
        <!--        <el-form-item label="商品状态" prop="productSta">-->
        <!--          <el-input v-model="form.productSta" placeholder="请输入商品状态" />-->
        <!--        </el-form-item>-->
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
        <el-form-item label="商品名称" prop="productName">
          <el-input v-model="form.productName" readonly="readonly" />
        </el-form-item>
        <el-form-item label="商品图片" prop="productImg">
          <el-input v-model="form.productImg" readonly="readonly" />
        </el-form-item>
        <el-form-item label="商品简介" prop="productSummary">
          <el-input v-model="form.productSummary" readonly="readonly" />
        </el-form-item>
        <el-form-item label="商品详情" prop="productDesc">
          <el-input v-model="form.productDesc" readonly="readonly" />
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="form.price" readonly="readonly" />
        </el-form-item>
        <el-form-item label="商品积分" prop="integral">
          <el-input v-model="form.integral" readonly="readonly" />
        </el-form-item>
        <el-form-item label="商品库存" prop="productNumber">
          <el-input v-model="form.productNumber" readonly="readonly" />
        </el-form-item>
        <!--        <el-form-item label="商品状态" prop="productSta">-->
        <!--          <el-input v-model="form.productSta" readonly="readonly" />-->
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelView('form')">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj } from '@/api/admin/product'
import picUpload from '@/components/pic-upload/index'
export default {
  name: 'Product',
  components: { picUpload },
  data() {
    return {
      message: '商品表',
      form: {
        productId: '',
        productName: '',
        productImg: '',
        productSummary: '',
        productDesc: '',
        price: '',
        integral: '',
        productNumber: '',
        productSta: '',
        inputUser: '',
        inputTime: ''
      },
      rules: {
        productName: [{
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        }],
        productImg: [{
          required: true,
          message: '请输入商品图片',
          trigger: 'blur'
        }],
        productSummary: [{
          required: true,
          message: '请输入商品简介',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入商品价格',
          trigger: 'blur'
        }],
        integral: [{
          required: true,
          message: '请输入商品积分',
          trigger: 'blur'
        }],
        productNumber: [{
          required: true,
          message: '请输入商品库存',
          trigger: 'blur'
        }],
        productSta: [{
          required: true,
          message: '请输入商品状态',
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
        productId: '',
        productName: '',
        productImg: '',
        productSummary: '',
        productDesc: '',
        price: '',
        integral: '',
        productNumber: '',
        productSta: '',
        inputUser: '',
        inputTime: ''
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
      this.listQuery.productId = undefined
      this.listQuery.productName = undefined
      this.listQuery.productImg = undefined
      this.listQuery.productSummary = undefined
      this.listQuery.productDesc = undefined
      this.listQuery.price = undefined
      this.listQuery.integral = undefined
      this.listQuery.productNumber = undefined
      this.listQuery.productSta = undefined
      this.listQuery.inputUser = undefined
      this.listQuery.inputTime = undefined
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
      getObj(row.productId).then(res => {
        const data = res.data
        this.form.productId = data.productId
        this.form.productName = data.productName
        this.form.productImg = data.productImg
        this.form.productSummary = data.productSummary
        this.form.productDesc = data.productDesc
        this.form.price = data.price
        this.form.integral = data.integral
        this.form.productNumber = data.productNumber
        this.form.productSta = data.productSta
        this.form.inputUser = data.inputUser
        this.form.inputTime = data.inputTime
        this.dialogAddOrUpdateVisible = true
        this.dialogStatus = 'update'
      })
    },
    // 查看操作
    handleView(row) {
      getObj(row.productId).then(res => {
        const data = res.data
        this.form.productId = data.productId
        this.form.productName = data.productName
        this.form.productImg = data.productImg
        this.form.productSummary = data.productSummary
        this.form.productDesc = data.productDesc
        this.form.price = data.price
        this.form.integral = data.integral
        this.form.productNumber = data.productNumber
        this.form.productSta = data.productSta
        this.form.inputUser = data.inputUser
        this.form.inputTime = data.inputTime
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
        delObj(row.productId).then(() => {
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
        productId: '',
        productName: '',
        productImg: '',
        productSummary: '',
        productDesc: '',
        price: '',
        integral: '',
        productNumber: '',
        productSta: '',
        inputUser: '',
        inputTime: ''
      }
    }
  }
}
</script>
