<template>
  <div>
    <v-app-bar>
        <v-row justify="center" class="ml-4" align="center">
            <v-col cols="6" sm="8" md="7" xs="0" xl="6" class="pl-0">
                <v-toolbar-title class="font-weight-black primary--text">Bowei</v-toolbar-title>
            </v-col>
            <v-col cols="6" sm="4" md="3" xs="12" xl="2" style="text-align:right;" class="d-flex justify-end align-center">
                <v-btn text color="primary" rounded @click="goEditBlog()">写博客</v-btn>
            </v-col>
        </v-row>
    </v-app-bar>
    <v-main>
        <v-row justify="center" class="mx-4">
            <v-col cols="12" sm="7" md="7" xs="12" xl="6">
              <div v-if="blogList.length == 0" class="primary--text"> 你暂时还没写博客哦 </div>
              <v-row dense class="mx-auto">
                  <v-col v-for="(item, i) in blogList" :key="i" cols="12" class="my-3">
                      <v-card>
                          <v-card-title class="primary--text" v-html="item.blogTitle" @click="goBlogInfo(item)"></v-card-title>
                          <v-card-subtitle v-html="item.blogContent" class="text-over no-warp blogContent ma-0"></v-card-subtitle>
                          <v-card-actions class="justify-space-between mr-3">
                              <v-btn text>Listen Now</v-btn>
                              <span>{{ item.updateTime }}</span>
                          </v-card-actions>
                      </v-card>
                  </v-col>
              </v-row>
            </v-col>
            <v-col cols="0" sm="5" md="3" xs="0" xl="2">
                <v-card class="mx-auto">
                    <v-card-subtitle class="pb-3 title">个人中心</v-card-subtitle>
                    <v-card-text class="text--primary">
                        <div class="mb-2">网名：小诸葛</div>
                        <div class="mb-2">职位：前端攻城狮</div>
                        <div class="mb-2">Email：{{userInfo.us}}</div>
                        <div class="mb-2">QQ：2504779552</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-main>
  </div>
</template>
<script>
  export default {
    data: () => ({
      blogList: [],
      userName: '',
      userInfo: []
    }),
    mounted () {
      this.userName = localStorage.getItem('userName');
      this.getBlogList();
      this.getUserInfo();
    },
    methods: {
      // 获取用户信息
      getUserInfo(){
         let appUrl_getUserInfo = this.APIUrl.API.api.userGetInfo;
         this.$axios.post(appUrl_getUserInfo,{
           us: this.userName
         }).then(res =>{
            if(res.data.err == 0){
              this.userInfo = res.data.list[0]
            }
         }).catch(err => {
           console.log('获取用户失败')
         })
      },

      // 获取博客列表
      getBlogList(){

        let appUrl_getInfoByUs = this.APIUrl.API.api.getInfoByUs;
        this.$axios.post(appUrl_getInfoByUs,{ 
            us: this.userName
        }).then(res=>{
            if(res.data.err == 0){
              this.blogList = res.data.list
              console.log(this.blogList)
            }else{
              alert(res.data.msg)
            }
        }).catch(err=>{
            console.log(err)
        })

      },

      // 前往博客详情页
      goBlogInfo(item){
        var blogId = item._id
        this.$router.push('./BlogInfo?id=' + blogId)
      },

      // 前往编辑博客
      goEditBlog(){
        this.$router.push('/EditBlog')
      },

    }
  }
</script>

<style scoped>
  .text-over{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 20px;
  }
</style>