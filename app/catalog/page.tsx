import Header from '@/components/widgets/Header/Header'
import MovieList from '@/components/widgets/MovieList/MovieList'

export default function CatalogPage() {
    return (
        <div className="relative min-h-screen bg-black/95 overflow-x-hidden">
            <Header />
            <MovieList />
        </div>
    )
}