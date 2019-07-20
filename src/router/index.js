import Vue from 'vue'

import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Clipboard from 'v-clipboard'

import SETTINGS from '@/components/Settings'
import Index from '@/components/Index'
import Search from '@/components/Search'
// import Letter from '@/pages/Letter'
import Clip from '@/components/Clip'

Vue.use(Router)
Vue.use(Meta)
Vue.use(Clipboard)

const router = new Router({
  routes: [
    /* {
      path: '/dearjerry',
      name: 'Letter',
      component: Letter
    }, */
    {
      path: '/scene/:scene',
      name: 'Clip',
      component: Clip
    },
    {
      path: '/:query?',
      name: 'Index',
      component: Index
    },
    {
      path: '/:catalog/:query?',
      name: 'Search',
      component: Search
    }
  ]
})

if (!SETTINGS.debug) {
  Vue.use(VueAnalytics, {
    id: SETTINGS.GA_ID,
    autoTracking: {
      exception: true,
      exceptionLogs: false
    },
    router
  })
}

export default router
