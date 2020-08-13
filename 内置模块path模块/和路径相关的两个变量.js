// __driname:  获取的是当前这个文件所在的这个文件夹的绝对路径
// __filename: 获取的是当前这个文件的绝对路径

// 当前文件的绝对路径 ： E:\study_web\learnNode\内置模块path模块\和路径相关的两个变量.js

console.log(__dirname); // E:\study_web\learnNode\内置模块path模块
console.log(__filename); // E:\study_web\learnNode\内置模块path模块\和路径相关的两个变量.js

// 所以，我们可以对我们想要的路径进行拼接，比如etc文件夹下的hello.txt

const mypath = `${__dirname}/etc/hello.txt`;

const fs = require("fs");

fs.readFile(mypath,"utf8",(err,data) => {
  if (err) throw err;
  console.log(data); 
});