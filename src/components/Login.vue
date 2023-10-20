<template>
    <div class="login-container">
      <form class="login-form">
        <div class="login-logo">
          <img alt="Vue logo" src="../assets/logo.png">
        </div>
  
        <div class="form-group">
          <label for="email"><b>EMAIL</b></label>
          <input type="text" id="email" placeholder="Enter Email" v-model="form.email">
        </div>
  
        <div class="form-group">
          <label for="password"><b>PASSWORD</b></label>
          <input type="password" id="password" placeholder="Enter Password" v-model="form.password">
        </div>
  
        <button class="login-button" v-on:click="loginUser()" type="button">Login</button>
        <button class="register-button" @click="register()">Register</button>
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
                email: '',
                password: ''
            }
            }
        },
        methods: {
            // login() {
            // console.warn(this.form);
            // this.loginUser();
            // },

            loginUser() {
            const loginData = {
                email: this.form.email, 
                password: this.form.password, 
            };

            axios.post('http://localhost:8000/api/login', loginData)
                .then((response) => {
                console.log(response.data);

                if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                }

                if(response.data.access_level == 2 ){
                    console.log('Techer role')
                }
                else if(response.data.access_level == 3){
                    console.log('Student role')
                    this.$router.push('/home');
                }
                else{
                    console.log('Admin role');
                    this.$router.push('/admin');
                }

                // location.reload();
                
                })
                .catch((error) => {
                console.error('Login failed:', error);
                });

            },
            register(){
                this.$router.push('/register')
            }
        }
    }
</script>
  
<style>
    .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    }

    .login-form {
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

    .login-logo {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    }

    .login-logo img {
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

    .login-button, .register-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 10px;
    }

    .login-button:hover, .register-button:hover {
    background-color: #0056b3;
    }
</style>

  