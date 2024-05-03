<template>
  <div class="page-background"> 
    <h1>{{ msg }}</h1>
    <!-- <h3>Student Scores Table</h3> -->
    <div>
      <button>
        <router-link to="/insert" active-class="active">
          <img src="../img/添加.svg"  height = '12' weight = '12' />
          add
        </router-link>
      </button>

      <button @click="searchStudent">Serach</button>
      <input type="text" v-model="searchQuery" placeholder="输入学生姓名或学号">
    </div>

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
      <tr v-for="(s, index) in currentPageData" :key="index">
        <td :class="{ 'highlight': s.id === highlightedId }">{{ index+1 }}</td>
        <td :class="{ 'highlight': s.id === highlightedId }">{{ s.id }}</td>
        <td :class="{ 'highlight': s.id === highlightedId }">{{ s.name }}</td>
        <td>{{ s.gender }}</td>
        <td>{{ s.chinese }}</td>
        <td>{{ s.math }}</td>
        <td>{{ s.english }}</td>
        <td>{{ s.aggregate }}</td>
        <td>{{ s.average }}</td>
        <td>
          <button>
            <router-link :to="'/edit/' + s.id" active-class="active">
              <img src="../img/编辑.svg" height='12' weight='12'/>
              edit
            </router-link>
          </button>
          <button>
            <a href @click="del_stu_info(s.id,s.name)" active-class="active">
              <img src="../img/删除.svg" height='12' weight='12'/>
              del
            </a>
          </button>
        </td>
    </tr>
    </table>
    <!-- 前一页和后一页按钮 -->
    <button @click="changePage(-1)" :disabled="currentPage === 1">Previous</button>
    <!-- 页码按钮 -->
    <span v-for="page in pages" :key="page">
      <button @click="goToPage(page)" :disabled="currentPage === page">{{ page }}</button>
    </span>
    <button @click="changePage(1)" :disabled="currentPage === totalPages">Next</button>
  </div>
  
</template>

<script>
export default {
  name: "StudentInfo",
  data() {
    return {
      msg: "Student Management App",
      stu: Array(),
      currentPage: 1,
      pageSize: 10,
      searchQuery: '',
      highlightedId: null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.stu.length / this.pageSize);
    },
    pages() {
      let pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    },
    currentPageData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.stu.slice(start, end);
    }
  },
  methods: {
    searchStudent() {
      console.log(this.searchQuery)
      console.log(this.stu)
      const matchedStudent = this.stu.find((student) =>
        String(student.name) === String(this.searchQuery)
        || String(student.id) === String(this.searchQuery)
      );
      if (matchedStudent) {
        // 计算应跳转的页面
        const pageIndex = Math.ceil((this.stu.indexOf(matchedStudent) + 1) / this.pageSize);
        this.currentPage = pageIndex; // 设置当前页码
        this.highlightedId = matchedStudent.id; // 设置高亮显示的学生ID
        console.log(this.highlightedId)
      } else {
        alert("未找到对应的学生，请检查输入！");
        this.highlightedId = null;
      }
    },
    changePage(step) {
      const requestedPage = this.currentPage + step;
      if(requestedPage >= 1 && requestedPage <= this.totalPages) {
        this.currentPage = requestedPage;
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
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
          stuinfo.gender = (data[i].gender.data[0]===1)?"男":"女"
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
    del_stu_info: function (stuid,stuname) {
      window.confirm(`你正在删除${stuname}(id:${stuid})的信息，你个大坏蛋！`)
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
    console.log(data);
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


