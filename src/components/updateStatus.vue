<template>
    <div>
        <div v-if="props.status == 0">
            <span class="badge rounded-pill text-bg-success">Active</span>           
        </div>
        <div v-else-if="props.status == 1">
            <span class="badge rounded-pill text-bg-danger">Out of Stock</span>
        </div>
        <div v-else>
            <span class="badge rounded-pill text-bg-danger">Unavailable</span>
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