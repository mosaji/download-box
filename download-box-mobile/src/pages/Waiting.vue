<template>
  <f7-page>
    <f7-navbar title="در انتظار دانلود"/>
    <f7-block>
      <DownloadBox v-for="item in $store.state.socket.waiting" :data="item" :key="item.gid"/>
      <Not v-if="!$store.state.socket.waiting.length > 0"/>
    </f7-block>
  </f7-page>
</template>

<script>
import DownloadBox from '@/components/DownloadBox'
import Not from '@/components/NotItem'

export default {
  components: {
    DownloadBox,
    Not,
  },
}
</script>