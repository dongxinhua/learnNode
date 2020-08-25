const mongoose = require("mongoose");

// 连接数据库
mongoose.connect('mongodb://localhost/nodetestdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 需要监听数据库的连接状态，针对数据库的所以操作(CRUD),必须建立在数据库已经成功连接的基础上
mongoose.connection.on('open', (err) => {
  if (!err) {
    console.log('数据库连接成功了！');
    /**
     * 创建Model
     * 创建一个schema对象，并给该对象设置结构
     * 再通过schema对象创建一个Model
     */

    const Schema = mongoose.Schema;

    const SchemaObj = new Schema({
      name: { type: String, default: "coderdxh" },
      age: { type: Number, default: 18 },
      sex: String
    }, { collection: "student", versionKey: false });
    // versionKey:false 可以去掉版本号

    // 创建模型时，参数一与collection的值保持一致
    const myModel = mongoose.model("student", SchemaObj);

    /**
     * 插入数据
     * 语法：
     *  对象模型.create({
     *  key: value
     *  key: value
     *  ...
     * },回调函数)
     */

    myModel.create({
      name: "董鑫华",
      age: 20,
      sex: "男"
    }, (error, result) => {
      if (!error) {
        console.log("添加成功" + result);
      } else {
        console.log("添加失败");
      }
    })

  } else {
    throw err;
  }
})