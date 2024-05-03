import Vue from 'vue'
import Router from 'vue-router'
import StudentInfo from '@/components/StudentInfo'
import StudentInsert from '@/components/StudentInsert'
import StudentEdit from '@/components/StudentEdit'

// Vue use Router
Vue.use(Router)

// export Router
export default new Router({
    routes: [{
        path: '/',
        name: 'StudentInfo',
        component: StudentInfo
    }, {
        path: '/info',
        name: 'StudentInfo',
        component: StudentInfo
    }, {
        path: '/insert',
        name: 'StudentInsert',
        component: StudentInsert
    }, {
        path: '/edit/:id',
        name: 'StudentEdit',
        component: StudentEdit
    }]
})