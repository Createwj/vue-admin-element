<template>
  <div>
    <el-upload
      v-if="!value"
      class="pic-uploader-component"
      accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
      :action="$http.adornUrl('/admin/file/element')"
      :headers="{Authorization: token }"
      :on-preview="handlePictureCardPreview"
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :before-upload="beforeAvatarUpload"
      :on-progress="handleProgress"
      :data="imageData"
    >
      <i v-if="!showProgress" class="el-icon-plus pic-uploader-icon" />
      <el-progress v-if="showProgress" class="progress" type="circle" :percentage="progressLength" :status="progressStatus" />
    </el-upload>
    <div v-if="value" class="container">
      <a @click="delPic"><img class="delete" src="@/assets/pic_delete.png"></a>
      <img :src="resourcesUrl + value" class="pic">
    </div>
    <span v-if="setWidth" class="pic-limit">图片大小不能超过1MB，图片尺寸为 {{ setWidth }}x{{ setHeight }} px</span>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import request from '@/utils/request'
export default {
  props: {
    value: {
      default: '',
      type: String
    },
    setWidth: {
      default: undefined,
      type: String
    },
    setHeight: {
      default: undefined,
      type: String
    },
    imageData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      progressStatus: '',
      showProgress: false,
      progressLength: 0,
      resourcesUrl: '',
      request,
      token: ''
    }
  },
  created() {
    this.token = getToken()
  },
  methods: {
    // 图片上传
    handleUploadSuccess(response, file, fileList) {
      if (file.response.code === '0000') {
        this.progressStatus = 'success'
        this.showProgress = false
        this.progressLength = 0
        this.$emit('input', file.response.filePath)
      } else {
        this.progressStatus = 'exception'
        this.$emit('input', '')
      }
    },
    // 限制图片上传大小
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 <= 1
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过1MB!')
      } else {
        if (this.setWidth && this.setHeight) {
          const isSize = new Promise((resolve, reject) => {
            const width = parseInt(this.setWidth)
            const height = parseInt(this.setHeight)
            const _URL = window.URL || window.webkitURL
            const img = new Image()
            img.onload = () => {
              const valid = img.width === width && img.height === height
              if (!valid) {
                this.$confirm('您上传的图片尺寸不符合 ' + width + 'px' + height + 'px，上传成功后,图片会出现变形，是否继续上传', '提示', {
                  confirmButtonText: '继续上传',
                  cancelButtonText: '不了，谢谢 ',
                  type: 'warning'
                }).then(
                  () => {
                    resolve()
                  },
                  () => {
                    reject()
                  })
              } else {
                resolve()
              }
            }
            img.src = _URL.createObjectURL(file)
          }).then(
            () => {
              return file
            },
            () => {
              return Promise.reject()
            },
          )
          return isSize
        } else {
          return isLt2M
        }
      }
    },
    delPic() {
      this.$emit('input', '')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleProgress(event, file, fileList) {
      this.progressStatus = ''
      this.showProgress = true
      this.progressLength = parseInt(event.percent)
    }
  }
}
</script>

<style lang="scss">
  .pic-uploader-component .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    .pic-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 148px;
      height: 148px;
      line-height: 148px;
      text-align: center;
    }
  }

  .pic-uploader-component .el-upload:hover {
    border-color: #409EFF;
  }
  .pic-limit{
    display: block;
    font-size: 12px;
    color: red;
    margin-top: 10px;
  }

  .container{
    width: 148px;
    height: 146px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    position: relative;
    .pic {
      width: 148px;
      height: 143px;
      display: block;
    }
  }

  .delete{
    width:20px;
    height:20px;
    border-radius:60%;
    position:absolute;
    top: -10px;
    right: -10px;
  }

  /* 多图片上传 */
.el-upload-list--picture-card .el-upload-list__item {
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin: 0 8px 8px 0;
    display: inline-block;
}

</style>
