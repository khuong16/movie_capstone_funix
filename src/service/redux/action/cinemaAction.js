import { cinemaAPI } from "../../axios/api"
import { GET_ALL_CINEMA, GET_ALL_GROUP_CINEMA } from "../constant/constant"

export const setAllCinemaAction = () => {
    return (dispatch) => {
        try {
            cinemaAPI.getAllCinema().then(res => {
                dispatch({
                    type: GET_ALL_CINEMA,
                    payload: res?.data.content,
                })
            })

        } catch (error) {
            console.log(error);
        }
    }
}

export const setAllGroupCinemaAction = (maHeThongRap) => {
    return (dispatch) => {
        try {
            cinemaAPI.getAllGroupCinema(maHeThongRap)
                .then(res => {
                    dispatch({
                        type: GET_ALL_GROUP_CINEMA,
                        payload: res?.data.content,
                    })
                })

        } catch (error) {
            console.log(error);
        }
    }
}