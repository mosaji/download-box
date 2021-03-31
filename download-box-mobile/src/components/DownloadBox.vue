<template>
  <div class="DownloadBox border-box-no-pad">
    <div class="head">
      <span class="la la-file-sound-o"></span>
      <div>
        <h5>{{ name }}</h5>
        <span>1397-11-4</span>
      </div>
    </div>
    <div class="details">
      <span>{{ speed }} / s</span>
      <span>{{ progress }} %</span>
    </div>
    <f7-progressbar
      :progress="Number(progress)"
      style="width: 93%"
      class="d-block m-auto"
      :color="color"
    />
    <div class="details">
      <span>{{ _bytesToSize(data.completedLength) }} / {{ _bytesToSize(data.totalLength) }}</span>
      <span>{{ time }}</span>
    </div>
    <div class="actions">
      <span class="la la-play" @click="resume"></span>
      <span class="la la-pause" @click="pause"></span>
      <span class="la la-refresh" @click="reDownload"></span>
      <span class="la la-share-alt" @click="getFile"></span>
      <span class="la la-remove" @click="remove"></span>
      <!-- <span class="la la-gear"></span> -->
    </div>
  </div>
</template>

<script>
import path from 'path'
import io from 'socket.io-client'
import config from '@/config'

const socket = io(config.api.socketApiPrefix)

import { bytesToSize } from '@/services/Helper'

const room = '111333'

export default {
  props: {
    data: Object,
  },
  methods: {
    _bytesToSize(byte) {
      return bytesToSize(byte)
    },
    resume() {
      socket.emit('onResume', { room: room, msg: this.data.gid })
    },
    pause() {
      socket.emit('onPause', { room: room, msg: this.data.gid })
    },
    reDownload() {
      socket.emit('addDownload', {
        room: room,
        msg: { url: this.data.files[0].uris[0].uri },
      })
    },
    remove() {
      socket.emit('delete', { room: room, msg: this.data.gid })
    },
    getFile() {},
  },

  computed: {
    name() {
      let name = path.basename(this.data.files[0].path)
      if (!name) {
        let url = this.data.files[0].uris[0].uri
        name = url.substring(url.lastIndexOf('/') + 1)
      }
      return name
    },
    speed() {
      return bytesToSize(this.data.downloadSpeed)
    },
    progress() {
      if (this.data.completedLength == '0') return '0'
      return (
        (this.data.completedLength / this.data.totalLength) *
        100
      ).toFixed(2)
    },
    time() {
      let seconds = parseInt(
        (this.data.totalLength - this.data.completedLength) /
          this.data.downloadSpeed
      )
      let m = parseInt(seconds / 60)
      let h = parseInt(m / 60)
      let s = seconds - parseInt(m * 60)
      m = m - parseInt(h * 60)
      if (!seconds) return '00:00:00'

      return `${h}:${m}:${s}`
    },
    color() {
      if (this.data.status == 'waiting') return 'yellow'
      if (this.data.status == 'paused') return 'yellow'
      if (this.data.status == 'complete') return 'green'
      if (this.data.status == 'active') return 'blue'
    },
  },
}
</script>

<style lang="scss" scoped>
.DownloadBox {
  direction: ltr;
  margin-bottom: 1rem;
  .head {
    padding: 0.5rem;
    display: flex;
    margin-bottom: 1rem;
    & > span {
      font-size: 2.8rem;
      color: #02afce;
    }
    div {
      padding-left: 0.4rem;
      h5 {
        margin: 0;
        width: 75vw;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 1rem;
        margin-bottom: 0.2rem;
        color: #333;
        font-weight: 100;
      }
      span {
        min-width: 2.6rem;
        font-size: 0.9rem;
        color: #bcc1c5;
      }
      h5,
      span {
        font-family: english;
      }
    }
  }
  .details {
    span {
      font-family: english;
    }
    padding: 0 15px;
    color: #bcc1c5;
    display: flex;
    justify-content: space-between;
  }
  .progressbar {
    width: 92%;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    height: 0.4rem;
    border-radius: 1rem;
  }
  .actions {
    background: red;
    padding: 0.5rem;
    display: flex;
    justify-content: space-evenly;
    height: 1.7rem;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid #f3f3f3;
    margin-top: 0.7rem;
    background: #fdfdfd;
    font-size: 1.3rem;
  }
}
</style>
