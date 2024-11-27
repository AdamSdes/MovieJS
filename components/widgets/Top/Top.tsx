"use client"

import * as React from "react"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

// Список фильмов с данными
const movies = [
    {
        year: "2021",
        duration: "2 ч 28 мин",
        title: "Людина-павук: Немає шляху додому",
        genre: "Боевик / Научная фантастика",
        price: "300 грн",
        image: "/peakpx.jpg"
    },
    {
        year: "2022",
        duration: "3 ч 1 мин",
        title: "Аватар: Путь воды",
        genre: "Фэнтези / Приключения",
        price: "350 грн",
        image: "https://vkplay.ru/hotbox/content_files/news/2022/04/21/f2908b73885049118001c6fe23b8cc62.jpg"
    },
    {
        year: "2019",
        duration: "2 ч 32 мин",
        title: "Мстители: Финал",
        genre: "Боевик / Фантастика",
        price: "400 грн",
        image: "https://cdn.forbes.ru/files/story_images/ae-ms-twitter-moments-05.jpg__1563701577__63799.jpg"
    }
];

const TopFilm = () => {
    const [currentMovieIndex, setCurrentMovieIndex] = React.useState(0);
    const [isFading, setIsFading] = React.useState(false); // Управление анимацией
    const [animationKey, setAnimationKey] = React.useState(0); // Для сброса анимации прогресса

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true); // Начало анимации исчезновения
            setTimeout(() => {
                setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length); // Смена фильма
                setAnimationKey((prevKey) => prevKey + 1); // Перезапуск прогресса
                setIsFading(false); // Конец анимации появления
            }, 1000); // Продолжительность анимации исчезновения
        }, 6000); // Общая продолжительность (5 секунд + 1 секунда на анимацию)

        return () => clearInterval(interval);
    }, []);

    const currentMovie = movies[currentMovieIndex];

    return (
        <div>
            <div
                className="mx-auto h-[800px] bg-center bg-cover mb-60 transition-opacity duration-1000"
                style={{
                    backgroundImage: `url(${currentMovie.image})`,
                    opacity: isFading ? 0 : 1 // Плавный переход фона
                }}
            >
                <div className="bg-gradient-to-b from-black/90 via-black/20 to-black w-full h-full">
                    <div className="container mx-auto flex h-full items-end pb-[60px]">
                        <div className="flex w-full items-end justify-between">
                            <div
                                className={`flex flex-col gap-10 transition-opacity duration-1000 ${
                                    isFading ? "opacity-0" : "opacity-100"
                                }`}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <Badge className='p-2 rounded-full bg-white/5 text-white/60'>
                                            {currentMovie.year}
                                        </Badge>
                                        <Badge className='p-2 rounded-full bg-white/5 text-white/60'>
                                            {currentMovie.duration}
                                        </Badge>
                                    </div>
                                    <p className='text-[36px] font-bold'>{currentMovie.title}</p>
                                    <p className='opacity-80'>{currentMovie.genre}</p>
                                </div>
                                <div className="flex gap-5 items-center">
                                    <Button className='w-fit px-10 py-7 rounded-[12px] font-semibold '>
                                        Забронювати мiсце
                                    </Button>
                                    <div className="flex flex-col">
                                        <p className='text-[13px] opacity-70'>Вартiсть</p>
                                        <p className='text-[20px] font-bold'>{currentMovie.price}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-fit flex flex-col gap-5">
                                <div className="w-[260px] h-[5px] bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        key={animationKey} // Перезапуск анимации
                                        className="h-full bg-white/60 animate-fill"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopFilm;
