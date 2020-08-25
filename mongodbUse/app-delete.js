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
  // 删除数据

  /* studentModel.remove({_id:"5f4521cc521b4e169006be8b"},(error,result)=>{
    if (error) throw error;
    //  DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
    console.log(result);
   }); */

    /* studentModel.deleteOne({_id:"5f4521b9ea542d06bc745fd3"},(error,result)=>{
    if (error) throw error;
    console.log(result);
   }); */

   studentModel.deleteMany({name: "coderzyq"},(error,result)=>{
    if (error) throw error;
    console.log(result);
   });

});