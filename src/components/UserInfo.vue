<template>
    <v-card class="mx-auto mt-4">
        <div class="d-flex justify-space-between align-center pt-4">
            <v-card-subtitle class="title py-0">你的资料</v-card-subtitle>
            <v-btn text rounded class="primary--text" @click="goEditUserInfo()">
                <span>编辑资料</span>
            </v-btn>
        </div>
        <v-card-text class="text--primary">
            <div class="mb-2">昵称：{{ user.nickName || "小诸葛"}}</div>
            <div class="mb-2">职位：{{ user.worker || "攻城狮"}}</div>
            <div class="mb-2 text-truncate">Email：{{ user.us || "name@example.com" }}</div>
            <div class="mb-2">个人描述：{{ user.desc || "你还没写个人描述哦" }}</div>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data () {
        return {
            user:{}
        }
    },
    mounted () {
        this.getUserInfo()
    },
    methods: {
        // 获取用户信息
        getUserInfo(){
            this.$axios.post('/user/userGetInfo',{
                us: localStorage.getItem('userName'),
            }).then(res =>{
            if(res.data.err == 0){
                this.user = res.data.list[0]
                console.log(res.data.list[0].headerImg)
                localStorage.setItem('headerImg', res.data.list[0].headerImg || '')
            }
            }).catch(err => {
                console.log('获取用户失败')
            })
        },

        // 前往编辑资料
        goEditUserInfo(){
            this.$router.push('/EditUserInfo')
        },
    }
}
</script>

