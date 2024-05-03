<template>
  <div>
    <h3>{{ msg }}</h3>
    <h4>Student Scores Table</h4>
    <table>
      <tr>
        <th>No</th>
        <th>Id</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Chinese</th>
        <th>Math</th>
        <th>English</th>
        <th>Aggregate</th>
        <th>Average</th>
        <th>Admin</th>
      </tr>
      <tr v-for="(s, index) in stu" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ s.id }}</td>
        <td>{{ s.name }}</td>
        <td>{{ s.gender }}</td>
        <td>{{ s.chinese }}</td>
        <td>{{ s.math }}</td>
        <td>{{ s.english }}</td>
        <td>{{ s.aggregate }}</td>
        <td>{{ s.average }}</td>
        <td>
          <router-link to="/insert" active-class="active">Insert</router-link>
          <router-link :to="'/edit/' + s.id" active-class="active">Edit</router-link>
          <a href @click="del_stu_info(s.id)" active-class="active">Del</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "StudentInfo",
  data() {
    return {
      msg: "Welcome to Student Management App",
      stu: Array(),
    };
  },
  computed: {
  },
  methods: {
    // info从后端数据库获得
    infoFetchData: async function(){
      console.log('Data fethed from back')
      try {
        console.log('Data retrieved:')
        const response = await this.$axios.get('http://127.0.0.1:8081/api')
        console.log(response.data)
        return response.data
      } catch(error) {
        console.error('Error fetching data:', error);
        return []; // 发生错误时返回空数组
      }
    },
    // 前端展示从后端取得的数据，排序处理
    showData: function (data) {
        let len = data.length;
        let stuinfo;
        for (let i = 0; i < len; i++) {
          stuinfo = data[i]
          stuinfo.aggregate = stuinfo.chinese + stuinfo.math + stuinfo.english
          stuinfo.average = stuinfo.aggregate / 3
          this.stu.push(stuinfo)
        }
        this.stu.sort(function(a,b){
          return b.aggregate - a.aggregate //分数从大到小，最上面的是king
          //return a.aggregate-b.aggregate;//分数从小到大
        })
        return this.stu;
    },
    // 删除的操作要返回到数据库中
    // 后端，让后端执行删除的操作
    del_stu_info: function (stuid) {
      this.$axios({
            method:"post",
            url:"http://127.0.0.1:8081/del",
            data: {"id":stuid,},
        }).then((res)=>{
            console.log("Success Post");
            console.log(res.data);
        })
          .catch(function (error) {
          console.log(error);
        })
    },
  },

  created: async function(){
    const data = await this.infoFetchData(); // 等待数据被获取,注意异步函数的调整
    this.showData(data); // 使用获取到的数据调用showData方法
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
table {
  width: 98%;
  margin: 16px 0;
  border-collapse: collapse;
  border: 0;
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
