<template>
  <div class="divCen">
    <h3>{{ msg }}</h3>
    <h4>Student Scores Edit</h4>
    <p class="p-right">
      <router-link to="/" active-class="active">Back to home</router-link>
    </p>
    <table>
      <tr>
        <th>Id</th>
        <td>
          <input type="text" :value="id" readonly />
        </td>
      </tr>
      <tr>
        <th>Name</th>
        <input type="text" v-model="name" />
      </tr>
      <tr>
        <th>Gender</th>
        <input type="radio" v-model="gender" value = 'male'/>男
        <input type="radio" v-model="gender" value = 'female'/>女
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
      <button @click="btn_edit_stuinfo">Edit to Save</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "StudentEdit",
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
  // 从后端获取数据
  created: function () {
    this.id = this.$route.params.id;
    let stuinfo = JSON.parse(localStorage.getItem("stu" + this.id));
    this.name = stuinfo.name;
    this.gender = stuinfo.gender;
    this.chinese = stuinfo.chinese;
    this.math = stuinfo.math;
    this.english = stuinfo.english;
    this.aggregate = stuinfo.aggregate;
    this.average = stuinfo.average;
  },
  computed:{
    verify: function(){
      if(!/^\d{5}$/.test(this.id)){//5位数字的正则表达式
        console.log(this.id)
        return {"flag":false,"msg":'请填写有效的学号(5位数字),例如:10000'}
      }
      if(!this.gender){
        console.log(this.gender)
        return {"falg":false,"msg":'性别必须被选择!除非真的是武装直升机~'}
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
    btn_edit_stuinfo: function () {
      // 确保分数为数字类型
      let chineseScore = parseFloat(this.chinese);
      let mathScore = parseFloat(this.math);
      let englishScore = parseFloat(this.english);

      let aggregate = chineseScore + mathScore + englishScore;
      let average = aggregate / 3.0;
      
      let oStu = {
        id: this.id,
        name: this.name,
        gender: this.gender,
        chinese: this.chinese,
        math: this.math,
        english: this.english,
      };
      var key = "stu" + oStu.id;
      var stu = JSON.stringify(oStu);
      localStorage.setItem(key, stu);
      this.$router.push({ path: "/info" });
    },
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
