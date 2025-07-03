'use client'
import { useState } from 'react'
import styles from './login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Login com email: ${email} e senha: ${senha}')
  }

   return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Email:</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className={styles.label}>Senha:</label>
        <input
          className={styles.input}
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button className={styles.button} type="submit">Entrar</button>
      </form>
    </div>
  )
}