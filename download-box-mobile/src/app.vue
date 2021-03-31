<template>
  <f7-app :params="f7params" color="pink">
    <f7-statusbar/>
    <f7-login-screen :opened="loginScreenOpened">
      <f7-page login-screen :page-content="false" class="gr">
        <h1 class="text-align-center text-color-white">اتصال به دستگاه</h1>
        <f7-list class="login-input-list">
          <f7-list-input type="email" placeholder="ایمیل خود را وارد کنید" clear-button>
            <f7-icon icon="la la-user" slot="media"></f7-icon>
          </f7-list-input>
          <f7-list-input type="password" placeholder="رمز عبور" clear-button>
            <f7-icon icon="la la-unlock" slot="media"></f7-icon>
          </f7-list-input>
        </f7-list>
        <f7-button raised fill color="white" class="my-button" @click="signIn">ورود</f7-button>
        <div class="full-width">
          <a href>آیا حساب کاربری ندارید؟ ثبت نام!</a>
          <br>
          <a href>فراموشی رمز عبور</a>
        </div>
      </f7-page>
    </f7-login-screen>
    <f7-view url="/" class="safe-areas" v-if="!loginScreenOpened"/>
  </f7-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import routes from './routes.js'

export default {
  data() {
    return {
      f7params: {
        id: 'io.hybride.nodex',
        name: 'Framework7',
        theme: 'ios',
        routes: routes,
      },
      username: '',
      password: '',
      loginScreenOpened: !Boolean(localStorage.getItem('token')),
    }
  },
  methods: {
    signIn() {
      // XHR request
      localStorage.setItem('token', 'TOOOOKKKEEENN')
      this.loginScreenOpened = false
    },
  },
  created() {
    this.$store.dispatch('socket/createConnection').then(() => {
      this.$store.dispatch('socket/globalStat')
      this.$store.dispatch('socket/tellWaiting')
      this.$store.dispatch('socket/tellStopped')
      this.$store.dispatch('socket/tellActive')
    })
  },
}
</script>

<style lang="scss" scoped>
.gr {
  background: linear-gradient(
    138deg,
    rgba(221, 47, 85, 1) 0%,
    rgba(255, 109, 90, 1) 100%
  );
}
h1 {
  padding-top: 15vh;
}
.icon {
  font-size: 1.7rem;
}
</style>

<style lang="scss">
.gr {
  .input-clear-button {
    color: white;
  }
  .my-button {
    color: #e13051 !important;
    width: 20%;
    margin: auto;
    height: 2.3rem;
    line-height: 2.3rem;
    margin-top: 20vh;
  }
  a {
    color: white;
  }
  .full-width {
    margin-top: 2rem;
    line-height: 1.8;
    text-align: center;
  }
  .login-input-list {
    .item-content.item-input {
      margin-left: 1rem;
    }
    ul {
      background: transparent;
      li {
        input,
        i {
          color: white !important;
        }
        input::placeholder {
          color: white;
        }
      }
    }
  }
  .list ul:before,
  .list ul:after {
    background-color: unset;
  }
  input::placeholder {
    color: white;
    font-size: 0.9rem;
  }
}
</style>

