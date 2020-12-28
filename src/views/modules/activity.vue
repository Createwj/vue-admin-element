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

        <el-form-item label="活动类型:">
          <el-select v-model="listQuery.activityType" placeholder="请选择">
            <el-option
              v-for="item in optionsDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否付费:">
          <el-select v-model="listQuery.isFree" placeholder="请选择">
            <el-option
              v-for="item in optionFree"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!--          <el-input v-model="listQuery.isFree" size="small" class="filter-item" placeholder="是否付费" />-->
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
        <el-table-column align="center" label="活动名称">
          <template slot-scope="scope">
            <span>{{ scope.row.activityName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动类型">
          <template slot-scope="scope">
            <span>{{ optionsDates[scope.row.activityType].label }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column align="center" label="轮播图片">-->
        <!--<template slot-scope="scope" v-for="item in scope.row.activityImg.split(',')">-->
        <!--<img :src="item" alt="" width="30" height="30">-->

        <!--</template>-->
        <!--</el-table-column>-->
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
        <el-table-column align="center" label="浏览量">
          <template slot-scope="scope">
            <span>{{ scope.row.previewCount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否付费">
          <template slot-scope="scope">
            <span>{{ scope.row.isFree === '0' ? '免费' : '付费' }}</span>
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
            <img :src="scope.row.activityQrCode" width="50" height="50" alt="">
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <!--查看-->
            <!--            <el-button type="primary" @click="handleView(scope.row)">{{ $t('table.view') }}</el-button>-->
            <!--编辑-->
            <el-button type="primary" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            <!--删除-->
            <el-button type="danger" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
            <el-button type="success" @click="handleLook(scope.row)">报名成员</el-button>

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
    <el-dialog :title="$t('table.'+textMap[dialogStatus])" :visible.sync="dialogAddOrUpdateVisible" z-index="999" width="80%">
      <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName" placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item label="活动类型" prop="activityType">
          <el-select v-model="form.activityType" placeholder="请选择">
            <el-option
              v-for="item in optionsDate"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!--          <el-input v-model="form.activityType" placeholder="请输入活动类型" />-->
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
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择开始时间"
          />

        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="form.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-form-item label="详情" prop="activityDesc">

          <!--<el-input v-model="form.activityDesc" placeholder="请输入详情" />-->
          <tinymce v-model="form.activityDesc" :height="300" />

        </el-form-item>
        <el-form-item label="轮播图片" prop="activityImg">
          <dropzone
            id="myVueDropzone"
            :url="uploadImgUrl"
            @dropzone-removedFile="dropzoneR"
            @dropzone-success="dropzoneS"
          />
          <!--<el-input v-model="form.activityImg" placeholder="请输入活动图片" />-->
        </el-form-item>

        <el-form-item label="活动二维码" prop="activityQrCode">

          <!--<el-input v-model="form.activityQrCode" placeholder="请输入活动二维码2" />-->
          <!--<el-form-item prop="image_uri" style="margin-bottom: 30px;">-->
          <!--<Upload v-model="postForm.image_uri" />-->
          <!--</el-form-item>-->

          <picUpload v-model="form.activityQrCode" />

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" :loading="saveLoading" type="primary" @click="create('form')">{{ $t('table.confirm') }}
        </el-button>
        <el-button v-else type="primary" :loading="saveLoading" @click="update('form')">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看报名成员" :visible.sync="showPop">
      <h3>活动名称: {{ showDate && showDate[0].activityName }}</h3>
      <div v-for="(item, index) in showDate" :key="index">
        <div class="flex_box">
          <div class="user_name">{{ item.memberName }}</div>
          <div class="avatar"> <img :src="item.memberPhoto" width="50" height="50" alt=""></div>
        </div>
      </div>
    </el-dialog>
    <!-- 查看窗口 -->
    <el-dialog :title="$t('table.'+textMap[dialogStatus])" :visible.sync="dialogInfoVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName" readonly="readonly" />
        </el-form-item>
        <el-form-item label="活动类型" prop="activityType">
          <el-input v-model="form.activityType" readonly="readonly" />
        </el-form-item>
        <el-form-item label="轮播图片" prop="activityImg">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelView('form')">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { page, addObj, getObj, delObj, putObj, interpage } from '@/api/admin/activity'
// import MessageNotice from '@/components/Notice/MessageNotice'
import Dropzone from '@/components/Dropzone'
import picUpload from '@/components/pic-upload/index'
import { ajaxUrl } from '@/utils/request'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'Activity',
  components: { picUpload, Tinymce, Dropzone },
  data() {
    return {
      showDate: [{activityName: ''}],
      showPop: false,
      optionFree: [{
        value: '0',
        label: '免费'
      }, {
        value: '1',
        label: '付费'
      }],
      optionFrees: [{
        value: '9',
        label: '免费'
      },
      {
        value: '0',
        label: '免费'
      }, {
        value: '1',
        label: '付费'
      }],
      optionsDate: [{
        value: 1,
        label: '初级组'
      }, {
        value: 2,
        label: '中级组'
      }, {
        value: 3,
        label: '高级组'
      }, {
        value: 4,
        label: '专业组'
      }, {
        value: 5,
        label: '比赛组'
      }],
      optionsDates: [
        {
          value: 0,
          label: '初级组'
        },
        {
          value: 1,
          label: '初级组'
        }, {
          value: 2,
          label: '中级组'
        }, {
          value: 3,
          label: '高级组'
        }, {
          value: 4,
          label: '专业组'
        }, {
          value: 5,
          label: '比赛组'
        }],
      imgList: [],
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
        activityName: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }],
        activityType: [{
          required: true,
          message: '请输入活动类型',
          trigger: 'blur'
        }],
        activityImg: [{
          required: true,
          message: '请输入轮播图片',
          trigger: 'blur'
        }],
        startAddr: [{
          required: true,
          message: '请输入开始地点',
          trigger: 'blur'
        }],
        endAddr: [{
          required: true,
          message: '请输入结束地点',
          trigger: 'blur'
        }],
        startTime: [{
          required: true,
          message: '请输入开始时间',
          trigger: 'blur'
        }],
        endTime: [{
          required: true,
          message: '请输入结束时间',
          trigger: 'blur'
        }],
        activitySummary: [{
          required: true,
          message: '请输入活动简介',
          trigger: 'blur'
        }],
        limitNum: [{
          required: true,
          message: '请输入限制人数',
          trigger: 'blur'
        }],
        previewCount: [{
          required: true,
          message: '请输入浏览量',
          trigger: 'blur'
        }],
        activityDesc: [{
          required: true,
          message: '请输入详情',
          trigger: 'blur'
        }],
        isFree: [{
          required: true,
          message: '请输入是否付费',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入价格',
          trigger: 'blur'
        }],
        activityIntegral: [{
          required: true,
          message: '请输入活动积分',
          trigger: 'blur'
        }],
        activityQrCode: [{
          required: true,
          message: '请输入活动二维码',
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
      tableKey: 0,
      uploadImgUrl: ajaxUrl + '/admin/file/element'
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
    handleLook(row) {
      console.log('')
      interpage({ page: 1, limit: 100, activityId: row.activityId }).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.showPop = true
          this.showDate = res.data && res.data.items
        }
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
    },
    // 上传
    dropzoneS(file) {
      this.imgList.push(JSON.parse(file.xhr.response).data.filePath)

      this.form.activityImg = this.imgList.join(',')

      console.log('新增图片的数组')
      console.log(this.form.activityImg)

      this.$message({ message: 'Upload success', type: 'success' })
    },
    // 移除
    dropzoneR(file) {
      // 获取元素在数组的下标
      Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val)	{
            return i
          }
        }
        return -1
      }

      // 根据数组的下标，删除该下标的元素
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val)
        if (index > -1) {
          this.splice(index, 1)
        }
      }

      const del = JSON.parse(file.xhr.response).data.filePath
      const arr = this.imgList
      arr.remove(del)
      this.form.activityImg = arr.join(',')

      console.log('删除图片之后剩余的数组')
      console.log(this.form.activityImg)

      this.$message({ message: 'Delete success', type: 'success' })
    }
  }
}
</script>
<style scoped lang="scss">
  .flex_box {
    display: flex;
    .user_name {

    }
    .avatar {

    }
  }
</style>
