<template>
    <div class="black d-flex justify-center align-center" style="height: 100vh; width: 100vw;">
        <div class="loginDiv d-flex justify-space-between">
            <div class="loginText">
                <div class="white--text title">用心创作，与君同行</div>
            </div>
            <div class="loginInput white">
                <div class="mx-10" style="margin-top: 60px">
                    <div class="text-center title pb-12 primary--text font-weight-bold">
                        <span>后台登录</span>
                    </div>
                    <v-text-field label="请输入用户名或者邮箱号" solo v-model="userName"></v-text-field>
                    <v-text-field label="密码" solo v-model="userPwd" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  :type="showPassword ? 'text' : 'password'"></v-text-field>
                    
                    <div class="text-center pt-12">
                        <v-btn class="primary" width="100%" rounded @click="login()">登录</v-btn>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userName: '',
            userPwd: '',
            showPassword: false
        }
    },
    methods:{
        login(){
            let appUrl_login = this.APIUrl.API.api.userLogin;
            this.$axios.post(appUrl_login,{ 
                us: this.userName, 
                ps: this.userPwd
            }).then(res=>{
                if(res.data.err == 0){
                    alert(res.data.msg)
                }else{
                    alert(res.data.msg)
                }
                console.log(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }
    }

}
</script>

<style scoped>
.loginDiv{
    height: 570px; width:760px;
    background: url('../../assets/images/bg.jpg') no-repeat;
    background-size:100% 100%;
}
.loginText,.loginInput{
    display: inline-block;
    width: 380px;
    height: 570px;
}

.loginText{
    background: #00000080;
    padding-top: 120px;
    padding-left: 50px;
}
</style>