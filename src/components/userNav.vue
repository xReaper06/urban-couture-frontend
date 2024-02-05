<template>
    <div>
        <nav class="inline-nav">
          <div>

          </div>
            <div class="text-center fs-2">
                <strong class="text-center">Urban Couture</strong>
            </div>
            <div class="my-avatar">
              <img :src="`http://localhost:3080/api/images/${usersInfo.profile_picture}`" alt="" class="img-fluid" style="height: 50px; width: 50px; border-radius: 50%; border: solid 0.5px #000; box-shadow: 0 0 2px #000;" >
                {{ usersInfo.fullname }}
            </div>
        </nav>
        <sidebar>
<div class="row">
    <div v-if="showSidebar" class="col-md-3">
      <div class="card my-side-bar">
        <div class="nav-button">
            <a href="#" class="burger-button" @click="clickSidebar">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
            </a>
          </div>
          <div class="card-body">
              <ul class="nav flex-column gap-3">
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Dashboard')}" to="/user/Dashboard">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-bag" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg> Shop
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Cart')}" to="/user/Cart">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg> Cart
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Track')}" to="/user/Track">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-radar" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 12h-8a1 1 0 1 0 -1 1v8a9 9 0 0 0 9 -9" /><path d="M16 9a5 5 0 1 0 -7 7" /><path d="M20.486 9a9 9 0 1 0 -11.482 11.495" /></svg> Track-Order
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/History')}" to="/user/History">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-history" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8l0 4l2 2" /><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg> History
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Chat')}" to="/user/Chat">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg> Chat
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Settings')}" to="/user/Settings">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg> settings
  </router-link>
</li>
<li class="nav-item">
  <a class="custom-link" @click="logout">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-power" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg> Log out
  </a>
</li>
</ul>
          </div>
      </div>
      </div>
      <div v-else class="col-md-1">
        <div class="card my-side-bar">
        <div class="nav-button2">
            <a href="#" class="burger-button" @click="clickSidebar">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
            </a>
          </div>
          <div class="card-body">
              <ul class="nav flex-column gap-3">
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Dashboard')}" to="/user/Dashboard">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-bag" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg>
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Cart')}" to="/user/Cart">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Track')}" to="/user/Track">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-radar" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 12h-8a1 1 0 1 0 -1 1v8a9 9 0 0 0 9 -9" /><path d="M16 9a5 5 0 1 0 -7 7" /><path d="M20.486 9a9 9 0 1 0 -11.482 11.495" /></svg>
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/History')}" to="/user/History">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-history" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8l0 4l2 2" /><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg>
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Chat')}" to="/user/Chat">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg>
  </router-link>
</li>
<li class="nav-item">
  <router-link class="custom-link" :class="{'active-link':isActive('/user/Settings')}" to="/user/Settings">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
  </router-link>
</li>
<li class="nav-item">
  <a class="custom-link" @click="logout">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-power" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>
  </a>
</li>
</ul>
</div>
      
      </div>
      </div>
      <div class="col-md justify-content-center ms-3 ml-3">
          <div class="my-content">
              <main>
                  <router-view />
              </main>
          </div>
      </div>
</div>
        </sidebar>
        <footer class="footer">
          <div class="row">
            <div class="col-md-3">
              <div class="fs-6 mt-2 ms-2 text-light text-shadow"><strong>
                About us
              </strong></div>
              <p class="text-white ms-2 text-shadow italic">Mind Metricsis a professional in the field of Information Technology (IT) especially to Web
                Development and one of the leading team in Cordova Public College (CPC) to make a hard coded and brilliant Web Design 
              </p>
            </div>
            <div class="col-md-3">
              <div class="fs-6 mt-2 text-light text-shadow"><strong>
                Contact us
              </strong></div>
              <ul class="text-light text-shadow">
                <li>Bankal, Ibabao, Cordova, Cebu, 6017</li>
                <li>+63 921 102 2001</li>
                <li>bryanquinanola@gmail.com</li>
                <li>Mon - Fri, 9AM - 5PM</li>
              </ul>
            </div>
            <div class="col-md-3">
              <div class="fs-6 mt-2 text-light text-shadow"><strong>
                Social Links
              </strong></div>
                <a href="https://www.facebook.com/bryan.quinanola.9" target="_blank" class="text-primary text-decoration-none box-shadow"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg></a>
            </div>
            <div class="col-md-3">
              <div class="fs-6 mt-2 text-light text-shadow"><strong>
                TOP SALES
              </strong></div>
              <div class="background">
                <div>
                  <div class="row">
                    <div class="col-md-4" v-for="prods in featuredProds" :key="prods.id">
                      <router-link :to="{name:'viewProduct',props:{id:prods.id},params:{id:prods.id}}">
                        <img :src="`http://localhost:3080/api/images/${prods.image}`" class="featured-images" :alt="`featured Products${prods.id}`">
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
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

const showSidebar = ref(true)
const featuredProds = ref([]);
const clickSidebar = ()=>{
  showSidebar.value = !showSidebar.value
}
const featuredProducts = async()=>{
  try{
    const response = await AuthenticationService.featuredProducts();
    if(response){
      featuredProds.value = response.data.featuredProducts
    }
  }catch(error){
    console.log(error);
  }
}
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
featuredProducts()
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
.burger-button{
  text-decoration: none;
  color: #000;
}
.background{
  background-color: #be9183ec;
  display: flex;
  margin-top: 20px;
  margin-left: 100px;
  width: 120px;
  height: 120px;
}
.custom-link{
    display: block; 
    color: #ffffff;
    text-decoration: none;
    padding: 10px;
    width: 100%;
    padding: auto;
    cursor: pointer;
    text-shadow: 0 0 5px #000;
}
.box-shadow{
  margin-top:50px;
  padding: 5px;
  border-radius: 5px;
}
.box-shadow:hover{
  background-color:  rgba(3, 2, 2,0.5);
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
.featured-images{
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  gap: 2px;
}
.footer{
  background-color: #be9183ec;
}
.featured-images:hover{
  box-shadow: 0 0 5px #000;
}
.text-shadow{
  text-shadow:  0 0 5px #000;
}
.italic{
  font-style: italic;
}
.inline-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    padding: 10px;
    color: rgb(3, 2, 2);
    text-align: center;

  }
.my-side-bar{
  top: 0%;
  margin-top: 0%;
  margin-left: 20px;
  width: 100%;
  height: 100%;
  background-color: #be9183ec;
}
.nav-button{
  cursor: pointer;
  justify-self: end;
  display: flex;
  margin: auto;
  margin-top: 3px;
  transform: translateX(8rem);
}
.nav-button2{
  cursor: pointer;
  justify-self: end;
  display: flex;
  margin: auto;
  margin-top: 3px;
  transform: translateX(0rem);
}
.nav-button2:hover{
  border-radius: 50%;
  background-color: rgba(3, 2, 2,0.5);
  padding: 5px;
}
.nav-button:hover{
  border-radius: 50%;
  background-color: rgba(3, 2, 2,0.5);
  padding: 5px;
}
.my-content{
  width: 100%;
  margin-right: 30px;
}
.active-link{
  color: #ffffff;
  background-color: rgba(3, 2, 2,0.5);
  border-radius: 5px;
}
</style>