import styles from './footer.module.css'
import { Link } from 'react-router-dom'

import { FaHouse, FaBell, FaEnvelope } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";


export default function Footer() {

    return (
        <footer className={styles.footer}>
            <Link to='/'>

                <FaHouse className={styles.link} />
            </Link>

            <Link to='/explore'>

                <FaSearch className={styles.link} />
            </Link>

            <Link to='/messages'>

                <FaEnvelope className={styles.link} />
            </Link>
            
            <Link to='/notifications'>

                <FaBell className={styles.link} />
            </Link>
        </footer>
    )
    
}