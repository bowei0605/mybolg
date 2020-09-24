<template>
    <div>
        <div class="body-1 mr-3 d-flex justify-space-between">
            <div>{{blogInfo.us}}</div>
            <div @click="editBlog()" class="grey--text" v-if="isAdmin">编辑文章</div>
        </div>
        <div class="mt-1 mr-3 mb-4 grey--text d-flex justify-space-between align-center">
            <div class="body-2">{{blogInfo.updateTime | timeFilters}}</div>
            <div @click="deleteBlogDialog=true"  v-if="isAdmin">删除文章</div>
        </div>
        <div class="text-h6 mb-4 mt-2">{{blogInfo.blogTitle}}</div>
        <div v-html="blogInfo.blogContent"></div>
        <!-- determineDeleteBlog -->
        <v-dialog v-model="deleteBlogDialog" persistent max-width="290">
            <v-card>
                <v-card-title class="title">确定删除此博客？</v-card-title>
                <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn color="primary" rounded text @click="deleteBlogDialog = false">取消</v-btn>
                    <v-btn color="primary" rounded text @click="delBlog()">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            blogInfo:[],
            isAdmin: false,
            deleteBlogDialog: false,
        }
    },
    created () {
        this.getBlogInfo()
        // let color = Math.random().toString(16)
        // color = color.substring(color.length-6)
        // console.log(color)
    },
    methods: {
        // 获取博客的详细信息
        getBlogInfo(){
            let apiUrl_getBlogInfo = this.APIUrl.API.api.blogGetById
            
            this.$axios.post(apiUrl_getBlogInfo,{
                _id : this.$route.query.id
            }).then(res => {
                if(res.data.err == 0){
                    this.blogInfo = res.data.list[0]
                    if(!localStorage.getItem('userName')) return;
                    if(localStorage.getItem('userName') == this.blogInfo.us){
                        this.isAdmin = true
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        },

        // 编辑博客
        editBlog(){
            this.$router.push({
                name: 'EditBlog',
                params: {
                    blogInfo: this.blogInfo
                }
            })
        },

        // 删除博客
        delBlog(){
            // this.blogInfo._id
            let apiUrl_delBlog = this.APIUrl.API.api.blogDel
            this.$axios.post(apiUrl_delBlog,{
                _id: this.blogInfo._id
            }).then(res=>{
                if(res.data.err == 0){
                    console.log('删除成功')
                    this.$router.go(-1)
                }else{
                    console.log('删除失败')
                }
            }).catch(err=>{
                console.log('内部错误')
            })
        },
    },
    filters:{
      timeFilters(value){
          if(!value) return;
        return value.substring(0,10) + ' ' + value.substring(11,19)
      }
    },
}
</script>