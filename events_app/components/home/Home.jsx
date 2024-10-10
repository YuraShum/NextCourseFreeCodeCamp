import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Home.module.scss'


const HomePage = ({ events }) => {
    return (
        <main className={styles.eventsList}>
            {events.map(event => (
                <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    passHref
                >
                    <Image width={200} height={200} src={event.image} alt={event.title} />
                    <div className={styles.eventDescription}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                    </div>
                </Link>

            )
            )}
        </main>
    )
}

export default HomePage