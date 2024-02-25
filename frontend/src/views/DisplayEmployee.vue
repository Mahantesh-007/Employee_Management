<template>
   <div class="employee-list">
    <h2 class="p-text-center">All Employees</h2>
    <div v-if="employees.length === 0" class="no-employees">
      <div class="p-card p-p-4 p-shadow-2">
        <div class="p-text-center">
          <p class="text-muted">No employees found.</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="employee-grid">
        <div v-for="(employee, index) in employees" :key="index" :class="['employee-card', employee.isAvailable ? 'green' : 'red']" @click="()=>handleClick(index)">
          <div :class="['p-card', 'p-p-4', 'p-shadow-2',employee.isAvailable?'':'bg-grey']" >
            <h3 class="employee-name">{{ employee.firstName }} {{ employee.lastName }}</h3>
            <div class="description-grid">
              <div class="field-of-employment">
                <div class="text-bold text-primary">Field of Employment:</div>
                <div class="text-secondary">{{ employee.fieldOfEmployment }}</div>
              </div>
              <div class="about">
                <div class="text-bold text-primary">About:</div>
                <div class="text-secondary">{{ employee.about.slice(0, 20) }}{{ employee.about.length > 20 ? '...' : '' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class = "addButton">
      <Button @click="addEmployee">Add Employee</Button>

    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useEmployeeStore } from '@/stores/employee'
import { ref,onMounted} from 'vue'

export default {
  setup() {
    const employees = ref([])
    const employeeStore = useEmployeeStore()
    const router = useRouter()
    
    onMounted(async() => {
      employees.value = await employeeStore.getAllEmployees()
      
    })
    

    function handleClick(id){
      router.push(`/view-employee/${id}`)
    }

    function addEmployee(){
      router.push('/add-employee')
    }
      
    return {
      employees,
      handleClick,
      addEmployee
    }
  }
}
</script>

<style scoped>
.employee-list {
  max-width: 600px; 
  margin: 0 auto;
  padding: 20px;
}

.no-employees {
  text-align: center;
}

.employee-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.employee-card {
  width: 100%;
  margin-bottom: 20px;
}

.p-card {
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.employee-name {
  text-align: center; 
  margin-bottom: 10px;
}

.description-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.field-of-employment,
.about {
  padding: 10px;
  border-radius: 8px;
  background-color: #f4f4f4;
}

.text-bold {
  font-weight: bold;
}

.text-primary {
  color: #007bff;
}

.text-secondary {
  color: #6c757d;
}

.green{
  border: 3px solid green;
}

.red{
  border: 3px solid red;
  background-color: #6c757d;
}

.bg-grey{
  background-color: #ffffffc7;
  backdrop-filter: blur(10px);
}
</style>
