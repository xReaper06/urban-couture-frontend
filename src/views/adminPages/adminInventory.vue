<template>
    <div>
        <div class="inventory-header mb-2">
            <button class="btn btn-success" @click="openModal">Add Product</button>
            <input type="text" class="form-control w-25" v-model="seachProduct" placeholder="Search Product..."/>
        </div>
        <div class="card me-3">
            <div class="card-body">
                <div class="mb-3">
                <div class="fs-3">
                    <strong>Product Inventory</strong>
                </div>
            </div>
            <table class="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th class="text-light bg-dark">Image</th>
                        <th class="text-light bg-dark">Name</th>
                        <th class="text-light bg-dark">Description</th>
                        <th class="text-light bg-dark">Original Stocks</th>
                        <th class="text-light bg-dark">Updated Stocks</th>
                        <th class="text-light bg-dark">Price</th>
                        <th class="text-light bg-dark">ratings</th>
                        <th class="text-light bg-dark">Status</th>
                        <th class="text-light bg-dark">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="prod in filterProduct" :key="prod.id">
                        <td>
              <img :src="`http://localhost:3080/api/images/${prod.image}`" alt="" class="img-fluid" style="height: 50px; width: 50px; border: solid 0.5px #000; box-shadow: 0 0 2px #000;" >
                        </td>
                        <td>{{ prod.productname }}</td>
                        <td>{{ prod.productdesc }}</td>
                        <td>{{ prod.original_stocks }}</td>
                        <td>{{ prod.updated_stocks }}</td>
                        <td>P{{ prod.price }}</td>
                        <td><rating-stars
                            :read-only="true"
                            :max-rating="5"
                            :current-rating="prod.ratings"
                            /></td>
                        <td><update-status
                            :status="prod.status"
                            /></td>
                        <td><button @click="openAddModal(prod)" class="btn btn-success">Add Stocks</button>
                            <button @click="openeditModal(prod)" class="btn btn-secondary">Edit Product</button>
                            <div v-if="prod.status < 2">
                                <button @click="unavailableStock(prod)" class="btn btn-danger">Unavailable</button>
                            </div>
                            <div v-else>
                                <button @click="availableStock(prod)" class="btn btn-primary">Available</button>
                            </div>
                    </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        <edit-modal @get-all-product-inserted="getAllProductInserted" @closeedit-modal="closeeditModal" :showedit-modal="showeditModal" :product="product"/>
        <add-stocks-modal  @get-all-product-inserted="getAllProductInserted" @close-add-modal="closeAddModal" :show-add-modal="showAddModal" :prod_id="prod_id"/>
        <add-product-modal @get-all-product-inserted="getAllProductInserted" @close-modal="closeModal" :show-modal="showModal"/>
    </div>
</template>

<script setup>
import {ref,onMounted,computed} from 'vue';
import addProductModal from '@/components/modals/addProductModal.vue';
import updateStatus from '@/components/updateStatus.vue'
import ratingStars from '@/components/ratingStars.vue';
import editModal from '@/components/modals/editModal.vue'
import addStocksModal from '@/components/modals/addStocksModal.vue';
import AuthenticationService from '@/service/AuthenticationService.js';
const showModal = ref(false);
const openModal = ()=>{
    showModal.value = true;
}
const closeModal = ()=>{
    showModal.value = false
    getAllProductInserted()
}
const showeditModal = ref(false)
const product = ref([])
const openeditModal = (prod)=>{
    showeditModal.value = true
    product.value = prod
}
const closeeditModal = ()=>{
    showeditModal.value = false
}
const prod_id = ref(0);
const showAddModal = ref(false);
const openAddModal = (prod)=>{
    showAddModal.value = true;
    prod_id.value = prod.id
}
const closeAddModal = ()=>{
    showAddModal.value = false
    getAllProductInserted()
}
const allItems = ref([]);
const seachProduct = ref('');

const getAllProductInserted = async()=>{
    try {
        const response = await AuthenticationService.getAllProductInserted();
        if(response){
            allItems.value = response.data.insertedProd
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getAllProductInserted();
})
const filterProduct = computed(()=>{
    if(allItems.value.length > 0){
        return allItems.value.filter(data=>{
            return data.productname.toLowerCase().includes(seachProduct.value.toLowerCase());
        });
    }else{
        return [];
    }
});
const unavailableStock = async(prod)=>{
    try {
        const response = await AuthenticationService.unavailableStock({
            prod_id:prod.id
        });
        if(response){
            alert(response.data.msg);
            getAllProductInserted();
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}
const availableStock = async(prod)=>{
    try {
        const response = await AuthenticationService.availableStock({
            prod_id:prod.id
        });
        if(response){
            alert(response.data.msg);
            getAllProductInserted();
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}


</script>

<style scoped>
.inventory-header{
    display:flex;
    justify-content:space-between;
    margin-right:20px;
}
.card-body{
    height: 570px;
    overflow-y: scroll;
}

</style>