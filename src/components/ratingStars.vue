<template>
    <div class="star-rating">
      <!-- Display stars based on the current rating -->
      <div v-if="readOnly" class="readonly-stars">
        <span v-for="index in maxRating" :key="index" class="star" :class="{ 'filled': index <= currentRating }">&#9733;</span>
        <span class="text-muted small-text">
          (
            {{ props.currentRating }}
          )
        </span>
      </div>

    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps,watchEffect} from 'vue';

  const props = defineProps({
    readOnly: Boolean,
      maxRating: {
        type: Number,
        default: 5,
      },
      currentRating: {
        type: Number,
        default: 0,
      },
  })
      const currentRating = ref(0);
  
watchEffect(()=>{
  currentRating.value = props.currentRating;
  console.log(currentRating.value)
})
  
      // Watch for changes in the props.currentRating and update the local currentRating accordingly
      onMounted(() => {
        currentRating.value = props.currentRating;
      });
  </script>
  
  <style scoped>
  .star-rating {
    font-size: 24px;
  }
  
  .star {
    cursor: pointer;
    color: #ccc;
    transition: color 0.3s;
  }
  
  .star:hover {
    color: #ffcc00;
  }
  .small-text{
    font-size: 15px;
  }
  
  .filled {
    color: #ffcc00;
  }
  
  .readonly-stars {
    display: flex;
  }
  
  .interactive-stars {
    display: flex;
  }
  </style>
  