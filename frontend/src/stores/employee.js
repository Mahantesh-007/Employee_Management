import { defineStore } from 'pinia'
import axios from 'axios'
import { backendurl } from '@/constant'

export const useEmployeeStore = defineStore('employee', () => {
  
  async function addEmployee(employee) {
    try {
      const response = await axios.post(`${backendurl}/api/employee/create`, employee)
      return response.data.employee 
    } catch (error) {
      console.error(error)
      throw new Error('Failed to add employee')
    }
  }

  async function deleteEmployee(employeeId) {
    try {
      const response = await axios.delete(`${backendurl}/api/employee/${employeeId}`)
      return response.data // Return success message
    } catch (error) {
      console.error(error)
      throw new Error('Failed to delete employee')
    }
  }

  async function updateEmployee(employeeId, updatedEmployee) {
    try {
      const response = await axios.put(`${backendurl}/api/employee/${employeeId}`, updatedEmployee)
      return response.data.employee // Return the updated employee
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
      console.log(response.data)
      return  await response.data 
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get all employees')
    }
  }

  return { addEmployee, deleteEmployee, updateEmployee, getEmployee, getAllEmployees }
})
