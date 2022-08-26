import Head from "next/head"
import styles from "../styles/Layout.module.css"

export default function Layout({title, keywords, description, children}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="decription" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  )
}

Layout.defaultProps = {
  title : "Music Events | Finde die angesagtesten Konzerte",
  description : "Finde alle Konzerte die momentan stattfinden",
  keywords : "Music, Konzerte, Concerts, Bands, Schweiz, Rock, Pop, Metal, Events"

}
