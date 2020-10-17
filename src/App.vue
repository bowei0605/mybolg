<template>
  <v-app>
    <router-view />
  </v-app>
</template>
<script>
export default {
  mounted () {
    // this._isMobile()
  },
  methods: {
    // _isMobile() {
      // let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      // console.log(flag)
      // console.log(flag[0] == 'iPad')
      // if(flag[0] == 'iPhone' || flag[0] == 'Android'){
      //   this.$store.state.isMobilePhone
      // }
      // return flag;
    // }
  }
}
</script>
