import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomePage = ({events}) => {
    return (
        <main>
            {events.map(event => (
                <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    passHref
                >
                    <Image width={200} height={200} src={event.image} alt={event.title} />
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                </Link>

            )
            )}
        </main>
    )
}

export default HomePage