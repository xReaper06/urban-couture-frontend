<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><img src="@/assets/mainLogo.jpg" alt="main Logo" class="img-fluid me-4" style="height: 50px; width:100px;" ></a>
                <form class="searchBar"  role="search">
<input class="form-control me-2" type="search" @click="openModal" placeholder="click to Search" aria-label="Search">
</form>
                <button class="navbar-toggler" type="button" @click="openMain" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" :class="{ show: showMain }" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" @click="openCollapse" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img :src="`http://localhost:3080/api/images/${usersInfo.profile_picture}`" alt="" class="img-fluid" style="height: 35px; width: 35px; border-radius: 50%; border: solid 0.5px #000; box-shadow: 0 0 2px #000;" >
                {{ usersInfo.fullname }}
                            </a>
                            <ul class="dropdown-menu" :class="{ show: showCollapse }">
                                <li><a class="dropdown-item" href="#" @click="logout">Log Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <main>
            <router-view/>
        </main>
        <search-modal @close-modal="closeModal" :items="items" @get-deliver-item="getDeliverItem" :show-modal="showModal"/>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {useAuthStore} from '@/store'
import searchModal from '../components/modals/searchModal.vue'
import AuthenticationService from '@/service/AuthenticationService';

const authStore = useAuthStore();
const router = useRouter();
const showModal = ref(false);
const openModal = ()=>{
        showModal.value = true
}
const items =ref([])
const getDeliverItem = async()=>{
    try {
        const response = await AuthenticationService.getDeliverItem()
        if(response){
            items.value = response.data.items;
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getDeliverItem();
    getUsersInfo();
})
const closeModal = ()=>{
    showModal.value = false
}
const showCollapse = ref(false);
const openCollapse = () => {
    showCollapse.value = !showCollapse.value;
};

const showMain = ref(false);
const openMain = () => {
    showMain.value = !showMain.value;
};
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
.searchBar{
    display: flex;
    justify-content: center;
}
.searchBar:hover{
    box-shadow: 0 0 10px rgba(00, 00, 00, 0.4);
    border-radius: 5px;
}
.searchParent{
    margin-left: 400px;
}
</style>
