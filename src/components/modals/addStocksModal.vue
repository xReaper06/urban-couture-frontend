<template>
    <div>
        <div class="modal mb-5 pb-5" v-if="props.showAddModal">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Applicant CV</h1>
                  <span class="close" @click="closeModal"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
              </div>
              <div class="modal-body">
                <div>
                    <label for="" class="form-label">Add Stocks to the existing Stocks</label>
                </div>
                <input type="number" class="form-control w-50" v-model="newStocks" placeholder="Enter How Many New Stocks">
                <div class="mt-3">
                    <button @click="addNewStocks">Save</button>
                </div>
              </div>
            </div>
            </div>
          </div>
  </div>
    </div>
</template>

<script setup>
import { ref,defineProps, defineEmits,watchEffect} from "vue";
import AuthenticationService from '@/service/AuthenticationService.js';
  
  const props = defineProps({
    showAddModal: Boolean,
    prod_id:Number,
  });
  const prod_id = ref(0);

  watchEffect(()=>{
    prod_id.value = props.prod_id
  })
  const newStocks = ref(1);

  const addNewStocks = async()=>{
    try {
        const response = await AuthenticationService.addNewStocks({
            prod_id:prod_id.value,
            addedStocks:newStocks.value
        })
        if(response){
            getAllProductInserted();
            alert(response.data.msg);
            closeModal()
        }
    } catch (error) {
        console.log(error);
    }
  }
  
  const emits = defineEmits(["closeAddModal","getAllProductInserted"]);
  
  const closeModal = () => {
    emits("closeAddModal");
  };
  const getAllProductInserted = ()=>{
    emits("getAllProductInserted");
  }
 
</script>

<style scoped>
.modal-body {
  overflow-y: scroll;
  height: 450px;
  width: 500px;
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

.unread {
  background-color: #f7f7f7;
  border-left: 4px solid #2196f3;
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