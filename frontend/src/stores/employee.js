import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([])

  function addEmployee(employee) {
    employees.value.push(employee)
  }

  function deleteEmployee(employeeId) {
    const index = employees.value.findIndex(emp => emp.id === employeeId)
    if (index !== -1) {
      employees.value.splice(index, 1)
    }
  }

  function updateEmployee(employeeId, updatedEmployee) {
    const index = employees.value.findIndex(emp => emp.id === employeeId)
    if (index !== -1) {
      employees.value.splice(index, 1, updatedEmployee)
    }
  }

  function getEmployee(employeeId) {
    return employees.value.find(emp => emp.id === employeeId)
  }

  function getAllEmployees() {
    return employees.value
  }

  const totalEmployees = computed(() => employees.value.length)

  return { employees, addEmployee, deleteEmployee, updateEmployee, getEmployee, totalEmployees,getAllEmployees }
})
