<template>
    <div>
        <div class="card mb-3 navbar-custom">
        <div class="card-body">
        <a class="navbar-brand text-light"><strong>Order History</strong></a>
        </div>
        </div>
        <div class="card">
            <div class="card-body">
                <table class="table tabl-responsive table-striped">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in myHistory" :key="item.id">
                            <td>{{ item.order_id }}</td>
                            <td>
                                <order-status :status="item.status"/>
                            </td>
                            <td>
                                <div v-if="item.status == 4">
                                    <button class="btn" @click="openAcceptModal(JSON.parse(item.products),item.order_id)">Rate Products</button>
                                </div>
                                <div v-else>
                                    <button class="btn" @click="openModal(JSON.parse(item.products))">Show Ordered Products</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <view-order-modal @close-modal="closeModal" :products="products" :show-modal="showModal"/>
        <accept-delivery @purchase-history="puchaseHistory" @close-accept-modal="closeAcceptModal" :show-accept-modal="showAcceptModal" :products="products" :order_id="order_id"/>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import AuthenticationService from '@/service/AuthenticationService.js';
import orderStatus from '@/components/products/orderStatus.vue';
import viewOrderModal from '@/components/modals/viewOrderModal.vue'
import acceptDelivery from '@/components/modals/acceptDelivery.vue';


const showAcceptModal = ref(false);
const products = ref([])
const order_id = ref('')
const openAcceptModal = (data,id)=>{
    showAcceptModal.value = true;
    products.value = data;
    order_id.value = id
}
const closeAcceptModal = ()=>{
    showAcceptModal.value = false
    puchaseHistory();
}
const showModal = ref(false);
const openModal = (data)=>{
    showModal.value = true;
    products.value = data;
}
const closeModal = ()=>{
    showModal.value = false
}
const myHistory = ref([]);
const puchaseHistory = async()=>{
    try {
        const response = await AuthenticationService.puchaseHistory();
        if(response){
            myHistory.value = response.data.orderHistory
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    puchaseHistory();
})
</script>

<style scoped>
.navbar-custom{
    background-color: #be9183ec;
}
.btn{
    background-color: #a88074ec;
    color: #f0e8e8;
}

</style>