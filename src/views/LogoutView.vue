<template>
  <h1>Log Out</h1>
  <p>Current User: {{ currentUser }}</p>
  <p><button @click="logout">Log Out</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

const currentUser = ref(null);
const auth = getAuth();
const router = useRouter();

// 获取当前用户信息
currentUser.value = auth.currentUser ? auth.currentUser.email : "No user logged in";

const logout = () => {
  auth.signOut()
    .then(() => {
      console.log("User logged out");
      localStorage.removeItem("token"); // 清除 token
      router.push("/");
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
};
</script>

<style scoped>
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}
</style>
