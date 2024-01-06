<template>
    <div>
        <div class="card">
            <div class="card-body">
                <table class="table table-responsive table-striped table-dark table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USERNAME</th>
                            <th>FULLNAME</th>
                            <th>ADDRESS</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>ROLE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="rider in riders" :key="rider.id">
                            <td>{{ rider.id }}</td>
                            <td>{{ rider.username }}</td>
                            <td>{{ rider.fullname }}</td>
                            <td>{{ rider.address }}</td>
                            <td>{{ rider.email }}</td>
                            <td>{{ rider.phone }}</td>
                            <td>{{ rider.role }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import AuthenticationService from '@/service/AuthenticationService';
const riders = ref([]);

const getAllRiders = async()=>{
    try {
        const response = await AuthenticationService.getAllRiders();
        if(response){
            riders.value = response.data.riders
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getAllRiders();
})
</script>

<style scoped>

</style>