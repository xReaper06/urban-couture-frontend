<template>
    <div>
        <div class="card custom-card">
            <div class="card-body">
                <div class="text-center fs-3">
                    <strong>Rider's Application</strong>
                </div>
                <div class="form-control mb-3">
                    <label for="Email" class="form-label">Please Pass your valid Email:</label>
                    <input type="email" name="email" class="form-control" v-model="formdata.email" placeholder="Enter Your Email...">
                </div>
                <div class="form-control mb-3">
                    <label for="Cv" class="form-label">Pass your CV Here Only PDF Accepted:</label>
                    <input type="file" name="Cv" id="Cv" class="form-control" accept="application/pdf" @change="handleFileUpload">
                </div>
                <button class="btn btn-success" @click="submitApplication">Submit</button>
                <div class="d-flex justify-content-end"><router-link to="/" class="nav-link custom-link">Go back</router-link></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import AuthenticationService from '@/service/AuthenticationService';

const formdata = ref({
    email:'',
    file:null
})
const handleFileUpload = (event)=>{
    const img = event.target.files;
    formdata.value.file = img[0]
}
const submitApplication = async()=>{
    try {
        let data = new FormData();
        data.append('file',formdata.value.file);
        data.append('email',formdata.value.email);
        const response = await AuthenticationService.riderSendApplication(data);
        if(response){
            alert(response.data.msg);
            formdata.value.file = '',
            formdata.value.email = ''
        }
    } catch (error) {
        console.log(error)
        alert(error.response.data.msg)
    }
}
</script>

<style scoped>
.custom-link:hover{
    background-color: rgba(00, 00, 00, 0.3);
    border-radius: 5px;
    padding: 5px;
}
.custom-card{
    background-color: rgba(00, 00, 00, 0.3);
    width: 500px;
    left: 50%;
    position: absolute;
    transform: translate(-50%,30%);
    height: 400px;
}

</style>