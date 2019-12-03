import Vue from 'vue'
import Router from 'vue-router'
import Design from '@/components/DesignQuestionnaire.vue'
import Show from '@/components/ShowQuestions.vue'
import Ans from '@/components/Answer.vue'


// import HelloWorld from '@/components/Question'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Design',
      component: Design
    },
    {
      path:'/show',
      component: Show
    },
    {
      path:'/answer',
      component: Ans
    }
  ]
})
