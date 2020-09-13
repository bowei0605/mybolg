<template>
    <v-row justify="center" class="ml-4" align="center">
        <v-col cols="6" sm="8" md="7" xs="0" xl="6" class="pl-0">
            <v-toolbar-title class="font-weight-black">Bowei</v-toolbar-title>
        </v-col>
        <v-col cols="6" sm="4" md="3" xs="12" xl="2" style="text-align:right;" class="d-flex justify-end align-center">
            <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> -->
            <v-btn text color="primary" rounded @click="goLogin()">登录</v-btn>
            <v-btn text color="primary" rounded @click="login()">注册</v-btn>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        goLogin(){
            this.$router.push('/Login')
        },
        login(){
            let appUrl_login = this.APIUrl.API.api.userLogin;
            this.$axios.post(appUrl_login,{ 
                us: '李白', 
                ps: '123'
            }).then(res=>{
                if(res.data.err == 0){
                    // 成功
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