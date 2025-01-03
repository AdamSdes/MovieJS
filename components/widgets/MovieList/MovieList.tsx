"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MovieCard from '../MovieCard/MovieCard'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import { Input } from '@/components/ui/input'
import { FiGrid, FiList, FiSearch, FiChevronDown, FiX, FiFilter } from 'react-icons/fi'

const genres = [
    "Бойовик", "Комедія", "Драма", "Жахи", "Фантастика", 
    "Пригоди", "Романтика", "Аніме", "Документальний"
];

const years = ["2024", "2023", "2022", "2021", "2020"];

const movies = [
    {
        title: "Людина-павук: Немає шляху додому",
        image: "/peakpx.jpg",
        rating: 8.4,
        duration: "2:28",
        genre: "Боевик",
        price: "300 грн"
    },
    {
        title: "Людина-павук: Немає шляху додому",
        image: "/peakpx.jpg",
        rating: 8.4,
        duration: "2:28",
        genre: "Боевик",
        price: "300 грн"
    },
    {
        title: "Людина-павук: Немає шляху додому",
        image: "/peakpx.jpg",
        rating: 8.4,
        duration: "2:28",
        genre: "Боевик",
        price: "300 грн"
    },
    {
        title: "Людина-павук: Немає шляху додому",
        image: "/peakpx.jpg",
        rating: 8.4,
        duration: "2:28",
        genre: "Боевик",
        price: "300 грн"
    },
    // ...add more movies
];

