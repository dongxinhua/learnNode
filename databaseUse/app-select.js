const mysql  = require('mysql');

// 创建一个和数据库的连接
const connection = mysql.createConnection({
  host : 'localhost', // 数据库服务器的地址
  user : 'root', // 账号
  password : '123456', // 密码
  database : 'test01'  // 数据库名
});
 
// 打开连接
connection.connect();
 
// 执行sql语句
connection.query('select * from user where id = 8', function (error, results, fields) {
  // error 错误对象，如果没有报错就返回null
  // console.log(error);
  // results 执行sql语句得到一个结果集(数组) 有错误就是 undefined
  // console.log(results);
  // console.log(results[4].username); // coderdxh

  // fields 拿到的是字段的信息，不常用
  // console.log(fields);
  if (error == null) {
    console.log(results);
  }
});
 
// 关闭连接
connection.end();