<template>
    <div>
        <div class="d-flex justify-space-between align-center mb-5">
            <div class="d-flex align-center">
                <img :src="blogHeaderImg?this.$axios.defaults.baseURL+blogHeaderImg:require('@/assets/images/head.jpg')" alt="头像" style="border-radius: 50%;" class="mr-4" max-width="50px" height="50px" />
                <div class="body-1">
                    <div>{{blogInfo.us}}</div>
                    <div  class="grey--text">{{blogInfo.updateTime | timeFilters}}</div>
                </div>
            </div>
            <div class="mt-1 mr-3 mb-4 grey--text">
                <div @click="editBlog()" class="grey--text mr-auto" v-if="isAdmin">编辑文章</div>
                <div @click="deleteBlogDialog=true"  v-if="isAdmin">删除文章</div>
            </div>
        </div>

        <div class="primary--text text--darken-2 text-h6 mb-4 mt-2 ">{{ $store.state.isBlogInfo == ''?$store.state.isBlogInfo.blogTitle:blogInfo.blogTitle}}</div>
        <div v-html="$store.state.isBlogInfo == ''? $store.state.isBlogInfo.blogContent:blogInfo.blogContent" class="blogContent"></div>

        <div class="mt-12">
            <div class="mb-4 d-flex justify-center" v-if="!userName">
                <v-btn color="white primary--text">登录才能发表评论哦</v-btn>
            </div>

            <div class="d-flex" v-else>
                <img :src="userHeaderImg?$axios.defaults.baseURL+userHeaderImg:require('@/assets/images/head.jpg')" alt="头像" max-width="50" height="50" style="border-radius: 50%; margin-right: 10px" />
                <v-text-field solo label="留下你的神评" v-model="commentContent" v-on:keyup.enter="publishComment()"></v-text-field>
                <v-btn height="48" large color='white primary--text' @click="publishComment()">发表</v-btn>
            </div>
        </div>

        <div class="d-flex align-center">
            <div class="primary mr-2" style="width: 5px;height:20px;border-radius: 2px;"></div>
            全部评论<span class="pl-2 caption">{{commentInfo.length}}</span>
        </div>

        <div class="my-6">
            <div v-for="(item, index) in commentInfo.slice(0, 5*page)" :key="index">
                <div class="body-2">{{item.us}}</div>
                <div class="grey--text caption mb-1">{{item.commentTime  | timeFilters}}</div>
                <div>{{item.commentContent}}</div>
                <v-divider class="my-6"></v-divider>
            </div>
        </div>

        <div class="d-flex justify-center mb-16">
            <v-btn text color="primary" rounded @click="getMoreComments()"  v-if="5*page<commentInfo.length">点击查看更多评论</v-btn>
            <v-btn text color="primary" rounded @click="getMoreComments()"  v-else-if="commentInfo.length == 0">快来坐沙发吧</v-btn>
            <v-btn text color="primary" rounded v-else-if="commentInfo.length<5">我也是有底线的！</v-btn>
            <v-btn text color="primary" rounded @click="showMoreComments()" v-else>收起评论</v-btn>
        </div>

        <v-dialog v-model="deleteBlogDialog" persistent max-width="290">
            <v-card>
                <v-card-title class="title">确定删除此博客？</v-card-title>
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
            userName:'',
            commentContent:'',
            commentInfo:'',
            page: 1,
            _id: '',
            blogHeaderImg:'',
            userHeaderImg:'',
        }
    },
    filters:{
      timeFilters(value){
        if(!value) return;
        return value.substring(0,10) + ' ' + value.substring(11,19)
      }
    },
    mounted () {
        this.userName = localStorage.getItem('userName');
        this.userHeaderImg = localStorage.getItem('headerImg');
        this.getBlogInfo()
        this.getComment()
    },
    watch: {
        '$route'(to, from){
            this.getBlogInfo()
        }
    },
    methods: {

        // 获取用户信息
        getUserInfo(){
            this.$axios.post('/user/userGetInfo', {
                us: this.blogInfo.us,
            }).then(res => {
                this.blogHeaderImg = res.data.list[0].headerImg
            }).catch(err => {
                console.log(err)
            })
        },

        // 获取博客的详细信息
        getBlogInfo(){
            this.$axios.post('/blog/getBlogById',{
                _id : this.$route.query.id
            }).then(res => {
                if(res.data.err == 0){
                    this.blogInfo = res.data.list[0]
                    this.getUserInfo()
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
            this.$axios.post('/blog/del',{
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

        // 发表评论
        publishComment(){
            this.$axios.post('/comment/publish', {
                us: this.userName,
                blogId: this.$route.query.id,
                commentContent: this.commentContent,
            }).then(res =>{
                if(res.data.err == 0){
                    console.log('发表成功')
                    this.commentContent = ''
                    this.getComment()
                }else{
                    console.log('发表成功')
                }
            }).catch(err => {
                console.log('发表失败')
            })
        },

        // 查询评论
        getComment(){
            this.$axios.post('/comment/getInfoById', {
                blogId: this.$route.query.id
            }).then(res => {
                if(res.data.err == 0){
                    this.commentInfo = res.data.list
                    console.log(this.commentInfo)
                    this.commentInfo.reverse()
                }
            }).catch(err => {
                console.log('内部错误')
            })
        },

        // 点击查看更多评论
        getMoreComments(){
            this.page ++
        },

        // 收起列表
        showMoreComments(){
            this.page = 1
        }

    },
}
</script>

<style>
    .blogContent img{
        width: 100%;
        border-radius: 10px;
    }
</style>
