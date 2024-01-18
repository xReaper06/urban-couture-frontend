<template>
<<<<<<< HEAD
    <div>
=======
    <div >
>>>>>>> 587f22ae37a2bdc7ac75c7613c10a2cfba2b760a
        <div class="row">
            <div class="col-md-9">
                <img src="@/assets/mainBackground.jpg" style="width: 100%; height: 100%;" alt="">
            </div>
            <div class="col-md-3 custom-card">
                        <div class="d-flex flex-row mb-4 gap-2 text-center align-items-center justify-content-center">
                            <a href="#" class="login-btn" @click="openlogin" :class="{ 'active': loginActive }">Login</a>
                            <a href="#" class="registration-btn" @click="openRegistration" :class="{ 'active': registrationActive }">Create Account</a>    
                        </div>
                        <hr>
                        <div class="login-input" v-if="login_input">
                            <div class="main-input mt-3" v-if="main_input">
                                <div class="text-center fs-5">
                                    <strong>User Login:</strong>
                                </div>
                                <div class="form-group mb-2">
                                    <label for="username" class="form-label">Username:</label>
                                    <input type="text" id="username" name="username" class="form-control" v-model="formdata.username" placeholder="Enter Your Username">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="password" class="form-label">Password:</label>
                                    <input type="password" id="password" name="password" v-model="formdata.password" class="form-control" placeholder="Enter Your Password">
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button class="btn" @click="login" @keyup.enter="login">Sign in</button>
                                </div>
                                <div class="riderApplication">
                                    You want to be part of our Riders Team? Apply Now
                                    <router-link class="btn" to="/Application">Click Here!</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="registration-inputs" v-if="registration_input">
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
                                    <button class="btn" @click="openSecondInput">Next-></button>
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
                                    <input type="tel" id="phone" name="phone" v-model="formdata.phone" class="form-control" placeholder="Pattern: 0000-000-0000" @input="validatePhoneNumber" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" required><br><br>
                                    <p v-if="!isPhoneNumberValid">Invalid phone number</p>
                                </div>
                                    <div class="d-flex justify-content-start">
                                        <button class="btn" @click="backFirstInput">Back</button>
                                    </div>
                                    <span></span>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn" @click="openThirdInput">Next-></button>
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
                                        <button class="btn" @click="backSecondInput">Back</button>
                                    </div>
                                    <span></span>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn" @click="openLastInput">Next-></button>
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
                                <input class="form-check-input" v-model="terms" type="checkbox" value="agree" id="invalidCheck" required>
                                <label class="form-check-label" for="invalidCheck">
                                    Agree to terms and conditions
                                </label>
                                <div class="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                                </div>
                                <div class="d-flex justify-content-start">
                                        <button class="btn" @click="backThirdInput">Back</button>
                                    </div>
                                    <span></span>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn" @click="userRegistration">Submit Registration</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script setup>
import {ref,watch} from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import {useAuthStore} from '@/store';
import {useRouter} from 'vue-router'
let login_input = ref(true);
let registration_input =ref(false);
let first_input = ref(false);
let second_input = ref(false);
let third_input = ref(false);
let last_input = ref(false);
let main_input = ref(true);
let loginActive = ref(true);
let registrationActive = ref(false);
const isPhoneNumberValid = ref(true);
const authStore = useAuthStore();
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
watch(formdata.value.phone, (newPhoneNumber) => {
      isPhoneNumberValid.value = validatePhoneNumber(newPhoneNumber);
    });
    
    function validatePhoneNumber(phoneNumber) {
      const phonePattern = /^[0-9]{4}-[0-9]{3}-[0-9]{4}$/;
      return phonePattern.test(phoneNumber);
    }
const terms = ref('');
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

