import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { FiSearch, FiFilm, FiCompass, FiStar } from 'react-icons/fi';

const Header = () => {
    return (
        <div className='fixed w-full top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/[0.08]'>
            <div className="container mx-auto py-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-10">
                        <Link 
                            className='text-2xl font-bold text-white hover:opacity-80 transition-all' 
                            href='/'
                        >
                            Kino<span className="text-[rgb(195,187,175)]">World</span>
                        </Link>
                        
                        <div className="relative w-[320px] group">
                            <Input 
                                type="text" 
                                placeholder="Пошук фільмів..." 
                                className="pl-10 h-11 bg-white/5 border-transparent rounded-full focus:border-white/10 text-white/90 placeholder:text-white/30 transition-all focus:bg-white/10"
                            />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                        </div>
                    </div>
                    
                    <nav className="flex items-center space-x-8">
                        {['/', '/movies', '/booking'].map((path, index) => (
                            <Link 
                                key={path}
                                className='group relative text-white/70 hover:text-white transition-all duration-200 flex items-center gap-2 text-[15px] py-2' 
                                href={path}
                            >
                                {index === 0 && <FiCompass className="w-5 h-5" />}
                                {index === 1 && <FiFilm className="w-5 h-5" />}
                                {index === 2 && <FiStar className="w-5 h-5" />}
                                {['Головна', 'Фільми', 'Бронювання'][index]}
                                <span className="absolute bottom-0 left-0 w-full h-[0px] bg-[rgb(195,187,175)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Button 
                            variant="ghost" 
                            className="text-white/80 hover:text-white hover:bg-white/5 h-11 px-6 rounded-[14px] transition-all duration-300"
                        >
                            Вхід
                        </Button>
                        <Button 
                            variant="default"
                            className="bg-[rgb(195,187,175)] hover:bg-white/20 text-black h-11 px-6 font-medium rounded-[14px] transition-all duration-300 backdrop-blur-sm"
                        >
                            Реєстрація
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;