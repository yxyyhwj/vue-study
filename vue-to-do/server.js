var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('没有端口')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var path = request.url
    var query = ''
    var pathWithQuery = path
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    console.log(path, method, query)
    if (path === '/') {
        fs.readFile('./index.html', 'utf-8', function (err, data) {//读取内容
            if (err) throw err;
            response.writeHead(200, { "Content-Type": "text/html" });//注意这里
            response.write(data);
            response.end();
        });
    } else {
        var pathname = url.parse(request.url).pathname;
        var ext = pathname.match(/(\.[^.]+|)$/)[0];//取得后缀名
        switch(ext){
            case ".css":
            case ".js":
                fs.readFile("."+request.url, 'utf-8',function (err, data) {//读取内容
                    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type": {
                             ".css":"text/css",
                             ".js":"application/javascript",
                      }[ext]
                    });
                    response.write(data);
                    response.end();
                });
                break;
            default:
                response.statusCode = '404'
                response.end();
        }
    }

})


server.listen(port)
console.log('监听 ' + port + ' 成功： http://localhost:' + port)