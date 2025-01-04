"use client"

import { useParams } from 'next/navigation'
import Header from '@/components/widgets/Header/Header'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
    FiPlay, FiStar, FiClock, FiCalendar, FiUser, FiAward,
    FiShare2, FiDollarSign, FiGlobe, FiVideo, FiMessageCircle,
    FiCamera, FiHeart 
} from 'react-icons/fi'
import BookingModal from '@/components/widgets/BookingModal/BookingModal'
import YouTube from 'react-youtube'

const movieData = {
    id: "spider-man-1",
    title: "Людина-павук: Немає шляху додому",
    originalTitle: "Spider-Man: No Way Home",
    rating: 8.4,
    ratings: {
        imdb: 8.4,
        rottenTomatoes: "93%",
        metacritic: 85
    },
    duration: "2 години 28 хвилин",
    year: 2021,
    releaseDate: "16 грудня 2021",
    ageRating: "12+",
    budget: "$200 000 000",
    boxOffice: "$1.9 млрд",
    languages: ["Англійська", "Українська"],
    subtitles: ["Українські", "Англійські"],
    trailerUrl: "eZYD5NRum4A",
    genres: ["Бойовик", "Пригоди", "Фантастика"],
    description: `Пітер Паркер більше не може розділити своє повсякденне життя та обов'язки супергероя. Коли він просить про допомогу Доктора Стренджа, ставки стають ще більш небезпечними, змушуючи його зрозуміти, що означає бути Людиною-павуком.`,
    plot: `Після того, як особистість Пітера Паркера було розкрито, життя та репутація його та його близьких опиняються під загрозою. Він звертається до Доктора Стренджа з проханням стерти пам'ять усім, хто знає його таємницю. Однак заклинання йде не за планом, що призводить до розриву мультивсесвіту та появи небезпечних ворогів з інших реальностей.`,
    cast: [
        { name: "Том Голланд", role: "Пітер Паркер / Людина-павук" },
        { name: "Зендая", role: "Мішель «ЕмДжей» Джонс-Ватсон" },
        { name: "Бенедикт Камбербетч", role: "Доктор Стівен Стрендж" }
    ],
    crew: [
        { name: "Джон Воттс", role: "Режисер" },
        { name: "Кевін Файгі", role: "Продюсер" },
        { name: "Кріс МакКенна", role: "Сценарист" }
    ],
    gallery: [
        "https://cs13.pikabu.ru/post_img/big/2023/11/09/10/1699546193185841617.png",
        "https://opis-cdn.tinkoffjournal.ru/mercury/in-oppenheimer-review.kvgm23fn6wbt..jpg",
        "https://avatars.mds.yandex.net/get-kinopoisk-image/10900341/abb7745c-2c02-40a4-9963-0938ebd180a0/1920x",
        "https://avatars.mds.yandex.net/get-kinopoisk-image/10592371/47170143-8ba4-4335-8543-f5f823f11561/1920x",
        "https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/0934acf5-15a7-4638-8462-ea4a154d8681/1920x",
        "https://avatars.mds.yandex.net/get-kinopoisk-image/4483445/9735307e-dc62-4f4e-aa11-fb5ab82c7ded/1920x",
    ],
    reviews: [
        {
            author: "Марія К.",
            rating: 5,
            text: "Неймовірний фільм! Найкраща частина трилогії."
        }
        // ...more reviews
    ]
    
};

