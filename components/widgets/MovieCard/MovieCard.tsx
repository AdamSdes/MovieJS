"use client"

import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FiPlay, FiStar, FiClock, FiCalendar, FiInfo } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

interface MovieCardProps {
  movie: {
    id: string;  // Make sure id is required
    title: string;
    image: string;
    rating: number;
    duration: string;
    genre: string;
    price: string;
  };
  viewMode?: 'grid' | 'list';
}

const MotionDiv = motion.div;
const MotionImage = motion.img;

const MovieCard: React.FC<MovieCardProps> = ({ movie, viewMode = 'grid' }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/movie/${movie.id}`);
  };

  const gridVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
        }
    },
    hover: {
        y: -5,
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
  };

  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
        }
    },
    hover: {
        scale: 1.01,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
  };

  if (viewMode === 'list') {
    return (
      <MotionDiv
        className="group relative backdrop-blur-xl overflow-hidden w-full cursor-pointer"
        variants={listVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onClick={handleNavigate}
      >
        <div className="flex gap-6 bg-black/20 rounded-2xl border border-white/[0.08] p-4">
          {/* Image */}
          <div className="relative w-[180px] rounded-xl overflow-hidden flex-shrink-0">
            <MotionImage
              src={movie.image}
              alt={movie.title}
              className="w-full h-[260px] object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <Badge className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white gap-1.5 py-1 px-2 rounded-lg">
              <FiStar className="w-3.5 h-3.5 text-[rgb(195,187,175)]" />
              {movie.rating}
            </Badge>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 justify-between py-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1.5">
                    <FiClock className="w-4 h-4" />
                    {movie.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="w-4 h-4" />
                    2024
                  </span>
                </div>
              </div>

              <p className="text-white/60 line-clamp-3">
                Опис фільму буде тут. Захоплююча історія про пригоди героя в неймовірному світі...
              </p>

              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/5 text-white/70">
                  {movie.genre}
                </Badge>
                <Badge variant="secondary" className="bg-white/5 text-white/70">
                  Пригоди
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.08]">
              <div className="space-y-0.5">
                <span className="text-sm text-white/40">Вартість квитка</span>
                <p className="text-lg font-semibold text-[rgb(195,187,175)]">{movie.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  className="bg-[rgb(195,187,175)] hover:bg-white/20 text-black font-medium rounded-xl transition-all duration-300 group"
                  onClick={(e) => {
                    e.stopPropagation(); // Предотвращаем навигацию при клике на кнопку
                    // Здесь логика бронирования
                  }}
                >
                  <FiPlay className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Забронювати
                </Button>
                <Button
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate();
                  }}
                >
                  <FiInfo className="w-5 h-5 mr-2" />
                  Детальніше
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>
    );
  }

  return (
    <MotionDiv
      className="group relative backdrop-blur-xl overflow-hidden w-full cursor-pointer"
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={handleNavigate}
    >
      {/* Image Container */}
      <div className="relative aspect-[6/7] overflow-hidden">
        <MotionImage
          src={movie.image}
          alt={movie.title}
          className="w-full rounded-[14px] h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 gap-3 p-4">
          <Button 
            className="bg-[rgb(195,187,175)] hover:bg-white/20 text-black font-medium rounded-xl transition-all duration-300 group"
            onClick={(e) => {
              e.stopPropagation();
              // Здесь логика бронирования
            }}
          >
            <FiPlay className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Забронювати
          </Button>
          <Button
            variant="outline"
            className="border-white/10 text-white hover:bg-white/5"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
          >
            <FiInfo className="w-5 h-5 mr-2" />
            Детальніше
          </Button>
        </div>

        {/* Badges */}
        <Badge className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white gap-1.5 py-1 px-2 rounded-lg">
          <FiStar className="w-3.5 h-3.5 text-[rgb(195,187,175)]" />
          {movie.rating}
        </Badge>
        <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white gap-1.5 py-1 px-2 rounded-lg">
          <FiClock className="w-3.5 h-3.5" />
          {movie.duration}
        </Badge>
      </div>

      {/* Content */}
      <div className="py-3 space-y-1.5">
        <h3 className="font-medium text-base text-white line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <div className="flex gap-2 text-white/60">
            {movie.genre}
            <p>/</p>
            {movie.price}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default MovieCard;