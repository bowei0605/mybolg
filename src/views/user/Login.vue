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
                        <v-text-field label="请输入邮箱号" @input="checkLoginInput()" solo v-model="userName"></v-text-field>
                        <v-btn text color="primary" rounded style="position: absolute; right: 0;top:6px" :disabled="getCodeBtnDis" @click="sendCode()" v-if="!isLogin && regStep == 1">{{second?(second+'S后重试'):'获取验证码'}}</v-btn>
                    </div>

                    <v-text-field label="请输入验证码" solo v-model="code" @input="checkNextInput()" v-if="!isLogin  && regStep == 1"></v-text-field>

                    <v-text-field label="密码" v-if="isLogin" solo v-model="userPwd" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  :type="showPassword ? 'text' : 'password'" @input="checkLoginInput()"></v-text-field>
                    <v-text-field label="密码" v-else-if="!isLogin && regStep == 2" solo v-model="userPwd" @click:append="showPassword = !showPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"  :type="showPassword ? 'text' : 'password'"  @input="checkLoginInput()"></v-text-field>
                    
                    <div class="caption primary--text text-end"  v-if="isLogin">
                        <v-btn text rounded color="primary" @click="isLogin = false">还没账号？点击注册</v-btn>
                    </div>
                    <div class="caption primary--text text-end"  v-else>
                        <v-btn text rounded color="primary" @click="isLogin = true">已有账号？点击登录</v-btn>
                    </div>
                    <div class="text-center pt-12">
                        <v-btn class="primary" width="100%" rounded @click="login()" v-if="isLogin" :disabled="loginBtnDis" :loading='loginBtnLoading'>登录</v-btn>
                        <v-btn class="primary" width="100%" rounded @click="verCode()" v-else-if="!isLogin && regStep == 1"  :disabled="nextBtnDis" :loading='nextBtnLoading'>下一步</v-btn>
                        <v-btn class="primary" width="100%" rounded @click="reg()" v-else-if="!isLogin && regStep == 2" :disabled="regBtnDis" :loading='regBtnLoading'>注册</v-btn>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="d-none d-xs-flex loginDivMob">
            
        </div> -->

        <v-dialog v-model="dialog" max-width="290" persistent>
            <v-card>
                <div class="body-1 text-center py-6 grey--text text--darken-2" v-text="dialogText"></div>
                <v-divider></v-divider> 
                <v-btn color="primary" text x-large @click="dialog = false" style="width: 100%; height: 50px;">
                    确定
                </v-btn>
            </v-card>
        </v-dialog>

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
            second: 0,

            nextBtnDis:true,
            nextBtnLoading: false,
            getCodeBtnDis: true,

            regBtnDis:true,
            regBtnLoading: false,

            loginBtnDis:true,
            loginBtnLoading: false,

            dialog: false,
            dialogText: ''
        }
    },
    methods:{

        checkLoginInput(){
            if(this.checkUsername() && this.userPwd){
                this.loginBtnDis = false
                this.regBtnDis = false
            }else{
                this.loginBtnDis = true
                this.regBtnDis = true
            }
        },

        checkNextInput(){
            if(this.checkUsername() && this.code){
                this.nextBtnDis = false
            }else{
                this.nextBtnDis = true
            }
        },

        checkUsername(){
            var myreg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if (!myreg.test(this.userName)) {
                return false
            } else {
                if(this.second == 0){
                    this.getCodeBtnDis = false
                }else{
                    this.getCodeBtnDis = true
                }
                return true
            }
        },

        // 登录页面
        login(){
            this.$axios.post('/user/login',{
                us: this.userName,
                ps: this.userPwd
            }).then(res=>{
                if(res.data.err == 0){
                    localStorage.setItem('userName', this.userName)
                    localStorage.setItem('_id', res.data.list[0]._id)
                    this.$router.replace('/UserCenter')
                }else{
                    this.dialog = true
                    this.dialogText = res.data.msg
                }
            }).catch(err=>{
                console.log(123)
                console.log(err)
            })
        },

        // 发送邮箱验证码
        sendCode(){
            this.$axios.post('/user/getMailCode',{
                mail: this.userName
            }).then(res=>{
                if(res.data.err == 0){
                    this.dialog = true
                    this.dialogText = "已发送验证码，请注意查收"
                    setTimeout(() => {
                        this.dialog = false
                    }, 3000);

                    this.second = 60
                    this.getCodeBtnDis = true
                    clearInterval(tv)
                    var tv = setInterval(() => {
                        --this.second;
                        if(this.second == 0){
                            this.getCodeBtnDis = false
                            clearInterval(tv)
                        }else{
                            this.getCodeBtnDis = true
                        }
                    }, 1000);

                }else{
                    this.dialog = true
                    this.dialogText = res.data.msg
                }
            }).catch(err=>{
                console.log(err)
            })
        },

        // 校验 验证码页面
        verCode(){
            this.$axios.post('/user/verCode',{
                us: this.userName,
                code: this.code
            }).then(res=>{
                if(res.data.err == 0){
                    this.regStep = 2
                    console.log('验证码正确')
                }else{
                    this.dialog = true
                    this.dialogText = '验证码错误'
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        
        // 注册页面
        reg(){
            this.$axios.post('/user/Reg',{      // 请求的方法，请求的接口
                us: this.userName,              // 参数
                ps: this.userPwd,               // 参数
                code: this.code
            }).then(res=>{
                if(res.data.err == 0){
                    this.login()                // 注册成功之后该执行的函数
                }else{
                    console.log('注册失败')     // 注册失败执行的函数
                }
            }).catch(err=>{
                console.log(err)                // 发生错误执行的函数
            })
        },
        
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

.loginDivMob{
    height: 100vh;
    width: 100vw;
    background: url('../../assets/images/bg.jpg') no-repeat;
    background-size: cover;
}
</style>