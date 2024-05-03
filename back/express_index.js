var express = require("express");
var mysql = require("mysql");
var app = express();

var cors = require('cors')
app.use(cors())

app.use("/public", express.static("public"));


//配置body-parser中间件
const BodyParser = require('body-parser')
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

//创建数据库连接
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "xqy050116",
    database: "vuestu",
});
connection.connect();

function converter(id, name, gender, chinese, math, english) {
    var g
    if (gender === 'male') {
        g = 1;
    } else if (gender === 'female') {
        g = 0;
    } else {
        g = null;
    }
    return {
        id: Number(id),
        name: String(name),
        gender: g,
        chinese: Number(chinese),
        math: Number(math),
        english: Number(english)
    };
}

//  测试主页输出 成绩表中所有数据
// 当访问网站根目录(/)时，服务器执行一个查询操作，
// 获取stuScore表中的所有数据
// 通过测试
app.get("/api", function(req, res) {
    console.log("主页 GET 请求");
    connection.query("SELECT * FROM stuScore", function(error, results, fields) {
        if (error) throw error;
        console.log("The result is: ", results);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
    // res.send("Hello GET");
});

//  /del接收前端要删除的请求体，获取id，在数据库中进行删除操作
//  通过测试
app.post("/del", function(req, res) {
    console.log("/del 响应 DELETE 请求");
    var { id, } = req.body;
    console.log('Id Retrieved: ' + id)
    var sql = "DELETE FROM stuScore WHERE id = ?";
    connection.query(sql, id, function(error, results) {
        if (error) {
            console.error("Delete Failed: " + error.message);
            return;
        }
        console.log("The Result is : ", results);
    });
});

// 配置了一个返回指定id的学生的信息的服务器
app.get('/api/:id', (req, res) => {
    const studentId = parseInt(req.params.id); // 从URL参数中获取ID并转换为整数
    const query = 'SELECT * FROM stuScore WHERE id = ?';
    connection.query(query, [studentId], (error, results) => {
        if (error) {
            res.status(500).send('Server error: ' + error.message);
        } else if (results.length > 0) {
            console.log(results);
            res.json(results[0]);
        } else {
            res.status(404).send('Student not found');
        }
    });
});

//  /edit 页面 POST 请求,获取要修改学生的表单
//  在数据库用id查到后，用表单更新数据库原来的数据
//  通过测试
app.post("/edit", function(req, res) {
    console.log("/edit Post Request");
    // 从请求体中获取学生ID和成绩
    console.log(req.body)
    var { id, name, gender, chinese, math, english } = req.body;
    var dt = converter(id, name, gender, chinese, math, english)
    console.log(dt)
    var sql = "UPDATE stuScore SET name = ?, gender = ?, chinese = ?, math = ?, english = ? WHERE id = ?";
    connection.query(sql, [dt.name, dt.gender, dt.chinese, dt.math, dt.english, dt.id], function(error, results) {
        if (error) {
            console.error("Updata Failed: " + error.message);
            return;
        }
        console.log("Update Results: ", results);
        //console.log(`更新的学生信息： 'http://127.0.0.1:8081/api/${id.toString()}`)

    });
});

// /insert 页面post请求，插入一个新学生的信息
//  直接传表单，简单处理后，插入进数据库
//  通过测试
app.post("/insert", function(req, res) {
    console.log("/insert Post 请求");
    var { id, name, gender, chinese, math, english } = req.body;
    console.log(id, name, gender, chinese, math, english)
    var dt = converter(id, name, gender, chinese, math, english)
    console.log(dt)
    var sql = "INSERT INTO stuScore (id, name, gender, chinese, math, english) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, [dt.id, dt.name, dt.gender, dt.chinese, dt.math, dt.english], function(error, results) {
        if (error) {
            console.error("Insert Failed: " + error.message);
            return;
        }
        console.log("Insert Results: ", results);
    });
});


// 当访问网站根目录(/)时，服务器执行一个查询操作，
// 获取stuScore表中的所有数据
//当根目录接收到POST请求时，服务器响应
//一般是登录，或者接收文件，存储数据之类的服务
var server = app.listen(8081, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s/api", host, port);

    // 指定id学生的信息
    console.log("应用实例，访问地址为 http://%s:%s/api/1", host, port);

    //当 /add_user接收到POST请求时， 服务器响应“ 增加成绩”。
    console.log("插入成绩页面，访问地址为 http://%s:%s/insert", host, port);

    //当 /update_user接收到POST请求时， 服务器响应“ 修改成绩”。 
    console.log("修改成绩页面，访问地址为 http://%s:%s/edit", host, port);

    //访问 /del_user时，服务器响应“删除成绩”。 
    console.log("删除学生成绩页面，访问地址为 http://%s:%s/del", host, port);

    //访问/list_user时，服务器响应“成绩列表”。
    console.log("成绩列表页面，访问地址为 http://%s:%s/list_user", host, port);
});

// connection.end();