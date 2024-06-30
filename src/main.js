import App from './App.vue';
import { createApp } from 'vue';
import routes from './routes';
import './style.css';
createApp(App)
    .use(routes)
    .mount('#app');
