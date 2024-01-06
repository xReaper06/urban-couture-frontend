<template>
    <div>
        <div class="modal mb-5 pb-5" v-if="props.showViewModal">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Proof</h1>
                  <span class="close" @click="closeModal"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
              </div>
              <div class="modal-body">
                <iframe :src="`http://localhost:3080/api/images/${props.proof}`" width="100%" height="100%" frameborder="0" aria-readonly="true"></iframe>
              </div>
            </div>
            </div>
          </div>
  </div>
    </div>
</template>

<script setup>
import { ref,defineProps, defineEmits,watchEffect} from "vue";
  
  const props = defineProps({
    showViewModal: Boolean,
    proof:String,
  });
  const proof = ref('');

  watchEffect(()=>{
    proof.value = props.proof
  })

  
  const emits = defineEmits(["closeViewModal"]);
  
  const closeModal = () => {
    emits("closeViewModal");
  };
 
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