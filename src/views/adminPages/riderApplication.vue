<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="mb-3">
                <div class="fs-3">
                    <strong>Rider Applicants</strong>
                </div>
            </div>
                <table class="table table-responsive table-striped table-hover">
                    <thead>
                        <tr>
                        <th class="text-light bg-dark">ID</th>
                        <th class="text-light bg-dark">Email</th>
                        <th class="text-light bg-dark">Date Sent</th>
                        <th class="text-light bg-dark">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="app in applicants" :key="app.id">
                            <td>{{ app.id }}</td>
                            <td>{{ app.email }}</td>
                            <td>{{ app.created }}</td>
                            <td><button class="btn btn-secondary" @click="openModal(app.file)">View CV</button>
                            <button class="btn btn-success" @click="acceptRiderApplication(app.email)">accept</button>
                            <button class="btn btn-danger" @click="denyRiderApplication(app.email)">deny</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <view-c-v-modal @close-modal="closeModal" :file="file" :show-modal="showModal"/>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import AuthenticationService from '@/service/AuthenticationService.js'
import viewCVModal from '@/components/modals/viewCVModal.vue';

const applicants = ref([]);
const file = ref(null)
const showModal = ref(false)
const openModal = (data)=>{
    showModal.value = true;
    file.value = data;
}
const closeModal = ()=>{
    showModal.value = false
}
const denyRiderApplication = async(data)=>{
    try {
        const response = await AuthenticationService.denyRiderApplicant({
            email:data
        });
        if(response){
            alert(response.data.msg);
            getAllApplicants();
        }
    } catch (error) {
        console.log(error);
    }
}
const acceptRiderApplication = async(data)=>{
    try {
        const response = await AuthenticationService.acceptRiderApplicant({email:data});
        if(response){
            alert(response.data.msg);
            getAllApplicants();
        }
    } catch (error) {
        console.log(error);
    }
}
const getAllApplicants = async()=>{
    try {
        const response = await AuthenticationService.getAllRidersApplicant();
        if(response){
            applicants.value = response.data.applicants
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getAllApplicants()
})

</script>

<style scoped>

</style>