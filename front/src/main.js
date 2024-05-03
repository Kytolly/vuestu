// The Vue build version to load with the `import` command
import Vue from 'vue'
import App from './App'
import router from './router'
import './css/style.css';
import './css/background.css'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    render: h => h(App) // 使用render函数来创建根组件
}).$mount('#app');

if (window.localStorage) {
    var oStu = {
        id: '10001',
        name: 'king',
        gender: 'male',
        chinese: '100',
        math: '100',
        english: '100',
        aggregate: '300',
        average: '100'
    }
    var key = "stu" + oStu.id;
    var stu = JSON.stringify(oStu);
    localStorage.setItem(key, stu);
} else {
    alert("This browser cannot support localStorage!");
}