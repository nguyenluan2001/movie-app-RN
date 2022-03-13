import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
const initialState = {
    movieGenres: [],
    tvGenres: []
}
const genre = createSlice({
    name: 'genre',
    initialState,
    reducers:{
        getMovieGenres:(state, action) => {
            state.movieGenres =  action.payload;
        },
        getTVGenres:(state, action) => {
            state.tvGenres =  action.payload;
        }
    }
})
export const {getMovieGenres, getTVGenres} = genre.actions;
const fetchMovieGenre = () => async (dispatch) => {
    const genres = await axiosInstance.get("/genre/movie/list")
    // console.log(genres.data.genres)
    if(genres) {
        dispatch(getMovieGenres(genres.data.genres))
    } else {
        dispatch(getMovieGenres([]))
    }
}
const fetchTVGenre = () => async (dispatch) => {
    const genres = await axiosInstance.get("/genre/tv/list")
    if(genres) {
        dispatch(getTVGenres(genres.data.genres))
    } else {
        dispatch(getTVGenres([]))
    }
}
export {fetchMovieGenre, fetchTVGenre};
export default genre.reducer;