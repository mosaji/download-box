<template>
  <f7-page :page-content="false">
    <f7-toolbar bottom tabbar>
      <f7-link
        v-for="tab in tabs"
        :tab-link="'#' + tab.tabLink"
        :tab-link-active="tab.tabLinkActive"
        :key="tab.badge + tab.path"
      >
        <f7-icon :class="tab.icon">
          <f7-badge
            color="pink"
            v-if="tab.badge && $store.state.socket.globalStat[tab.badge] > 0"
          >{{ $store.state.socket.globalStat[tab.badge] }}</f7-badge>
        </f7-icon>
      </f7-link>
    </f7-toolbar>
    <f7-tabs swipeable>
      <f7-tab v-for="tab in tabs" :id="tab.tabLink" :tab-active="tab.tabActive" :key="tab.tabLink">
        <f7-view :url="tab.path"/>
      </f7-tab>
    </f7-tabs>
    <f7-sheet
      class="demo-sheet"
      :opened="sheetOpened"
      @sheet:closed="sheetOpened = false"
      closeByOutsideClick
      backdrop
    >
      <f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Close</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <f7-block>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ducimus dolorum ipsa aliquid accusamus perferendis laboriosam delectus numquam minima animi, libero illo in tempora harum sequi corporis alias ex adipisci...</p>
          <!-- ... -->
        </f7-block>
      </f7-page-content>
    </f7-sheet>
    <f7-fab position="right-bottom" slot="fixed" color="pink" id="allActions">
      <f7-icon icon="la  la-bell" style="font-size: 1.5rem"></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button label="اضافه کردن دانلود" @click="sheetOpened = !sheetOpened" fab-close>
          <f7-icon icon="la la-plus"></f7-icon>
        </f7-fab-button>
        <f7-fab-button label="ادامه همه">
          <f7-icon icon="la la-play"></f7-icon>
        </f7-fab-button>
        <f7-fab-button label="توقف همه">
          <f7-icon icon="la la-pause"></f7-icon>
        </f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>
  </f7-page>
</template>
      

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    onPageBeforeOut() {
      const self = this
      self.$f7.sheet.close()
    },
    onPageBeforeRemove() {
      const self = this
      if (self.sheet) self.sheet.destroy()
    },
  },
  data() {
    return {
      sheetOpened: false,
      tabs: [
        {
          path: '/dashboard',
          icon: 'la la-home',
          tabLink: 'tab-1',
          tabLinkActive: true,
          tabActive: true,
        },
        {
          path: '/waiting',
          icon: 'la la-hourglass-half',
          tabLink: 'tab-2',
          badge: 'numWaiting',
        },
        {
          path: '/downloading',
          icon: 'la la-rocket',
          tabLink: 'tab-3',
          badge: 'numActive',
        },
        {
          path: '/downloaded',
          icon: 'la la-clock-o',
          tabLink: 'tab-4',
          badge: 'numStopped',
        },
        {
          path: '/all',
          icon: 'la la-database',
          tabLink: 'tab-5',
        },
      ],
    }
  },
}
</script>