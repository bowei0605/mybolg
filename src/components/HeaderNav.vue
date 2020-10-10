<template>
    <v-row justify="center" class="ml-4" align="center">
        <v-col cols="6" sm="8" md="7" xs="0" xl="6" class="pl-0 d-flex align-center justify-space-between" >
            <v-toolbar-title class="font-weight-black primary--text" @click="goHome()">Bowei</v-toolbar-title>
        </v-col>
        
        <v-col cols="6" sm="4" md="3" xs="12" xl="2" style="text-align:right;" class="d-flex justify-end align-center">
            <div v-if="!userName">
                <v-btn text color="primary" rounded @click="goLogin()">登录 / 注册</v-btn>
            </div>
            <div v-else>
                <v-btn text color="primary" rounded @click="goEditBlog()">写博客</v-btn>
                <v-btn text color="primary" rounded @click="goUserCenter()">你好，{{this.userName | formatUserName}}</v-btn>
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
    filters: {
        formatUserName: function (value) {
            value = value.split('@')
            console.log(value)
            return value[0]
        }
    },
    methods:{
        goLogin(){
            this.$router.push('/Login')
        },
        goUserCenter(){
            this.$router.push('/UserCenter')
        },
        goHome(){
            this.$router.replace('/')
        },
        goEditBlog(){
            this.$router.push('/EditBlog')
        },
    }
}
</script>