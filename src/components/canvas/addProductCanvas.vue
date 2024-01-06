<template>
    <div>
        <div class="offcanvas off-canvas-container offcanvas-end" v-if="props.showCanvas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header off-canvas-content">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" class="btn-close" @click="closeCanvas" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    ...
  </div>
</div>
    </div>
</template>

<script setup>
import { defineProps,defineEmits } from 'vue';
const props = defineProps({
    showCanvas:Boolean
})
const emits = defineEmits(['closeCanvas']);

const closeCanvas = ()=>{
    emits('closeCanvas')
}

</script>

<style scoped>
.off-canvas-container {
  position: fixed;
  top: 0;
  left: -300px; /* Adjust as needed for the width of your off-canvas */
  width: 300px; /* Set the width of your off-canvas */
  height: 100%;
  background-color: #f0f0f0;
  overflow-x: hidden;
  transition: 0.5s;
}
.off-canvas-content {
  padding: 20px;
}

</style>