import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import styles from './eventCatecory.module.scss'

const Page = async ({ params }) => {

    const { category } = params;
    const capitalizeCategory = category[0].toUpperCase() + category.slice(1, category.length)
    const { allEvents } = await import('../../../../data/data.json')
    const data = allEvents.filter(event => event.city.toLowerCase() === category.toLowerCase())
    console.log(data)

    if (data.length === 0) {
        notFound()
    }

    return (
        <div>
            <h1 className={styles.headText}>Event in {capitalizeCategory}</h1>
            <div className={styles.localEventsBoard}>
                {data.map(event => (
                    <Link
                        key={event.id}
                        href={`/events/${category}/${event.id}`}
                        passHref>
                        <Image src={event.image} alt={event.title} width={350} height={350} />
                        <div className={styles.eventDescription}>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Page

export async function generateStaticParams() {
    const { events_categories } = await import('../../../../data/data.json');
    const allPaths = events_categories.map((event) => ({
        category: event.id.toString(),
    }));

    return allPaths;
}



