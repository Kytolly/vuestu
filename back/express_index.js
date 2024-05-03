var express = require("express");
var mysql = require("mysql");
var app = express();

// app.use(cors)
// var cors = require('cors')

app.use("/public", express.static("public"));
// //配置body-parser中间件
// const BodyParser = require('body-parser')
// app.use(BodyParser.urlencoded({ extended: false }))
// app.use(BodyParser.json())

//创建数据库连接
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "xqy050116",
    database: "vuestu",
});


connection.connect();

// var bodyParser = require('body-parser'); // 解析 application/json
// app.use(bodyParser.json()); // 解析 application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

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
app.get("/", function(req, res) {
    console.log("主页 GET 请求");

    connection.query("SELECT * FROM stuScore", function(error, results, fields) {
        if (error) throw error;
        console.log("The result is: ", results);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
    // res.send("Hello GET");
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


//  /update_user 页面 POST 请求
app.post("/update_user", function(req, res) {
    console.log("/update_user Post 请求");
    // 从请求体中获取学生ID和成绩
    var { id, name, gender, chinese, math, english } = req.body;
    var sql = "UPDATE stuScore SET name = ? AND gender = ? AND chinese = ? AND math = ? AND english = ?   WHERE id = ?";
    connection.query(sql, [id, name, gender, chinese, math, english], function(error, results) {
        if (error) {
            console.error("更新失败: " + error.message);
            res.send("更新成绩失败");
            return;
        }
        console.log("更新结果: ", results);
        res.send("成绩更新成功");
    });
    res.send("修改成绩页面");
});


//  /del_user 页面响应，请补充完成
app.get("/del_user", function(req, res) {
    console.log("/del_user 响应 DELETE 请求");
    // 从请求体中获取学生ID
    var { id, name, gender, chinese, math, english } = req.body;
    var sql = "DELETE FROM stuScore WHERE id = ?";
    connection.query(sql, [id, name, gender, chinese, math, english], function(error, results) {
        if (error) {
            console.error("删除失败: " + error.message);
            res.send("删除成绩失败");
            return;
        }
        console.log("删除结果: ", results);
        res.send("成绩删除成功");
    });
    res.send("删除学生成绩页面");
});

//  /list_user 页面 GET 请求，请补充完成
app.get("/list_user", function(req, res) {
    console.log("/list_user GET 请求");
    res.send("成绩列表页面");
});

var server = app.listen(8081, '127.0.0.1', function() {
    var host = server.address().address;
    var port = server.address().port;

    // 当访问网站根目录(/)时，服务器执行一个查询操作，
    // 获取stuScore表中的所有数据
    //当根目录接收到POST请求时，服务器响应“Hello POST”。
    //一般是登录，或者接收文件，存储数据之类的服务，这个项目不详
    console.log("应用实例，访问地址为 http://%s:%s", host, port);

    //当 /add_user接收到POST请求时， 服务器响应“ 增加成绩”。
    console.log("增加成绩页面，访问地址为 http://%s:%s/add_user", host, port);

    //当 /update_user接收到POST请求时， 服务器响应“ 修改成绩”。 
    console.log("修改成绩页面，访问地址为 http://%s:%s/update_user", host, port);

    //访问 /del_user时，服务器响应“删除成绩”。 
    console.log("删除学生成绩页面，访问地址为 http://%s:%s/del_user", host, port);

    //访问/list_user时，服务器响应“成绩列表”。
    console.log("成绩列表页面，访问地址为 http://%s:%s/list_user", host, port);
});

// connection.end();