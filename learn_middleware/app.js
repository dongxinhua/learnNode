const express = require("express");

const app = express();

// 就是服务器开启之后和路由响应之前，执行的一个函数
// 这个函数是可以操作req, res 的
// next()函数就是让你去执行下一个中间件的

// 中间件
app.use((req, res, next) => {
  req.requestTime = Date.now();
  res.name = "coderdxh";
  console.log('LOGGED')
  next()
})

app.get("/", (req, res) => {
  console.log(req.requestTime);  // 1597849701585
  res.send(res.name);
});

app.listen(8080, () => {
  console.log("success...");
});