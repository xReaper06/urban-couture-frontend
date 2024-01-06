<template>
    <div>
        <div v-if="props.status == 1">
            Status: <span class="badge rounded-pill text-bg-success">pending</span>           
        </div>
        <div v-else-if="props.status == 2">
           Status: <span class="badge rounded-pill text-bg-success">Process</span>
        </div>
        <div v-else-if="props.status == 3">
            Status: <span class="badge rounded-pill text-bg-success">Shipped</span>
        </div>
        <div v-else-if="props.status == 4">
            Status: <span class="badge rounded-pill text-bg-success">delivering</span>
        </div>
        <div v-else-if="props.status == 5">
            Status: <span class="badge rounded-pill text-bg-success">Confirming Delivered Products</span>
        </div>
        <div v-else>
            Status: <span class="badge rounded-pill text-bg-success">Confirmed Delivered</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    status:Number
});
</script>

<style scoped>

</style>