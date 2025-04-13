import axios from 'axios'

const api = axios.create({
   
   
    //baseURL:"http://127.0.0.1:3300/",
    baseURL:"https://denuncia-backend.onrender.com",
    timeout: 30000,
    headers: {
        'Content-Type':'application/json; charset=utf-8',
    }

})


export default api