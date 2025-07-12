import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom'
import CriarPersonagem from '../components/CriarPersonagem'
import '../styles.css'
import * as React from 'react';
import { RadarChart } from '@mui/x-charts/RadarChart';

export default function Inicio () {
    const [personagens, setPersonagens] = useState([])
    const [usuario, setUsuario] = useState()
    const [ mostrarCriar, setMostrarCriar ] = useState(false)
    const [editperso, setEditPerso] = useState(null)
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const fetchPersonagens = async () => {
        try {
            const res = await axios.get('https://criacao-personagem.onrender.com/api/personagens', {
                headers: { Authorization: `Bearer ${token}`}
            })
            setPersonagens(res.data)
            const payload = JSON.parse(atob(token.split('.')[1]))
            setUsuario(payload.nome)
        } catch (err) {
            navigate('/login')
        }
    }

    const deletarperso = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/personagens/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            fetchPersonagens()
        } catch (err) {
            console.error('Erro ao deletar personagem', err)
        }
    }


    useEffect (() => {
        if (!token) return navigate('/login')
        fetchPersonagens()
    }, [token, navigate])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="divprinc">
            <nav>
                <span className="boas">Bem-vindo(a), {usuario}</span>
                <button className="logout" onClick={handleLogout}>Logout</button>
            </nav>
            {mostrarCriar && (
                <CriarPersonagem onFechar={() => {setMostrarCriar(false); setEditPerso(null)}} onCriado={fetchPersonagens} editperso={editperso}/>
            )}
            <main className="maininicio">
                <h2>Seus Personagens</h2>
                <button onClick={() => setMostrarCriar(true)}>+ Criar Personagem</button>

                <div className="persos">
                    {personagens.map(p => (
                        <div key={p.id} className="persocard">
                            <div className="detalhes">
                                <h2>Detalhes</h2>
                                <p><strong>Gênero:</strong> {p.genero}</p>
                                <p><strong>Cabelo:</strong> {p.cabelo}</p>
                                <p><strong>Pele:</strong> {p.corPele}</p>
                                <p><strong>Olhos:</strong> {p.corOlhos}</p>
                                <p><strong>História:</strong> {p.historia}</p>
                            </div>

                            <div className="resumo">
                                <h3>{p.nome}</h3>
                                <p>Classe: {p.classe}</p>
                                <p>Raça: {p.raca}</p>
                            </div>

                            <RadarChart
                                height={200}
                                series={[{ data: [p.forca, p.carisma, p.inteligencia, p.fortitude, p.destreza] }]}
                                radar={{
                                    max: 10,
                                    metrics: ['Força', 'Carisma', 'Inteligência', 'Fortitude', 'Destreza'],
                                }}
                                />
                            {p.imagemUrl && <img src={p.imagemUrl} alt={p.nome} style={{ maxWidth: '200px', height: 'auto' }} />}
                            <div className="butoes">
                            <button onClick={() => {
                                setEditPerso(p)
                                setMostrarCriar(true)
                            }}>Editar</button>
                            <button onClick={() => deletarperso(p.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
             </main>
        </div>
    )
}
