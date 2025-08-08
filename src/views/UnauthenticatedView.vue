<template>
  <div class="unauthenticated-container">
    <h1>Access Denied</h1>
    <p>You must be logged in to view this page.</p>
    <router-link to="/">Go to Login</router-link>
  </div>
</template>

<script>
export default {
  name: 'UnauthenticatedView'
};
</script>

<style scoped>
.unauthenticated-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
