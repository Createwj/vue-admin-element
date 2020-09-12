<template>
  <div>
    <div class="menu-num">{{ unreadMsgNum }}</div>
  </div>
</template>
<script>
export default {
  props: {
    unreadMsgNum: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {

    }
  }
}
</script>
