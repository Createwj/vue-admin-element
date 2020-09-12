<template>
  <div class="notice-content">
    <div class="notice-text">
      <img class="title-icon" src="@/assets/zlaunch-tipsicon.png" alt="">{{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  }

}
</script>

<style>
  .notice-content{
      background: #D5E7FF;
      width: 100%;
      min-height: 50px;
      margin-bottom: 10px;
      margin-top: 18px;
      border-radius: 4px;
  }
  .notice-text{
    width:100%;
    min-height: 50px;
    line-height: 20px;
    background: #f5ead7;
    border: 1px solid rgba(199,154,101,0.6);
    padding:15px 27px;
    box-sizing: border-box;
    display: flex;
    word-break:break-all;
    white-space:pre-wrap;
  }
  .title-icon{
    width:21px;
    height:21px;
    margin-right:8px;
  }
</style>
