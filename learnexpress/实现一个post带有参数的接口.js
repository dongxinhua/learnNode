/**
 * 接口：用户登录
 * 请求地址：/login
 * 请求方式：post
 * 请求参数：username  password
 *          用户名     密码
 * 返回值：登录成功/登录失败
 */

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded  使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/login", (request, response) => {
  // 接收用户传递过来的用户名和密码

  // 由于是post方式传递过来的参数，所以用request.query这种方式拿不到
  // 想要获取到通过post传递过来的参数，我们就要使用第三方模块 ： body-parser
  console.log(request.body); // { username: 'admin', password: '123456' }

  if (request.body.username === "admin" && request.body.password === "888888") {
    response.send({
      code: "200",
      msg: "登录成功"
    });
  } else {
    response.send({
      code: "400",
      msg: "账号密码不正确"
    });
  }
})

app.listen(8080, () => {
  console.log("success...");
});