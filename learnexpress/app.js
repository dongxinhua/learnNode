const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("hello coderdxh");
});

app.listen(8080, () => {
  console.log("success...");
});