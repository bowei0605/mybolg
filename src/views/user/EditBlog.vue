<template>
  <div>
    <v-app-bar app color="white" elevate-on-scroll>
      <HeaderNav />
    </v-app-bar>
    <v-row justify="center" class="mx-4 mt-16">
        <v-col cols="12" sm="8" md="7" xs="12" xl="6">
          <v-text-field label="请输入标题" solo v-model="blogTitle"></v-text-field>
          <div class="subcontainer">
            <div class="editor" id="editor" ref="editor"></div>
            <v-btn @click="submitBlog()" width="120px" rounded color="primary" class="mt-7">提交</v-btn>
          </div>
        </v-col>
        <v-col cols="0" sm="4" md="3" xs="0" xl="2">
          <v-card class="mx-auto">
              <v-card-subtitle class="pb-3 title">个人中心</v-card-subtitle>
              <v-card-text class="text--primary">
                  <div class="mb-2">网名：小诸葛</div>
                  <div class="mb-2">职位：前端攻城狮</div>
                  <div class="mb-2">现居：广东深圳</div>
                  <div class="mb-2">Email：bowei0605@163.com</div>
                  <div class="mb-2">QQ：2504779552</div>
              </v-card-text>
          </v-card>
        </v-col>
    </v-row>
  </div>
</template>

<script>
import E from "wangeditor";
import HeaderNav from '@/components/HeaderNav'
export default {
  data() {
    return {
      activeName: "first",
      txt: {
        text: ""
      },
      userName: '',
      editor: "", // 存放实例化的 wangEditor对象，在多个方法中使用
      blogTitle: '',

      blogInfo:'',
    };
  },
  components: {
    HeaderNav
  },

  mounted() {
    // 接受参数
    this.userName = localStorage.getItem('userName');

    

    this.editor = new E("#editor"); //new即可

    this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
    this.editor.customConfig.uploadImgServer = this.$axios.defaults.baseURL+'/file/upload'; // 配置服务器端地址
    this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
    this.editor.customConfig.uploadFileName = "images"; // 后端接受上传文件的参数名
    this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024; // 将图片大小限制为 10M
    this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
    this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
    this.editor.customConfig.debug = true
    //下面的为一些配置参数，默认全部都有，我们需要那些留下那些即可
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      // "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
    //   'quote',  // 引用
    //   "emoticon", // 表情
      "image", // 插入图片
      // "table", // 表格
    //   "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    //聚焦时候函数
    this.editor.customConfig.onfocus = function() {
      //console.log("onfocus")
    };
    //失焦时候函数
    this.editor.customConfig.onblur = function() {
      //console.log("onblur")
    };
    //change事件，当富文本编辑器内容发生变化时便会触发此函数
    this.editor.customConfig.onchange = function(text) {
      console.log(text);
    };

    this.editor.customConfig.uploadImgHooks = {
      fail: (xhr, editor, result)=>{
        console.log('Images upload failed')
      },
      success: (xhr, editor, res) =>{
        
        console.log(editor, res)
        console.log('Image upload success')
      },
      timeout: (xhr, editor) => {
        console.log('Image upload timeout')
      },
      customInsert: (insertImg, result, editor) => {
        var url = this.$axios.defaults.baseURL + result.images[0]
        insertImg(url)
        console.log("url:", url)
        console.log('insertImg：', insertImg)
        console.log('result：', result)
        console.log('editor:', editor)
      }
    }

    this.editor.create(); //以上配置完成之后调用其create()方法进行创建
    this.editor.txt.html(""); //创建完成之后的默认内容

    if(this.$route.params.blogInfo){
      this.blogInfo = this.$route.params.blogInfo
      this.blogTitle = this.blogInfo.blogTitle
      this.editor.txt.html(this.blogInfo.blogContent); //创建完成之后的默认内容
    }

  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    submitBlog(){
      // 判断是修改还是添加
      if(this.$route.params.blogInfo){
        // 这是修改
        console.log('修改博客')
      console.log(this.blogInfo)
        // let appUrl_blogUpdata = this.APIUrl.API.api.blogUpdate;
        this.$axios.post('/blog/update',{
          _id: this.blogInfo._id,
          us: localStorage.getItem('userName'),
          blogTitle: this.blogTitle,
          blogContent: this.editor.txt.html()
        }).then(res =>{
          if(res.data.err == 0){
              console.log('修改成功')
              this.blogTitle = ''
              this.editor.txt.html("");
              this.$router.go(-1)
          }else{
              alert(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
          this.$axios.post('/blog/add',{ 
              us: localStorage.getItem('userName'), 
              blogTitle: this.blogTitle,
              blogContent: this.editor.txt.html(),
          }).then(res=>{
              if(res.data.err == 0){
                  console.log('添加成功')
                  this.blogTitle = ''
                  this.editor.txt.html("");
                  this.$router.go(-1)
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
};
</script>

<style lang="less">
.subcontainer {
  height: 100%;
  width: 100%;
  .tabs {
    padding: 20px 0;
  }
}

.editor {
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
}
.w-e-text img{
    width: 500px;
    border-radius: 20px;
}
.a-btn {
  padding-bottom: 80px;
}
.a-btn a {
  display: block;
  color: #fff;
  font-size: 16px;
  line-height: 30px;
  width: 100px;
  text-align: center;
  float: right;
  background: dodgerblue;
}
</style>