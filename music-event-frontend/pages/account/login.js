import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({email, password });
  }

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Adresse</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value) } />
          </div>
          <div>
            <label htmlFor="password">Passwort</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value) } autoComplete="off" />
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>
        <p>Noch keinen Account? <Link href='/account/register'><a>Registrieren</a></Link></p>
      </div>
    </Layout>
  )
}
