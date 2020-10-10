// let apiUrl = 'http://192.168.3.22:3000'
let apiUrl = 'http://bowei.xyz:3000'
let API = {
    api:{
        hostIp: apiUrl,
        // 用户
        userReg: apiUrl + '/user/Reg',                              // 注册接口
        userLogin: apiUrl + '/user/login',                          // 登录接口
        userGetMailCode: apiUrl + '/user/getMailCode',              // 获取邮箱验证码接口
        userGetVerCode: apiUrl + '/user/verCode',                   // 获取邮箱验证码接口
        userGetInfo: apiUrl + '/user/userGetInfo',                  // 获取用户信息

        // 博客
        blogAdd: apiUrl + '/blog/add',                              // 添加博客
        getInfoByUs: apiUrl + '/blog/getInfoByUs',                  // 查询用户博客
        blogGetInfoByKw: apiUrl + '/blog/getInfoByKw',              // 关键字查询博客
        blogDel: apiUrl + '/blog/del',                              // 删除博客
        blogUpdate: apiUrl + '/blog/update',                        // 修改博客信息
        blogGetInfoByPage: apiUrl + '/blog/getInfoByPage',          // 分页查询
        blogGetById: apiUrl + '/blog/getBlogById',                  // 查询详细博客

        // 上传图片文件
        blogUpload: apiUrl + '/file/upload',                        // 文件上传

        // 评论
        commentPublish: apiUrl + '/comment/publish',                // 发表评论
        getComment: apiUrl + '/comment/getInfoById',                // 查询评论
    }
}

export default {
    API : API
}