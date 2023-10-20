<template>
    <div class="register-container">
      <form class="register-form">
        <div class="register-logo">
          <img alt="Vue logo" src="../assets/logo.png">
        </div>
  
        <div class="form-group">
          <label for="fname"><b>FIRST NAME</b></label>
          <input type="text" id="fname" placeholder="Enter First Name" v-model="form.fname">
        </div>
  
        <div class="form-group">
          <label for="lname"><b>LAST NAME</b></label>
          <input type="text" id="lname" placeholder="Enter Last Name" v-model="form.lname">
        </div>
  
        <div class="form-group">
          <label for="email"><b>EMAIL</b></label>
          <input type="text" id="email" placeholder="Enter Email" v-model="form.email">
        </div>
  
        <div class="form-group">
          <label for="password"><b>PASSWORD</b></label>
          <input type="password" id="password" placeholder="Enter Password" v-model="form.password">
        </div>
  
        <div class="form-group">
          <label for="password_confirmed"><b>CONFIRM PASSWORD</b></label>
          <input type="password" id="password_confirmed" placeholder="Confirm Password" v-model="form.password_confirmed">
        </div>
  
        <button class="register-button" v-on:click="register()" type="button">Register</button>
      </form>
    </div>
  </template>

<script>
    import axios from 'axios';

    export default {
        name: 'LoginApp',
        data() {
            return {
            form: {
                fname: '',
                lname: '',
                email: '',
                password: '',
                password_confirmed: '',
            }
            }
        },
        methods: {
            // login() {
            // console.warn(this.form);
            // this.loginUser();
            // },

            register() {

            if (!this.form.fname || !this.form.lname || !this.form.email || !this.form.password || !this.form.password_confirmed) {
                console.error('Please fill all required fields.');
                return;
            }
            const registerData = {
                fname: this.form.fname,
                lname: this.form.lname,
                email: this.form.email, 
                password: this.form.password,
                password_confirmed: this.form.password_confirmed, 
            };

            axios.post('http://localhost:8000/api/register', registerData)
                .then((response) => {
                console.log(response.data);

                    window.location.reload();
                    
                })
                .catch((error) => {
                console.error('Register failed:', error);
                });

            },
        }
    }
</script>
  
<style>
    .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    }

    .register-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 30%;
    max-width: 400px;
    }

    .register-logo {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    }

    .register-logo img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    label {
    font-weight: bold;
    margin-bottom: 5px;
    }

    input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    }

    .register-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 10px;
    }

    .register-button:hover {
    background-color: #0056b3;
    }
</style>