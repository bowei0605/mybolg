<template>
    <div>
        <div class="text-h6 mb-4">{{blogInfo.blogTitle}}</div>
        <div v-html="blogInfo.blogContent"></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            blogInfo:[]
        }
    },
    mounted () {
        console.log(this.$route.params.blogId)
        this.getBlogInfo()
    },
    methods: {
        getBlogInfo(){
            let apiUrl_getBlogInfo = this.APIUrl.API.api.blogGetById
            this.$axios.post(apiUrl_getBlogInfo,{
                _id : this.$route.params.blogId
            }).then(res => {
                if(res.data.err == 0){
                    this.blogInfo = res.data.list[0]
                    console.log(this.blogInfo)
                }
            }).catch(err => {
                console.log('查询失败')
            })
        }
    }
}
</script>