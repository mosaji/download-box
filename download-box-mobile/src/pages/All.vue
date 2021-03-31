<template>
  <f7-page hide-bars-on-scroll>
    <f7-navbar title="دانلود شده ها"/>
    <f7-block>
      <DownloadBox v-for="item in $store.getters['socket/all']" :data="item" :key="item.gid"/>
      <Not v-if="!$store.getters['socket/all'].length > 0"/>
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