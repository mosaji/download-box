<template>
  <f7-page>
    <div class="profile">
      <img src="http://www.onecenter.in/wp-content/uploads/2018/07/face.png" width="30%">
      <p>علی مسجی بنه کهل</p>
      <span>تهران - ایران</span>
    </div>
    <f7-block>
      <p class="text-align-center">.: آمار و اطلاعات :.</p>
      <f7-row>
        <f7-col width="50">
          <CountBox
            text="سرعت دانلود"
            icon="la la-dashboard"
            :count="_bytesToSize($store.state.socket.globalStat.downloadSpeed)"
          />
        </f7-col>
        <f7-col width="50">
          <CountBox
            text="در انتظار"
            icon="la la-clock-o"
            :count="$store.state.socket.globalStat.numWaiting"
          />
        </f7-col>
        <f7-col width="50">
          <CountBox
            text="درحال دانلود"
            icon="la la-clock-o"
            :count="$store.state.socket.globalStat.numActive"
          />
        </f7-col>
        <f7-col width="50">
          <CountBox
            text="کل دانلود ها"
            icon="la la-warning"
            :count="$store.getters['socket/all'].length"
          />
        </f7-col>
      </f7-row>
      <div class="storage">
        <p>.: ظرفیت دستگاه :.</p>
        <div class="border-box pr-wrapper">
          <f7-progressbar color="pink" :progress="30"></f7-progressbar>
          <span>30%</span>
        </div>
      </div>
    </f7-block>
  </f7-page>
</template>

<script>
import CountBox from '@/components/CountBox'
import { bytesToSize } from '@/services/Helper'

export default {
  components: {
    CountBox,
  },
  methods: {
    _bytesToSize(byte) {
      return bytesToSize(byte)
    },
  },
}
</script>

<style lang="scss" scoped>
.storage {
  p {
    text-align: center;
  }
  .pr-wrapper {
    height: 1.8rem;
    display: flex;
    align-items: center;
    span {
      padding-right: 0.6rem;
    }
  }
}

.profile {
  background: rgb(255, 109, 90);
  background: linear-gradient(
    138deg,
    rgba(255, 109, 90, 1) 0%,
    rgba(245, 90, 89, 1) 30%,
    rgba(221, 47, 85, 1) 100%
  );
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: white;
  height: 35vh;
  img {
    border: 5px solid rgba(255, 255, 255, 0.42);
    border-radius: 50%;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.271);
  }
  p {
    font-weight: normal;
    margin-top: 0.7rem;
    margin-bottom: 0.2rem;
  }
  span {
    font-size: 12px;
  }
}
</style>

