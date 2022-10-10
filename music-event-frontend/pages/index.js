
import EventItem from "@/components/EventItem";
import {FaArrowRight} from 'react-icons/fa'
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index";
import Link from "next/link";



export default function Home({events}) {

  console.log(events);

  return (
    <Layout>
      
      <h1>Nächtste Events</h1>
      { events.length === 0 && <h3>No events to show</h3> }

      {
      events?.map(evt =>  (
        <EventItem key={evt.id} evt={evt} />
        
      ))}
      {events.length > 0 && (
        <Link href='events/'><a className="btn btn-secondary">Alle Events <FaArrowRight style={{ "transform": "translateY(2px)" }}/></a></Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC&_limit=3`);
  const json = await res.json();
  const events = json.data;
  return { 
    props: {events: events},
    revalidate: 1,
  };
}