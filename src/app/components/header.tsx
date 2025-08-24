import Image from "next/image";
import logo from '../../../public/logo.jpeg'

export default function Header() {
    return (
        <>
            <Image src={logo} alt="WeSpeak" width={50} height={50} />
            <div>
                <h1 className="font-bold text-5xl text-wrap text-center">WeSpeak Challenge</h1>
                <h5 className="text-center">Tomás Villarreal</h5>
            </div>
        </>
    )
}