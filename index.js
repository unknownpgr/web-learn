// 각종 라이브러리들
let express = require('express');   // 서버 구축을 쉽게 할 수 있게 해 줌
let path = require('path');         // 디렉토리를 결합할 때 사용
let os = require('os');             // 현재 ip주소를 가져올 때 사용
let morgan = require('morgan');     // 서버 접속 로그를 표시하기 위해 사용

// 서버가 요청을 받아들일 포트. 코드 맨 아래의 listen함수에서 사용한다.
const SERVER_PORT = 8080;

// 서버를 생성한다.
let server = express();

// 로그 표시
server.use(morgan(':remote-addr [:date[clf]] :method :url :status - :response-time ms'));
// POST 요청 시 body를 사용할 수 있도록 설정
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// Static file serve 설정
server.use(express.static(path.join(__dirname, 'public')));

// 이 아래부터는 특정 path로 GET 요청이 들어왔을 경우 처리하는 루틴이다.
server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// 이 아래부터는 특정 path로 POST 요청이 들어왔을 경우 처리하는 루틴이다.
server.post('/add', function (req, res) {
    let body = req.body;
    console.log('body:', body);
    let a = body.a;
    let b = body.b;
    let sum = a + b;
    console.log('Add requested : ', a, '+', b);
    res.send({ 'status': 'ok', 'result': a + '+' + b + '=' + sum });
});

server.post('/sub', function (req, res) {
    let body = req.body;
    console.log('body:', body);
    let a = body.a;
    let b = body.b;
    let sub = a - b;
    console.log('Sub requested : ', a, '-', b);
    res.send({ 'status': 'ok', 'result': a + '-' + b + '=' + sub });
});

// 이 함수를 호출하면 서버가 실행된다.
server.listen(SERVER_PORT, function () {
    // 이 아래 부분은 서버의 아이피를 알아내어 host 변수에 저장하는 코드다. 신경쓰지 않아도 된다.
    let host = '';
    let interfaces = os.networkInterfaces();
    let interfaceNames = Object.keys(interfaces);
    for (let name of interfaceNames) {
        if (host !== '') break;
        for (let intf of interfaces[name]) {
            if (intf.family == 'IPv6') continue;
            if (host.startsWith('127')) continue;
            host = intf.address;
        }
    }

    // 서버가 시작되면 메시지를 띄워 준다.
    console.log('Server started!');
    console.log(`Server address : http://${host}:${SERVER_PORT}`);
});