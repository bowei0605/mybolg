<template>
    <v-main>
        <v-app-bar app color="white" elevate-on-scroll>
            <HeaderNav />
        </v-app-bar>
        <v-row justify="center" class="mx-4">
            <v-col cols="12" sm="10" md="10" xs="12" xl="6">
                <div class="d-flex align-center mb-4">
                    <v-img :src="user.headerImg?this.$axios.defaults.baseURL+user.headerImg:require('../../assets/images/head.jpg')" alt="头像" style="border-radius: 50%;" class="mr-10" max-width="120px" />
                    <v-btn outlined rounded color="primary" @click="chooseImg()">更换头像</v-btn>
                    <input type="file" ref="filElem" style="width:0;" @change="UploadHeaderImg()">
                </div>
                <div class="d-flex mt-10">
                    <v-subheader class="body-1 pl-0">昵称：</v-subheader>
                    <v-text-field solo style="max-width: 500px;" label="对外的称呼" v-model="user.nickName"></v-text-field>
                </div>
                <div class="d-flex">
                    <v-subheader class="body-1 pl-0">职位：</v-subheader>
                    <v-text-field solo style="max-width: 500px;" label="职位" v-model="user.worker"></v-text-field>
                </div>
                <div class="d-flex">
                    <v-subheader class="body-1 pl-0">邮箱：</v-subheader>
                    <v-text-field solo style="max-width: 500px; max-height: 60px" label="name@example.com" disabled v-model="user.us"></v-text-field>
                </div>
                <div class="d-flex align-center">
                    <v-subheader class="body-1 pl-0">性别：</v-subheader>
                    <v-radio-group v-model="user.sex" row>
                        <v-radio label="男" value="1"></v-radio>
                        <v-radio label="女" value="2"></v-radio>
                        <v-radio label="保密" value="0"></v-radio>
                    </v-radio-group>
                </div>
                <div class="d-flex">
                    <v-subheader class="body-1 pl-0">简介：</v-subheader>
                    <v-textarea solo name="input-7-4" label="介绍一下自己吧" v-model="user.desc"></v-textarea>
                </div>
                <v-btn rounded color="primary" dense width="100" @click="updateUserInfo()">保存</v-btn>
            </v-col>
        </v-row>
        <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ snackbarText }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                关闭
                </v-btn>
            </template>
        </v-snackbar>
        <!-- <v-snackbar v-model="snackbar" :timeout="timeout">
                {{ snackbarText }}
                <v-btn color="blue" text @click="snackbar = false"> 关闭 </v-btn>

                <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                >
        </v-snackbar> -->
    </v-main>
</template>
<script>
import HeaderNav from '@/components/HeaderNav'
export default {
    created () {
        this.user.us = localStorage.getItem('userName')
        this.getUserInfo()
    },
    data () {
        return {
            user:{
                sex: "1",
            },
            timeout: 2000,
            snackbar: false,
            snackbarText: '',
        }
    },
    components: {
      HeaderNav
    },
    methods: {
        // 获取个人信息
        getUserInfo(){
            this.$axios.post('/user/userGetInfo', {
                us: this.user.us,
                _id: localStorage.getItem('_id')
            }).then(res => {
                this.user = res.data.list[0]
                this.user.sex = String(this.user.sex)
            }).catch(err => {
                console.log(err)
            })
        },

        // 更新个人博客
        updateUserInfo(){
            this.snackbar = true
            this.$axios.post('/user/update',{
                us: this.user.us,
                _id: localStorage.getItem('_id'),
                nickName: this.user.nickName,
                worker: this.user.worker,
                sex: this.user.sex,
                desc: this.user.desc,
                headerImg: this.user.headerImg
            }).then(res => {
                if(res.data.err == 0){
                    this.snackbarText = res.data.msg
                }else{
                    this.snackbarText = res.data.msg
                }
            }).catch(err => {
                this.snackbarText = '内部错误'
            })
        },

        // 上传图片
        chooseImg(){
            this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
        },
        
        // 检测图片改变
        UploadHeaderImg(){
            let file = this.$refs.filElem.files[0]
            console.log('图片更改')
            let formData = new FormData()
            formData.append('images', file)
            this.$axios.post('/file/upload',formData)
            .then(res=>{
                if(res.data.err == 0){
                    console.log(res.data.images[0])
                    this.user.headerImg = res.data.images[0]
                    this.updateUserInfo()
                }
            })
            .catch(err => {
                console.log(err)
            })
        }

        // 上传图片
    }
}
</script>

