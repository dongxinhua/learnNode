// 创建静态资源服务器 --- express
// 为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 Express 中的 express.static 内置中间件函数。
const express = require("express");

// 创建服务器
const app = express();

// 例如，通过如下代码就可以将 web 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：
app.use(express.static("web"))

// 开启服务器
app.listen(8080, () => {
  console.log("success...");
});