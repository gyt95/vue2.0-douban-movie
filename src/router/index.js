import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import find from '@/pages/find'
import my from '@/pages/my'
import search from '@/pages/search'
import details from '@/pages/details'
import searchList from '@/pages/searchList'
import login from '@/pages/login'
import actors from '@/pages/actors'
import billboard from '@/pages/billboard'
import reviews from '@/pages/reviews'
import ticket from '@/pages/ticket'
import chooseCinema from '@/pages/chooseCinema'
import chooseEvent from '@/pages/chooseEvent'
import order from '@/pages/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/find',
      component: find
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/details/:id',
      name: 'details',
      component: details 
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: searchList
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/actors/:id',
      name: 'actors',
      component: actors
    },
    {
      path: '/billboard/:name',
      name: 'billboard',
      component: billboard
    },
    {
      path: '/reviews/:id',
      name: 'reviews',
      component: reviews
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: ticket
    },
    {
      path: '/chooseCinema/:id',
      name: 'chooseCinema',
      component: chooseCinema
    },
    {
      path: '/chooseEvent/:id',
      name: 'chooseEvent',
      component: chooseEvent
    },
    {
      path: '/order/:id',
      name: 'order',
      component: order
    }
  ]
});
