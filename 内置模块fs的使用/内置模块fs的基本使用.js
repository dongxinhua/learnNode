const fs = require('fs');

/**
 * unlink 删除
 * 参数一： 文件的路径
 * 参数二： 回调函数
 *  */ 
fs.unlink('./hello/hello.txt', (err) => {
  if (err) throw err;
  console.log('已成功地删除文件');
});