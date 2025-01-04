import { exportAllMovies } from '../utils/exportMovies';
import { mockMovies } from '../data/mockMovies';

async function main() {
    // Экспортируем моковые данные
    await exportAllMovies(mockMovies);
}

main().catch(console.error);
