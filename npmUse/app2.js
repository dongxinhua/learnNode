// 爬取文件

var Crawler = require("crawler");
var fs = require('fs');
 
var c = new Crawler({
    encoding:null,
    jQuery:false,// set false to suppress warning message.
    callback:function(err, res, done){
        if(err){
            console.error(err.stack);
        }else{
            fs.createWriteStream(res.options.filename).write(res.body);
            console.log("爬取文件成功");
        }
        
        done();
    }
});
 
// 这是爬取一个下厨房的鱼香鸡蛋图片
// c.queue({
//     uri:"http://i2.chuimg.com/bb2ea22259ac431c895a41fa892643e2_1836w_2448h.jpg?imageView2/2/w/660/interlace/1/q/90",
//     filename:"./data/yxjd.png"
// });

// 接下来爬取一个b站的视频
// 不是爬什么样的数据都可以爬下来，有些网站做了反爬
// 反爬的机制：
//    看你这个请求是不是服务器，如果是就不给你数据
//    我们这里是node.js是服务端，有时候有的数据就不给你
// 解决反爬的办法：伪装
//    把我们这个node.js后端服务器请求 伪装成 客户端(浏览器)
c.queue({
    // uri:"https://cn-hbsjz2-cmcc-bcache-11.bilivideo.com/upgcxcode/77/77/216157777/216157777-1-16.mp4?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1597601428&gen=playurl&os=bcache&oi=3083348527&trid=43bcf6d7755e4077bcaead08e1f6e0b2h&platform=html5&upsig=26b832ecbc3a16b4b6da217fdd9f6787&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&cdnid=40012&mid=349200371&cip=111.62.200.12&logo=80000000",
    uri:"https://cn-hbsjz2-cmcc-bcache-12.bilivideo.com/upgcxcode/57/50/217875057/217875057-1-16.mp4?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1597602359&gen=playurl&os=bcache&oi=3083348527&trid=9d70c89d5ec3481bb9d7cac4427b5feah&platform=html5&upsig=65cf6642cc7aa77cfdf08810b572aed3&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&cdnid=40013&mid=349200371&cip=111.62.200.13&logo=80000000",
    filename:"./data/mv2.avi",
    headers:{"User-Agent": "request"} // 让服务端伪装成客户端
});