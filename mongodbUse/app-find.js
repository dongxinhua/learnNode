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

    // 查询数据
    // 模型对象.find(条件(可选),想要获取的字段(可选),筛选条件(可选),回调函数);
    // 获取所有的数据
    // myModel.find((error, result) => {
    //   if (error) throw error;
    //   console.log(result);
    // });

    // 按条件查找 条件为固定值 参数为对象
    /* myModel.find({ sex: "女" }, (error, result) => {
      if (error) throw error;
      console.log(result);
    }); */

    // 按条件查找 条件为区间值，$gt大于， $lt小于 $gte大于等于 $lte小于等于 $ne 不等于
    /* myModel.find({ sex: "女", age: { $gte: 18, $lt: 19 } }, (error, result) => {
      if (error) throw error;
      console.log(result);
    }); */

    // 想显示的字段 想要显示的字段设置成1，不想显示的不用写，但是_id除外，如果_id确实不想给，可以显示的设置_id:0
    // myModel.find({ sex: "男" }, { name: 1, age: 1, _id: 0 }, (error, result) => {
    //   if (error) throw error;
    //   console.log(result);
    // });

    // 筛选条件
    // sort：对查找的数据做排序 一般针对某个number类型的字段进行排序1为升序，-1为降序
    // skip：跳过一些数据 从找到的数据的开始位置跳过对应数量的数据
    // limit： 显示最终得到指定个数的数据    从找到的数据的开始位置获取对应数量的数据
    // 如果有多个筛选条件，先排序后跳过再获取对应数量的数据
    /* myModel.find({ sex: "男" }, { name: 1, age: 1, sex: 1, _id: 0 }, { sort: { age: 1 } }, (error, result) => {
      if (error) throw error;
      console.log(result);
    }); */

    /* myModel.find({ sex: "男" }, { name: 1, age: 1, sex: 1, _id: 0 }, { skip:3 }, (error, result) => {
      if (error) throw error;
      console.log(result);
    }); */

    /* myModel.find({ sex: "男" }, { name: 1, age: 1, sex: 1, _id: 0 }, { limit: 3 }, (error, result) => {
      if (error) throw error;
      console.log(result);
    }); */

    /* myModel.find({ sex: "男" }, { name: 1, age: 1, sex: 1, _id: 0 }, { sort: { age: 1 }, skip: 2, limit: 3 }, (error, result) => {
      if (error) throw error;
      console.log(result);
    }); */
  } else {
    throw err;
  }
})