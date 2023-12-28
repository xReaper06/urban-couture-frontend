<template>
    <div>
        <div class="row">
            <div class="col-md-9">
                HelloWorld
            </div>
            <div class="col-md-3 custom-card">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex flex-row mb-4 gap-2 text-center align-items-center justify-content-center">
                            <a href="#" class="normal-btn" @click="openlogin" :class="{ 'active': loginActive }">Login</a>
                            <a href="#" class="normal-btn" @click="openRegistration" :class="{ 'active': registrationActive }">Create Account</a>
         
                        </div>
                        <hr>
                        <div class="login-input" v-if="login_input">
                            <div class="main-input mt-3" v-if="main_input">
                                <div class="text-center fs-5">
                                    <strong>User Login:</strong>
                                </div>
                                <div class="form-group mb-2">
                                    <label for="username" class="form-label">Username:</label>
                                    <input type="text" id="username" name="username" class="form-control" placeholder="Enter Your Username">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="password" class="form-label">Password:</label>
                                    <input type="password" id="password" name="password" class="form-control" placeholder="Enter Your Password">
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button>Sign in</button>
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
                                    <input type="text" id="username" name="username" class="form-control" placeholder="Enter Your Username">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="password" class="form-label">Password:</label>
                                    <input type="password" id="password" name="password" class="form-control" placeholder="Enter Your Password">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="cpassword" class="form-label">confirm password:</label>
                                    <input type="password" id="cpassword" name="cpassword" class="form-control" placeholder="Confirm Your Password">
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
                                    <input type="text" id="fname" name="fname" class="form-control" placeholder="Enter Your First Name">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="lname" class="form-label">Last Name:</label>
                                    <input type="text" id="lname" name="lname" class="form-control" placeholder="Enter Your Last Name">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="mname" class="form-label">Middle Name:</label>
                                    <input type="text" id="mname" name="mname" class="form-control" placeholder="Enter Your Middle Name">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="email" class="form-label">Email:</label>
                                    <input type="email" id="email" name="email" class="form-control" placeholder="Enter Your Email">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="phone" class="form-label">Phone:</label>
                                    <input type="tel" id="phone" name="phone" class="form-control" placeholder="Pattern: 0000-000-0000" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" required><br><br>
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
                                    <input type="text" id="sitio" name="sitio" class="form-control" placeholder="Enter Your Sitio/Street">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="baranggay" class="form-label">Baranggay:</label>
                                    <input type="text" id="baranggay" name="baranggay" class="form-control" placeholder="Enter Your Baranggay">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="city" class="form-label">City:</label>
                                    <input type="text" id="city" name="city" class="form-control" placeholder="Enter Your City">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="province" class="form-label">Province:</label>
                                    <input type="text" id="province" name="province" class="form-control" placeholder="Enter Your Province">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="zipcode" class="form-label">Zipcode:</label>
                                    <input type="text" id="zipcode" name="zipcode" class="form-control" placeholder="Enter Your Zipcode">
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
                                    <input type="file" name="image" id="image">
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
                                        <button>Submit Registration</button>
                                    </div>
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
let login_input = ref(true);
let registration_input =ref(false);
let first_input = ref(false);
let second_input = ref(false);
let third_input = ref(false);
let last_input = ref(false);
let main_input = ref(true);
let loginActive = ref(true);
let registrationActive = ref(false);
const openRegistration = ()=>{
    loginActive.value = false;
  registrationActive.value = true;
    login_input.value = false
    main_input.value = false
    registration_input.value = true;
    first_input.value = true
};
const openlogin = ()=>{
    loginActive.value = true;
  registrationActive.value = false;
    registration_input.value = false;
    first_input.value = false
    login_input.value = true;
    main_input.value = true
};
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


</script>

<style  scoped>
.custom-card{
    height: 620px;
}
.normal-btn{
    text-decoration:none;
    padding: 3px;
    border: solid 1px #fffff;
    background-color:#fffff;
    box-shadow: 0 0 10px #0000;
    color:#0000;
}
.active{
    background-color:#08070700;
    color:#fffff;
}
</style>