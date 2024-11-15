'use client'

import Link from 'next/link';
import { FaHashtag, FaHouse, FaBell, FaEnvelope } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";

export default function Aside() {
    return (
        <aside className="hidden left-0 top-0 h-full
                            sm:block  md:w-56 lg:w-72 xl:w-80 
                            border-r border-r-1 border-slate-400
                            flex flex-col justify-items-end 
                            py-8  space-y-4">

            <div id="nav">
                <Link href='/'>
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-14 h-14 mb-2 cursor-pointer"
                    />
                </Link>

                <div className="space-y-4 pl-10">
                    <Link href="/" className="text-2xl font-semibold hover:text-gray-300 flex items-center space-x-2">
                        <FaHouse className="text-xl" />
                        <p className="hidden md:block text-right">Home</p>
                    </Link>

                    <Link href="/explore" className="text-2xl font-semibold hover:text-gray-300 flex items-center space-x-2">
                        <FaHashtag className="text-xl" />
                        <p className="hidden md:block text-left">Explore</p>
                    </Link>

                    <Link href="/notifications" className="text-2xl font-semibold hover:text-gray-300 flex items-center space-x-2">
                        <FaBell className="text-xl" />
                        <p className="hidden md:block text-left">Notifications</p>
                    </Link>

                    <Link href="/messages" className="text-2xl font-semibold hover:text-gray-300 flex items-center space-x-2">
                        <FaEnvelope className="text-xl" />
                        <p className="hidden md:block text-left">Messages</p>
                    </Link>

                    <Link href="/profile" className="text-2xl font-semibold hover:text-gray-300 flex items-center space-x-2">
                        <IoPersonOutline className="text-xl" />
                        <p className="hidden md:block text-left">Profile</p>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
