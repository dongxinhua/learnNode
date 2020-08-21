const express = require("express");

const app = express();

app.get("/all", (req, res) => {
  // res.send(`foo();`);
  // 现在有一个问题，就是返回的这个函数调用，我怎么知道应该返回什么样的函数名呢？
  // 或者说我这里怎么知道访问我这个接口的前端页面有什么样的写好的函数呢？
  // 所以写死 foo() 不合理
  // 解决办法是：前端把已经准备好的函数名用参数的形式带过来

  // console.log(req.query); // { callback: 'fn' }
  // res.send(`${req.query.callback}();`);

  // 我还想传递数据给前端
  const data = { "username": "coderdxh", "password": "123456" };
  res.send(`${req.query.callback}(${JSON.stringify(data)});`);
});

app.listen(8080, () => {
  console.log("success...");
});