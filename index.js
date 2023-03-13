const http = require('http');
const formTag = `
<form method="GET" action="/login/ggg.sss"> //?action의 주소 값은 아무거나 들어가도 되는지? 확인해 봄. /나 .을 넣어서 아무렇게 입력해도 상관없음을 확인.
<input type="text" name="id">
<input type="submit"> //? submit이라는 핸들러를 이용해 입력받은 정보를 처리해준다는 것을 확인. submit은 form handler로 일반적으로 입력된 데이터를 처리하는 스크립트를 포함하고 있는 서버 페이지이다.
</form>
`;
function greet(fromSubmitString) {
return `<h1>${fromSubmitString}</h1>`;
}
function firstPage(data) {
return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
${data}
</body>
</html>
`;
}

const server = http.createServer(function(request, response){
// 최초접속
if(request.method === 'GET' && request.url === '/') {
response.writeHead(200, {'Content-Type': 'text/html'});
let page = firstPage(formTag);
response.write(page);
response.end();
//? 처음 페이지에 접속하면 앞서 설정해놨던 formTag를 띄워준다.
}
// 무언가
if(request.method === 'GET' && request.url.startsWith('/login')) {
console.log(request.url);
const name = request.url.split('=')[1];
console.log(name);
response.writeHead(200, {'Content-Type': 'text/html'});
let page = firstPage(greet(name))

response.write(page);
response.write("<div style='background-color : red'>hello</div>");
response.write(page);
response.write(page);
//? write의 개수는 몇개가 쓰여지든 상관 없는지 확인. html 페이지니까 write일 때 style속성을 부여해도 적용되는지 확인.
response.end();
}
});
// 서버 포트 설정
server.listen(2080, function(error) {
if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
});