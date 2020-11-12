<template>
    <v-row justify="center" class="ml-4" align="center">
        <v-col cols="6" sm="8" md="7" xs="0" xl="6" class="pl-0 d-flex align-center justify-space-between">
            <img src="@/assets/images/logo.png" alt="主页" style="width: 50px; border-radius: 50%; cursor:pointer" @click="goHome()" >
        </v-col>
        
        <v-col cols="6" sm="4" md="3" xs="12" xl="2" style="text-align:right;" class="d-flex justify-end align-center">
            <div v-if="!userName">
                <v-btn text color="primary" rounded @click="goLogin()">登录 / 注册</v-btn>
            </div>
            <div v-else class="d-flex align-center">
                <v-btn text color="primary" rounded @click="goEditBlog()" class="mr-2">写博客</v-btn>
                
                <v-menu open-on-hover bottom offset-y transition="slide-y-transition">
                    <template v-slot:activator="{ on, attrs }">
                        <div class="d-flex align-center"  v-bind="attrs" v-on="on">
                            <v-img @click="goUserCenter()" :src="headerImg?$axios.defaults.baseURL+headerImg:require('@/assets/images/head.jpg')" alt="头像" style="width: 40px; border-radius: 50%;" />
                            <v-icon size="28">mdi-menu-down</v-icon>
                        </div>
                    </template>
                    <v-list dense class="py-0">
                        <v-list-item link @click="goUserCenter()">
                            <v-list-item-title>我的主页</v-list-item-title>
                        </v-list-item>
                        <v-list-item link @click="goEditUserInfo()">
                            <v-list-item-title>设置</v-list-item-title>
                        </v-list-item>
                        <v-list-item link @click="exit()">
                            <v-list-item-title>退出</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data(){
        return{
            userName:'',
            headerImg: ''
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.userName = localStorage.getItem('userName');
            this.headerImg = localStorage.getItem('headerImg');
            console.log(this.headerImg)
        });
        
    },
    filters: {
        formatUserName: function (value) {
            value = value.split('@')
            return value[0]
        }
    },
    methods:{

        // 前往登陆页面
        goLogin(){
            this.$router.push('/Login')
        },

        // 前往个人中心
        goUserCenter(){
            this.$router.push('/UserCenter')
        },
        
        // 前往主页
        goHome(){
            this.$router.replace('/')
        },

        // 前往写博客页面
        goEditBlog(){
            this.$router.push('/EditBlog')
        },

        // 前往编辑资料页
        goEditUserInfo(){
            this.$router.push('/EditUserInfo')
        },

        // 退出登录
        exit(){
            localStorage.clear()
            this.$router.replace('/')
            this.$router.go(0)
        }
    }
}
</script>