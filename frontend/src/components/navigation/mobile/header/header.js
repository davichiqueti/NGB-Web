
import { IoPersonOutline } from "react-icons/io5";
import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">

                <div className="flex items-center">
                    <IoPersonOutline className="text-2xl" />
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link href='/'>
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="w-12 h-12 mb-2 cursor-pointer lg:ml-4 xl:ml-10 2xl:ml-16"
                        />
                    </Link>
                </div>
            </header>
        </>
    );
}
