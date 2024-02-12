<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useEmployeeStore } from './stores/employee';
import { onMounted } from 'vue';

const employeeStore = useEmployeeStore();

onMounted(async()=>{
  await employeeStore.getAllEmployees();
})
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>

      </nav>
    </div> -->
  </header>

  <RouterView />
</template>

<style scoped>

</style>
