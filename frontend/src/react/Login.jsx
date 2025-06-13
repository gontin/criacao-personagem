import { useState } from "react"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../styles.css'



export default function Login () {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const resposta = await axios.post('http://localhost:3001/api/login', {
                usuario,
                senha
            })

            if (resposta.status === 200) {
                setMensagem('Login realizado com sucesso!')
                localStorage.setItem('token', resposta.data.token)
                navigate('/')
            }

        } catch (erro) {
            if (erro.response) {
                setMensagem(erro.response.data.error)
            } else {
                setMensagem('Erro ao conectar com o servidor')
            }
        }
    }  
    
    return (
        <main className="mainlog">
        <div className="caxa">
            <h2 className="boas">Login</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label>Usuário:</label>
                <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
            </div>
            <div>
                <label>Senha:</label>
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <button type="submit">Entrar</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
            <p>
                Não tem uma conta? <Link to="/register">Cadastre-se</Link>
            </p>
        </div>
        </main>
    )
}