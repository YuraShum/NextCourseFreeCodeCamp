import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import styles from './MainLayout.module.scss'

const MainLayout = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.main}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout