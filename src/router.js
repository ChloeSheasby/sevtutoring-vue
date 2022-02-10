import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'

// Admin Views. Views are sorted into sections for this project, so check that the path is correct below.

//Groups
import GroupList    from './views/AdminViews/GroupViews/GroupList.vue';
import GroupEdit    from './views/AdminViews/GroupViews/GroupEdit.vue';
import GroupAdd     from './views/AdminViews/GroupViews/GroupAdd.vue';
import GroupView    from './views/AdminViews/GroupViews/GroupView.vue';

// People
import PersonList    from './views/AdminViews/PersonViews/PersonList.vue';
import PersonEdit    from './views/AdminViews/PersonViews/PersonEdit.vue';
import PersonAdd     from './views/AdminViews/PersonViews/PersonAdd.vue';
import PersonView    from './views/AdminViews/PersonViews/PersonView.vue';

// Topic
import TopicList    from './views/AdminViews/TopicViews/TopicList.vue';
import TopicEdit    from './views/AdminViews/TopicViews/TopicEdit.vue';
import TopicAdd     from './views/AdminViews/TopicViews/TopicAdd.vue';
import TopicView    from './views/AdminViews/TopicViews/TopicView.vue';

// Role
import RoleList    from './views/AdminViews/RoleViews/RoleList.vue';
import RoleEdit    from './views/AdminViews/RoleViews/RoleEdit.vue';
import RoleAdd     from './views/AdminViews/RoleViews/RoleAdd.vue';
import RoleView    from './views/AdminViews/RoleViews/RoleView.vue';

// Request
import RequestList    from './views/AdminViews/RequestViews/RequestList.vue';
import RequestAdd     from './views/StudentViews/RequestAdd.vue';

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  base:
    process.env.NODE_ENV === 'development'? "/" : "/tutoring-api/",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/groupList',
      name: 'groupList',
      component: GroupList
    },
    {
      path: '/groupEdit/:id',
      name: 'groupEdit',
      component: GroupEdit,
      props: true
    },
    {
      path: '/groupAdd',
      name: 'groupAdd',
      component: GroupAdd
    },
    {
      path: '/groupView/:id',
      name: 'groupView',
      component: GroupView,
      props: true
    },
    {
      path: '/personList',
      name: 'personList',
      component: PersonList
    },
    {
      path: '/personEdit/:id',
      name: 'personEdit',
      component: PersonEdit,
      props: true
    },
    {
      path: '/personAdd',
      name: 'personAdd',
      component: PersonAdd
    },
    {
      path: '/personView/:id',
      name: 'personView',
      component: PersonView,
      props: true
    },
    {
      path: '/topicList',
      name: 'topicList',
      component: TopicList
    },
    {
      path: '/topicEdit/:id',
      name: 'topicEdit',
      component: TopicEdit,
      props: true
    },
    {
      path: '/topicAdd',
      name: 'topicAdd',
      component: TopicAdd,
      props: true
    },
    {
      path: '/topicView/:id',
      name: 'topicView',
      component:TopicView,
      props: true
    },
    {
      path: '/roleList',
      name: 'roleList',
      component: RoleList
    },
    {
      path: '/roleEdit/:id',
      name: 'roleEdit',
      component: RoleEdit,
      props: true
    },
    {
      path: '/roleAdd',
      name: 'roleAdd',
      component: RoleAdd,
      props: true
    },
    {
      path: '/roleView/:id',
      name: 'roleView',
      component:RoleView,
      props: true
    },
    {
      path: '/requestList',
      name: 'requestList',
      component: RequestList
    },
    {
      path: '/requestAdd',
      name: 'requestAdd',
      component: RequestAdd,
      props: true
    },
    /*
    {
      path: '*',
      component: NotFoundComponent
    }
    */
  ]
})
/*
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})
*/

export default router;