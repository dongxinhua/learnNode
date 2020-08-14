/**
 * 前端传参
 *    get传参：拼接在url上面
 *      http://127.0.0.1:8080/joke?id=1&username=admin
 *    post传参：不是拼接在url上面
 *      是在请求体中传递
 */

const http = require("http");
const url = require("url");

const server = http.createServer((request, response) => {
  // request是请求的对象，requset.url能拿到请求来的url中的?以及？后面的内容
  console.log(request.url);  // "/?id=10&name=%E6%B3%A2%E6%B3%A2"

  // 我们可以通过request.url拿到前端传递过来的参数
  // 但是要做字符串处理
  // 我们可以使用nodejs的一个模块：url模块
  // 调用它的parse方法
  // 参数一：就是要处理的url
  // 参数二：如果给true的话，就返回一个对象。
  const urlObj = url.parse(request.url,true);
  console.log(urlObj); // query: [Object: null prototype] { id: '10', name: '波波' },

  // 这个返回的对象里面有一个query属性，它也是一个对象，这个属性里面就有get传递的参数
  console.log(urlObj.query);

  // 那就可以在这里根据这个收到的id，去数据库中获取这个id的所有信息
  // 返回给调用者

  // 如果在这里拿到id对应的英雄的详细信息了，就可以返回
  response.end(JSON.stringify(urlObj.query)); // 只能返回字符串
});

server.listen(8080, () => {
  console.log("success...");
});