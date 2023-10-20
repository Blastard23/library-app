<template>
    <div class="hello">
      <div class="menu">
        <div class="menu-item">
          <div @click="home()" class="menu-text">
            Home
          </div>
        </div>
        <div class="menu-item">
          <div @click="books()" class="menu-text">
            Books
          </div>
        </div>
        <div class="menu-item menu-center">
          Library
        </div>
        <div class="menu-item">
          <div class="menu-text">
            About
          </div>
        </div>
        <div class="menu-item">
          <div @click="login()" class="menu-text">
            Login
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    props: {
      msg: String
    },
    methods: {
    login() {
      this.$router.push('/login');
    },

    home(){
        this.$router.push('/home');
    },
    books(){
        this.$router.push('/books');
    }
  }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

    .hello{
        background-color: #080808;
    }
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    width: 100vw;
    height: calc(100vh - 60px);
  }
  
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* margin-top: 10px; */
    height: 60px;
  }
  
  .menu-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .menu-text{
    font-size: 20px;
    color: #ffff;
    cursor: pointer;
    padding: 10px;
    border-bottom: 2px solid #ffff;
    width: fit-content;
  }
  
  .menu-text:hover {
    border-bottom: 2px solid yellow;
  }
  
  .menu-center {
    font-size: 36px;
    color: #EAEAEA;
  }
  </style>