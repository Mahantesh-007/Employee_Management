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
   
  </header>

  <RouterView />
</template>

<style scoped>

</style>
