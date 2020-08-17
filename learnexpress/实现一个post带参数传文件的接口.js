/**
 * 注册接口
 * 接口地址：/register
 * 请求方式：post
 * 请求参数：username password usericon(用户头像，图片文件)
 * 返回数据：注册成功/注册失败
 */

const express = require("express");
const multer = require("multer");

// 创建一个uploads这个文件夹
const upload = multer({ dest: 'uploads/' })

const app = new express();

app.post('/register', upload.single('usericon'), function (req, res) {
  // req.file is the `usericon` file // 传过来的文件，参数名用usericon
  // req.body will hold the text fields, if there were any  // 一起传过来的文件保存在req.body中

  console.log(req.file);  // 记录了传递过来的文件的一些信息
  console.log(req.body);  // { username: 'coderdxh', password: '123456' }

  res.send("sb");
})


app.listen(8080, () => {
  console.log("success...");
});