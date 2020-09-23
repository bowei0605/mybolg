<template>
    <v-row justify="center" class="ml-4" align="center">
        <v-col cols="6" sm="8" md="7" xs="0" xl="6" class="pl-0 d-flex align-center justify-space-between" >
            <v-toolbar-title class="font-weight-black primary--text" @click="goHome()">Bowei</v-toolbar-title>
        </v-col>
        <v-col cols="6" sm="4" md="3" xs="12" xl="2" style="text-align:right;" class="d-flex justify-end align-center">
            <div v-if="!userName">
                <v-btn text color="primary" rounded @click="goLogin()">登录</v-btn>
                <v-btn text color="primary" rounded @click="login()">注册</v-btn>
            </div>
            <div v-else>
                <v-btn text color="primary" rounded @click="goEditBlog()">你好，{{this.userName}}</v-btn>
            </div>
            
        </v-col>
    </v-row>
</template>
<script>
export default {
    data(){
        return{
            userName:''
        }
    },
    mounted(){
        this.userName = localStorage.getItem('userName');
    },
    methods:{
        goLogin(){
            this.$router.push('/Login')
        },
        goEditBlog(){
            this.$router.push('/UserCenter')
        },
        goHome(){
            this.$router.replace('/')
        }
    }
}
</script>