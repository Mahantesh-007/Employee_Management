import { defineStore } from 'pinia'
import axios from 'axios'
import { backendurl } from '@/constant'
import { ref } from 'vue'
import { onMounted } from 'vue'


export const useEmployeeStore = defineStore('employee', () => {

  let employee = ref([]);

  onMounted(getAllEmployees);

  async function addEmployee(employee) {
    try {
      const response = await axios.post(`${backendurl}/api/employee/create`, employee)
      getAllEmployees();
      return response.data.employee
    } catch (error) {
      console.error(error)
      throw new Error('Failed to add employee')
    }
  }

  async function deleteEmployee(employeeId) {
    try {
      const response = await axios.delete(`${backendurl}/api/employee/${employeeId}`)
      return response.data 
    } catch (error) {
      console.error(error)
      throw new Error('Failed to delete employee')
    }
  }

  async function updateEmployee(employeeId, updatedEmployee) {
    try {
      const response = await axios.put(`${backendurl}/api/employee/${employeeId}`, updatedEmployee)
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
      employeedata(response.data);
      return  await response.data 
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get all employees')
    }
  }

  async function employeedata(data){
    employee = data;
    console.log(employee)
  }

  function displayEmployee(){
    return employee.value;
  }

  return { addEmployee, deleteEmployee, updateEmployee, getEmployee, getAllEmployees, displayEmployee }
})
