<template>
    <div>
        <div class="mb-3">
                <div class="fs-3">
                    <strong>Product Ratings</strong>
                </div>
            </div>
        <div class="form-group">
            <input type="text" class="form-control w-50 mb-3" v-model="searchItem" placeholder="Search for Item..."/>
        </div>
        <hr class="w-100">
        <div class="row gap-3" >
            <div class="col-md-3" v-for="prod in filterProduct" :key="prod.id">
                <router-link :to="{name:'viewRatings',props:{id:prod.id},params:{id:prod.id}}" class="custom-link">
                    <div class="card product-card">
                    <div class="card-body">
                        <img :src="`http://localhost:3080/api/images/${prod.image}`" alt="Selected Image" class="preview-image img-fluid" style="width: 170px; height: 140px; border-radius: 3%; align-items: center;">
                    </div>
                    <div class="card-footer">
                        <strong>{{ prod.productname }}</strong>
                        <p class="text-muted">{{ prod.productdesc }}</p>
                        <p>P {{ prod.price }}</p>
                        <div class="inline">
                            <rating-stars
                            :read-only="true"
                            :max-rating="5"
                            :current-rating="prod.ratings"
                            />
                        </div>
                    </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted,computed} from 'vue'
import AuthenticationService from '@/service/AuthenticationService';
import ratingStars from '@/components/ratingStars.vue';
const allProducts = ref([]);
const searchItem = ref('');
const getAllProduct = async()=>{
    try {
        const response = await AuthenticationService.getAllProduct();
        if(response){
            allProducts.value = response.data.allProduct
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getAllProduct();
})

const filterProduct = computed(()=>{
    if(allProducts.value.length > 0){
        return allProducts.value.filter(data => {
            return data.productname.toLowerCase().includes(searchItem.value.toLowerCase());
        })
    }else{
        return [];
    }
})

</script>

<style scoped>
.navbar-custom{
    background-color: #fc9e67;
}
.custom-link{
    text-decoration: none;
}
.product-card:hover{
    box-shadow: 0 0 10px #000;
}
.inline{
    display: inline-block;
}

</style>