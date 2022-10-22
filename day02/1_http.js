import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end(
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTTP 모듈 테스트</title>
</head>
<body>
    <h2>HTTP 모듈 테스트</h2>
    <p>처음으로 실행하는 node.js http 서버</p>
    <p>오 짱 신기</p>
    <p>이제 바로바로 수정된 것 적용</p>
    <i>와우</i>
</body>
</html>`
  );
});

server.listen(3000, () => {
  console.log("3000번 포트로 서버 실행 중!!");
});
