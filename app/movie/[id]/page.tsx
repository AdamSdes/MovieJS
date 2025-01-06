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
        "data:image/jpeg;base64,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",
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