const MovieList = () => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [selectedYears, setSelectedYears] = useState<string[]>([])
    const [activePriceRange, setActivePriceRange] = useState<string>('all')
    const [activeSection, setActiveSection] = useState<string | null>('genres')

    return (
        <div className="relative isolate min-h-[calc(100vh-80px)]">
            {/* Animated background */}
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            'radial-gradient(circle at 0% 0%, rgba(195,187,175,0.1) 0%, transparent 50%)',
                            'radial-gradient(circle at 100% 100%, rgba(195,187,175,0.1) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 50%, rgba(195,187,175,0.1) 0%, transparent 50%)'
                        ]
                    }}
                    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
                />
            </div>

            <div className="container mx-auto py-8 pt-10">
                {/* Header section */}
                <div className="flex flex-col gap-6 mb-10">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-white">
                                Каталог фільмів
                                <span className="ml-3 text-lg font-normal text-white/40">
                                    {movies.length} фільмів
                                </span>
                            </h1>
                            <p className="text-white/60 max-w-2xl">
                                Знайдіть свій улюблений фільм серед нашої великої колекції та насолоджуйтесь переглядом у найкращій якості
                            </p>
                        </div>
                        
                        <div className="flex gap-1 bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-lg p-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setViewMode('grid')}
                                className={`${viewMode === 'grid' ? 'bg-[rgb(195,187,175)] text-black' : 'text-white/60'} rounded-lg`}
                            >
                                <FiGrid className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setViewMode('list')}
                                className={`${viewMode === 'list' ? 'bg-[rgb(195,187,175)] text-black' : 'text-white/60'} rounded-lg`}
                            >
                                <FiList className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <div className="flex gap-8">
                    {/* Enhanced Filters Sidebar */}
                    <div className="w-[320px] shrink-0">
                        <div className="sticky top-28 space-y-6">
                            {/* Search with animation */}
                            <motion.div 
                                className="relative group"
                                whileHover={{ scale: 1.01 }}
                            >
                                <Input 
                                    type="text"
                                    placeholder="Пошук фільмів..."
                                    className="w-full h-12 pl-12 pr-4 bg-black/40 backdrop-blur-xl border-white/[0.08] rounded-xl text-white/90 placeholder:text-white/40 transition-all focus-visible:ring-1 focus-visible:ring-[rgb(195,187,175)] focus-visible:border-[rgb(195,187,175)]"
                                />
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 transition-colors group-hover:text-[rgb(195,187,175)]" />
                            </motion.div>

                            {/* Filter sections */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium text-white">Фільтри</h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "Жанри",
                                            id: "genres",
                                            content: (
                                                <div className="grid grid-cols-2 gap-2">
                                                    {genres.map(genre => (
                                                        <motion.button
                                                            key={genre}
                                                            className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                                                                selectedGenres.includes(genre)
                                                                    ? 'bg-[rgb(195,187,175)] text-black font-medium'
                                                                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/[0.08]'
                                                            }`}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => {
                                                                if (selectedGenres.includes(genre)) {
                                                                    setSelectedGenres(prev => prev.filter(g => g !== genre));
                                                                } else {
                                                                    setSelectedGenres(prev => [...prev, genre]);
                                                                }
                                                            }}
                                                        >
                                                            {genre}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            )
                                        },
                                        {
                                            title: "Рік випуску",
                                            id: "years",
                                            content: (
                                                <div className="grid grid-cols-2 gap-2">
                                                    {years.map(year => (
                                                        <Button
                                                            key={year}
                                                            variant="outline"
                                                            className={`${
                                                                selectedYears.includes(year)
                                                                    ? 'bg-[rgb(195,187,175)] text-black border-transparent'
                                                                    : 'bg-black/40 border-white/[0.08] text-white/70 hover:text-white hover:bg-white/5'
                                                            }`}
                                                            onClick={() => {
                                                                if (selectedYears.includes(year)) {
                                                                    setSelectedYears(selectedYears.filter(y => y !== year))
                                                                } else {
                                                                    setSelectedYears([...selectedYears, year])
                                                                }
                                                            }}
                                                        >
                                                            {year}
                                                        </Button>
                                                    ))}
                                                </div>
                                            )
                                        },
                                        {
                                            title: "Ціна",
                                            id: "price",
                                            content: (
                                                <div className="space-y-2">
                                                    {['0-100 грн', '100-200 грн', '200-300 грн', '300+ грн'].map(range => (
                                                        <Button
                                                            key={range}
                                                            variant="outline"
                                                            className={`w-full justify-start ${
                                                                activePriceRange === range
                                                                    ? 'bg-[rgb(195,187,175)] text-black border-transparent'
                                                                    : 'bg-black/40 border-white/[0.08] text-white/70 hover:text-white hover:bg-white/5'
                                                            }`}
                                                            onClick={() => setActivePriceRange(range)}
                                                        >
                                                            {range}
                                                        </Button>
                                                    ))}
                                                </div>
                                            )
                                        }
                                    ].map(section => (
                                        <motion.div
                                            key={section.id}
                                            className="space-y-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-white/80 font-medium">{section.title}</h3>
                                                {section.id === 'genres' && selectedGenres.length > 0 && (
                                                    <Button
                                                        variant="ghost"
                                                        className="h-auto p-0 text-sm text-[rgb(195,187,175)] hover:text-white hover:bg-transparent"
                                                        onClick={() => setSelectedGenres([])}
                                                    >
                                                        Очистити
                                                    </Button>
                                                )}
                                            </div>
                                            {section.content}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Active filters summary */}
                            {(selectedGenres.length > 0 || selectedYears.length > 0) && (
                                <div className="p-4 rounded-xl bg-[rgb(195,187,175)]/5 border border-[rgb(195,187,175)]/10">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm text-white/60">Вибрані фільтри</span>
                                        <Button
                                            variant="ghost"
                                            className="h-auto p-0 text-sm text-[rgb(195,187,175)] hover:text-white hover:bg-transparent"
                                            onClick={() => {
                                                setSelectedGenres([]);
                                                setSelectedYears([]);
                                                setActivePriceRange('all');
                                            }}
                                        >
                                            Скинути все
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedGenres.map(genre => (
                                            <motion.span
                                                key={genre}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[rgb(195,187,175)]/10 text-[rgb(195,187,175)] text-sm cursor-pointer hover:bg-[rgb(195,187,175)]/20"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedGenres(prev => prev.filter(g => g !== genre))}
                                            >
                                                {genre}
                                                <FiX className="w-3.5 h-3.5" />
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="flex-1">
                        {/* Results and view toggle */}
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/[0.08]">
                            <div className="text-white/60">
                                Знайдено <span className="text-white font-medium">{movies.length}</span> фільмів
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-white/60">Сортувати:</span>
                                    <select className="bg-black/40 border border-white/[0.08] rounded-lg px-4 py-2 text-white/80">
                                        <option>За популярністю</option>
                                        <option>За рейтингом</option>
                                        <option>За новизною</option>
                                    </select>
                                </div>

                                <div className="flex gap-1 bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-lg p-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('grid')}
                                        className={`${viewMode === 'grid' ? 'bg-[rgb(195,187,175)] text-black' : 'text-white/60'} rounded-lg`}
                                    >
                                        <FiGrid className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setViewMode('list')}
                                        className={`${viewMode === 'list' ? 'bg-[rgb(195,187,175)] text-black' : 'text-white/60'} rounded-lg`}
                                    >
                                        <FiList className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Movies grid with updated layout */}
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={viewMode}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`grid gap-6 ${
                                    viewMode === 'grid' 
                                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                        : 'grid-cols-1 gap-y-4'
                                }`}
                            >
                                {movies.map((movie, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ 
                                            duration: 0.5,
                                            delay: idx * 0.1,
                                            ease: [0.25, 0.1, 0.25, 1] 
                                        }}
                                    >
                                        <MovieCard 
                                            movie={movie} 
                                            viewMode={viewMode}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination or Load More button can be added here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieList;
