'use client'

import Link from 'next/link';

export default function Aside() {
    return (
        <aside className="w-64 h-full bg-gray-800 text-white flex flex-col items-center py-8 space-y-4">
            <Link href='/'>
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-16 h-16 mb-6 cursor-pointer"
                />
            </Link>

            <Link href='/' className="text-lg font-medium hover:text-gray-300">
                <p>Home</p>
            </Link>

            <Link href='/explore' className="text-lg font-medium hover:text-gray-300">
                <p>Explore</p>
            </Link>

            <Link href='/notifications' className="text-lg font-medium hover:text-gray-300">
                <p>Notifications</p>
            </Link>

            <Link href='/messages' className="text-lg font-medium hover:text-gray-300">
                <p>Messages</p>
            </Link>

            <Link href='/profile' className="text-lg font-medium hover:text-gray-300">
                <p>Profile</p>
            </Link>

            <Link href='/' className="text-lg font-medium hover:text-gray-300">
                <p>More</p>
            </Link>
        </aside>
    );
}
