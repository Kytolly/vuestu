# vuestu

复杂软件与开发结课大作业（UESTC）

* 指导老师：王玉林
* 技术栈：HTML5+JavaScript+Node+Vue+Express+MySQL+Axios
* 本实验分为三步：

  * 前端修改，进行输入的检查：

    - [X] 学号限定为5位数字，需检查和提示；
    - [X] 成绩范围为[0,100]，需检查和提示；
    - [X] 性别转变成男女选择；
    - [X] 在插入和编辑页面内容不变的情况下，使得显示页面增加两个数据字段：总分和平均分，并自动实现按平均分由高到低显示，测试数据由用户任意输入。
  * 后端链接数据库，实现基本的业务逻辑:

    - [X] 将数据库中性别数据类型转变成bit；
    - [X] 在stuScore表中增加两个数据字段：总分和平均分；
    - [X] 完善学生成绩的增加、修改功能；
  * 前后端集成与扩展

    - [X] AxiosWeb访问
    - [X] 前后端跨域问题解决
    - [X] 将每条记录上的增加按钮移动到页面上方；
    - [X] 删除记录前要求用户确认；
    - [X] 增加记录分页功能；
    - [X] 增加按用户姓名或学号查询特定学生成绩功能；
* 常见指令：

  * 安装依赖：到指定目录下 `npm install`
  * 前端启动（每次改完代码无需重启）：`cd front`+`npm run dev`
  * 后端服务启动（每次修改完代码需要重新启动）：`cd back`+`node express_index.js`
