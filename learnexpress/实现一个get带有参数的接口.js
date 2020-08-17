/**
 * 接口: 查询英雄外号
 *       根据英雄名返回英雄外号
 * 接口地址： /getNickName
 * 请求方式： get
 * 请求参数：heroName
 *          英雄名(提莫/盖伦/李青...)
 * 返回值：英雄外号
 */

const express = require("express");

const app = express();

app.get("/getNickName", (request, response) => {
  console.log(request.query);  // { heroName: '提莫' }

  let heroNickName = "";

  switch (request.query.heroName) {
    case "提莫":
      heroNickName = "迅捷斥候";
      break;
    case "亚索":
      heroNickName = "疾风剑豪";
      break;
    case "盖伦":
      heroNickName = "德玛西亚之力";
      break;
    case "火男":
      heroNickName = "复仇焰魂";
      break;
    default:
      heroNickName = "该英雄不存在";
      break;
  }
  response.send(heroNickName);
})

app.listen(8080, () => {
  console.log("success...");
});