<template>
    <div class="p-grid p-dir-col p-align-center">
      <h2>All Employees</h2>
      <div v-if="totalEmployees === 0">
        <p>No employees found.</p>
      </div>
      <div v-else>
        <div v-for="employee in employees" :key="employee.id" class="p-col-6">
          <Card>
            <h3>{{ employee.firstName }} {{ employee.lastName }}</h3>
            <p><strong>Field of Employment:</strong> {{ employee.employmentField }}</p>
            <p><strong>Skills:</strong> {{ employee.skills.join(', ') }}</p>
            <p><strong>About:</strong> {{ employee.about }}</p>
          </Card>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useEmployeeStore } from '@/stores/employee'
  import  Card  from 'primevue/card'
  
  export default {
    components: {
      Card
    },
    setup() {
      const employeeStore = useEmployeeStore()
  
      const employees = employeeStore.getAllEmployees()
      const totalEmployees = employeeStore.totalEmployees
      console.log(totalEmployees)
  
      return {
        employees,
        totalEmployees
      }
    }
  }
  </script>
  