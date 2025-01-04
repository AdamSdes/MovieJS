import fs from 'fs';
import path from 'path';

// Интерфейс для данных о фильме
interface MovieData {
    id: string;
    title: string;
    originalTitle?: string;
    rating?: number;
    ratings?: {
        imdb?: number;
        rottenTomatoes?: string;
        metacritic?: number;
    };
    duration?: string;
    year?: number;
    releaseDate?: string;
    ageRating?: string;
    budget?: string;
    boxOffice?: string;
    languages?: string[];
    subtitles?: string[];
    trailerUrl?: string;
    genres?: string[];
    description?: string;
    plot?: string;
    cast?: Array<{ name: string; role: string }>;
    crew?: Array<{ name: string; role: string }>;
    gallery?: string[];
    reviews?: Array<{
        author: string;
        rating: number;
        text: string;
    }>;
    image?: string;
    price?: string;
}

export const exportMovieToJson = async (movieData: MovieData) => {
    try {
        // Создаем директорию data, если она не существует
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }

        // Создаем файл для фильма
        const filePath = path.join(dataDir, `${movieData.id}.json`);
        
        // Записываем данные в файл
        await fs.promises.writeFile(
            filePath,
            JSON.stringify(movieData, null, 2),
            'utf-8'
        );

        console.log(`Данные фильма "${movieData.title}" успешно экспортированы в ${filePath}`);
        return true;
    } catch (error) {
        console.error('Ошибка при экспорте данных фильма:', error);
        return false;
    }
};

export const exportAllMovies = async (movies: MovieData[]) => {
    try {
        // Создаем директорию data, если она не существует
        const dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }

        // Экспортируем каждый фильм
        const results = await Promise.all(
            movies.map(movie => exportMovieToJson(movie))
        );

        // Создаем индексный файл со списком всех фильмов
        const moviesList = movies.map(({ id, title, image, rating, genres }) => ({
            id,
            title,
            image,
            rating,
            genres
        }));

        await fs.promises.writeFile(
            path.join(dataDir, 'movies-index.json'),
            JSON.stringify(moviesList, null, 2),
            'utf-8'
        );

        console.log('Все фильмы успешно экспортированы');
        return true;
    } catch (error) {
        console.error('Ошибка при экспорте всех фильмов:', error);
        return false;
    }
};
