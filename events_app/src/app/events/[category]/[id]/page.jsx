import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

const Page = async ({ params }) => {
  const { allEvents } = await import('../../../../../data/data.json');

  const currentEvent = allEvents.find(event => event.id === params.id);

  if (!currentEvent) {
    notFound()
  }

  return (
    <div>
      <Image src={currentEvent.image} width={500} height={500} alt={currentEvent.title}/>
      <h2>{currentEvent.title}</h2>
      <p>{currentEvent.description}</p>
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  const { allEvents } = await import('../../../../../data/data.json');

  const allPaths = allEvents.map(event => ({
    params: {
      id: event.id, 
      category: event.city, 
    },
  }));

  console.log(allPaths);

  return allPaths; 
}