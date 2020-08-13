// nodejs中相对路径，相对的是谁？
// 相对的是运行这个node文件的 小黑框 的路径而言的

const fs = require("fs");
fs.readFile("etc/hello.txt","utf8",(err,data) => {
  if (err) throw err;
  console.log(data);
});