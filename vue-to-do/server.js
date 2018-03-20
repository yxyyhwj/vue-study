var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
    console.log('没有端口')
    process.exit(1)
}

var server = http.createServer(function(request,response){
    var parseUrl = url.parse(request.url,true)
    var path  = request.url
    var query = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    console.log(path)

    response.write('hi')
    response.end()
})

	
server.listen(port)
console.log('监听 ' + port + ' 成功,打开 http://localhost:' + port)