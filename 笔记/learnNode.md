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

## nodejs接收get传递过来的参数

```js
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
```

## nodejs接收post传递过来的参数

![nodejs接收post请求](./nodejs接收post请求.png)

```js
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
```

## express的使用

### express的基本使用

```js
const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("hello coderdxh");
});

app.listen(8080, () => {
  console.log("success...");
});
```

### express 搭建静态资源服务器

```js
// 创建静态资源服务器 --- express
// 为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 Express 中的 express.static 内置中间件函数。
const express = require("express");

// 创建服务器
const app = express();

// 例如，通过如下代码就可以将 web 目录下的图片、CSS 文件、JavaScript 文件对外开放访问了：
app.use(express.static("web"))

// 开启服务器
app.listen(8080, () => {
  console.log("success...");
});
```

### 实现一个简单的get接口

```js
/**
 * 接口：得到一条随机笑话
 * 接口地址： /joke
 * 请求方式：get
 * 参数：无
 * 返回：一条笑话
 */

const express = require("express");

const app = express();

app.get("/joke", (request, response) => {
  // 准备n条数据，实际开发的时候笑话肯定是从数据库或者其他数据源获取到的
  let jokeArr = ["狐狸容易摔跤，因为它特别脚滑", "波波是男的", "想不出来了"];
  let index = Math.floor(Math.random() * 3); // 0 1 2
  // 返回笑话
  response.send(jokeArr[index]);
})

app.listen(8080,() => {
  console.log("success...");
});
```

### 实现一个返回json数据的接口

```js
/**
 * 接口：返回一个食物
 * 接口地址： /food
 * 请求方式：get
 * 请求参数：无
 * 返回值：json
 */

const express = require("express");

const app = express();

app.get("/food", (request, response) => {
  response.send({
    foodName: "红烧肉",
    price: 30,
    description: "油而不腻，美味"
  });
})

app.listen(8080,() => {
  console.log("success...");
});
```

### 实现一个get带有参数的接口

```js
/**
 * 接口: 查询英雄外号
 *       根据英雄名返回英雄外号
 * 接口地址： /getNickName
 * 请求方式： get
 * 请求参数：heroName
 *          英雄名(提莫/盖伦/李青...)
 * 返回值：英雄外号
 */

const express = require("express");

const app = express();

app.get("/getNickName", (request, response) => {
  console.log(request.query);  // { heroName: '提莫' }

  let heroNickName = "";

  switch (request.query.heroName) {
    case "提莫":
      heroNickName = "迅捷斥候";
      break;
    case "亚索":
      heroNickName = "疾风剑豪";
      break;
    case "盖伦":
      heroNickName = "德玛西亚之力";
      break;
    case "火男":
      heroNickName = "复仇焰魂";
      break;
    default:
      heroNickName = "该英雄不存在";
      break;
  }
  response.send(heroNickName);
})

app.listen(8080, () => {
  console.log("success...");
});
```

### 实现一个post带有参数的接口

```js
/**
 * 接口：用户登录
 * 请求地址：/login
 * 请求方式：post
 * 请求参数：username  password
 *          用户名     密码
 * 返回值：登录成功/登录失败
 */

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded  使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/login", (request, response) => {
  // 接收用户传递过来的用户名和密码

  // 由于是post方式传递过来的参数，所以用request.query这种方式拿不到
  // 想要获取到通过post传递过来的参数，我们就要使用第三方模块 ： body-parser
  console.log(request.body); // { username: 'admin', password: '123456' }

  if (request.body.username === "admin" && request.body.password === "888888") {
    response.send({
      code: "200",
      msg: "登录成功"
    });
  } else {
    response.send({
      code: "400",
      msg: "账号密码不正确"
    });
  }
})

app.listen(8080, () => {
  console.log("success...");
});
```

### 实现一个post带有参数传文件的接口

```js
/**
 * 注册接口
 * 接口地址：/register
 * 请求方式：post
 * 请求参数：username password usericon(用户头像，图片文件)
 * 返回数据：注册成功/注册失败
 */

const express = require("express");
const multer = require("multer");

// 创建一个uploads这个文件夹
const upload = multer({ dest: 'uploads/' })

const app = new express();

app.post('/register', upload.single('usericon'), function (req, res) {
  // req.file is the `usericon` file // 传过来的文件，参数名用usericon
  // req.body will hold the text fields, if there were any  // 一起传过来的文件保存在req.body中

  console.log(req.file);  // 记录了传递过来的文件的一些信息
  console.log(req.body);  // { username: 'coderdxh', password: '123456' }

  res.send("sb");
})


app.listen(8080, () => {
  console.log("success...");
});
```



