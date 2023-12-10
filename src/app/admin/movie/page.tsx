import DetailAdmin from "@/components/admin/DetailAdmin";

export default function Movie({ params }: { params: { movieId: string } }) {
    return (
        <DetailAdmin movieId={params.movieId} />
    )
}