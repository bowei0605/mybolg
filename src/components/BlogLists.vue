<template>
  <div>
      <v-row dense class="mx-auto">
          <v-col v-for="(item, i) in blogList" :key="i" cols="12" class="my-3" @click="goBlogInfo(item._id)">
              <v-card :color="item.color" dark>
                  <v-card-title v-text="item.blogTitle"></v-card-title>
                  <v-card-subtitle v-html="item.blogContent" class="text-over"></v-card-subtitle>
                  <v-card-actions class="justify-space-between mr-3">
                    <v-btn text>Listen Now</v-btn>
                    <span>{{ item.updateTime }}</span>
                  </v-card-actions>
              </v-card>
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
      this.getAllBlogs()
    },
    methods: {
      goBlogInfo(blogId){
        console.log(blogId)
        this.$router.push({
          name: 'BlogInfo',
          params: {
            blogId
          }
        })
      },
      getAllBlogs(){
        let appUrl_getAllBlogs =  this.APIUrl.API.api.blogGetInfoByPage
        this.$axios.post(appUrl_getAllBlogs,{
            pageSize: 20,
            page: 1
        }).then(res=>{
            if(res.data.err == 0){
              this.blogList = res.data.list
              console.log(res.data.list)
            }else{
              alert(res.data.msg)
            }
        }).catch(err=>{
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
    max-height: 40px;
  }
</style>