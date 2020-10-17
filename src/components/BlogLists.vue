<template>
  <div>
      <v-row dense class="mx-auto">
        <v-col v-for="(item, i) in blogList" :key="i" cols="12" class="my-3"  @click="goBlogInfo(item)">
          <v-hover v-slot:default="{ hover }" >
            <v-card :elevation="hover ? 6 : 2">
                <v-card-title v-text="item.blogTitle" class="primary--text text--darken-4 body-1"></v-card-title>
                <v-card-subtitle v-html="item.blogContent" class="text-over no-warp blogContent ma-0 py-0"></v-card-subtitle>
                <v-card-actions class="justify-space-between mr-3">
                  <v-btn text>Listen Now</v-btn>
                  <span class="body-2 grey--text">{{ item.updateTime | timeFilters }}</span>
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
        this.$router.push('./BlogInfo?id=' + blog._id);
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