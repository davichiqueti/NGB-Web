'use client'

import Link from 'next/link';


export default function Aside() {

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
