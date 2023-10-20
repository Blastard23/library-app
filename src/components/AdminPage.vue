<template>
    <div class="admin-page">
      <div @click="crud()" class="admin-sidebar">
        <h1>Create Books</h1>
      </div>
      <div class="admin-content">
        <h1>Manage Users</h1>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminPage',
    props: {
      msg: String
    },
    methods: {
      crud() {
        this.$router.push('/crud');
      }
    }
  };
  </script>
  
  <style>
  .admin-page {
    display: flex;
    height: 100%;
  }
  
  .admin-sidebar {
    flex: 1;
    background-color: #f0f0f0;
    padding: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #ccc;
  }
  
  .admin-content {
    flex: 1;
    padding: 20px;
    background-color: #ffffcc;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  h1 {
    color: black;
    font-size: 24px;
    margin: 0;
  }
  </style>