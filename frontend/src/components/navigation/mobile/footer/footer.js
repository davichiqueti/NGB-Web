
import { FaHashtag, FaHouse, FaBell, FaEnvelope } from "react-icons/fa6";

export default function Footer() {

    return(
        <>
            <footer className="w-64 h-full bg-gray-800 text-white">
                
                <div 
                    id="footer" 
                    className="fixed bottom-0 w-full h-16 bg-gray-800
                                text-2xl
                                flex justify-around items-center "
                >

                    <FaHouse />
                    <FaHashtag/>
                    <FaBell/>
                    <FaEnvelope/>

                </div>

            </footer>
        </>
    )
}