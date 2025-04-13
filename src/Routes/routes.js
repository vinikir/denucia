import React  from 'react'
import { 
    BrowserRouter, 
    Route,
    Routes
} from 'react-router-dom'

import Login from '../screens/Login'
import MessageForm from '../screens/Denuncia'
import MonthlyReport from '../screens/MonthlyReport'
import MessageDetails from '../screens/MessageDetails'
const Rotas = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mensagem" element={<MessageForm />} />
                <Route path="/admin/mensagem" element={<MonthlyReport />} />
                <Route path="/admin/detalhes" element={<MessageDetails />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas