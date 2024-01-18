<template>
    <div class="rider-background">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <div class="card registration-Card">
                    <div class="card-body">
                        <div class="first-input mt-3" v-if="first_input">
                                        <div class="text-center fs-5">
                                            <strong>User Inputs:</strong>
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="username" class="form-label">Username:</label>
                                            <input type="text" id="username" name="username" v-model="formdata.username" class="form-control" placeholder="Enter Your Username">
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="password" class="form-label">Password:</label>
                                            <input type="password" id="password" v-model="formdata.password" name="password" class="form-control" @keyup="isStrongPassword" placeholder="Enter Your Password">
                                            <div class="text-error" v-if="passmsgVisible">
                                            {{ passmsg }}
                                            </div>
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="cpassword" class="form-label">confirm password:</label>
                                            <input type="password" id="cpassword" name="cpassword" v-model="formdata.cPassword" class="form-control" placeholder="Confirm Your Password">
                                        </div>
                                        <div class="d-flex justify-content-end">
                                            <button @click="openSecondInput">Next-></button>
                                        </div>
                                    </div>
                                    <div class="second-input" v-if="second_input">
                                        <div class="text-center fs-5">
                                            <strong>Personal Info:</strong>
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="fname" class="form-label">First Name:</label>
                                            <input type="text" id="fname" name="fname" v-model="formdata.firstname" class="form-control" placeholder="Enter Your First Name">
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="lname" class="form-label">Last Name:</label>
                                            <input type="text" id="lname" name="lname" v-model="formdata.lastname" class="form-control" placeholder="Enter Your Last Name">
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="mname" class="form-label">Middle Name:</label>
                                            <input type="text" id="mname" name="mname" v-model="formdata.middlename" class="form-control" placeholder="Enter Your Middle Name">
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="email" class="form-label">Email:</label>
                                            <input type="email" id="email" name="email" v-model="formdata.email" class="form-control" placeholder="Enter Your Email">
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="phone" class="form-label">Phone:</label>
                                            <input type="tel" id="phone" name="phone" v-model="formdata.phone" class="form-control" placeholder="Pattern: 0000-000-0000" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" required><br><br>
                                        </div>
                                            <div class="d-flex justify-content-start">
                                                <button @click="backFirstInput">Back</button>
                                            </div>
                                            <span></span>
                                            <div class="d-flex justify-content-end">
                                                <button @click="openThirdInput">Next-></button>
                                            </div>
                                    </div>
                                    <div class="third-input" v-if="third_input">
                                        <div class="text-center fs-5">
                                            <strong>Personal Address:</strong>
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="sitio" class="form-label">Sitio/Street:</label>
                                            <input type="text" id="sitio" name="sitio" v-model="formdata.sitio" class="form-control" placeholder="Enter Your Sitio/Street">
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="baranggay" class="form-label">Baranggay:</label>
                                            <input type="text" id="baranggay" name="baranggay" v-model="formdata.baranggay" class="form-control" placeholder="Enter Your Baranggay">
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="city" class="form-label">City:</label>
                                            <input type="text" id="city" name="city" class="form-control" v-model="formdata.city" placeholder="Enter Your City">
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="province" class="form-label">Province:</label>
                                            <input type="text" id="province" name="province" v-model="formdata.province" class="form-control" placeholder="Enter Your Province">
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="zipcode" class="form-label">Zipcode:</label>
                                            <input type="text" id="zipcode" name="zipcode" v-model="formdata.zipcode" class="form-control" placeholder="Enter Your Zipcode">
                                        </div>
                                            <div class="d-flex justify-content-start">
                                                <button @click="backSecondInput">Back</button>
                                            </div>
                                            <span></span>
                                            <div class="d-flex justify-content-end">
                                                <button @click="openLastInput">Next-></button>
                                            </div>
                                    </div>
                                    <div class="last-input" v-if="last_input">
                                        <div class="text-center fs-5">
                                            <strong>Profile Image:</strong>
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="profile" class="form-label">Profile</label>
                                            <input type="file" name="image" id="image" @change="handleimageChange">
                                            <div v-if="showFile">
                                              <img :src="fileView.preview" alt="Selected Image" style="max-width: 100px; max-height: 100px;">
                                          </div>
                                        </div>
                                        <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                                        <label class="form-check-label" for="invalidCheck">
                                            Agree to terms and conditions
                                        </label>
                                        <div class="invalid-feedback">
                                            You must agree before submitting.
                                        </div>
                                        </div>
                                        <div class="d-flex justify-content-start">
                                                <button @click="backThirdInput">Back</button>
                                            </div>
                                            <span></span>
                                            <div class="d-flex justify-content-end">
                                                <button class="btn btn-success" @click="riderRegistration" type="submit">Submit Registration</button>
                                            </div>
                                    </div>
                    </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>

