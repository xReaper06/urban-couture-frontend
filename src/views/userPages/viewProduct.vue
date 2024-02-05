<template>
    <div>
        <div class="card mb-3 navbar-custom">
        <div class="card-body">
            <router-link to="/user/Dashboard" class="btn me-3"><strong>back</strong></router-link>
        <a class="navbar-brand text-light"><strong>Product</strong></a>
        </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <img :src="`http://localhost:3080/api/images/${product.image}`" style="height: 100%; width: 100%;" alt="">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <strong>
                    {{ product.productname }}
                </strong>
                <p class="text-muted">{{ product.productdesc }}</p>
                <strong>P {{ product.price }}</strong>
                <rating-stars
                    :read-only="true"
                    :max-rating="5"
                    :current-rating="product.rate"
                />
                <div class="form-control w-75">
                    <label for="quantity" class="form-label">Quantity: </label>
                    <input type="number" class="form-number w-25" v-model="quantity" @input="fixQuantity">
                </div>
                <div>
                    <span class="badge rounded-pill text-bg-success">Free Sizes</span>
                </div>
                <div>
                    Total Price: P{{ totalPrice.toFixed(2) }}
                </div>
                <p class="text-muted small-text">available stocks: ( {{ product.updated_stocks }}pcs )</p>
                <button class="btn btn-secondary" @click="addToCart">Add to cart</button>
                <button class="btn btn-warning ms-2" @click="butNow">Buy Now</button>
            </div>
            <hr>
            <div class="col-md-12 mb-5">
                <div class="text-center fs-3">Reviews</div>
                <hr>
                <div class="container-fluid">
                    <div class="card">
                        <div class="card-body custom">
                            <div class="card mb-2" v-for="rev in reviews" :key="rev.id">
                                <div class="card-body">
                                    <div class="d-flex flex-row">
                                        <div> <img :src="`http://localhost:3080/api/images/${rev.profile}`" alt="" class="img-fluid" style="height: 50px; width: 50px; border-radius: 50%; border: solid 0.5px #000; box-shadow: 0 0 2px #000;" >
                        {{ rev.fullname }}</div>
                                        <div><rating-stars
                            :read-only="true"
                            :max-rating="5"
                            :current-rating="rev.stars"
                        /></div>
                                    </div>
                                    <div>{{ rev.comment}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps,ref,onMounted,computed } from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import ratingStars from '@/components/ratingStars.vue';
import Swal from 'sweetalert2'
const props = defineProps({
    id:Number
});
const quantity = ref(1);
const product = ref([]);
const reviews = ref([]);

const totalPrice = computed(()=>{
    return product.value.price * quantity.value
})
const fixQuantity = ()=>{
    if(quantity.value < 1){
        quantity.value = 1
    }else if(quantity.value > product.value.updated_stocks){
        quantity.value = product.value.updated_stocks
    }
}
const addToCart = async()=>{
    try {
        const response = await AuthenticationService.addToCart({
            prod_id:parseInt(props.id),
            quantity:quantity.value,
            totalPrice:totalPrice.value
        })
        if(response){
            alert(response.data.msg);
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}
const confirmBuy = async()=>{
    let SelectedItems = []
    SelectedItems.push({
        id: props.id,
      image:product.value.image,
      productname: product.value.productname,
      quantity: quantity.value,
      price: totalPrice.value
    })
    try {
        const response = await AuthenticationService.buyNow({
            prod_id:parseInt(props.id),
            quantity:quantity.value,
            totalPrice:totalPrice.value,
            selectedItems:SelectedItems
        })
        if(response){
            Swal.fire({
      title: "Purchased!",
      text: response.data.msg,
      icon: "success"
    });
            
            SelectedItems = []
            quantity.value = 1;
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
      title: "Error!",
      text: error.response.data.msg,
      icon: "error"
    });
    }
}
const butNow = ()=>{
    Swal.fire({
  title: "Are You sure you want to buy this?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Purchase it!"
}).then((result) => {
  if (result.isConfirmed) {
    confirmBuy()
  }
});
}
const getProduct = async()=>{
    try {
        const response = await AuthenticationService.viewProduct({
            prod_id:parseInt(props.id)
        });
        if(response){
            product.value = response.data.product
            reviews.value = response.data.review
        }
    } catch (error) {
        console.log(error)
    }
}
onMounted(()=>{
    getProduct();
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
.custom{
    height: 200px;
    overflow-y: scroll;
}
.small-text{
    font-size: 10px;
}

</style>