<template>
    <div>
        <div class="modal mb-5 pb-5" v-if="props.showModal">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="alert alert-success" v-if="sucss">{{ sucss }}</div>
                <div class="alert alert-danger" v-if="err">{{ err }}</div>
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Add Product Modal</h1>
                  <span class="close" @click="closeModal"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
              </div>
              <div class="modal-body">
                <div>
                    <div v-if="showFile" class="image-container mb-3">
                      <img :src="fileView.preview" alt="Selected Image" class="preview-image img-fluid" style="width: 200px; height: 200px; border-radius: 3%; align-items: center;">
                    </div>
                    <div class="file-upload mb-3">
                      <input type="file" id="file" @change="handleImgChange" accept="image/png, image/jpeg, image/jpg" />
                    </div>
                    <div class="form-group mb-3">
                        <label for="productname" class="form-label">Product Name:</label>
                        <input type="text" name="productname" class="form-control" v-model="productname" placeholder="Enter Product Name..">
                    </div>
                    <div class="form-group mb-3">
                        <label for="productdesc" class="form-label">Product Description:</label>
                        <input type="text" name="productdesc" class="form-control" v-model="productdesc" placeholder="Enter Product Description..">
                    </div>
                    <div class="form-group mb-3">
                        <label for="original_stocks" class="form-label">Original Stocks:</label>
                        <input type="number" name="original_stocks" class="form-control" v-model="original_stocks" placeholder="Enter Original Stocks..">
                    </div>
                    <div class="form-group mb-3">
                        <label for="price" class="form-label">Price:</label>
                        <input type="number" name="price" class="form-control" v-model="price" placeholder="Enter Price..">
                    </div>
                      <button class="change-profile-button btn btn-primary" type="button" @click="insertProduct">
                        <span v-if="!loading">Submit</span>
                      <span v-else>loading....</span></button>
                </div>
              </div>
            </div>
            </div>
          </div>

  </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import AuthenticationService from '@/service/AuthenticationService.js'
  
  const props = defineProps({
    showModal: Boolean,
  });
  
  const emits = defineEmits(["closeModal","getAllProductInserted"]);
  
  const closeModal = () => {
    emits("closeModal");
  };
  const getAllProductInserted = ()=>{
    emits("getAllProductInserted");
  }
  const loading = ref(false)
  const file = ref(null);
  const fileView = ref({ preview: "" });
  const showFile = ref(false);
  const showButton = ref(false);
  const productname = ref('');
  const productdesc = ref('');
  const original_stocks = ref(0);
  const price = ref(0)

  
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
      showButton.value = true;
    }
  };
  const insertProduct = async()=>{
    loading.value = true
    let data = new FormData();
    data.append('image',file.value)
    data.append('prod_name',productname.value)
    data.append('prod_desc',productdesc.value)
    data.append('original_stocks',original_stocks.value)
    data.append('price',price.value)
    try{
      const response = await AuthenticationService.insertProduct(data)
      if(response){
        loading.value =false
        setTimeout(() => {
          alert(response.data.msg);
          productname.value = ''
          productdesc.value = ''
          original_stocks.value = 0
          price.value = 0
          closeModal();
          getAllProductInserted();
        }, 1000);
      }
    }catch(error){
      console.log(error)
      setTimeout(() => {
        loading.value =false
      }, 1000);
    }
  }
  
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