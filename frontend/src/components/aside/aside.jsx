import React, { useState, useEffect } from 'react';
import styles from './aside.module.css';
import { Link } from 'react-router-dom';
import { FaHashtag, FaHouse, FaBell, FaEnvelope } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { CgMoreO } from "react-icons/cg";

export default function Aside() {
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };


    useEffect(() => {
        
        window.addEventListener('resize', handleResize);

        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div>
            {windowWidth > 640 ? (
                <>
                    <aside className={styles.aside}>

                        <Link to='/' className={styles.logo}>
                            <img src="/logo.png" alt="logo" />
                        </Link>

                        <Link to='/' className={styles.asideButton}>
                            <FaHouse />
                            <p>Home</p>
                        </Link>

                        <Link to='/explore' className={styles.asideButton}>
                            <FaHashtag />
                            <p>Explore</p>
                        </Link>

                        <Link to='/notifications' className={styles.asideButton}>
                            <FaBell />
                            <p>Notifications</p>
                        </Link>

                        <Link to='/messages' className={styles.asideButton}>
                            <FaEnvelope />
                            <p>Messages</p>
                        </Link>

                        <Link to='/profile' className={styles.asideButton}>
                            <MdPerson />
                            <p>Profile</p>
                        </Link>

                        <Link to='/' className={styles.asideButton}>
                            <CgMoreO />
                            <p>More</p>
                        </Link>
                    </aside>
                </>
            ) : (
                <>
                
                </>
            )}

        </div>
    );
}
