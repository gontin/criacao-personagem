import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../styles.css'


export default function Register() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (senha !== confirmarSenha) {
            setMensagem('As senhas não são iguais')
            return
        }

        try {
            const resposta = await axios.post('https://criacao-personagem.onrender.com/api/register', {
                usuario,
                senha,
            })

            if (resposta.status === 201) {
                setMensagem('Usuário registrado com sucesso!')
                setUsuario('')
                setSenha('')
                setConfirmarSenha('')
                setTimeout(() => {
                    navigate('/login')
                }, 1200)
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
        <div className='caxa'>
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Usuário:</label>
            <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
            </div>
            <div>
            <label>Senha:</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <div>
            <label>Confirmar senha:</label>
            <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />
            </div>
            <button type="submit">Cadastrar</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
            <p>
                Já tem uma conta? <Link to="/login">Login</Link>
            </p>
        </div>
        </main>
    )
}
