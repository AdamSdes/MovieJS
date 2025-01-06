"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FiClock, FiCalendar, FiStar, FiPlay, FiUser, FiTrendingUp, FiAward } from 'react-icons/fi'
import { motion } from 'framer-motion'

// Список фильмов с данными
const movies = [
    {
        year: "2022",
        duration: "2 ч 28 мин",
        title: "Оппенгеймер",
        genre: "Бойовик / Документальні",
        price: "300 грн",
        image: "/peakpx.jpg"
    },
    {
        year: "2023",
        duration: "3 ч 1 мин",
        title: "Аватар: Шлях води",
        genre: "Фэнтезі / Пригодницькі",
        price: "350 грн",
        image: "https://focus.ua/static/storage/originals/c/18/d58c894d900f6253e46d36bbee33218c.jpg"
    },
    {
        year: "2020",
        duration: "2 ч 32 мин",
        title: "Месники: Фінал",
        genre: "Бойовик / Фантастика",
        price: "400 грн",
        image: "https://itc.ua/wp-content/uploads/2024/10/thumb-1920-1053091.jpg"
    }
];

interface TopFilmProps {}

const TopFilm: React.FC<TopFilmProps> = () => {
    const [currentMovieIndex, setCurrentMovieIndex] = React.useState(0);
    const [isFading, setIsFading] = React.useState(false);
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    // Handle mouse move for parallax effect
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) * 0.01;
        const moveY = (clientY - window.innerHeight / 2) * 0.01;
        setMousePosition({ x: moveX, y: moveY });
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
                setIsFading(false);
            }, 1000);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const currentMovie = movies[currentMovieIndex];

    return (
        <div className="relative h-screen overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                    backgroundImage: `url(${currentMovie.image})`,
                }}
                animate={{ 
                    scale: isFading ? 1.2 : 1.1,
                    opacity: isFading ? 0 : 1,
                }}
                transition={{ duration: 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-black/40" />

            <div className="container relative mx-auto h-full flex items-end pb-24">
                <div className="flex w-full items-end justify-between">
                    <motion.div 
                        className="flex flex-col gap-8 max-w-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Top badges */}
                        <div className="flex items-center gap-6">
                            <Badge className="bg-[rgb(195,187,175)] text-black gap-1.5 py-2 px-4 rounded-full">
                                <FiTrendingUp className="w-4 h-4" />
                                Топ продажів
                            </Badge>
                            <div className="flex items-center gap-2 text-[rgb(195,187,175)]">
                                <FiAward className="w-5 h-5" />
                                <span className="text-sm">Оскар 2022</span>
                            </div>
                        </div>

                        {/* Movie info badges */}
                        <div className="flex items-center gap-3">
                            <Badge className="bg-white/5 text-white gap-1.5 py-2 px-4 rounded-full hover:bg-white/10 transition-all duration-300">
                                <FiCalendar className="w-4 h-4" />
                                {currentMovie.year}
                            </Badge>
                            <Badge className="bg-white/5 text-white gap-1.5 py-2 px-4 rounded-full hover:bg-white/10 transition-all duration-300">
                                <FiClock className="w-4 h-4" />
                                {currentMovie.duration}
                            </Badge>
                            <Badge className="bg-white/5 text-white gap-1.5 py-2 px-4 rounded-full hover:bg-white/10 transition-all duration-300">
                                <FiStar className="w-4 h-4 text-[rgb(195,187,175)]" />
                                8.4
                            </Badge>
                        </div>

                        {/* Title and genre */}
                        <div className="space-y-4">
                            <h1 className="text-7xl font-bold tracking-tight text-white">
                                {currentMovie.title}
                            </h1>
                            <p className="text-xl text-white/70">{currentMovie.genre}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <FiStar className="w-5 h-5 text-yellow-400" />
                                <span className="text-lg">8.4/10</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiUser className="w-5 h-5 text-[rgb(195,187,175)]" />
                                <span className="text-lg">123.4K глядачів</span>
                            </div>
                            <Badge className="bg-white/10 text-white">HD</Badge>
                            <Badge className="bg-white/10 text-white">12+</Badge>
                        </div>

                        {/* Description */}
                        <p className="text-white/60 max-w-2xl leading-relaxed">
                            Пітер Паркер більше не може розділити своє повсякденне життя та обов'язки супергероя. Коли він просить про допомогу Доктора Стренджа, ставки стають ще більш небезпечними...
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-6">
                            <Button 
                                size="lg" 
                                className="bg-[rgb(195,187,175)] hover:bg-white/20 text-black h-14 px-8 text-lg font-medium rounded-[14px] transition-all duration-300 hover:scale-105 group"
                            >
                                <FiPlay className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                                Забронювати місце
                            </Button>
                            <div className="space-y-1">
                                <div className="text-sm text-white/60">Вартість квитка від</div>
                                <div className="text-3xl font-semibold text-[rgb(195,187,175)]">
                                    {currentMovie.price}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <div className="flex flex-col items-end gap-6">
                        <div className="flex gap-2">
                            {movies.map((_, idx) => (
                                <motion.button
                                    key={idx}
                                    onClick={() => setCurrentMovieIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        currentMovieIndex === idx 
                                            ? 'w-24 bg-[rgb(195,187,175)]' 
                                            : 'w-12 bg-white/20'
                                    }`}
                                    whileHover={{ scale: 1.1, backgroundColor: 'rgb(195,187,175)' }}
                                    whileTap={{ scale: 0.95 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopFilm;
