<template>
    <div>
        <div class="card mb-3 navbar-custom">
        <div class="card-body">
        <a class="navbar-brand text-light"><strong>My Cart</strong></a>
        </div>
        </div>
        <div class="form-group d-flex justify-content-end mb-2 me-3">
            <div class="flex-column">
                <button class="btn btn-secondary" @click="openModal">Checkout</button>
            </div>
        </div>
        <div class="card">
        <div class="card-body">
        <table class="table table-responsive table-striped">
            <thead>
                <tr>
                    <th>select</th>
                    <th>image Prod</th>
                    <th>name</th>
                    <th>quantity</th>
                    <th>subtle Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="mt-2">
                <tr v-for="product in ProductCart" :key="product.id">
        <td><input type="checkbox" class="form-checkbox" @input="SelectIDs(product.id,product.product_id,product.image,product.productname,product.quantity,subtlePrice(product))" :value="product.product_id"/></td>
        <td><img :src="`http://localhost:3080/api/images/${product.image}`" style="height: 75px; width: 75px;" alt=""></td>
        <td>{{ product.productname }}</td>
        <td><div v-if="!editQuantity[product.id]">
            {{ product.quantity }}
        </div>
        <div v-else>
            <input type="number" name="quantity" id="quantity" @input="fixQuantity(product)" v-model="quantity" class="form-control w-50" placeholder="Enter quantity...">
            <button class="btn" @click="updateQuantity(product)">Save</button>
        </div>
            </td>
        <td>P{{ subtlePrice(product) }}</td>
        <td>
            <button type="button" class="btn" @click="editingQuantity(product)">edit</button>
            <button type="button" class="btn" @click="removeFromCart(product)">remove</button>
        </td>
                </tr>
            </tbody>
        </table>
        
        </div>
        </div>
        <checkout-modal @get-my-product-cart="getMyProductCart" @close-modal="closeModal" :selected-cart-i-d="selectedCartID" :show-modal="showModal" :selected-i-d="selectedID" :selected-items="selectedItems" />
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import checkoutModal from '@/components/modals/checkoutModal.vue';
const ProductCart = ref([]);
const selectedID = ref([]);
const showModal = ref(false);
const quantity = ref(1)
const editQuantity = ref({});
const openModal = ()=>{
    showModal.value = true;
    
}
const fixQuantity = (product)=>{
    if(quantity.value < 1){
        quantity.value = 1
    }else if(quantity.value > product.updated_stocks){
        quantity.value = product.updated_stocks
    }
}
const closeModal = ()=>{
    showModal.value = false
    getMyProductCart()
}
const updateQuantity = async(product)=>{
    try {
        console.log(product.id)
        console.log(quantity.value)
        const response = await AuthenticationService.UpdateQuantity({
        quantity:quantity.value,
        cart_id:product.id
        });
        if(response){
            alert(response.data.msg);
            getMyProductCart();
            editingQuantity(product)
            quantity.value = 1
        }
    } catch (error) {
        console.log(error)
    }
}
const removeFromCart = async(product)=>{
    try {
        const response = await AuthenticationService.removeFromCart({
            cart_id:product.id
        })
        if(response){
            alert(response.data.msg);
            getMyProductCart();
        }
    } catch (error) {
        console.log(error)
    }
}
const newPrice = ref(0)

const subtlePrice = (product)=>{
  newPrice.value = product.price * product.quantity
  return newPrice.value;
}
const editingQuantity = (product)=>{
      if (editQuantity.value[product.id] === undefined) {
        editQuantity.value[product.id] = false;
      }
      editQuantity.value[product.id] = !editQuantity.value[product.id];
}
const selectedItems = ref([])
const getMyProductCart = async()=>{
    try {
        const response = await AuthenticationService.getMyProductCart()
        if(response){
            ProductCart.value = response.data.myProductCart
        }
    } catch (error) {
        console.log(error);
    }
}
const selectedCartID = ref([])
onMounted(()=>{
    getMyProductCart();
});
const SelectIDs = (id,data,image, name, quant, price) => {
  const index = selectedID.value.indexOf(data);
  const thisindex = selectedCartID.value.indexOf(id);
  if (index !== -1 || thisindex !== -1) {
    // If the product is already selected, remove it from the arrays
    selectedID.value.splice(index, 1);
    selectedCartID.value.slice(thisindex,1);
    selectedItems.value = selectedItems.value.filter(item => item.id !== data);
  } else {
    // If the product is not selected, add it to the arrays
    selectedCartID.value.push(id)
    selectedID.value.push(data);
    selectedItems.value.push({
      id: data,
      image:image,
      productname: name,
      quantity: quant,
      price: price
    });
  }
};


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