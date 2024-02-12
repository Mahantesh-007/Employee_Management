<template>
    <div class="center-content">
      <div class="p-col-8">
        <h2>Add Employee</h2>
        <div class="p-card p-fluid">
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
            <div v-for="(skill,index) in employee.skills" :key="index" class="skill-input">
              <InputText  :placeholder="`Enter Skill ${index+1}`" v-model="employee.skills[index]" />
              <span @click="removeSkill(index)" v-if="index > 0" class="remove-skill">-</span>
              <span @click="addSkill()" v-if="index === employee.skills.length - 1" class='add-skill'>+</span>
            </div>

          </div>
          <div class="p-field">
            <label for="about">About</label>
            <Textarea rows="5" cols="30" id="about" v-model="employee.about" />
          </div>
          <div class="p-field">
            <Button @click="editEmployee" label="Add Employee" class="p-button-primary" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted} from 'vue'
  import { useEmployeeStore } from '@/stores/employee'
  import { useRouter, useRoute } from 'vue-router'
  import { watch } from 'vue'

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
    

    console.log("hi")
    onMounted(async() => {

        try{
            console.log(employeeId.value)
        const fetchEmployee = await employeeStore.getEmployee(employeeId.value);
        employee.value = {...fetchEmployee,employmentField:fetchEmployee.fieldOfEmployment}
        }
        catch(e){
            console.log(e)
        }
    });

  
      function editEmployee() {
        if (!employee.value.firstName || !employee.value.lastName || !employee.value.employmentField) {
          return;
        }

      const validSkill = employee.value.skills.filter(skill => skill.trim()!=='')

        const employeeData = {
          ...employee.value,
          fieldOfEmployment: employee.value.employmentField,skills:validSkill
        };
        console.log(employeeData);
  
        employeeStore.updateEmployee(employeeId.value,employeeData)
        employee.value = {
          firstName: '',
          lastName: '',
          employmentField: '',
          skills: [''], 
          about: ''
        }
  
        router.push('/view-employee')
  
      }

      function addSkill(){
        employee.value.skills.push('');
      }

      function removeSkill(index){
        if(employee.value.skills.length > 1){
          employee.value.skills.splice(index,1);
        }
      }
  
      return {
        employee,
        editEmployee,
        addSkill,
        removeSkill
      }
    }
  }
  </script>
  
  <style scoped>
  .p-card {
    padding: 20px;
    border-radius: 8px;
    background-color: #FFF2F0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }
  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .p-field {
    margin-bottom: 20px;
  }

  .skill-input{
    display: flex;
    align-items: center;
  }

  .skill-input input{
    width: 80%;
    margin-top: 1rem;
  }

  .add-skill,.remove-skill{
    cursor: pointer;
    font-weight: bold;
    margin-left: 10px;
    font-size: 20px;
  }
  </style>
  