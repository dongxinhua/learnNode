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

// 前端传递过来的数据
let id = 8;
let username = "dxhcoder";
let password = 666666;
 
// 执行sql语句
connection.query(`update user set username = '${username}', password = ${password} where id = ${id}`, (error, results) => {
  if (error == null) {
    console.log(results); // 返回的结果是一个对象
    console.log(results.affectedRows); // 如果受影响的行数
    console.log(results.changedRows); // 改变的行数
  }
});
 
// 关闭连接
connection.end();