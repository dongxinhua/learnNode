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
let username = "coderdxh";
let password = 888888;
 
// 执行sql语句
connection.query(`insert into user(username,password) values('${username}', ${password})`, (error, results) => {
  if (error == null) {
    console.log(results); // 返回的结果是一个对象
    console.log(results.affectedRows); // 如果受影响的行数大于零，说明新增成功了
    console.log(results.insertId); // 插入这条数据的Id
  }
});
 
// 关闭连接
connection.end();