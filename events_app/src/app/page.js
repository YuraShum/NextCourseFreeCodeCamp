import HomePage from "@/components/home/Home";

export default async function Home() {

  const { events_categories } = await getEvents()

  return (
    <div>
      <HomePage events={events_categories}/>
    </div>
  );
}

async function getEvents() {
  const { events_categories } = await import('../../data/data.json')
  return {
    events_categories
  }
}
