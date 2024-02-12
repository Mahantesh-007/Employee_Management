<template lang="">
    <div>
        <div class="p-card p-p-4 p-shadow-2">
            <h3>{{ employee.firstName }} {{ employee.lastName }}</h3>
            <div class="p-text-bold text-primary">Field of Employment:</div>
            <div class="text-secondary">{{ employee.fieldOfEmployment }}</div>
            <div class="p-text-bold text-primary">Skills:</div>
            <div class="text-secondary">{{ employee.skills.join(', ') }}</div>
            <div class="p-text-bold text-primary">About:</div>
            <div class="text-secondary">{{ employee.about }}</div>
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
        const fetchedEmployee = await employeeStore.getEmployee(employeeId.value);
        employee.value = { ...fetchedEmployee, employmentField: fetchedEmployee.fieldOfEmployment }
      } catch (error) {
        console.error('Error fetching employee:', error)
      }
    });
    return{
        employee,
    
    }
    }
   
}

</script>
<style lang="">
    
</style>