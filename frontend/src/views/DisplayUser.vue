<template>
  <div class="employee-details">
    <h2 class="page-title">Details Of Employee</h2>
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
    const employee = ref({
      firstName: '',
      lastName: '',
      employmentField: '',
      skills: [''],
      about: ''
    })
    const employeeStore = useEmployeeStore()

    onMounted(async () => {
      try {
        const fetchedEmployee = await employeeStore.getEmployee(employeeId.value)
        employee.value = { ...fetchedEmployee, employmentField: fetchedEmployee.fieldOfEmployment }
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
        router.push('/view-employee')
      } catch (error) {
        console.error('Error deleting employee:', error)
      }
    }

    return {
      employee,
      editEmployee,
      deleteEmployee
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
  /* padding: 10px 0; */
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
