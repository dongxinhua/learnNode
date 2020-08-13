# LearnNode

## 内置模块fs的使用

### unlink 删除

> 参数一： 文件的路径
>
> 参数二： 回调函数

```js
const fs = require('fs');

fs.unlink('./hello/hello.txt', (err) => {
  if (err) throw err;
  console.log('已成功地删除文件');
});
```

###  readFile 读取文件

> 参数一：文件的路径
>
> 参数二：可选参数，读取文件的编码格式
>
> 参数三：回调函数

```js
fs.readFile('./hello/hello.txt', "utf8", (err, data) => {
  /**
   * err 是一个错误对象，如果没有错就返回一个null
   * data是读的文件内容，如果可选参数没有的话，默认是一个Buffer文件流
   */
  if (err) throw err;
  console.log(data);
});
```

### writeFile 写入文件

>   writeFile 写文件
>
>  参数一：写入文件的路径（如果路径中没有这个文件夹会报错，如果没有这个文件，会自动帮你建这个文件夹）
>
>  参数二：要写入的内容
>
>  参数三：回调函数

```js
const fs = require("fs");

const data = `
              诫子书  
              诸葛亮
    夫君子之行，静以修身，俭以养德。
    非淡泊无以明志，非宁静无以致远。
              ...
`;

fs.writeFile("./hello/shi.txt", data, (err) => {
  if (err) throw err;
  console.log("文件已保存");
});
```

## 内置模块path的使用

nodejs中相对路径，相对的是谁？

相对的是运行这个node文件的 小黑框 的路径而言的

### 和路径相关的两个变量

+ __dirname: *获取的是当前这个文件所在的这个文件夹的绝对路径*
+ __filename: *获取的是当前这个文件的绝对路径*

**我们可以通过这两个变量对我们想要的路径进行拼接**

```js
const mypath = `${__dirname}/etc/hello.txt`;
```

### 内置模块path的基本使用

我们通过手动拼接绝对路径，可能会出现错误(少写 \ )导致路径不对，为了避免这个问题，我们就可以使用path模块来拼接路径。

下面来进行对比一下：

```js
const path = require("path");

// join方法是把路径片段连接成一个新的路径
const myPath1 = path.join(__dirname,"etc","hello.txt");
const myPath2 = `${__dirname}\\etc\\hello.txt`;

console.log(myPath1); // E:\study_web\learnNode\内置模块path模块\etc\hello.txt
console.log(myPath2); // E:\study_web\learnNode\内置模块path模块\etc\hello.txt
console.log(myPath1 === myPath2);  // true
```

## 内置模块http的使用

### 使用http模块创建一个服务器

```js
// 使用内置模块http来创建一个服务器

// 1.导入http模块
const http = require("http");

// 2.创建一个服务器
const server = http.createServer((request, response) => {
  // 如果想要返回的中文不乱码，就要设置响应头
  response.setHeader("Content-Type", "text/html;charset=utf8");

  // 3.设置返回给用户看的内容
  // response.end("hello coderdxh!");
  response.end("你好，coderdxh");
});


// 4.开启服务器
server.listen(8080,() => {
  console.log("服务器开启了：8080");
});
```

### web服务器读取网页返回给用户

```js
// 1.引入http，fs，path模块
const fs = require("fs");
const http = require("http");
const path = require("path");

// 获取页面路径
const fullPath = path.join(__dirname, "page", "index.html");

// 2.创建服务器
const server = http.createServer((request, response) => {
  // 读取页面
  fs.readFile(fullPath, "utf8", (err, data) => {
    if (err) response.end(404);
    response.end(data)
  });
});

// 3. 开启服务器
server.listen(8080, () => {
  console.log("sussess");
});
```

### 创建静态服务器

```js
// 创建静态资源服务器
// 要求：浏览器访问什么资源就返回什么资源，如果没有这个资源就返回404页面
// 1.设置http，fs，path模块
const path = require("path");
const fs = require("fs");
const http = require("http");

// 2.创建服务器
const server = http.createServer((request, response) => {
  // 3.设置返回给用户的内容
  // 首先得知道用户请求的是哪一个页面(哪一个资源)
  // console.log(request);  // 用户请求过来的内容，里面的url包含请求的资源名字
  // console.log(request.url);

  console.log(request.url.split(".")[1]);

  let fullPath;

  if (request.url.split(".")[1] === "html") {
    fullPath = path.join(__dirname, "page", request.url);
  } else if (request.url.split(".")[1] === "jpg"){
    fullPath = path.join(__dirname, "img", request.url);
  } else if (request.url.split(".")[1] === "ico") {
    return;
  }

  // 读取文件
  // 服务器会有一个嗅探功能
  // 它根据请求的资源名字，能够知道你请求的是什么类型的资源
  fs.readFile(fullPath, (err, data) => {
    if (err) { response.end("404 Not Found"); }
    response.end(data);
  });
});

// 4.开启服务器
server.listen(8080, () => {
  console.log("success");
});
```

