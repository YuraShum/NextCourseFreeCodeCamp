'use client';

import React, { useState } from 'react';
import styles from './EventForm.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';


const EventForm = () => {
    const [email, setEmail] = useState('');
    const path = usePathname()
    const pathQuery = path.split('/')

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const eventId = pathQuery[pathQuery.length - 1]
        try {
            const response = await fetch('/api/email-registration', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ eventId, email }),

            })
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.registerSection}>
            <label>Get registered for this event!</label>
            <input
                placeholder='Enter ypur email heare'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default EventForm;