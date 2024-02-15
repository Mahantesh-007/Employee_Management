import { defineStore } from 'pinia'
import axios from 'axios'
import { backendurl } from '@/constant'
import { ref } from 'vue'

export const useEmployeeStore = defineStore('employee', () => {

  let employee = ref([]);

  async function addEmployee(employee) {
    try {
      const response = await axios.post(`${backendurl}/api/employee/create`, employee)
      await getAllEmployees();
      return response.data.employee
    } catch (error) {
      console.error(error)
      throw new Error('Failed to add employee')
    }
  }

  async function deleteEmployee(employeeId) {
    try {
      const response = await axios.delete(`${backendurl}/api/employee/${employeeId}`)
      await getAllEmployees()
      return response.data 
    } catch (error) {
      console.error(error)
      throw new Error('Failed to delete employee')
    }
  }

  async function updateEmployee(employeeId, updatedEmployee) {
    try {
      const response = await axios.put(`${backendurl}/api/employee/${employeeId}`, updatedEmployee)
      await getAllEmployees();
      return response.data.employee 
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update employee')
    }
  }

  async function getEmployee(employeeId) {
    try {
      const response = await axios.get(`${backendurl}/api/employee/${employeeId}`)
      return response.data 
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get employee')
    }
  }

  async function getAllEmployees() {
    try {
      const response = await axios.get(`${backendurl}/api/employee`)
      console.log(response.data);
      employee.value = await response.data;
      return  await response.data 
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get all employees')
    }
  }


  function displayEmployee(){
    return employee.value;
  }

  return { addEmployee, deleteEmployee, updateEmployee, getEmployee, getAllEmployees, displayEmployee }
})
