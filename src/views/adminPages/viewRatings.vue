<template>
    <div>
            <router-link to="/admin/Ratings">back </router-link>
                <div class="text-center fs-3">Reviews</div>
                <hr>
                <div class="container-fluid">
                    <div class="card" v-for="rev in reviews" :key="rev.id">
                        <div class="card-body">
                            <div class="d-flex flex-row">
                                <div> <img :src="`http://localhost:3080/api/images/${rev.profile}`" alt="" class="img-fluid" style="height: 50px; width: 50px; border-radius: 50%; border: solid 0.5px #000; box-shadow: 0 0 2px #000;" >
                {{ rev.fullname }}</div>
                                <div><rating-stars
                    :read-only="true"
                    :max-rating="5"
                    :current-rating="rev.stars"
                /></div>
                            </div>
                            <div>{{ rev.comment}}</div>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script setup>
import { defineProps,ref,onMounted } from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import ratingStars from '@/components/ratingStars.vue';
const props = defineProps({
    id:Number
});
const reviews = ref([]);


const getProduct = async()=>{
    try {
        const response = await AuthenticationService.viewProduct({
            prod_id:parseInt(props.id)
        });
        if(response){
            reviews.value = response.data.review
        }
    } catch (error) {
        console.log(error)
    }
}
onMounted(()=>{
    getProduct();
})

</script>

<style scoped>

.navbar-custom{
    background-color: #fc9e67;
}
.custom-link{
    text-decoration: none;
    color: #fff;
    padding: 5px;
    border: solid 1px #271b14;
    background-color: rgb(231, 130, 6);
    border-radius: 3px;
    font-size: 15px;
    font-weight: bold;
    margin-right: 10px;
}
.custom-link:hover{
    background-color: antiquewhite;
}

</style>