<template>
    <v-card class="mx-auto mt-4">
        <div class="d-flex justify-space-between align-center pt-4">
            <v-card-subtitle class="title py-0">博主信息</v-card-subtitle>
            <v-btn text rounded class="primary--text" @click="goEditUserInfo()" v-if="$route.query.us == user">编辑资料</v-btn>
        </div>
        <v-card-text class="text--primary">
            <div class="mb-2">昵称：{{ blogerInfo.nickName || "小诸葛"}}</div>
            <div class="mb-2">职位：{{ blogerInfo.worker || "攻城狮"}}</div>
            <div class="mb-2 text-truncate">Email：{{ blogerInfo.us || "name@example.com" }}</div>
            <div class="mb-2">个人描述：{{ blogerInfo.desc || "他还没写个人描述哦" }}</div>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data () {
        return {
            blogerInfo:{},
            user:'',
            bloger:''
        }
    },
    mounted () {
        this.getUserInfo()
        this.user = localStorage.getItem('userName')
        this.bloger = this.$route.query.us
    },
    watch: {
        '$route' (to, from) {
            this.getUserInfo()
        }
    },
    methods: {
        // 获取用户信息
        getUserInfo(){
            console.log(this.$route.query.us)
            this.$axios.post('/user/userGetInfo',{
                us : this.$route.query.us,
            }).then(res =>{
            if(res.data.err == 0){
                this.blogerInfo = res.data.list[0]
                console.log(res.data.list[0].headerImg)
                localStorage.setItem('headerImg', res.data.list[0].headerImg || '')
            }
            }).catch(err => {
                console.log('获取用户失败')
            })
        },
    }
}
</script>