const MoviePage = () => {
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")
    const params = useParams();
    const { id } = params;

    return (
        <motion.div className="relative min-h-screen bg-black/95">
            <Header />
            
            {/* Hero Section */}
            <div className="relative h-[70vh] overflow-hidden">
                {/* Background Image */}
                <motion.div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: "url('/peakpx.jpg')" }}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                
                {/* Content */}
                <div className="container relative mx-auto h-full flex items-end pb-20">
                    <div className="flex gap-8">
                        {/* Poster */}
                        <motion.div
                            className="w-[300px] h-[450px] rounded-2xl overflow-hidden shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <img 
                                src="/peakpx.jpg" 
                                alt="Movie Poster"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            className="flex-1 space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Badge className="bg-[rgb(195,187,175)] text-black px-3 py-1">
                                        <FiAward className="w-4 h-4 mr-1" />
                                        Топ продажів
                                    </Badge>
                                    <Badge className="bg-white/10 text-white">HD</Badge>
                                    <Badge className="bg-white/10 text-white">12+</Badge>
                                </div>

                                <h1 className="text-5xl font-bold text-white">
                                    Людина-павук: Немає шляху додому
                                </h1>

                                <div className="flex items-center gap-6 text-white/70">
                                    <span className="flex items-center gap-2">
                                        <FiStar className="w-5 h-5 text-[rgb(195,187,175)]" />
                                        8.4
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FiClock className="w-5 h-5" />
                                        2:28
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FiCalendar className="w-5 h-5" />
                                        2021
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FiUser className="w-5 h-5" />
                                        123.4K глядачів
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button 
                                    size="lg"
                                    onClick={() => setIsBookingOpen(true)}
                                    className="bg-[rgb(195,187,175)] hover:bg-white/20 text-black px-8 font-medium rounded-xl"
                                >
                                    <FiPlay className="w-5 h-5 mr-2" />
                                    Забронювати місце
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white/10 text-white hover:bg-white/5"
                                >
                                    <FiShare2 className="w-5 h-5 mr-2" />
                                    Поділитися
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Tabs Section */}
            <div className="container mx-auto py-12">
                <Tabs defaultValue="overview" className="space-y-8">
                    <TabsList className="bg-black/40 border border-white/[0.08] p-1 rounded-xl">
                        {[
                            { value: "overview", label: "Огляд" },
                            { value: "trailer", label: "Трейлер" },
                            { value: "cast", label: "Актори та знімальна група" },
                            { value: "gallery", label: "Галерея" },
                            { value: "reviews", label: "Відгуки" }
                        ].map(({ value, label }) => (
                            <TabsTrigger 
                                key={value}
                                value={value}
                                className="data-[state=active]:bg-[rgb(195,187,175)] data-[state=active]:text-black rounded-lg"
                            >
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="overview" className="space-y-8">
                        <div className="grid grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="col-span-2 space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-white">Про фільм</h2>
                                    <p className="text-white/70 leading-relaxed">{movieData.description}</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white">Сюжет</h3>
                                    <p className="text-white/70 leading-relaxed">{movieData.plot}</p>
                                </div>

                                {/* Ratings Section */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white/5 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-bold text-[rgb(195,187,175)]">
                                            {movieData.ratings.imdb}
                                        </div>
                                        <div className="text-sm text-white/60">IMDb</div>
                                    </div>
                                    {/* ...similar blocks for other ratings... */}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-medium text-white mb-4">Інформація</h3>
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="text-white/40 flex items-center gap-2">
                                                <FiGlobe className="w-4 h-4" />
                                                Оригінальна назва
                                            </dt>
                                            <dd className="text-white mt-1">{movieData.originalTitle}</dd>
                                        </div>
                                        {/* ...more movie details... */}
                                    </dl>
                                </div>

                                {/* Languages */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-medium text-white mb-4">Мови</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-white/40 mb-2">Аудіо</div>
                                            <div className="flex flex-wrap gap-2">
                                                {movieData.languages.map(lang => (
                                                    <Badge key={lang} variant="secondary" className="bg-white/10">
                                                        {lang}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        {/* ...subtitles section... */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="trailer">
                        <div className="aspect-video w-full rounded-2xl overflow-hidden">
                            <YouTube
                                videoId={movieData.trailerUrl}
                                opts={{
                                    width: '100%',
                                    height: '100%',
                                    playerVars: { autoplay: 0 }
                                }}
                                className="w-full h-full"
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="cast">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-white">Актори</h3>
                                <div className="grid gap-4">
                                    {movieData.cast.map((actor) => (
                                        <div key={actor.name} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium">{actor.name}</h4>
                                                <p className="text-white/60 text-sm">{actor.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-white">Знімальна група</h3>
                                <div className="grid gap-4">
                                    {movieData.crew.map((member) => (
                                        <div key={member.name} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium">{member.name}</h4>
                                                <p className="text-white/60 text-sm">{member.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="gallery">
                        <div className="grid grid-cols-3 gap-4">
                            {movieData.gallery.map((image, index) => (
                                <motion.img
                                    key={index}
                                    src={image}
                                    alt={`Scene ${index + 1}`}
                                    className="rounded-xl w-full aspect-video object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="reviews">
                        <div className="space-y-6">
                            {movieData.reviews.map((review, index) => (
                                <div key={index} className="bg-white/5 rounded-xl p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <h4 className="text-white font-medium">{review.author}</h4>
                                            <div className="flex items-center gap-1">
                                                <FiStar className="w-4 h-4 text-[rgb(195,187,175)]" />
                                                <span className="text-white/60">{review.rating}/5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-white/70">{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <BookingModal 
                isOpen={isBookingOpen} 
                onClose={() => setIsBookingOpen(false)}
                movieTitle={movieData.title}
            />
        </motion.div>
    );
};

export default MoviePage;
