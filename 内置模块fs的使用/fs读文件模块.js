const fs = require("fs");

/**
 * readFile : 读文件
 * 参数一：文件的路径
 * 参数二：可选参数，读取文件的编码格式
 * 参数三：回调函数
 */

fs.readFile('./hello/hello.txt', "utf8", (err, data) => {
  /**
   * err 是一个错误对象，如果没有错就返回一个null
   * data是读的文件内容，如果可选参数没有的话，默认是一个Buffer文件流
   */
  if (err) throw err;
  console.log(data);
});