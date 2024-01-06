<template>
    <div>
        <div class="modal container-fluid mb-5 pb-5" v-if="props.showModal">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="modal-header">
                    <input type="text" placeholder="Search order_id.." v-model="searchItem" class="form-control">
                  <span class="close" @click="closeSearchModal"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
              </div>
              <div class="modal-body">
                <div class="card" v-for="item in filterItems" :key="item.id">
                  <div class="card-body">
                    <div class="d-flex flex-row">
                      <div class="d-flex-flex-column">
                        <div class="small-text">
                          order_id:
                        </div>
                        <strong>
                          {{ item.order_id }}
                        </strong>
                      </div>
                      <div class="d-flex-flex-column">
                        <div class="small-text">
                          name: 
                        </div>
                        <strong>
                          {{ item.fullname }}
                        </strong>
                      </div>
                      <div class="d-flex-flex-column">
                        <div class="small-text">
                          phone: 
                        </div>
                        <strong>
                          #{{ item.phone }}
                        </strong>
                      </div>
                      <div class="d-flex-flex-column">
                        <div class="small-text">
                          adddress: 
                        </div>
                        <strong>
                          {{ item.address }}
                        </strong>
                      </div>
                      <div class="d-flex-flex-column">
                        <div class="small-text">
                          totalPrice: 
                        </div>
                        <strong>
                          P{{ item.totalPrice }}
                        </strong>
                      </div>
                    </div>
                    <button @click="addToDeliver(item.order_id)">Add</button>
                    <button @click="openModal(JSON.parse(item.products))">View Products</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
  </div>
  <view-order-modal @close-modal="closeModal" :products="products" :show-modal="showModal"/>
    </div>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits,computed} from "vue";
import viewOrderModal from "./viewOrderModal.vue";
import AuthenticationService from "@/service/AuthenticationService";
  
  const props = defineProps({
    showModal: Boolean,
    items:Array
  });
  const products = ref([])
const showModal = ref(false)
const openModal = (data)=>{
    showModal.value = true;
    products.value = data;
}
const closeModal = ()=>{
    showModal.value = false
}
  const searchItem = ref('');
  const items =ref([])

  watchEffect(()=>{
    items.value = props.items
  })
  const emits = defineEmits(["closeModal","getDeliverItem"]);
  
  const closeSearchModal = () => {
    emits("closeModal");
  };
  const getDeliverItem = ()=>{
    emits("getDeliverItem");
  }
 const filterItems = computed(()=>{
  if(items.value != ''){
    return items.value.filter(data =>{
      return data.order_id.toLowerCase().includes(searchItem.value.toLowerCase());
    })
  }else{
    return [];
  }
 })
 const addToDeliver = async(data)=>{
  try{
    const response = await AuthenticationService.addTodeliver({order_id:data});
    if(response){
      alert(response.data.msg);
      getDeliverItem()
      closeSearchModal();
    }
  }catch(error){
    console.log(error)
  }
 }
</script>

<style scoped>
.modal-body {
  overflow-y: scroll;
  max-height: 450px;
  max-width: 500px;
  min-width: 500px;
  min-height: 350px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.small-text{
  font-size: 10px;
}

.unread {
  background-color: #f7f7f7;
  border-left: 4px solid #2196f3;
}
strong{
  font-size: 15px;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
  cursor: pointer;
}
</style>