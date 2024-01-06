<template>
    <div>
        <div class="modal mb-5 pb-5" v-if="props.showModal">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Proof of Delivery</h1>
                  <span class="close" @click="closeModal"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
              </div>
              <div class="modal-body">
                <div v-if="showFile" class="image-container mb-3">
                      <img :src="fileView.preview" alt="Selected Image" class="preview-image img-fluid" style="width: 200px; height: 200px; border-radius: 3%; align-items: center;">
                  </div>
                <label for="image">Send Proof of Delivery</label>
                <input type="file" accept="image/jpg,image/png,image/jpeg" class="form-control" @change="handleImgChange">
                <button class="btn btn-primary" @click="deliverThisProd">Send Proof</button>
              </div>
            </div>
            </div>
          </div>
  </div>
    </div>
</template>

<script setup>
import { ref,defineProps, defineEmits,watchEffect} from "vue";
import AuthenticationService from "@/service/AuthenticationService";
  
  const props = defineProps({
    showModal: Boolean,
    order_id:String,
  });
  const showFile = ref(false)
const order_id = ref('')
const fileView = ref({ preview: "" });
const file = ref(null)
  watchEffect(()=>{
    order_id.value = props.order_id
  })

  const handleImgChange = (event) => {
    const img = event.target.files;
    if (img.length > 0) {
      file.value = img[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        fileView.value = {
          name: img[0].name,
          preview: e.target.result,
        };
        showFile.value = true;
      };
      reader.readAsDataURL(img[0]);
    }
  };
  const deliverThisProd = async()=>{
    try {
      let data = new FormData();
      data.append('image',file.value);
      data.append('order_id',order_id.value)
      const response = await AuthenticationService.deliveredItem(data);
      if(response){
        alert(response.data.msg);
        getAllItemsTobeDeliver();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const emits = defineEmits(["closeModal","getAllItemsTobeDeliver"]);
  
  const closeModal = () => {
    emits("closeModal");
  };
  const getAllItemsTobeDeliver = ()=>{
    emits("getAllItemsTobeDeliver");
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