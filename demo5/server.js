var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
    var pathObj = url.parse(req.url,true);
    console.log(pathObj);
    switch(pathObj.pathname){
        case '/loadmore':

            var index = pathObj.query.index;  //  与ajax传入的index 对应
            console.log('index'+index);
            var len = pathObj.query.length;
            var data = [];
            for(var i=0;i<len;i++){
                data.push('内容'+(parseInt(index)+i));
            }
            //  模拟网络慢的情况

            setTimeout(function () {
                res.end(JSON.stringify(data));
            },1000);


            break;

        default:
            if(pathObj.pathname === '/'){
                pathObj.pathname = 'index.html'
            }
            fs.readFile(path.join(__dirname,'static',pathObj.pathname),function(err,data){
                if(err){
                    res.statusCode = 404;
                    res.end('Not Found')
                } else {
                    res.end(data)
                }
            })
    }

});

server.listen(8080);
