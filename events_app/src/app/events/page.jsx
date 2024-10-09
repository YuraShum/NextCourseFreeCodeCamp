import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = async () => {

    const { events_categories } = await getStaticProps()

    return (
        <div>
            <h1>Events Page</h1>
            <div>
                {events_categories.map(event => (
                    <Link
                        passHref
                        href={`/events/${event.id}`}
                        key={event.id}>
                        <Image
                            width={300}
                            height={300}
                            src={event.image}
                            alt={event.title} />
                        <h2>{event.title}</h2>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Page

async function getStaticProps() {
    const { events_categories } = await import('../../../data/data.json')

    return {
        events_categories
    }
}

