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
        <div v-for="employee in employees" :key="employee._id" class="p-col-12 p-md-6 p-lg-4">
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
import { useEmployeeStore } from '@/stores/employee'
import Card from 'primevue/card'
import { onMounted, ref } from 'vue'

export default {
  components: {
    Card
  },
  setup() {
    const employees = ref([])
    const employeeStore = useEmployeeStore()

    onMounted(async () => {
      try {
        employees.value = await employeeStore.getAllEmployees()
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    })

    return {
      employees
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
  color: #6c757d; /* muted grey color */
}

.text-primary {
  color: #007bff; /* primary blue color */
}

.text-secondary {
  color: #6c757d; /* secondary grey color */
}

.p-text-bold {
  font-weight: bold;
}
</style>
