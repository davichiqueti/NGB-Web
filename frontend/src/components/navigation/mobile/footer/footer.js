import { FaHashtag, FaHouse, FaBell, FaEnvelope } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="w-full bg-gray-800 text-white border-t border-slate-400 sm-500:hidden">
                <div
                    className="w-full h-16 bg-gray-800 text-2xl flex justify-around items-center"
                >
                    <Link href="/">
                        <FaHouse />
                    </Link>

                    <Link href="/explore">
                        <FaHashtag />
                    </Link>

                    <Link href="/notifications">
                        <FaBell />
                    </Link>

                    <Link href="/messages">
                        <FaEnvelope />
                    </Link>
                </div>
            </footer>
        </>
    );
}
