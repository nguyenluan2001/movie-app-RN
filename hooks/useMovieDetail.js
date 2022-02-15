import { axiosInstance } from "../utils/axios"

const useMovieDetail = async(movieId) => {
    try {
        const movie = await axiosInstance.get(`/movie/${movieId}`)
        return movie.data;
    } catch (error) {
        return {message: error.message};
    }
}
export {useMovieDetail};