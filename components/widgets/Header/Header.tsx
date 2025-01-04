"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { motion, AnimatePresence } from 'framer-motion'
import { 
    FiSearch, 
    FiFilm, 
    FiCompass, 
    FiStar, 
    FiMenu, 
    FiX,
    FiUser
} from 'react-icons/fi'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <div className='w-full top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/[0.08]'>
            <div className="container mx-auto py-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Search */}
                    <div className="flex items-center gap-10">
                        <Link 
                            className='text-2xl font-bold text-white hover:opacity-80 transition-all' 
                            href='/'
                        >
                            Kino<span className="text-[rgb(195,187,175)]">World</span>
                        </Link>
                        
                        {/* Desktop Search */}
                        <div className="relative w-[320px] group hidden md:block">
                            <Input 
                                type="text" 
                                placeholder="Пошук фільмів..." 
                                className="pl-10 h-11 bg-white/5 border-transparent rounded-full focus:border-white/10 text-white/90 placeholder:text-white/30 transition-all focus:bg-white/10"
                            />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                        </div>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {['/', '/catalog', '/booking'].map((path, index) => (
                            <Link 
                                key={path}
                                className='group relative text-white/70 hover:text-white transition-all duration-200 flex items-center gap-2 text-[15px] py-2' 
                                href={path}
                            >
                                {index === 0 && <FiCompass className="w-5 h-5" />}
                                {index === 1 && <FiFilm className="w-5 h-5" />}
                                {index === 2 && <FiStar className="w-5 h-5" />}
                                {['Головна', 'Каталог', 'Бронювання'][index]}
                                <span className="absolute bottom-0 left-0 w-full h-[0px] bg-[rgb(195,187,175)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login">
                            <Button 
                                variant="ghost" 
                                className="text-white/80 hover:text-white hover:bg-white/5 h-11 px-6 rounded-[12px] transition-all duration-300"
                            >
                                Вхід
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button 
                                variant="default"
                                className="bg-[rgb(195,187,175)] hover:bg-white/20 text-black h-11 px-6 font-medium rounded-[12px] transition-all duration-300 backdrop-blur-sm"
                            >
                                Реєстрація
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="flex items-center gap-4 md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-white/70"
                        >
                            <FiSearch className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white/70"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="w-5 h-5" />
                            ) : (
                                <FiMenu className="w-5 h-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Search */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/[0.08] md:hidden"
                    >
                        <div className="container mx-auto py-4">
                            <div className="relative">
                                <Input 
                                    type="text" 
                                    placeholder="Пошук фільмів..." 
                                    className="pl-10 h-11 bg-white/5 border-transparent rounded-full focus:border-white/10 text-white/90 placeholder:text-white/30 transition-all focus:bg-white/10 w-full"
                                />
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-[80px] bg-black/95 backdrop-blur-xl border-t border-white/[0.08] md:hidden"
                    >
                        <div className="container mx-auto py-6">
                            <nav className="flex flex-col space-y-4">
                                {['/', '/catalog', '/booking'].map((path, index) => (
                                    <Link 
                                        key={path}
                                        className='text-white/70 hover:text-white transition-all duration-200 flex items-center gap-3 text-lg py-2 px-4 rounded-xl hover:bg-white/5' 
                                        href={path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {index === 0 && <FiCompass className="w-5 h-5" />}
                                        {index === 1 && <FiFilm className="w-5 h-5" />}
                                        {index === 2 && <FiStar className="w-5 h-5" />}
                                        {['Головна', 'Каталог', 'Бронювання'][index]}
                                    </Link>
                                ))}
                            </nav>

                            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/[0.08]">
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button 
                                        variant="ghost" 
                                        className="w-full text-white/80 hover:text-white hover:bg-white/5 h-12 rounded-xl transition-all duration-300"
                                    >
                                        <FiUser className="w-5 h-5 mr-2" />
                                        Вхід
                                    </Button>
                                </Link>
                                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button 
                                        variant="default"
                                        className="w-full bg-[rgb(195,187,175)] hover:bg-white/20 text-black h-12 font-medium rounded-xl transition-all duration-300"
                                    >
                                        Реєстрація
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Header