const openRegistration = ()=>{
    loginActive.value = false;
  registrationActive.value = true;
    login_input.value = false
    main_input.value = false
    registration_input.value = true;
    first_input.value = true
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
};
const openlogin = ()=>{
    loginActive.value = true;
  registrationActive.value = false;
    registration_input.value = false;
    first_input.value = false
    login_input.value = true;
    main_input.value = true
    formdata.value.username = '';
    formdata.value.password = '';
};
const openSecondInput = ()=>{
    if(formdata.value.username == '' || formdata.value.password == '' || formdata.value.cPassword == ''){
        alert('Please Fill in Empty Fields')
    }else{
        first_input.value = false;
        second_input.value = true;
    }
}
const openThirdInput = ()=>{
    if(formdata.value.firstname == '' || formdata.value.lastname == '' || formdata.value.middlename == '' || formdata.value.email == '' || formdata.value.phone == '' ){
        alert('Please Fill in Empty Fields')
    }else{
        second_input.value = false;
        third_input.value = true;
    }
}
const openLastInput = ()=>{
    if(formdata.value.sitio == '' ||formdata.value.baranggay == '' ||formdata.value.city == '' ||formdata.value.province == '' ||formdata.value.zipcode == '' ){
        alert('Please Fill in Empty Fields')
    }else{
        third_input.value = false;
        last_input.value = true;
    }
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

const userRegistration = async()=>{
    try {
        if(formdata.value.password != formdata.value.cPassword){
            alert('Password is not thesame!!');
            console.log(formdata.value.password != formdata.value.cPassword)
            console.log(formdata.value.password,formdata.value.cPassword)
        }else{
            if(formdata.value.username == '' || formdata.value.password == '' || formdata.value.cPassword == '' ||
            formdata.value.firstname == '' || formdata.value.lastname == '' || formdata.value.email == '' || formdata.value.phone == '' ||
            formdata.value.sitio == '' || formdata.value.baranggay == '' || formdata.value.city == '' || formdata.value.province == '' ||
            formdata.value.zipcode == '' || terms.value == ''){
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
                const response = await AuthenticationService.userRegistration(data);
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
                }
            }
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}

const login = async()=>{
    if(formdata.value.username == '' || formdata.value.password == ''){
        alert('Please fill in Empty Fields')
    }
    try{
        const response = await AuthenticationService.login({
            username:formdata.value.username,
            password:formdata.value.password,
        })
        if(response){
            alert(response.data.msg);
            authStore.setTokens(response.data.accessToken,response.data.refreshToken);
            authStore.setUser(response.data.user);
            if(response.data.user.role == 'admin'){
                router.push('/admin/Dashboard');
            }else if(response.data.user.role == 'rider'){
                router.push('/rider/Dashboard');
            }else{
                router.push('/user/Dashboard');
            }
        }
    }catch(error){
        console.log(error);
        alert(error.response.data.msg);
    }
}


</script>

<style  scoped>
.custom-card{
    height: 690px;
}
.riderApplication{
    margin-top: 170px;
}
.normal-btn{
    text-decoration:none;
    padding: 3px;
    border: solid 1px #f0e8e8;
    border-radius: 50%;
    background-color:#f7f3f3;
    box-shadow: 0 0 10px #000;
    padding-left: 20px;
    padding-right: 20px;
    color: #000;
}
.registration-btn{
    padding: 5px;
    border: solid 1px #a880748a;
    text-decoration: none;
    background-color: #a880748a;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 20px;
    color: #f0e8e8;

}
.registration-btn:hover{
    background-color: #a88074b7;
    border: solid 1px #a88074b7;
    color: #f0e8e8;
    font-weight: bold;
}
.login-btn{
    padding: 5px;
    border: solid 1px #a880748a;
    text-decoration: none;
    background-color: #a880748a;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 20px;
    color: #f0e8e8;

}

.login-btn:hover{
    background-color: #a88074b7;
    border: solid 1px #a88074b7;
    color: #f0e8e8;
    font-weight: bold;
}
.active{
    background-color: #a88074b7;
    border: solid 1px #a88074b7;
    color: #f0e8e8;
    font-weight: bold;
}
/* .mainBackgound{
    background-image: url('@/assets/mainBackground.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
} */
.btn{
    background-color: #a88074ec;
    color: #f0e8e8;
}
</style>