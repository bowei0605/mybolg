<template>
    <div>
        <v-card class="mx-auto mt-4">
            <v-card-subtitle class="pb-3 title">我的信息</v-card-subtitle>
            <v-card-text class="text--primary">
                <div class="mb-2">网名：小诸葛</div>
                <div class="mb-2">职位：前端攻城狮</div>
                <div class="mb-2">现居：广东深圳</div>
                <div class="mb-2">Email：bowei0605@163.com</div>
                <div class="mb-2">QQ：2504779552</div>
            </v-card-text>
        </v-card>
        <!-- <v-card class="mx-auto my-8">
            <v-card-subtitle class="pb-3 title">热门文章</v-card-subtitle>
            <v-card-text class="text--primary">
                <div class="mb-2 blogListClass" v-for="(item,index) in blogList" :key="index">
                    <v-hover v-slot:default="{ hover }">
                        <div :class="hover ? 'primary--text font-weight-bold' : ''">
                            <span class="primary--text font-weight-bold font-italic pr-1">{{index+1}}.</span>{{item.title}}
                        </div>
                    </v-hover>
                </div>
            </v-card-text>
        </v-card> -->
        <v-card class="mx-auto my-8">
            <v-card-subtitle class="pb-3 title">最新文章</v-card-subtitle>
            <v-card-text class="text--primary">
                <div class="mb-2 blogListClass" v-for="(item,index) in blogList" :key="index">
                    <v-hover v-slot:default="{ hover }">
                        <div :class="hover ? 'primary--text font-weight-bold' : ''">
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
                blogList:[]
            }
        },
        mounted () {
            this.getBlogListNewest()
        },
        methods:{
            // 获取最新博客
            getBlogListNewest(){
                this.$axios.get('/blog/getInfoByTime')
                .then(res =>{
                    if(res.data.err == 0){
                        this.blogList = res.data.list
                    }
                }).catch(err => {
                    console.log('获取信息失败')
                })
            }
        },
    }
</script>
