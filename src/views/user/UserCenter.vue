<template>
  <v-main>
      <v-app-bar app color="white" elevate-on-scroll>
        <HeaderNav />
      </v-app-bar>
      <v-row justify="center" class="mx-4">
          <v-col cols="12" sm="7" md="7" xs="12" xl="6">
            <div v-if="blogList.length == 0" class="primary--text"> 你暂时还没写博客哦 </div>
            <v-row dense class="mx-auto">
                <v-col v-for="(item, i) in blogList" :key="i" cols="12" class="my-3" @click="goBlogInfo(item)" style="cursor:pointer">
                  <v-hover v-slot:default="{ hover }" >
                    <v-card :elevation="hover ? 6 : 2">
                        <v-card-title class="primary--text text--darken-2 body-1" v-html="item.blogTitle"></v-card-title>
                        <v-card-subtitle v-html="item.blogContent" class="text-over no-warp blogContent ma-0"></v-card-subtitle>
                        <v-card-actions class="justify-space-between mr-3">
                            <v-btn text>Listen Now</v-btn>
                            <span class="body-2 grey--text">{{ item.updateTime | timeFilters}}</span>
                        </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
            </v-row>
          </v-col>
          <v-col cols="0" sm="5" md="3" xs="0" xl="2">
              <v-card class="mx-auto mt-4">
                  <div class="d-flex justify-space-between align-center pt-4">
                      <v-card-subtitle class="title py-0">你的资料</v-card-subtitle>
                      <v-btn text rounded class="primary--text" @click="goEditUserInfo()">编辑资料</v-btn>
                  </div>
                  <v-card-text class="text--primary">
                      <div class="mb-2">昵称：{{ user.nickName || "小诸葛"}}</div>
                      <div class="mb-2">职位：{{ user.worker || "攻城狮"}}</div>
                      <div class="mb-2 text-truncate">Email：{{ user.us || "name@example.com" }}</div>
                      <div class="mb-2">个人描述：{{ user.desc || "你还没写个人描述哦" }}</div>
                  </v-card-text>
              </v-card>
          </v-col>
      </v-row>
  </v-main>
</template>
<script>
import HeaderNav from '@/components/HeaderNav'
  export default {
    data: () => ({
      blogList: [],
      user: [],
    }),
    components: {
      HeaderNav
    },
    mounted () {
      this.getBlogList();
      this.getUserInfo();
    },
    filters:{
      timeFilters(value){
        return value.substring(0,10) + ' ' + value.substring(11,19)
      }
    },
    methods: {
      // 获取用户信息
      getUserInfo(){
         this.$axios.post('/user/userGetInfo',{
           us: localStorage.getItem('userName'),
           _id: localStorage.getItem('_id'),
         }).then(res =>{
            if(res.data.err == 0){
              this.user = res.data.list[0]
              localStorage.setItem('headerImg', res.data.list[0].headerImg)
            }
         }).catch(err => {
           console.log('获取用户失败')
         })
      },

      // 获取博客列表
      getBlogList(){
        this.$axios.post('/blog/getInfoByUs',{ 
            us: localStorage.getItem('userName')
        }).then(res=>{
            if(res.data.err == 0){
              this.blogList = res.data.list
            }else{
              alert(res.data.msg)
            }
        }).catch(err=>{
            console.log(err)
        })

      },

      // 前往博客详情页
      goBlogInfo(blog){
        this.$router.push('./BlogInfo?id=' + blog._id);
        this.$store.commit('goBlogInfo',{
          blogContent: blog.blogContent,
          blogTitle: blog.blogTitle
        })
      },

      // 前往编辑博客
      goEditBlog(){
        this.$router.push('/EditBlog')
      },

      // 前往编辑资料页
      goEditUserInfo(){
        console.log(1212)
        this.$router.push('/EditUserInfo')
      }

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