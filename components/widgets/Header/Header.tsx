import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";



const Header = () => {

    return (
        <div className='bg-black/90 backdrop-blur-xl'>
           <div className="container flex items-center justify-between mx-auto rounded-full p-4">
               <Link className='bg-black text-white flex items-center px-4 h-[44px] rounded-full' href='/'>KinoWorld</Link>
               <div className="bg-black text-white gap-5 flex items-center px-2 h-[44px] rounded-full">
                   <Link className='bg-white px-2 py-1 rounded-full text-black' href='/'>Головна</Link>
                   <Link className='px-2' href='/'>Бронювання</Link>
               </div>
               <RainbowButton className='rounded-full font-semibold'>Авторизація</RainbowButton>
           </div>
        </div>
    )
}

export default Header;