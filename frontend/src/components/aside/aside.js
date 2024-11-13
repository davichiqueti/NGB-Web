'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

import styles from './aside.module.css'

export default function Navigation() {

    return(
        <>
            <nav>
                <Link href="/profile">
                    <h1>perfil</h1>
                </Link>
            </nav>
        </>
    );
    
}
