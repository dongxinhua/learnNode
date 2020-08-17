/**
 * 接口：得到一条随机笑话
 * 接口地址： /joke
 * 请求方式：get
 * 参数：无
 * 返回：一条笑话
 */

const express = require("express");

const app = express();

app.get("/joke", (request, response) => {
  // 准备n条数据，实际开发的时候笑话肯定是从数据库或者其他数据源获取到的
  let jokeArr = ["狐狸容易摔跤，因为它特别脚滑", "波波是男的", "想不出来了"];
  let index = Math.floor(Math.random() * 3); // 0 1 2
  // 返回笑话
  response.send(jokeArr[index]);
})

app.listen(8080,() => {
  console.log("success...");
});