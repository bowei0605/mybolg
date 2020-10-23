<template>
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
</template>
<script>
export default {
    data () {
        return {
            blogList:[]
        }
    },
    mounted () {
        this.getBlogListNewest()
    },
    methods: {
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

        // 前往博客详情页
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
    }
}
</script>
