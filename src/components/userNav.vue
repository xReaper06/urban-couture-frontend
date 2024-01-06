<template>
    <div>
        <nav class="inline-nav">
            <div class="text-center fs-2">
                <strong>Urban Couture</strong>
            </div>
            <div class="my-avatar">
              <img :src="`http://localhost:3080/api/images/${usersInfo.profile_picture}`" alt="" class="img-fluid" style="height: 50px; width: 50px; border-radius: 50%; border: solid 0.5px #000; box-shadow: 0 0 2px #000;" >
                {{ usersInfo.fullname }}
            </div>
        </nav>
        <div class="row">
            <div class="col-md-2">
                <div class="card my-side-bar">
                    <div class="card-body">
                        <ul class="nav flex-column gap-3">
          <li class="nav-item">
            <router-link class="custom-link" :class="{'active-link':isActive('/user/Dashboard')}" to="/user/Dashboard">
              Shop
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="custom-link" :class="{'active-link':isActive('/user/Cart')}" to="/user/Cart">
              Cart
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="custom-link" :class="{'active-link':isActive('/user/Track')}" to="/user/Track">
              Track-Order
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="custom-link" :class="{'active-link':isActive('/user/History')}" to="/user/History">
              History
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="custom-link" :class="{'active-link':isActive('/user/Chat')}" to="/user/Chat">
              Chat
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="custom-link" :class="{'active-link':isActive('/user/Settings')}" to="/user/Settings">
              settings
            </router-link>
          </li>
          <li class="nav-item">
            <a class="custom-link" @click="logout">
              Log out
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
import { useRouter } from 'vue-router';
import { ref,onMounted } from 'vue';
import { useAuthStore } from '@/store';
import AuthenticationService from '@/service/AuthenticationService';
const authStore = useAuthStore();
const router = useRouter();
const isActive = (route) => router.currentRoute.value.path === route;
const usersInfo = ref([]);

const getUsersInfo = async()=>{
  try {
    const response = await AuthenticationService.getUsersInfo();
    if(response){
      usersInfo.value = response.data.user_info
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(()=>{
  getUsersInfo();
})

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
.my-avatar{
    margin-right: 70px;
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
.custom-link:hover{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.5);
    border-radius: 5px;
}
.custom-link:active{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.5);
    border-radius: 5px;
}
.inline-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      padding: 10px;
      color: rgb(3, 2, 2);
      text-align: center;
      margin-left: 500px;
    }
.my-side-bar{
    top: 0%;
    margin-top: 0%;
    margin-left: 20px;
    height: 500px;
    background-color: #be9183ec;
}
.my-content{
    margin-left: 10px;
}
.active-link{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.5);
    border-radius: 5px;
}
</style>