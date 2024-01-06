<template>
    <div>
        <div class="modal mb-5 pb-5" v-if="props.showRateModal">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Rate Product</h1>
                  <span class="close" @click="closeModal"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
              </div>
              <div class="modal-body">
                <label for="rate" class="form-label">Rate</label>
                <select name="rate" id="rate" v-model="rate" class="form-select" required>
                    <option value="" disabled selected>Select your rate on this product...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label for="comment" class="form-label">Comment</label>
                <textarea name="comment" v-model="comment" id="comment" class="form-control" cols="30" rows="10" required>Write your Comment...</textarea>
                <button @click="RateProduct">Rate</button>
              </div>
            </div>
            </div>
          </div>
  </div>
    </div>
</template>

<script setup>
import { ref,defineProps, defineEmits,watchEffect} from "vue";
import AuthenticationService from '@/service/AuthenticationService.js'
  
  const props = defineProps({
    showRateModal: Boolean,
    product_id:Number,
  });
  const product_id = ref(0);
  const rate = ref(0)
  const comment = ref('');

  watchEffect(()=>{
    product_id.value = props.product_id
  })
  const RateProduct = async()=>{
    try {
      const response = await AuthenticationService.Rateproduct({
        prod_id:product_id.value,
        rate:rate.value,
        comment:comment.value
      })
      if(response){
        closeModal()
        rate.value = ''
        comment.value = ''
        alert(response.data.msg)
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg)
    }
  }
  
  const emits = defineEmits(["closeRateModal"]);
  
  const closeModal = () => {
    emits("closeRateModal");
  };
 
</script>

<style scoped>
.modal-body {
  overflow-y: scroll;
  height: 400px;
  width: 400px;
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