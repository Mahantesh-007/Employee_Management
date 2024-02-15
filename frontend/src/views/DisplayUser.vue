<template>
  <div class="employee-details">
    <h2 class="page-title">Details Of Employee </h2>
    <div class="details-container">
      <div class="p-card p-p-4 p-shadow-2">
        <h3>{{ employee.firstName }} {{ employee.lastName }}</h3>
        <div class="details-grid">
          <div class="detail">
            <div class="p-text-bold text-primary">Field of Employment:</div>
            <div class="text-secondary">{{ employee.employmentField }}</div>
          </div>
          <div class="detail">
            <div class="p-text-bold text-primary">Skills:</div>
            <div class="text-secondary">{{ employee.skills.join(', ') }}</div>
          </div>
          <div class="detail">
            <div class="p-text-bold text-primary">About:</div>
            <div class="text-secondary">{{ employee.about }}</div>
          </div>
        </div>
        <div class="buttons">
          <button class="edit-button" @click="editEmployee">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="delete-button" @click="deleteEmployee">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
          <button  @click="employeeAvailable" :class="['toggle-button', employee.isAvailable ? 'green' : 'red']">
            
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useEmployeeStore } from '@/stores/employee'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const employeeId = ref(route.params.id)
    let employee = ref({
      firstName: '',
      lastName: '',
      employmentField: '',
      skills: [''],
      about: '',
      isAvailable: null

    })
    const employeeStore = useEmployeeStore()

    onMounted(async () => {
      try {
        const fetchedEmployee = await employeeStore.getEmployee(employeeId.value)
        employee.value = await { ...fetchedEmployee, employmentField: fetchedEmployee.fieldOfEmployment }
      } catch (error) {
        console.error('Error fetching employee:', error)
      }
    })


    function editEmployee() {
      router.push(`/edit-employee/${employeeId.value}`)
    }

    async function deleteEmployee() {
      try {
        await employeeStore.deleteEmployee(employeeId.value)
        router.push('/')
      } catch (error) {
        console.error('Error deleting employee:', error)
      }
    }

    async function employeeAvailable(){
      try {
        let isAvailableValue = employee.value.isAvailable;
        const employeeData = {
        ...employee.value,
        fieldOfEmployment: employee.value.employmentField,
        isAvailable:!isAvailableValue

      };

      let updatedValue = await employeeStore.updateEmployee(employeeId.value,employeeData);
      employee.value = {...updatedValue,employmentField: updatedValue.fieldOfEmployment};
      } catch (error) {
        console.log(error)
      }
    }

    return {
      employee,
      editEmployee,
      deleteEmployee,
      employeeAvailable
    }
  }
}
</script>

<style scoped>
.employee-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.page-title {
  margin-bottom: 20px;
}

.details-container {
  width: 50%;
}

.p-card {
  width: 100%;
  margin: 20px;
  padding: 30px;
  border: 2px solid;
  position: relative;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.detail {
  padding: 10px;
  border-radius: 8px;
  background-color: #f4f4f4;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 8em;
}

.edit-button,
.delete-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  aspect-ratio: 6/2.5;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.delete-button {
  background-color: red;
}

.edit-button:hover,
.delete-button:hover {
  opacity: 0.8;
}

.text-bold {
  font-weight: bold;
}

.text-primary {
  color: #007bff;
}

.toggle-button{
  border-radius: 100%;
  padding: 1em;
  position: absolute;
  top: 12%;
  right: 7%;
  
}

.green{
  background-color: rgba(8, 201, 8, 0.941);
  box-shadow: 0 4px 6px -1px rgba(1, 214, 5, 0.793), 0 2px 4px -2px rgba(0, 197, 23, 0.76);
}

.red{
  background-color: rgba(244, 22, 22, 0.934);
  box-shadow: 0 4px 6px -1px rgba(214, 33, 1, 0.793), 0 2px 4px -2px rgba(197, 0, 10, 0.76);
}
@media screen and (max-width: 768px) {
  .details-container {
    width: 80%;
    margin-right: 2rem;
  }
}

@media screen and (max-width: 576px) {
  .details-container {
    width: 90%;
    margin-right: 2rem;
  }
}
</style>
