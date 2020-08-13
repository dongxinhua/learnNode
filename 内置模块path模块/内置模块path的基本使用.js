// 我们通过手动拼接绝对路径，可能会出现错误(少写 \ )导致路径不对
// 为了避免这个问题，我们就可以使用path模块来拼接路径
// 下面来进行对比一下

const path = require("path");

// join方法是把路径片段连接成一个新的路径
const myPath1 = path.join(__dirname,"etc","hello.txt");
const myPath2 = `${__dirname}\\etc\\hello.txt`;

console.log(myPath1); // E:\study_web\learnNode\内置模块path模块\etc\hello.txt
console.log(myPath2); // E:\study_web\learnNode\内置模块path模块\etc\hello.txt
console.log(myPath1 === myPath2);  // true