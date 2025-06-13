import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './react/Registro'
import Login from "./react/Login"
import Inicio from "./react/inicio"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Inicio/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App