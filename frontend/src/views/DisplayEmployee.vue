<template>
  <div class="p-grid p-dir-col p-align-center">
    <h2 class="p-text-center">All Employees</h2>
    <div v-if="employees.length === 0" class="p-col-12">
      <div class="p-card p-p-4 p-shadow-2">
        <div class="p-text-center">
          <p class="text-muted">No employees found.</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="p-grid p-justify-center">
        <div v-for="employee in employees" :key="employee._id" class="p-col-12 p-md-6 p-lg-4" @click="handleClick(employee._id)">
          <div class="p-card p-p-4 p-shadow-2">
            <h3>{{ employee.firstName }} {{ employee.lastName }}</h3>
            <div class="p-text-bold text-primary">Field of Employment:</div>
            <div class="text-secondary">{{ employee.fieldOfEmployment }}</div>
            <div class="p-text-bold text-primary">Skills:</div>
            <div class="text-secondary">{{ employee.skills.join(', ') }}</div>
            <div class="p-text-bold text-primary">About:</div>
            <div class="text-secondary">{{ employee.about }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { useRouter } from 'vue-router'
import { useEmployeeStore } from '@/stores/employee'
import {  ref } from 'vue'

export default {
  setup() {
    let employees = ref([])
    const employeeStore = useEmployeeStore()
    const router = useRouter();
    
    employees.value = employeeStore.displayEmployee();

    function handleClick(id){
      router.push(`/view-employee/${id}`)
    }
      
      
    return {
      employees,
      handleClick
    }
  }
}
</script>
  
<style scoped>
.p-grid {
  max-width: 1200px;
}

.p-card {
  margin-bottom: 20px;
  border-radius: 8px;
}

h2 {
  margin-bottom: 20px;
}

.text-muted {
  color: #6c757d; 
}

.text-primary {
  color: #007bff;
}

.text-secondary {
  color: #6c757d;
}

.p-text-bold {
  font-weight: bold;
}
</style>
