import MovieDetail from "@/components/MovieDetail";

export default function Movie({ params }: { params: { movieId: string } }) {
    return (
        <MovieDetail movieId={params.movieId} />
    )
}