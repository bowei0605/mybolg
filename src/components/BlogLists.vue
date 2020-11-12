<template>
  <div class="pb-6">
      <v-row dense class="mx-auto">
        <v-col v-for="(item, i) in blogList" :key="i" cols="12" class="my-3" @click="goBlogInfo(item)" style="cursor:pointer">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 6 : 2" class="py-2">
                <v-card-actions class="mx-2 justify-space-between">
                  <div class="d-flex align-center">
                    <img :src="item.user.headerImg?$axios.defaults.baseURL+item.user.headerImg:require('../assets/images/head.jpg')" style="width: 25px; border-radius: 50%;" />
                    <span class="ml-2 grey--text">{{ item.user.nickName || item.user.us }}</span>
                  </div>
                  <span class="body-2 grey--text">{{ item.blog.updateTime | timeFilters }}</span>
                </v-card-actions>
                <v-card-title v-text="item.blog.blogTitle" class="primary--text text--darken-4 body-1 text-truncate py-0 mr-6 py-2"></v-card-title>
                <v-card-subtitle v-html="item.blog.blogContent" class="text-over no-warp ma-0 pb-3 "></v-card-subtitle>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
      <div class="d-flex justify-center">
        <v-btn rounded color='primary' width="60%" class="mt-3" @click="getAllBlogs()" v-if="getBlogNum">获取更多</v-btn>
        <div v-else-if='getBlogNum == 0' class="primary--text">没有更多啦！！！</div>
      </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      blogList: [],
      i: 1,
      getBlogNum: 1
    }),
    mounted () {
      this.getAllBlogs();
    },
    filters:{
      timeFilters(value){
        return value.substring(0,10) + ' ' + value.substring(11,19)
      }
    },
    methods: {
      // 博客详情
      goBlogInfo(item){
        this.$router.push({
          path : './BlogInfo',
          query:{id: item.blog._id, us: item.blog.us}
        });
        this.$store.commit('goBlogInfo',{
          blogContent: item.blog.blogContent,
          blogTitle: item.blog.blogTitle
        })
      },

      // 分页查询
      getAllBlogs(){
        this.$axios.post('/blog/getInfoByPage', {
          pageSize: 10,
          page: this.i
        })
        .then(res => {
          if(res.data.err == 0){
            // 返回的数据 博客列表的数据和用户列表的数据(单独的)
            console.log(res.data.blogLists)

            this.blogList = [...this.blogList, ...res.data.blogLists]
            this.blogList.reverse()
            this.i++;
            // console.log(this.blogList)
          }else{
            this.getBlogNum = 0;
          }
        })
        .catch(err=>{
          console.log(err)
        })
      },
    }
  }
</script>

<style scoped>
  .text-over{
    overflow: hidden;
    max-height: 26px;
  }

  .text-over /deep/ img{
    display: none;
  }

  .text-over /deep/ p{
    font-size: 14px !important;
    font-weight: normal !important;
    margin: 0;
  }

  .text-over /deep/ span{
    font-size: 14px !important;
    font-weight: normal !important;
    margin: 0;
  }

  .text-over /deep/ strong{
    font-size: 14px !important;
    font-weight: normal !important;
    margin: 0;
  }

  .text-over /deep/ h1+h2+h3+h4+h5{
    font-size: 14px !important;
    font-weight: normal !important;
  }

</style>