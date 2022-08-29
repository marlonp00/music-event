import Link from 'next/link'
import styles from '../styles/footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
     <p>Copyright &copy; Music Events</p>
     <Link href='/about'>About this Project</Link>
    </footer>
  )
}
