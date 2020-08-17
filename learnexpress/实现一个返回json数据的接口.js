/**
 * 接口：返回一个食物
 * 接口地址： /food
 * 请求方式：get
 * 请求参数：无
 * 返回值：json
 */

const express = require("express");

const app = express();

app.get("/food", (request, response) => {
  response.send({
    foodName: "红烧肉",
    price: 30,
    description: "油而不腻，美味"
  });
})

app.listen(8080,() => {
  console.log("success...");
});