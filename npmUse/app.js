var Crawler = require("crawler");
const fs = require("fs");

var c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      // console.log($("title").text());

      fs.writeFile("./data/1.txt", $("body").text(), (err) => {
        if (err) throw err;
        console.log("爬取并保存成功");
      });
    }
    done();
  }
});

// Queue just one URL, with default callback
// c.queue('http://www.baidu.com');

c.queue("https://ncov.dxy.cn/ncovh5/view/pneumonia");