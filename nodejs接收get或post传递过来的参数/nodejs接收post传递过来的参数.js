/**
 * 前端传参
 *    get传参：拼接在url上面
 *      http://127.0.0.1:8080/joke?id=1&username=admin
 *    post传参：不是拼接在url上面
 *      是在请求体中传递
 */

const http = require("http");
const querystring = require("querystring");

const server = http.createServer((request, response) => {
  // request是请求对象
  // 因为这里的post方式传递过来的参数不在url中，所以用request.url是拿不到的

  // 那如何拿呢？
  // 一小块一小块的拿
  // 1.你得有一个容器
  let postData = "";
  // 2.给request对象一个data事件
  // 事件处理程序 参数是当前这次传递过来的这一小块内容
  request.on("data", (chunk) => {
    postData += chunk;
  });

  // 3.给request对象一个end事件
  // 表示数据传递完成了。
  request.on("end", () => {
    // 打印看看
    console.log(postData); // name=admin&password=123456

    // 4.解析这个传递过来的参数数据
    const postObj = querystring.parse(postData);
    console.log(postObj);  // { name: 'admin', password: '123456' }

    // 5.
    // 那在这里我们就可以根据这个传递过来的账号和密码，去数据库中判断是否正确
    // 如果正确的那在这里就可以告诉用户，账号密码正确
    response.end("coderdxh");
  });

});

server.listen(8080, () => {
  console.log("success...");
});