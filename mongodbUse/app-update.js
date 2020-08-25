const mongooes = require("mongoose");

// 连接数据库
mongooes.connect('mongodb://localhost/nodetestdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 监听数据库连接的状态
mongooes.connection.on("open", (err) => {
  if (err) throw err;
  console.log("数据库连接成功了");

  // 引入约束Schema
  const Schema = mongooes.Schema;
  // 创建一个约束对象实例
  const StudentSchema = new Schema({
    name: { type: String, default: "coderdxh" },
    age: { type: Number, default: 18 },
    sex: String
  }, { collection: "student", versionKey: false });
  // 创建模型对象
  // 第一个参数与数据库中的集合相对应，第二个参数指定约束对象实例
  // 只要生成了模型对象，就可以进行数据的：增删改查
  const studentModel = mongooes.model("student", StudentSchema);

  /**
   * 修改数据
   * 模型对象.update(查询条件(一般是主键类型的值),{$set:修改的值},是否一次修改多个值, 回调函数)
   */

   /* studentModel.update({_id:"5f4521b71638dd3c54e15ebf"},{$set:{age:21}},(error,result)=>{
    if (error) throw error;
    //  DeprecationWarning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
    console.log(result);
   }); */

   // 修改单个
   /* studentModel.updateOne({_id:"5f4521b71638dd3c54e15ebf"},{$set:{age:20}},(error,result)=>{
    if (error) throw error;
    console.log(result);
   }); */

   // 修改多个
   studentModel.updateMany({name: "coderdxh"},{$set:{age:20}},(error,result)=>{
    if (error) throw error;
    console.log(result);
   });


});