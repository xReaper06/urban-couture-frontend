<template>
    <div>
        <div class="modal mb-5 pb-5" v-if="props.showeditModal">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">EDIT Product</h1>
                  <span class="close" @click="closeModal"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
              </div>
              <div class="modal-body">
                <div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="prod_name" id="prod_name" placeholder="prod_name" class="form-control">
                        <label for="prod_name">Product Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" v-model="prod_desc" id="prod_desc" placeholder="prod_desc" class="form-control">
                        <label for="prod_desc">Product Description</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" v-model="price" id="price" placeholder="price" class="form-control">
                        <label for="price">Product Price</label>
                    </div>
                    <div class="file-upload mb-3">
                      <input type="file" id="file" @change="handleImgChange" accept="image/png, image/jpeg, image/jpg" />
                    </div>
                    <div v-if="file == null">
                        <img :src="`http://localhost:3080/api/images/${props.product.image}`" alt="return image" class="preview-image img-fluid" style="width: 200px; height: 200px; border-radius: 3%; align-items: center;">
                    </div>
                    <div v-else>
                        <div v-if="showFile" class="image-container mb-3">
                          <img :src="fileView.preview" alt="Selected Image" class="preview-image img-fluid" style="width: 200px; height: 200px; border-radius: 3%; align-items: center;">
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <button @click="editProduct">Save</button>
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
    showeditModal: Boolean,
    product:Object
  });
  const file = ref(null);
  const fileView = ref({ preview: "" });
  const showFile = ref(false);
  const showButton = ref(false);
  const prod_id = ref(0);
  const prod_name = ref('');
  const prod_desc = ref("")
  const price = ref(0)
  watchEffect(()=>{
    prod_id.value = props.product.id
    prod_name.value = props.product.productname
    prod_desc.value = props.product.productdesc
    price.value = props.product.price
    console.log(props.product)
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
      showButton.value = true;
    }
  };

 
  const editProduct = async()=>{
    let data = new FormData();
    data.append('image',file.value)
    data.append('prod_name',prod_name.value)
    data.append('prod_desc',prod_desc.value)
    data.append('price',price.value)
    data.append('prod_id',prod_id.value)
    try{
      const response = await AuthenticationService.editProduct(data)
      if(response){
          alert(response.data.msg);
          prod_name.value = ''
          prod_desc.value = ''
          price.value = 0
          closeModal();
          getAllProductInserted();
      }
    }catch(error){
      console.log(error)
    }
  }
  
  
  const emits = defineEmits(["closeeditModal","getAllProductInserted"]);
  
  const closeModal = () => {
    emits("closeeditModal");
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