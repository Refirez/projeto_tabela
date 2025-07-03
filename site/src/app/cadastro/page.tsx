'use client'
import { useState } from 'react'
import styles from './cadastro.module.css'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ nome, email, senha })
    alert('Cadastro enviado!')
  }

  return (
    <div className={styles.container}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} >Nome:</label>
        <input className={styles.input}
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label className={styles.label} >Email:</label>
        <input className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.label}>Senha:</label>
        <input className={styles.input}
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>Cadastrar</button>

      </form>
    </div>
  )
}
