import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CriarPersonagem ({onFechar, onCriado, editperso}) {
    const [form, setForm] = useState({
        nome: editperso?.nome || '',
        genero: editperso?.genero || '',
        raca: editperso?.raca || '',
        classe: editperso?.classe || '',
        corPele: editperso?.corPele || '',
        corCabelo: editperso?.corCabelo || '',
        cabelo: editperso?.cabelo || '',
        corOlhos: editperso?.corOlhos || '',
        historia: editperso?.historia || '',
        forca: editperso?.forca || '',
        destreza: editperso?.destreza || '',
        inteligencia: editperso?.inteligencia || '',
        fortitude: editperso?.fortitude || '',
        carisma: editperso?.carisma || '',
        imagem: null
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (editperso) {
            setForm({ ...editperso, imagem: null })
        }
    }, [editperso])

            

    const handleChange = e => {
        const { name, value, files} = e.target
        if (name === 'imagem') {
            setForm({ ...form, imagem: files[0] })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handleSubmit = async e => {

        e.preventDefault()
        if (isSubmitting) return
        setIsSubmitting(true)
        const token = localStorage.getItem('token')
        const formData = new FormData()

        for (const key in form) {
            if (form[key] !== null) {
                formData.append(key, form[key])
            }
        }

        try {
            if (editperso) {
                await axios.put(`http://localhost:3001/api/personagens/${editperso.id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                
            } else {
                await axios.post('http://localhost:3001/api/personagens', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })
            }

            onFechar()
            onCriado()

        } catch (err) {
            console.error('Erro ao criar personagem', err)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className='modal-overlay' onClick={onFechar}>
        <div className='modal-content' onClick={e => e.stopPropagation()}>
            <h2>{editperso ? 'Editar Personagem' : 'Criar Personagem'}</h2>
            <form onSubmit={handleSubmit}>
                {['nome', 'genero', 'raca', 'classe', 'corPele', 'corCabelo', 'cabelo', 'corOlhos'].map(campo => {
                    const textoBonito = campo.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                    return (
                        <div key={campo}>
                            <label htmlFor={campo}>{textoBonito}</label><br />
                            <input id={campo} name={campo} placeholder={`Digite ${textoBonito.toLowerCase()}`} value={form[campo]} onChange={handleChange} required={campo !== 'historia'} />
                        </div>
                    )
                })}
                <label htmlFor="historia">História (opcional)</label>
                <div key="historia">
                    <textarea name="historia" id="historia" value={form["historia"]} onChange={handleChange}></textarea>
                </div>

                {['forca', 'destreza', 'inteligencia', 'fortitude', 'carisma'].map(atributo => {
                    const textoBonito = atributo.replace(/^./, str => str.toUpperCase())
                    return (
                        <div key={atributo}>
                            <label htmlFor={atributo}>{textoBonito}</label><br />
                            <input type="number" id={atributo} name={atributo} placeholder={`0 a 10`} value={form[atributo]} onChange={handleChange} min={0} max={10} required />
                        </div>
                    )
                })}

                <input type="file" name="imagem" accept='image/*' onChange={handleChange} />

                {form.imagemUrl && !form.imagem && (
                    <div>
                        <p>Imagem atual:</p>
                        <img src={form.imagemUrl} alt="atual" style={{ maxWidth: '200px' }} />
                    </div>
                )}

                <div className='butoes'>
                    <button type='button' onClick={onFechar}>Cancelar</button>
                    <button type='submit'>{editperso ? 'Salvar' : 'Criar'}</button>
                </div>

            </form>
        </div>
        </div>
    )
}
