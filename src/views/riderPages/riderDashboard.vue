<template>
    <div>
        <div class="m-3">
            <button @click="getAllItemsTobeDeliver">Refresh</button>
        </div>
        <div class="container-fluid mb-5">
            <div class="card">
                <div class="card-header text-center"><strong>Order Needs to Deliver</strong></div>
                <div class="card-body custom-body">
                    <table class="table table-responsive table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ORDER ID</th>
                                <th>RECIEVER</th>
                                <th>ADDRESS</th>
                                <th>TOTAL PRICE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in myItems" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.order_id }}</td>
                                <td>{{ item.fullname }}</td>
                                <td>{{ item.address }}</td>
                                <td>P{{ item.totalPrice }}</td>
                                <td><button @click="openModal(item.order_id)">Product Delivered</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card mt-4">
                <div class="card-header text-center"><strong>Orders Delivered</strong></div>
                <div class="card-body custom-body2">
                    <table class="table table-responsive table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ORDER ID</th>
                                <th>RECIEVER</th>
                                <th>ADDRESS</th>
                                <th>TOTAL PRICE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in delivered" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.order_id }}</td>
                                <td>{{ item.fullname }}</td>
                                <td>{{ item.address }}</td>
                                <td>P{{ item.totalPrice }}</td>
                                <td>
                        <button class="btn btn-secondary" @click="openViewModal(item.proof)">View Proof</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <view-proof @close-view-modal="closeViewModal" :show-view-modal="showViewModal" :proof="proof"/>
        <delivered-modal @close-modal="closeModal" @get-all-item-need-tobe-deliver="getAllItemsTobeDeliver" :show-modal="showModal" :order_id="order_id"/>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import deliveredModal from '@/components/modals/deliveredModal.vue';
import viewProof from '@/components/modals/viewProof.vue';
const myItems = ref([]);

const order_id = ref('')
const showModal = ref(false)
const openModal = (data)=>{
    showModal.value = true;
    order_id.value = data;
}
const closeModal = ()=>{
    showModal.value = false
    getAllItemsTobeDeliver();
}
const proof = ref(null);
const showViewModal = ref(false)
const openViewModal = (data)=>{
    showViewModal.value = true;
    proof.value = data;
}
const closeViewModal = ()=>{
    showViewModal.value = false
}
const delivered =ref([]);
const getAllItemsTobeDeliver = async()=>{
    try {
        const response = await AuthenticationService.getAllItemNeedtoDeliver();
        if(response){
            myItems.value = response.data.itemToDeliver
        }
    } catch (error) {
        console.log(error);
    }
}
const getAllItemsDelivered = async()=>{
    try {
        const response = await AuthenticationService.getAllItemDelivered();
        if(response){
            delivered.value = response.data.itemToDeliver
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getAllItemsTobeDeliver();
    getAllItemsDelivered();
})

</script>

<style scoped>
.custom-body{
    height: 300px;
    overflow-y: scroll;
}
.custom-body2{
    height: 200px;
    overflow-y: scroll;
}

</style>