import {ref} from 'vue';
import axios from 'axios';
import { useRoute,useRouter } from 'vue-router';


const route = useRoute();

let first_input = ref(true);
let second_input = ref(false);
let third_input = ref(false);
let last_input = ref(false);

    const token = ref('')
    token.value = route.params.token;

const router = useRouter();

const fileView = ref({ preview: "" });
const showFile = ref(false);

const formdata = ref({
    username:'',
    password:'',
    cPassword:'',
    firstname:'',
    lastname:'',
    middlename:'',
    email:'',
    phone:'',
    sitio:'',
    baranggay:'',
    city:'',
    province:'',
    zipcode:'',
    file:null
});
const passmsg = ref(null)
const passmsgVisible = ref(false);

const isStrongPassword = () => {
  // Define your criteria for a strong password
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(formdata.value.password);
  const hasLowercase = /[a-z]/.test(formdata.value.password);
  const hasNumber = /\d/.test(formdata.value.password);

  // Check if the password meets the criteria
  if (
    formdata.value.password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  ){
    passmsgVisible.value = false;
    passmsg.value = "Password is Strong";
  } else if(formdata.value.password == ''){
    passmsgVisible.value = false;
  } else {
    passmsgVisible.value = true;
    passmsg.value = "Password is Weak";
  }
};

const handleimageChange = (event)=>{
    const img = event.target.files;
    if (img.length > 0) {
      formdata.value.file = img[0];
  
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
}

const openSecondInput = ()=>{
    first_input.value = false;
    second_input.value = true;
}
const openThirdInput = ()=>{
    second_input.value = false;
    third_input.value = true;
}
const openLastInput = ()=>{
    third_input.value = false;
    last_input.value = true;
}
const backFirstInput = ()=>{
    second_input.value = false;
    first_input.value = true;
}
const backSecondInput = ()=>{
    third_input.value = false;
    second_input.value = true;
}
const backThirdInput = ()=>{
    last_input.value = false;
    third_input.value = true;
}
const riderRegistration = async()=>{
    const headers = {
            'Content-Type': 'multipart/form-data', // Specifies the content type as JSON
            'Authorization': `Bearer ${token.value}`, // An example of an authorization header
            'X-Custom-Header': 'CustomValue', // A custom header with a custom value
        };
    
        const config = { headers }
    try {
        if(formdata.value.password != formdata.value.cPassword){
            alert('Password is not thesame!!');
        }else{
            if(formdata.value.username == '' || formdata.value.password == '' || formdata.value.cPassword == '' ||
            formdata.value.firstname == '' || formdata.value.lastname == '' || formdata.value.email == '' || formdata.value.phone == '' ||
            formdata.value.sitio == '' || formdata.value.baranggay == '' || formdata.value.city == '' || formdata.value.province == '' ||
            formdata.value.zipcode == ''){
                alert('Please Fill in Empty Fields')
            }else{
                let data = new FormData();
                    data.append('username',formdata.value.username);
                    data.append('password',formdata.value.password);
                    data.append('fname',formdata.value.firstname);
                    data.append('lname',formdata.value.lastname);
                    data.append('mname',formdata.value.middlename);
                    data.append('email',formdata.value.email);
                    data.append('phone',formdata.value.phone);
                    data.append('sitio',formdata.value.sitio);
                    data.append('baranggay',formdata.value.baranggay);
                    data.append('city',formdata.value.city);
                    data.append('province',formdata.value.province);
                    data.append('zipcode',formdata.value.zipcode);
                    data.append('image',formdata.value.file);
                const response = await axios.post('http://localhost:3080/api/riderRegistration',data,config);
                if(response){
                    formdata.value.username = '';
                    formdata.value.password = '';
                    formdata.value.cPassword = '';
                    formdata.value.firstname = '';
                    formdata.value.lastname = '';
                    formdata.value.middlename = '';
                    formdata.value.email = '';
                    formdata.value.phone = '';
                    formdata.value.sitio = '';
                    formdata.value.baranggay = '';
                    formdata.value.city = '';
                    formdata.value.province = '';
                    formdata.value.zipcode = '';
                    alert(response.data.msg);
                    router.push('/')
                }
            }
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}

</script>

<style scoped>
.registration-Card{
    margin-top: 20px;
    height: 660px;
    background-color: rgba(233, 221, 221, 0.295);
}
.rider-background{
    background-image: url('@/assets/riderBackground.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>