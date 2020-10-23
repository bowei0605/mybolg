<template>
  <div>
      <v-row dense class="mx-auto">
        <v-col v-for="(item, i) in blogList" :key="i" cols="12" class="my-3" @click="goBlogInfo(item)" style="cursor:pointer">
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 6 : 2">
                <v-card-title v-text="item.blogTitle" class="primary--text text--darken-4 body-1 text-truncate mr-6 pt-4 pb-2"></v-card-title>
                <v-card-subtitle v-html="item.blogContent" class="text-over no-warp ma-0 "></v-card-subtitle>
                <v-card-actions class="ml-2 justify-space-between">
                  <span class="body-2 grey--text">{{item.us}}</span>
                  <!-- <span class="body-2 grey--text">{{ item.updateTime | timeFilters }}</span> -->
                </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
  </div>
</template>
<script>
  export default {
    data: () => ({
      blogList: [],
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
      goBlogInfo(blog){
        this.$router.push({
          path : './BlogInfo',
          query:{id: blog._id, us: blog.us}
        });
        this.$store.commit('goBlogInfo',{
          blogContent: blog.blogContent,
          blogTitle: blog.blogTitle
        })
      },

      // 获取所有博客
      getAllBlogs(){
        this.$axios.post('/blog/getInfoByPage', {
          pageSize: 20,
          page: 1
        })
        .then(res => {
          if(res.data.err == 0){
            this.blogList = res.data.list
            this.blogList.reverse()
          }else{
            alert(res.data.msg)
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

  @media screen and (min-width: 960px) {
      .text-over /deep/ img:nth-child(1) {
        width: 150px;
        height: 90px;
        display: block;
        position: absolute;
        border-radius: 10px;
        top: 10px;
        right: 10px;
      }

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