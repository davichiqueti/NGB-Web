    'use client'

    import Link from 'next/link';

    import { FaHashtag, FaHouse, FaBell, FaEnvelope } from "react-icons/fa6";
    import { MdPerson } from "react-icons/md";
    import { CgMoreO } from "react-icons/cg";

    export default function Aside() {
        return (
            <aside className="fixed left-0 top-0 h-full w-50
                                md:w-56 lg:w-72 xl:w-80 
                                bg-gray-800 text-white 
                                flex flex-col justify-items-end 
                                py-8 pl-10 space-y-4">
                
                <Link href='/'>
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="w-14 h-14 mb-2 cursor-pointer"
                        />
                </Link>

                <Link href="/" className="text-2xl font-semisemibold hover:text-gray-300 flex items-center space-x-2">
                    <FaHouse />
                    <p className="hidden md:block ">Home</p>
                </Link>

                <Link href="/explore" className="text-2xl font-semibold hover:text-gray-300 flex items-center space-x-2">
                    <FaHashtag className="text-xl" />
                    <p className="hidden md:block ">Explore</p>
                </Link>

                <Link href="/notifications" className="text-2xl font-semibold hover:text-gray-300 flex items-center space-x-2">
                    <FaBell className="text-xl" />
                    <p className="hidden md:block ">Notifications</p>
                </Link>

                <Link href="/messages" className="text-2xl font-semibold hover:text-gray-300 flex items-center space-x-2">
                    <FaEnvelope className="text-xl" />
                    <p className="hidden md:block ">Messages</p>
                </Link>

                <Link href="/profile" className="text-2xl font-semibold hover:text-gray-300 flex items-center space-x-2">
                    <MdPerson className="text-2xl" />
                    <p className="hidden md:block ">Profile</p>
                </Link>
            </aside>
        );
    }