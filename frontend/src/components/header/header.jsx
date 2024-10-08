
import styles from './header.module.css'
import { Link } from 'react-router-dom'

import { MdPerson  } from "react-icons/md";

export default function Header() {

    return (
        <>

            <header className={styles.header}>

                <Link to='/profile'>

                    <MdPerson className={styles.link} />

                </Link>

                <Link to='/'>
                
                    <img src="/logo.png" alt="logo" />
                </Link>
                
            </ header>
        
        </>
    )
    
}
