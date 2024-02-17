<template>
    <div>
        <div class="card mb-3 navbar-custom">
        <div class="card-body">
        <a class="navbar-brand text-light"><strong>Tracking Order</strong></a>
        </div>
        </div>
        <div class="card" v-for="order in Orders" :key="order.id">
            <div class="card-body">
                <div class="order-context">
                    <div>OrderID: {{ order.order_id }}</div>
                    <div>Address: {{ order.address }} {{ order.zipcode }}</div>
                    <div><order-status
                        :status="order.status"
                        />
                        </div>
                    <div><button class="btn btn-primary" @click="openModal(JSON.parse(order.products))">View</button>
                        <div v-if="order.status == 1">
                        <button class="btn btn-danger" @click="cancelOrder(order.order_id)">Cancel Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <view-order-modal @close-modal="closeModal" :products="products" :show-modal="showModal"/>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue';
import AuthenticationService from '@/service/AuthenticationService.js'
import viewOrderModal from '@/components/modals/viewOrderModal.vue'
import orderStatus from '@/components/products/orderStatus.vue';

const Orders = ref([]);
const showModal = ref(false);
const products = ref([])
const openModal = (data)=>{
    showModal.value = true;
    products.value = data;
}
const closeModal = ()=>{
    showModal.value = false
}

const cancelOrder = async(order_id)=>{
    try {
        const response = await AuthenticationService.cancelOrder({
            orderID:order_id
        })
        if(response){
            alert(response.data.msg);
            trackMyorder()
        }
    } catch (error) {
        alert(error.response.data.msg);
        console.log(error)
    }
}
const trackMyorder = async()=>{
    try{
        const response = await AuthenticationService.trackMyorder();
        if(response){
            Orders.value = response.data.orderTrack
        }
    }catch(error){
        console.log(error);
    }
}
onMounted(()=>{
    trackMyorder();
})
</script>

<style scoped>
.navbar-custom{
    background-color: #be9183ec;
}
.order-context{
    display:flex;
    flex:column;
    justify-content: space-between;
}

</style>