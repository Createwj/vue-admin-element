const http = require("http");
const fs = require("fs")


http.createServer(function(req, res){
  // 打开 www/ 目录下的文件
  fs.readFile("./dist/"+req.url, function(err, data) {
    if(err){
      console.log(err);
      res.write("404");
      res.end();
    }else{
      console.log(data.toString())
      res.write(data);
      res.end();
    }
  })

}).listen(8010);
