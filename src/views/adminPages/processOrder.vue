<template>
    <div>
        <div class="card">
        <div class="card-body">
            <div class="mb-3">
                <div class="fs-3">
                    <strong>Processed Orders</strong>
                </div>
            </div>
            <table class="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th class="text-light bg-dark">ORDER ID</th>
                        <th class="text-light bg-dark">Reciever's Name</th>
                        <th class="text-light bg-dark">Address</th>
                        <th class="text-light bg-dark">Contact Number</th>
                        <th class="text-light bg-dark">TotalPrice</th>
                        <th class="text-light bg-dark">Status</th>
                        <th class="text-light bg-dark">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id">
                        <td>{{ order.order_id }}</td>
                        <td>{{ order.fullname }}</td>
                        <td>{{ order.address }} {{ order.zipcode }}</td>
                        <td>#{{ order.phone }}</td>
                        <td>P{{ order.totalPrice }}</td>
                        <td><order-status
                        :status="order.status"
                        /></td>
                        <td><button class="btn btn-primary" @click="openModal(JSON.parse(order.products))">ViewProd</button>
                        <button class="btn btn-success" @click="itemShipped(order.order_id)" >Ship</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
        <view-order-modal @close-modal="closeModal" :products="products" :show-modal="showModal"/>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import AuthenticationService from '@/service/AuthenticationService';
import viewOrderModal from '@/components/modals/viewOrderModal.vue';
import orderStatus from '@/components/products/orderStatus.vue';

const orders = ref([]);
const products = ref([])
const showModal = ref(false)
const openModal = (data)=>{
    showModal.value = true;
    products.value = data;
}
const closeModal = ()=>{
    showModal.value = false
}

const itemShipped = async (data)=>{
    try {
        const response = await AuthenticationService.itemShipped({
            order_id:data
        })
        if(response){
            alert(response.data.msg)
            getAllItemsProccessed();
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllItemsProccessed = async()=>{
    try {
        const response = await AuthenticationService.getAllItemsProccessed();
        if(response){
            orders.value = response.data.allItemsProccessed
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getAllItemsProccessed()
})

</script>

<style scoped>

</style>