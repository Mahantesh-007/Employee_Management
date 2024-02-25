

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import App from './App.vue'
import router from './router'
import Card from 'primevue/card'
import InputSwitch from 'primevue/inputswitch';


const app = createApp(App)

app.component('Textarea', Textarea)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('Card', Card)
app.component('InputSwitch',InputSwitch)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)


app.mount('#app')
