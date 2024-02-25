import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {
  let employees = ref(JSON.parse(localStorage.getItem('employees')) || []);

  function addEmployee(newEmployee) {
    try {
      employees.value.push(newEmployee);
      localStorage.setItem('employees', JSON.stringify(employees.value));
      return newEmployee;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add employee');
    }
  }

  async function deleteEmployee(employeeId) {
    try {
      const filteredEmployees = employees.value.splice(employeeId,1);
      localStorage.setItem('employees', JSON.stringify(filteredEmployees));
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete employee');
    }
  }
  
  function updateEmployee(index, updatedEmployee) {
    try {
      if (index !== -1) {
        employees.value[index] = updatedEmployee;
        localStorage.setItem('employees', JSON.stringify(employees.value));
        return updatedEmployee;
      } else {
        throw new Error('Employee not found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update employee');
    }
  }

  async function getEmployee(employeeId) {
    try {
      const employee = await employees.value[employeeId]
      if (employee) {
        return await employee;
      } else {
        throw new Error('Employee not found');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get employee');
    }
  }

  function getAllEmployees() {
    try {
      return employees.value;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get all employees');
    }
  }

  return { addEmployee, deleteEmployee, updateEmployee, getEmployee, getAllEmployees };
});
