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
    return Number(id), String(name), String(gender), Number(chinese), Number(math), Number(english);
};



// // 增加成绩接口
// app.post("/add_score", function(req, res) {
//     // 从请求体中获取学生ID和成绩
//     var { student_id, score } = req.body;
//     var sql = "INSERT INTO stuScore (student_id, score) VALUES (?, ?)";

//     connection.query(sql, [student_id, score], function(error, results) {
//         if (error) {
//             console.error("插入失败: " + error.message);
//             res.send("插入成绩失败");
//             return;
//         }
//         console.log("插入结果: ", results);
//         res.send("成绩添加成功");
//     });
// });

// // 修改成绩接口
// app.post("/update_score", function(req, res) {
//     // 从请求体中获取学生ID和新成绩
//     var { student_id, new_score } = req.body;
//     var sql = "UPDATE stuScore SET score = ? WHERE student_id = ?";

//     connection.query(sql, [new_score, student_id], function(error, results) {
//         if (error) {
//             console.error("更新失败: " + error.message);
//             res.send("更新成绩失败");
//             return;
//         }
//         console.log("更新结果: ", results);
//         res.send("成绩更新成功");
//     });
// });


// // 删除成绩接口
// app.post("/delete_score", function(req, res) {
//     // 从请求体中获取学生ID
//     var { student_id } = req.body;
//     var sql = "DELETE FROM stuScore WHERE student_id = ?";

//     connection.query(sql, [student_id], function(error, results) {
//         if (error) {
//             console.error("删除失败: " + error.message);
//             res.send("删除成绩失败");
//             return;
//         }
//         console.log("删除结果: ", results);
//         res.send("成绩删除成功");
//     });
// });

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
    console.log(req.body);
    var { id, name, gender, chinese, math, english } = req.body;
    id, name, gender, chinese, math, english = converter(id, name, gender, chinese, math, english)
    var sql = "UPDATE stuScore SET name = ?, gender = ?, chinese = ?, math = ?, english = ? WHERE id = ?";
    connection.query(sql, [name, gender, chinese, math, english, id], function(error, results) {
        if (error) {
            console.error("Updata Failed: " + error.message);
            return;
        }
        console.log("更新结果: ", results);
        console.log(`更新的学生信息： 
        'http://127.0.0.1:8081/api/${id.toString()}`)
    });
});


//  POST 请求
app.post("/", function(req, res) {
    var post_obj = req.body
    console.log("主页 POST 请求,收到前端表单提交的数据：");
    console.log(post_obj)
    res.end(JSON.stringify(post_obj));
});


app.post("/add_score", function(req, res) {
    console.log("/add_user Post 请求");
    // 从请求体中获取学生ID和成绩
    var { id, name, gender, chinese, math, english } = req.body;
    var sql = "INSERT INTO stuScore (id, name, gender, chinese, math, english) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(sql, [id, name, gender, chinese, math, english], function(error, results) {
        if (error) {
            console.error("插入失败: " + error.message);
            res.send("插入成绩失败");
            return;
        }
        console.log("插入结果: ", results);
        res.send("成绩添加成功");
    });
});

// insert接口新建学生信息
app.post("/insert", function(req, res) {
    var insert_obj = req.body
    console.log("主页 POST 请求,收到前端表单提交的数据：");
    console.log(insert_obj)

    //计算成绩平均分和总分
    insert_obj.total = req.body.chinese + req.body.math + req.body.english
    insert_obj.avg = (req.body.chinese + req.body.math + req.body.english) / 3

    //将数据插入数据库
    connection.query('INSERT INTO stuScore SET ?', insert_obj, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.send('添加成功')
        }
    })
});


//  /list_user 页面 GET 请求
app.get("/list_user", function(req, res) {
    console.log("/list_user GET 请求");
    res.send("成绩列表页面");
});

var server = app.listen(8081, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;

    // 当访问网站根目录(/)时，服务器执行一个查询操作，
    // 获取stuScore表中的所有数据
    //当根目录接收到POST请求时，服务器响应
    //一般是登录，或者接收文件，存储数据之类的服务
    console.log("应用实例，访问地址为 http://%s:%s/api", host, port);

    // 指定id学生的信息
    console.log("应用实例，访问地址为 http://%s:%s/api/1", host, port);

    //当 /add_user接收到POST请求时， 服务器响应“ 增加成绩”。
    console.log("增加成绩页面，访问地址为 http://%s:%s/add_user", host, port);

    //当 /update_user接收到POST请求时， 服务器响应“ 修改成绩”。 
    console.log("修改成绩页面，访问地址为 http://%s:%s/edit", host, port);

    //访问 /del_user时，服务器响应“删除成绩”。 
    console.log("删除学生成绩页面，访问地址为 http://%s:%s/del", host, port);

    //访问/list_user时，服务器响应“成绩列表”。
    console.log("成绩列表页面，访问地址为 http://%s:%s/list_user", host, port);
});

// connection.end();