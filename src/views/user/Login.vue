<template>
    <div class="black d-flex justify-center align-center" style="height: 100vh; width: 100vw;">
        <div class="loginDiv d-flex justify-space-between">
            <div class="loginText">
                <div class="white--text title">用心创作，与君同行</div>
            </div>
            <div class="loginInput white">
                <div class="mx-10" style="margin-top: 70px">
                    <div class="text-center title pb-12 primary--text font-weight-bold">
                        <span>{{isLogin?'登录账号':'注册账号'}}</span>
                    </div>

                    <div style="position: relative;">
                        <v-text-field label="请输入邮箱号" solo v-model="userName"></v-text-field>
                        <v-btn text color="primary" rounded style="position: absolute; right: 0;top:6px" :disabled="second != 0" @click="sendCode()" v-if="!isLogin">{{second?(second+'S后重试'):'获取验证码'}}</v-btn>
                    </div>

                    <v-text-field label="请输入验证码" solo v-model="code" v-if="!isLogin  && regStep == 1"></v-text-field>

                    <v-text-field label="密码" v-if="isLogin" solo v-model="userPwd" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  :type="showPassword ? 'text' : 'password'"></v-text-field>
                    <v-text-field label="密码" v-else-if="!isLogin && regStep == 2" solo v-model="userPwd" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  :type="showPassword ? 'text' : 'password'"></v-text-field>
                    
                    <div class="caption primary--text text-end"  v-if="isLogin">
                        <v-btn text rounded color="primary" @click="isLogin = false">还没账号？点击注册</v-btn>
                    </div>
                    <div class="caption primary--text text-end"  v-else>
                        <v-btn text rounded color="primary" @click="isLogin = true">已有账号？点击登录</v-btn>
                    </div>
                    <div class="text-center pt-12">
                        <v-btn class="primary" width="100%" rounded @click="login()" v-if="isLogin">登录</v-btn>
                        <v-btn class="primary" width="100%" rounded @click="verCode()" v-else-if="!isLogin && regStep == 1">下一步</v-btn>
                        <v-btn class="primary" width="100%" rounded @click="reg()" v-else-if="!isLogin && regStep == 2">注册</v-btn>
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
            showPassword: false,
            
            isLogin: true,
            code: '',

            regStep: 1,
            second: 0
        }
    },
    methods:{
        // 登录页面
        login(){
            let appUrl_login = this.APIUrl.API.api.userLogin;
            this.$axios.post(appUrl_login,{
                us: this.userName,
                ps: this.userPwd
            }).then(res=>{
                if(res.data.err == 0){
                    localStorage.setItem('userName', this.userName)
                    this.$router.replace('/UserCenter')
                    console.log('登录成功')
                }else{
                    alert(res.data.msg)
                }
            }).catch(err=>{
                console.log(123)
                console.log(err)
            })
        },

        // 发送邮箱验证码
        sendCode(){

            let appUrl_getCode = this.APIUrl.API.api.userGetMailCode;
            this.$axios.post(appUrl_getCode,{
                mail: this.userName
            }).then(res=>{
                if(res.data.err == 0){
                    console.log('发送成功')

                    this.second = 60
                    clearInterval(tv)
                    var tv = setInterval(() => {
                        this.second--;
                        if(this.second == 0){
                            clearInterval(tv)
                        }
                    }, 1000);

                }else{
                    console.log('发送失败')
                }
                console.log(res.data)
            }).catch(err=>{
                console.log(err)
            })
        },

        // 校验 验证码页面
        verCode(){
            //userGetVerCode
            let appUrl_verCode = this.APIUrl.API.api.userGetVerCode;
            this.$axios.post(appUrl_verCode,{
                us: this.userName,
                code: this.code
            }).then(res=>{
                if(res.data.err == 0){
                    this.regStep = 2
                    console.log('验证码正确')
                }else{
                    console.log('验证码错误')
                }
                console.log(res.data)
            }).catch(err=>{
                console.log(err)
            })
        },
        
        // 注册页面
        reg(){
            //userReg
            let appUrl_reg = this.APIUrl.API.api.userReg;
            this.$axios.post(appUrl_reg,{
                us: this.userName,
                ps: this.userPwd
            }).then(res=>{
                if(res.data.err == 0){
                    console.log('注册成功')
                    this.login()
                }else{
                    console.log('注册失败')
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
    width: 100%;
    height: 570px;
}

.loginText{
    background: #00000080;
    padding-top: 120px;
    padding-left: 50px;
}
</style>