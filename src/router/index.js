import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from '@/store';
import landingPage from '../views/landingPage.vue';
import userNav from '../components/userNav.vue';
import userDashboard from '../views/userPages/userDashboard.vue'
import userCart from '../views/userPages/userCart.vue';
import trackOrder from '../views/userPages/trackOrder.vue'
import orderHistory from '../views/userPages/orderHistory.vue'
import adminNav from '../components/adminNav.vue';
import adminDashboard from '../views/adminPages/adminDashboard.vue';
import adminInventory from '../views/adminPages/adminInventory.vue';
import processOrder from '../views/adminPages/processOrder.vue';
import shippedOrder from '../views/adminPages/shippedOrder.vue';
import AdminorderHistory from '../views/adminPages/orderHistory.vue';
import productRatings from '../views/adminPages/productRatings.vue';
import adminMessages from '../views/adminPages/adminMessages.vue';
import viewProduct from '../views/userPages/viewProduct.vue';
import pendingOrders from '../views/adminPages/pendingOrders.vue';
import riderApply from '../views/riderApply.vue'
import riderApplication from '../views/adminPages/riderApplication.vue';
import allRiders from '../views/adminPages/allRiders.vue';
import riderRegistration from '../views/riderRegistration.vue'
import riderNav from '../components/riderNav.vue';
import riderDashboard from '../views/riderPages/riderDashboard.vue'
import adminDelivery from '../views/adminPages/adminDelivery.vue';
import viewRatings from '../views/adminPages/viewRatings.vue';
import userSettings from '../views/userPages/userSettings.vue';
import userChat from '../views/userPages/userChat.vue';





const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: landingPage
  },
  {
    path: '/Application',
    name: 'riderApply',
    component: riderApply
  },
  {
    path: '/RegistrationsRider/:token',
    name: 'riderRegistration',
    component: riderRegistration,
    params:true,
    props:true,
  },
  {
    path: '/user/',
    name: 'userNav',
    component: userNav,
    meta:{requiresAuth:true,requiredRoles: ['user']},
    children:[
      {
        path:'Dashboard',
        name:'userDashboard',
        component:userDashboard,
      },
      {
        path:'Cart',
        name:'userCart',
        component:userCart,
      },
      {
        path:'Track',
        name:'trackOrder',
        component:trackOrder,
      },
      {
        path:'History',
        name:'orderHistory',
        component:orderHistory,
      },
      {
        path:'Settings',
        name:'userSettings',
        component:userSettings,
      },
      {
        path:'Product/:id',
        name:'viewProduct',
        component:viewProduct,
        props:true,
        params:true
      },
      {
        path:'Chat',
        name:'userChat',
        component:userChat
      }
    ]
  },
  {
    path:'/admin/',
    name:'adminNav',
    component:adminNav,
    meta:{requiresAuth:true,requiredRoles: ['admin'] },
    children:[
      {
        path:'Dashboard',
        name:'adminDashboard',
        component:adminDashboard
      },
      {
        path:'Inventory',
        name:'adminInventory',
        component:adminInventory
      },
      {
        path:'Process',
        name:'processOrder',
        component:processOrder
      },
      {
        path:'Shipped',
        name:'shippedOrder',
        component:shippedOrder
      },
      {
        path:'History',
        name:'AdminorderHistory',
        component:AdminorderHistory
      },
      {
        path:'Ratings',
        name:'productRatings',
        component:productRatings
      },
      {
        path:'Rating/:id',
        name:'viewRatings',
        component:viewRatings,
        props:true,
        params:true
      },
      {
        path:'Messages',
        name:'adminMessages',
        component:adminMessages
      },
      {
        path:'Pending',
        name:'pendingOrders',
        component:pendingOrders
      },
      {
        path:'Riders',
        name:'allRiders',
        component:allRiders
      },
      {
        path:'RidersApplicant',
        name:'riderApplication',
        component:riderApplication
      },
      {
        path:'DeliveryInfo',
        name:'adminDelivery',
        component:adminDelivery
      }
    ]
  },
  {
    path:'/rider/',
    name:'riderNav',
    component:riderNav,
    meta:{requiresAuth:true,requiredRoles: ['rider'] },
    children:[
      {
        path:'Dashboard',
        name:'riderDashboard',
        component:riderDashboard
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active', // Class applied to active links
  linkExactActiveClass: 'exact-active',
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiredRoles = to.meta.requiredRoles;
  const user = sessionStorage.getItem('user');
  
  // Check if the user is authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to the login page or an unauthorized page
    next('/user/login'); // Adjust the destination route as needed
  } else if (requiredRoles && requiredRoles.length > 0) {
    // Check if the user has the required role
    const parseUser = JSON.parse(user);
    const userRoles = parseUser.role;
    console.log(userRoles)

    if (userRoles == '' || !requiredRoles.some(role => userRoles.includes(role))) {
      // Redirect to an unauthorized page or an appropriate action
      next('/unauthorized')
    } else {
      // User meets the authentication and role requirements, proceed
      next();
    }
  } else {
    // No specific role or authentication requirement, proceed
    next();
  }
});

export default router
