import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import {toast} from 'react-toastify'
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import Link from "next/link"
import Image from "next/image"
import {useRouter} from 'next/router'

export default function EventPage({evt}) {

  const { attributes, id } = evt;

  const router = useRouter();


  const deleteEvent = async (e) => {

    console.log(attributes);
    if(confirm('Bist du dir sicher?')) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',

      });

      const data = res.json();

      if(!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }

   // attributes.filter(attributes.id);

  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <a><FaPencilAlt /> Bearbeiten</a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}><FaTimes />Löschen</a>
        </div>
        <span>Am {new Date(attributes.date).toLocaleDateString('de-DE')} um {attributes.time}</span>
        <h1>{attributes.name}</h1>
        { attributes.image.data && (
          <div className={styles.image}>
            <Image src={attributes.image.data.attributes.formats.medium.url} width={960} height={600} />
          </div> )
        }

        <h3>Band:</h3>
        <p>{attributes.performers}</p>
        <h3>Beschreibung:</h3>
        <p>{attributes.description}</p>
        <h3>Ort: {attributes.venue}</h3>
        <p>{attributes.address}</p>
        <Link href="/events">
          <a className={styles.back}>{'<'} Zurück</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events/`);

  const json = await res.json();
  const events = json.data;

  const paths = events?.map((evt) => (
    {
      params: {slug: evt.attributes.slug}
    }
  ));

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params: {slug}}) {
  console.log(slug);

  const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug]=${slug}`);

  const json = await res.json();
  const events = json.data;

  return {
    props: {
      evt: events[0]
    },
    revalidate: 1,
  }
}
