import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import styles from './curentEvent.module.scss'

const Page = async ({ params }) => {
  const { allEvents } = await import('../../../../data/data.json');

  const currentEvent = allEvents.find(event => event.id === params.id);

  if (!currentEvent) {
    notFound()
  }

  return (
    <div className={styles.wrapper}>
      <Image src={currentEvent.image} width={500} height={500} alt={currentEvent.title} />
      <div className={styles.superimposedText}>
        <h2>{currentEvent.title}</h2>
        <p>{currentEvent.description}</p>
      </div>
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  const { allEvents } = await import('../../../../data/data.json');

  const allPaths = allEvents.map(event => ({
    params: {
      id: event.id,
      category: event.city,
    },
  }));

  console.log(allPaths);

  return allPaths;
}