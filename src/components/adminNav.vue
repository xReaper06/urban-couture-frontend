<template>
    <div>
        <nav class="inline-nav custom-nav">
            <div class="text-center fs-2">
                <strong>Admin Panel</strong>
            </div>
        </nav>
        <div class="row">
            <div class="col-md-3">
                <div class="card my-side-bar">
                    <div class="card-body text-center">
                        <ul class="nav flex-column gap-3">
          <li class="nav-item">
            <router-link class="custom-link" :class="{'active-link':isActive('/admin/Dashboard')}" to="/admin/Dashboard">
              <strong>Dashboard</strong>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="custom-link" :class="{'active-link':isActive('/admin/Inventory')}" to="/admin/Inventory">
              <strong>Inventory</strong>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="custom-link" @click="openProductCollapse"><strong>Order menu</strong></a>
            <div class="collapse" :class="{show:showProductCollase}">
              <router-link class="custom-link text-small" :class="{'active-link':isActive('/admin/Pending')}" to="/admin/Pending">
                Pending
              </router-link>
           
              <router-link class="custom-link text-small" :class="{'active-link':isActive('/admin/Process')}" to="/admin/Process">
                Process
              </router-link>
           
              <router-link class="custom-link text-small" :class="{'active-link':isActive('/admin/Shipped')}" to="/admin/Shipped">
                Shipped
              </router-link>
              <router-link class="custom-link text-small" :class="{'active-link':isActive('/admin/DeliveryInfo')}" to="/admin/DeliveryInfo">
                DeliveryInfo
              </router-link>
              <router-link class="custom-link text-small" :class="{'active-link':isActive('/admin/History')}" to="/admin/History">
                History
              </router-link>
              <router-link class="custom-link text-small" :class="{'active-link':isActive('/admin/Ratings')}" to="/admin/Ratings">
                Ratings
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link class="custom-link" :class="{'active-link':isActive('/admin/Messages')}" to="/admin/Messages">
              <Strong>
                Messages
              </Strong>
            </router-link>
          </li>
          <li class="nav-item" @click="openRiderCollapse">
            <a class="custom-link">
              <strong>
                Rider
              </strong>
            </a>
            <div class="collapse" :class="{show:showRiderCollapse}">
              <router-link class="custom-link text-small" :class="{'active-link':isActive('/admin/Riders')}" to="/admin/Riders">
                All Riders
              </router-link>
              <router-link class="custom-link text-small" :class="{'active-link':isActive('/admin/RidersApplicant')}" to="/admin/RidersApplicant">
                Riders Applicant
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <a class="custom-link" @click="logout">
              <strong>Log out</strong>
            </a>
          </li>
          </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="my-content">
                    <main>
                        <router-view />
                    </main>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {useAuthStore} from '@/store'
import AuthenticationService from '@/service/AuthenticationService';
const showRiderCollapse = ref(false)
const authStore = useAuthStore();
const router = useRouter();
const isActive = (route) => router.currentRoute.value.path === route;

const showProductCollase =ref(false);

const openProductCollapse = ()=>{
  showProductCollase.value = !showProductCollase.value;
  showRiderCollapse.value = false
}
const openRiderCollapse = ()=>{
  showRiderCollapse.value = !showRiderCollapse.value
  showProductCollase.value = false
}

const logout = async ()=>{
try{  
    const response = await AuthenticationService.logout();
    if(!response){
      console.log('Cannot Logout');
    }
    authStore.logOut()
    router.push('/')
}catch(err){
    console.error('Error Logout')
}
}

</script>

<style scoped>
.text-small{
  font-size: 15px;
}
.custom-Nav{
    background-color: #be9183ec;
    color: #fff;
}
.my-side-bar{
    top: 0%;
    margin-top: 0%;
    height: 640px;
    background-color: #be9183ec;
}
.custom-link{
    display: block; 
    color: #ffffff;
    text-decoration: none;
    padding: 10px;
    width: 100%;
    padding: auto;
    cursor: pointer;
}
.my-content{
    margin-left: 5px;
}
.custom-link:hover{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.5);
    border-radius: 5px;
    width: 100%;
}
.custom-link:active{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.5);
    border-radius: 5px;
    width: 100%;
}
.active-link{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.5);
    border-radius: 5px;
    width: 100%;
}
</style>