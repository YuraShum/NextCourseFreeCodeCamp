import Link from 'next/link'
import React from 'react'
import styles from './Header.module.scss'
import logo from '../../../public/logo.png'
import Image from 'next/image'


const Header = () => {
    return (
        <header className={styles.header}>

            <div className={styles.logo}>
                <Image src={logo} alt='logo' width={60} height={60} />

            </div>
            <nav>
                <ul className={styles.navigation}>
                    <li>
                        <Link href='/' passHref>Home</Link>
                    </li>
                    <li>
                        <Link href='/events' passHref>Events</Link>
                    </li>
                    <li>
                        <Link href='/about-us' passHref>About us</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header