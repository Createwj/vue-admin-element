<template>
  <div class="app-container calendar-list-container">
    <div class="main-titles">
      <h3>活动表</h3>
      <div class="add-box" style="margin-bottom: 30px">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ $t('table.add') }}
        </el-button>
        <!--<el-button class="filter-item add-btns" size="mini" style="margin-left: 10px;" @click="handleCreate">{{ $t('table.add') }}</el-button>-->
      </div>
    </div>
    <!--<message-notice :message="message" />-->
    <!-- 搜索条件 -->
    <el-form ref="listQuery" :inline="true" :model="listQuery" label-width="90px">
      <div class="filter-container">
        <el-form-item label="活动ID:">
          <el-input v-model="listQuery.activityId" size="small" class="filter-item" placeholder="活动ID" />
        </el-form-item>

        <el-form-item label="活动类型:">
          <el-input v-model="listQuery.activityType" size="small" class="filter-item" placeholder="活动类型" />
        </el-form-item>

        <el-form-item label="是否付费:">
          <el-input v-model="listQuery.isFree" size="small" class="filter-item" placeholder="是否付费" />
        </el-form-item>
        <el-form-item label="录入人:">
          <el-input v-model="listQuery.inputUser" size="small" class="filter-item" placeholder="录入人" />
        </el-form-item>
        <el-form-item label="录入时间:">
          <el-input v-model="listQuery.inputTime" size="small" class="filter-item" placeholder="录入时间" />
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
        <el-table-column align="center" label="活动ID">
          <template slot-scope="scope">
            <span>{{ scope.row.activityId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动名称">
          <template slot-scope="scope">
            <span>{{ scope.row.activityName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动类型">
          <template slot-scope="scope">
            <span>{{ scope.row.activityType }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动图片">
          <template slot-scope="scope">
            <span>{{ scope.row.activityImg }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="开始地点">
          <template slot-scope="scope">
            <span>{{ scope.row.startAddr }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="结束地点">
          <template slot-scope="scope">
            <span>{{ scope.row.endAddr }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="开始时间">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动简介">
          <template slot-scope="scope">
            <span>{{ scope.row.activitySummary }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="限制人数">
          <template slot-scope="scope">
            <span>{{ scope.row.limitNum }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="报名人数">
          <template slot-scope="scope">
            <span>{{ scope.row.applyNum }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动状态">
          <template slot-scope="scope">
            <span>{{ scope.row.activitySta }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="浏览量">
          <template slot-scope="scope">
            <span>{{ scope.row.previewCount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="详情">
          <template slot-scope="scope">
            <span>{{ scope.row.activityDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否付费">
          <template slot-scope="scope">
            <span>{{ scope.row.isFree }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动积分">
          <template slot-scope="scope">
            <span>{{ scope.row.activityIntegral }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动二维码">
          <template slot-scope="scope">
            <span>{{ scope.row.activityQrCode }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="录入人">
          <template slot-scope="scope">
            <span>{{ scope.row.inputUser }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="录入时间">
          <template slot-scope="scope">
            <span>{{ scope.row.inputTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <!--查看-->
            <el-button type="primary" @click="handleView(scope.row)">{{ $t('table.view') }}</el-button>
            <!--编辑-->
            <el-button type="primary" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            <!--删除-->
            <el-button type="primary" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>

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
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="活动ID" prop="activityId">
          <el-input v-model="form.activityId" placeholder="请输入活动ID" />
        </el-form-item>
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="活动类型" prop="activityType">
          <el-input v-model="form.activityType" placeholder="请输入活动类型" />
        </el-form-item>
        <el-form-item label="活动图片" prop="activityImg">
          <el-input v-model="form.activityImg" placeholder="请输入活动图片" />
        </el-form-item>
        <el-form-item label="开始地点" prop="startAddr">
          <el-input v-model="form.startAddr" placeholder="请输入开始地点" />
        </el-form-item>
        <el-form-item label="结束地点" prop="endAddr">
          <el-input v-model="form.endAddr" placeholder="请输入结束地点" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择开始时间"
          />

        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="请输入结束时间"
          />
        </el-form-item>
        <el-form-item label="活动简介" prop="activitySummary">
          <el-input v-model="form.activitySummary" placeholder="请输入活动简介" />
        </el-form-item>
        <el-form-item label="限制人数" prop="limitNum">
          <el-input v-model="form.limitNum" placeholder="请输入限制人数" />
        </el-form-item>
        <el-form-item label="报名人数" prop="applyNum">
          <el-input v-model="form.applyNum" placeholder="请输入报名人数" />
        </el-form-item>
        <el-form-item label="活动状态" prop="activitySta">
          <el-input v-model="form.activitySta" placeholder="请输入活动状态" />
        </el-form-item>
        <el-form-item label="浏览量" prop="previewCount">
          <el-input v-model="form.previewCount" placeholder="请输入浏览量" />
        </el-form-item>
        <el-form-item label="详情" prop="activityDesc">

          <el-input v-model="form.activityDesc" placeholder="请输入详情" />

        </el-form-item>
        <el-form-item label="是否付费" prop="isFree">

          <!--<el-input v-model="form.isFree" placeholder="请输入是否付费" />-->
          <el-radio v-model="form.isFree" label="0">免费</el-radio>
          <el-radio v-model="form.isFree" label="1">付费</el-radio>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="活动积分" prop="activityIntegral">
          <el-input v-model="form.activityIntegral" placeholder="请输入活动积分" />
        </el-form-item>
        <el-form-item label="活动二维码" prop="activityQrCode">

          <el-input v-model="form.activityQrCode" placeholder="请输入活动二维码2" />

          <picUpload :value="form.activityQrCode"/>

        </el-form-item>
        <el-form-item label="录入人" prop="inputUser">
          <el-input v-model="form.inputUser" placeholder="请输入录入人" />
        </el-form-item>
        <el-form-item label="录入时间" prop="inputTime">
          <el-date-picker
            v-model="form.inputTime"
            type="datetime"
            placeholder="请输入录入时间"
          />
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
        <el-form-item label="活动ID" prop="activityId">
          <el-input v-model="form.activityId" readonly="readonly" />
        </el-form-item>
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName" readonly="readonly" />
        </el-form-item>
        <el-form-item label="活动类型" prop="activityType">
          <el-input v-model="form.activityType" readonly="readonly" />
        </el-form-item>
        <el-form-item label="活动图片" prop="activityImg">
          <el-input v-model="form.activityImg" readonly="readonly" />
        </el-form-item>
        <el-form-item label="开始地点" prop="startAddr">
          <el-input v-model="form.startAddr" readonly="readonly" />
        </el-form-item>
        <el-form-item label="结束地点" prop="endAddr">
          <el-input v-model="form.endAddr" readonly="readonly" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <!--<el-input v-model="form.startTime" readonly="readonly" />-->
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            readonly="readonly"
            placeholder="选择开始时间"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            readonly="readonly"
            placeholder="结束时间"
          />
          <!--<el-input v-model="form.endTime" readonly="readonly" />-->
        </el-form-item>
        <el-form-item label="活动简介" prop="activitySummary">
          <el-input v-model="form.activitySummary" readonly="readonly" />
        </el-form-item>
        <el-form-item label="限制人数" prop="limitNum">
          <el-input v-model="form.limitNum" readonly="readonly" />
        </el-form-item>
        <el-form-item label="报名人数" prop="applyNum">
          <el-input v-model="form.applyNum" readonly="readonly" />
        </el-form-item>
        <el-form-item label="活动状态" prop="activitySta">
          <el-input v-model="form.activitySta" readonly="readonly" />
        </el-form-item>
        <el-form-item label="浏览量" prop="previewCount">
          <el-input v-model="form.previewCount" readonly="readonly" />
        </el-form-item>
        <el-form-item label="详情" prop="activityDesc">
          <el-input v-model="form.activityDesc" readonly="readonly" />
        </el-form-item>
        <el-form-item label="是否付费" prop="isFree">
          <el-radio v-model="form.isFree" label="0">免费</el-radio>
          <el-radio v-model="form.isFree" label="1">付费</el-radio>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" readonly="readonly" />
        </el-form-item>
        <el-form-item label="活动积分" prop="activityIntegral">
          <el-input v-model="form.activityIntegral" readonly="readonly" />
        </el-form-item>
        <el-form-item label="活动二维码" prop="activityQrCode">
          <el-input v-model="form.activityQrCode" readonly="readonly" />
        </el-form-item>
        <el-form-item label="录入人" prop="inputUser">
          <el-input v-model="form.inputUser" readonly="readonly" />
        </el-form-item>
        <el-form-item label="录入时间" prop="inputTime">
          <el-date-picker
            v-model="form.inputTime"
            readonly="readonly"
            type="datetime"
            placeholder="结束时间"
          />
          <!--<el-input v-model="form.inputTime" readonly="readonly" />-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelView('form')">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, addObj, getObj, delObj, putObj } from '@/api/admin/activity'
import MessageNotice from '@/components/Notice/MessageNotice'

import picUpload from '@/components/pic-upload/index'

export default {
  name: 'Activity',
  components: { MessageNotice, picUpload },
  data() {
    return {
      message: '活动表',
      form: {
        activityId: '',
        activityName: '',
        activityType: '',
        activityImg: '',
        startAddr: '',
        endAddr: '',
        startTime: '',
        endTime: '',
        activitySummary: '',
        limitNum: '',
        applyNum: '',
        activitySta: '',
        previewCount: '',
        activityDesc: '',
        isFree: 0,
        price: '',
        activityIntegral: '',
        activityQrCode: '',
        inputUser: '',
        inputTime: ''
      },
      rules: {
        activityId: [{
          required: true,
          message: '请输入活动ID',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        activityName: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        activityType: [{
          required: true,
          message: '请输入活动类型',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        activityImg: [{
          required: true,
          message: '请输入活动图片',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        startAddr: [{
          required: true,
          message: '请输入开始地点',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        endAddr: [{
          required: true,
          message: '请输入结束地点',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        startTime: [{
          required: true,
          message: '请输入开始时间',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        endTime: [{
          required: true,
          message: '请输入结束时间',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        activitySummary: [{
          required: true,
          message: '请输入活动简介',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        limitNum: [{
          required: true,
          message: '请输入限制人数',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        applyNum: [{
          required: true,
          message: '请输入报名人数',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        activitySta: [{
          required: true,
          message: '请输入活动状态',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        previewCount: [{
          required: true,
          message: '请输入浏览量',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        activityDesc: [{
          required: true,
          message: '请输入详情',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        isFree: [{
          required: true,
          message: '请输入是否付费',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入价格',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        activityIntegral: [{
          required: true,
          message: '请输入活动积分',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        activityQrCode: [{
          required: true,
          message: '请输入活动二维码',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        inputUser: [{
          required: true,
          message: '请输入录入人',
          trigger: 'blur'
        }, {
          min: 1,
          max: 20,
          message: '长度在 1 到 20 个字符',
          trigger: 'blur'
        }],
        inputTime: [{
          required: true,
          message: '请输入录入时间',
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
        activityId: '',
        activityName: '',
        activityType: '',
        activityImg: '',
        startAddr: '',
        endAddr: '',
        startTime: '',
        endTime: '',
        activitySummary: '',
        limitNum: '',
        applyNum: '',
        activitySta: '',
        previewCount: '',
        activityDesc: '',
        isFree: '',
        price: '',
        activityIntegral: '',
        activityQrCode: '',
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
      page(this.listQuery).then(data => {
        this.dataList = data.data.items
        this.total = data.data.count
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
      this.listQuery.activityId = undefined
      this.listQuery.activityName = undefined
      this.listQuery.activityType = undefined
      this.listQuery.activityImg = undefined
      this.listQuery.startAddr = undefined
      this.listQuery.endAddr = undefined
      this.listQuery.startTime = undefined
      this.listQuery.endTime = undefined
      this.listQuery.activitySummary = undefined
      this.listQuery.limitNum = undefined
      this.listQuery.applyNum = undefined
      this.listQuery.activitySta = undefined
      this.listQuery.previewCount = undefined
      this.listQuery.activityDesc = undefined
      this.listQuery.isFree = undefined
      this.listQuery.price = undefined
      this.listQuery.activityIntegral = undefined
      this.listQuery.activityQrCode = undefined
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
      getObj(row.activityId).then(res => {
        const data = res.data
        this.form.activityId = data.activityId
        this.form.activityName = data.activityName
        this.form.activityType = data.activityType
        this.form.activityImg = data.activityImg
        this.form.startAddr = data.startAddr
        this.form.endAddr = data.endAddr
        this.form.startTime = data.startTime
        this.form.endTime = data.endTime
        this.form.activitySummary = data.activitySummary
        this.form.limitNum = data.limitNum
        this.form.applyNum = data.applyNum
        this.form.activitySta = data.activitySta
        this.form.previewCount = data.previewCount
        this.form.activityDesc = data.activityDesc
        this.form.isFree = data.isFree
        this.form.price = data.price
        this.form.activityIntegral = data.activityIntegral
        this.form.activityQrCode = data.activityQrCode
        this.form.inputUser = data.inputUser
        this.form.inputTime = data.inputTime
        this.dialogAddOrUpdateVisible = true
        this.dialogStatus = 'update'
      })
    },
    // 查看操作
    handleView(row) {
      getObj(row.activityId).then(res => {
        const data = res.data
        this.form.activityId = data.activityId
        this.form.activityName = data.activityName
        this.form.activityType = data.activityType
        this.form.activityImg = data.activityImg
        this.form.startAddr = data.startAddr
        this.form.endAddr = data.endAddr
        this.form.startTime = data.startTime
        this.form.endTime = data.endTime
        this.form.activitySummary = data.activitySummary
        this.form.limitNum = data.limitNum
        this.form.applyNum = data.applyNum
        this.form.activitySta = data.activitySta
        this.form.previewCount = data.previewCount
        this.form.activityDesc = data.activityDesc
        this.form.isFree = data.isFree
        this.form.price = data.price
        this.form.activityIntegral = data.activityIntegral
        this.form.activityQrCode = data.activityQrCode
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
        delObj(row.activityId).then(() => {
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
        activityId: '',
        activityName: '',
        activityType: '',
        activityImg: '',
        startAddr: '',
        endAddr: '',
        startTime: '',
        endTime: '',
        activitySummary: '',
        limitNum: '',
        applyNum: '',
        activitySta: '',
        previewCount: '',
        activityDesc: '',
        isFree: '',
        price: '',
        activityIntegral: '',
        activityQrCode: '',
        inputUser: '',
        inputTime: ''
      }
    }
  }
}
</script>
