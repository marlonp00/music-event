import {toast} from 'react-toastify';
import {FaImage} from 'react-icons/fa'
import {useState} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import Layout from "@/components/Layout"
import {API_URL} from '@/config/index'
import styles from '@/styles/Form.module.css'


export default function EditEventPage({evt}) {

  console.log(evt)

  const {attributes, id} = evt.data;

  const [values, setValues] = useState({
      name: attributes.name,
      performers: attributes.performers,
      description: attributes.description,
      venue: attributes.venue,
      address: attributes.address,
      date: attributes.date,
      time: attributes.time
    });

  const [imagePreview, setImagePreview] = useState(attributes.image ? attributes.image.data.attributes.formats.thumbnail.url : null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      // Validation
      const hasEmptyFields = Object.values(values).some((element) => element === '');

      if(hasEmptyFields) {
        toast.error("Please fill in all fields");
      }

      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: values})
      });
      if(!res.ok) {
        toast.error('Could not send data');
      } else {
        const evt = await res.json();

        router.push(`/events/${evt.data.attributes.slug}`);
      }
  }
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});

  }



  const router = useRouter(); 

  return (
    <Layout title="Event Bearbeiten">
      <Link href='/events'>zurück</Link>
      <h1>Event Bearbeiten </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="performers">Künstler</label>
            <input type="text" id="performers" name="performers" value={values.performers} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="venue">Ort</label>
            <input type="text" id="venue" name="venue" value={values.venue} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="address">Adresse</label>
            <input type="text" id="address" name="address" value={values.address} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="date">Datum</label>
            <input type="date" id="date" name="date" value={moment(values.date).format('yyyy-MM-DD')} onChange={handleInputChange}/>
          </div>
          <div>
            <label htmlFor="time">Zeit</label>
            <input type="text" id="time" name="time" value={values.time} onChange={handleInputChange}/>
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Infos</label>
          <textarea type="text" name="description" id="description" value={values.description} onChange={handleInputChange}></textarea>
        </div>
        <input type="submit" value="Speichern" className="btn" />
      </form>

      <h2>Bild Vorschau</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170}  />
      ) : (
        <div>Kein Bild vorhanden</div>
      )}
      <div>
        <button className="btn-secondary">
        <FaImage /> Bild Hinzufügen
        </button>
      </div>
      </Layout>
  ) 
}

export async function getServerSideProps({params: {id}}) {
    
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
    const evt = await res.json();

    return {
      props: {
        evt: evt
      }
    }
}
