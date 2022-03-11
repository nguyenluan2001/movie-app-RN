import { axiosInstance } from "../utils/axios"

const useGenres = async(type) => {
    try {
        const movie = await axiosInstance.get(`/genre/${type}/list`)
        return movie.data;
    } catch (error) {
        return {message: error.message};
    }
}
export {useGenres};