<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
      <!-- Navigation Links -->
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/home" class="nav-link" active-class="active">Home (Week5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Firelogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireSignup" class="nav-link" active-class="active">Firebase Signup</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/logout" class="nav-link" active-class="active">Log Out</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>
        
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Get All Book API</router-link>
        </li>
      </ul>

      <!-- Login/Logout Buttons -->
      <div>
        <!-- Show Login button if not authenticated -->
        <router-link v-if="!isAuthenticated" to="/" class="btn btn-outline-primary">Login</router-link>
        <!-- Show Logout button if authenticated -->
        <button v-if="isAuthenticated" @click="logout" class="btn btn-primary">Logout</button>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isAuthenticated = ref(false);
const router = useRouter();
const route = useRoute();

// Function to update the authentication status from localStorage
const updateAuthStatus = () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';
};

// Function to handle user logout
const logout = () => {
  localStorage.removeItem('isAuthenticated');
  updateAuthStatus();
  router.push({ name: 'Login' });
};

// Check authentication status when the component is mounted
onMounted(() => {
  updateAuthStatus();
});

// Watch for route changes to update the header's auth status
watch(route, () => {
  updateAuthStatus();
});
</script>

<style scoped>
/* Styles from your original file are maintained */
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}

.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
