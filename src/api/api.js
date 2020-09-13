let apiUrl = 'http://192.168.3.20:3000'
let API = {
    api:{
        // 用户
        userReg: apiUrl + '/user/Reg',                              // 注册接口
        userLogin: apiUrl + '/user/login',                          // 登录接口
        userGetMailCode: apiUrl + '/user/getMailCode',                    // 获取邮箱验证码接口

        // 博客
        blogAdd: apiUrl + '/blog/add',                              // 添加博客
        blogGetInfoByType: apiUrl + '/blog/getInfoByType',          // 分类查询博客
        blogGetInfoByKw: apiUrl + '/blog/getInfoByKw',              // 关键字查询博客
        blogDel: apiUrl + '/blog/del',                              // 删除博客
        blogUpdate: apiUrl + '/blog/update',                        // 修改博客信息
        blogGetInfoByPage: apiUrl + '/blog/getInfoByPage',          // 分页查询

        // 上传图片文件
        blogUpload: apiUrl + '/file/upload',                         // 文件上传


    }
}

export default {
    API : API
}