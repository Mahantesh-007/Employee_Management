<template>
    <div class="p-grid p-dir-col p-align-center">
      <div class="p-col-6">
        <h2>Add Employee</h2>
        <div class="p-fluid">
          <div class="p-field">
            <label for="name">First Name</label>
            <InputText id="name" v-model="employee.firstName" />
          </div>
          <div class="p-field">
            <label for="lastName">Last Name</label>
            <InputText id="lastName" v-model="employee.lastName" />
          </div>
          <div class="p-field">
            <label for="employmentField">Field of Employment</label>
            <InputText id="employmentField" v-model="employee.employmentField" />
          </div>
          <div class="p-field">
            <label for="skills">Skills</label>
            <Chips id="skills" v-model="employee.skills" />
          </div>
          <div class="p-field">
            <label for="about">About</label>
            <Textarea  rows="5" cols="30" id="about" v-model="employee.about" />
          </div>
          <div class="p-field">
            <Button @click="addEmployee" label="Add Employee"/>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useEmployeeStore } from '@/stores/employee'
  
    import Textarea from 'primevue/textarea';

  
import InputText from 'primevue/inputtext';

  import Button from 'primevue/button';
  import Chips from 'primevue/chips';



  
  export default {
    components: {
      InputText,
      Textarea,
      Button,
      Chips
    },
    setup() {
      const employee = ref({
        firstName: '',
        lastName: '',
        employmentField: '',
        skills: [],
        about: ''
      })
  
      const employeeStore = useEmployeeStore()
  
      function addEmployee() {
        employeeStore.addEmployee({ ...employee.value })
        employee.value = {
          firstName: '',
          lastName: '',
          employmentField: '',
          skills: [],
          about: ''
        }
      }
  
      return {
        employee,
        addEmployee
      }
    }
  }
  </script>
  