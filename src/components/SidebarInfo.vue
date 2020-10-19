<template>
    <div>
        <v-card class="mx-auto mt-4">
            <v-card-subtitle class="pb-3 title">我的信息</v-card-subtitle>
            <v-card-text class="text--primary">
                <div class="mb-2">昵称：小诸葛</div>
                <div class="mb-2">职位：攻城狮</div>
                <div class="mb-2">现居：广东深圳</div>
                <div class="mb-2">Email：bowei605@gmail.com</div>
                <div class="mb-2">QQ：2504779552</div>
            </v-card-text>
        </v-card>
        <v-card class="mx-auto my-8">
            <v-card-subtitle class="pb-3 title">最新文章</v-card-subtitle>
            <v-card-text class="text--primary">
                <div class="mb-2 blogListClass" v-for="(item,index) in blogList" :key="index"  @click="goBlogInfo(item)" style="cursor:pointer">
                    <v-hover v-slot:default="{ hover }">
                        <div :class="hover ? 'primary--text font-weight-bold' : ''" class="text-truncate">
                            <span class="primary--text font-weight-bold font-italic pr-1">{{index+1}}.</span>{{item.blogTitle}}
                        </div>
                    </v-hover>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                blogList:[],
                user:{}
            }
        },
        mounted () {
            this.getBlogListNewest()
            this.getUserInfo()
        },
        methods:{

            // 获取最新博客
            getBlogListNewest(){
                this.$axios.get('/blog/getInfoByTime')
                .then(res =>{
                    if(res.data.err == 0){
                        this.blogList = res.data.list.slice(0,8)
                    }
                }).catch(err => {
                    console.log('获取信息失败')
                })
            },

            // 获取用户信息
            getUserInfo(){
                this.$axios.post('/user/userGetInfo', {
                    us: localStorage.getItem('userName'),
                    _id: localStorage.getItem('_id')
                }).then(res => {
                    this.user = res.data.list[0]
                    this.user.sex = String(this.user.sex)
                }).catch(err => {
                    console.log(err)
                })
            },

            // 前往博客详情页
            goBlogInfo(blog){
                // console.log(blog)
                this.$router.push('./BlogInfo?id=' + blog._id);
                this.$store.commit('goBlogInfo',{
                    blogContent: blog.blogContent,
                    blogTitle: blog.blogTitle
                })
            },
        },
    }
</script>
