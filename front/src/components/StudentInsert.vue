<template>
  <div class="divCen">
    <h3>{{ msg }}</h3>
    <h4>Student Scores Insert</h4>
    <p class="p-right">
      <router-link to="/" active-class="active">Back to home</router-link>
    </p>
    <table>
      <tr>
        <th>Id</th>
        <td>
          <input type="text" v-model="id" />
        </td>
      </tr>
      <tr>
        <th>Name</th>
        <input type="text" v-model="name" />
      </tr>
      <tr>
        <th>Gender</th>
        <td><input type="radio" v-model="gender" value = 'male'/><label>男</label>
        <input type="radio" v-model="gender" value = 'female'/><label>女</label></td>
      </tr>
      <tr>
        <th>Chinese</th>
        <input type="text" v-model="chinese" />
      </tr>
      <tr>
        <th>Math</th>
        <input type="text" v-model="math" />
      </tr>
      <tr>
        <th>English</th>
        <input type="text" v-model="english" />
      </tr>
    </table>
    <p>
      <button @click="btn_add_stuinfo">Add to Save</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "StudentInsert",
  data() {
    return {
      msg: "Welcome to Student Management App",
      id: "",
      name: "",
      gender: "",
      chinese: "",
      math: "",
      english: "",
    };
  },
  computed:{
    verify: function(){
      if(!/^\d{5}$/.test(this.id)){//5位数字的正则表达式
        console.log(this.id)
        return {"flag":false,"msg":'请填写有效的学号(5位数字),例如:10000'}
      }
      if(!this.gender){
        console.log(this.gender)
        return {"flag":false,"msg":'性别必须被选择!'}
      }
      if(this.chinese<0||this.chinese>100){//检查语文成绩是否在0-100
        console.log(this.chinese)
        return {"flag":false,"msg":'请填写有效的语文成绩(范围是0~100),例如:82'}
      }
      if(this.math<0||this.math>100){//检查数学成绩是否在0-100
        console.log(this.math)
        return {"flag":false,"msg":'请填写有效的数学成绩(范围是0~100),例如:82'}
      }
      if(this.english<0||this.english>100){//检查英语成绩是否在0-100
        console.log(this.english)
        return {"flag":false,"msg":'请填写有效的英语成绩(范围是0~100),例如:82'}
      }
      return {"flag":true,"msg":"成功生成新的学生信息"}
    },
  },
  methods: {
    sendDataToBack: function(oStu){
      this.$axios({
                  method:"post",
                  url:"http://127.0.0.1:8081/insert",
                  data:oStu,
                }).then((res)=>{
                    console.log("Success Post:");
                    console.log(res.data);
                    this.$router.push({ path: "/info" }); // 转到主页
                    this.$nextTick(() => { // 确保在DOM更新完成后执行
                      window.location.reload(); 
                    });
                })
                  .catch(function (error) {
                  console.log(error);
                })
    },
    btn_add_stuinfo: function () {
      // 确保分数为数字类型
      let chineseScore = Number(this.chinese);
      let mathScore = Number(this.math);
      let englishScore = Number(this.english);
      let aggregate = chineseScore + mathScore + englishScore;
      let average = aggregate / 3.0;
      let oStu = {
        id: this.id,
        name: this.name,
        gender: this.gender,
        chinese: this.chinese,
        math: this.math,
        english: this.english,
        aggregate: aggregate,
        average: average
      };
      
      if(!this.verify.flag){
        alert(this.verify.msg)
        return ;
      }
      console.log(oStu)
      this.sendDataToBack(oStu)

      // var key = "stu" + oStu.id;
      // var stu = JSON.stringify(oStu);
      // localStorage.setItem(key, stu);
      this.$router.push({ path: "/info" });
    },
  },
  created: function () {
    // let len = localStorage.length;
    // let stuinfo;
    // let id_max = 10001;
    // for (let i = 0; i < len; i++) {
    //   let stukey = localStorage.key(i);
    //   if (stukey.substr(0, 3) == "stu") {
    //     stuinfo = JSON.parse(localStorage.getItem(localStorage.key(i)));
    //     if (id_max < stuinfo.id) {
    //       id_max = stuinfo.id;
    //     }
    //   }
    // }
    // this.id = parseInt(id_max) + 1;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3,
h4 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 128px;
}
p {
  font-style: normal;
}
p.p-right {
  font-style: italic;
  text-align: right;
}
div.divCen {
  margin: 2px auto;
  width: auto;
}
table {
  width: 60%;
  margin: auto;
  border-collapse: collapse;
  border: 0;
  text-align: center;
}
th {
  background-color: #93daff;
  color: #000000;
}
th,
td {
  font-size: 0.95em;
  text-align: center;
  padding: 4px;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #c1e9fe;
  border-width: 1px 0 1px 0;
}
tr {
  border: 1px solid #c1e9fe;
}
tr:nth-child(odd) {
  background-color: #dbf2fe;
}
tr:nth-child(even) {
  background-color: #fdfdfd;
}
</style>
