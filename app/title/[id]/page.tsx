import {fetchMovieById} from "@/data/api";
import Image from "next/image";

interface ContentDetailViewProps {
    params: { id: string };
}

export default async function ContentDetailView({params}: ContentDetailViewProps) {
    const movieId = params.id;
    const movie = await fetchMovieById(movieId);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            {/* Head Image */}
            <div className="w-full max-w-6xl">
                <Image
                    src="https://picsum.photos/1920/1080"
                    alt={movie.title}
                    width={1920}  // Define large image dimensions
                    height={1080}
                    className="w-full h-auto object-cover rounded-lg"
                />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-center mt-8">{movie.title}</h1>

            {/* Description */}
            <p className="text-lg text-center mt-4 max-w-2xl">{movie.description}</p>
        </div>
    );
}