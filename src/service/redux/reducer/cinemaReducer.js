import { GET_ALL_CINEMA, GET_ALL_GROUP_CINEMA } from "../constant/constant";


const initialState = {
    listCinema: [],
    listGroupCinema: [],
}

const cinemaReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_CINEMA:
            return { ...state, listCinema: [...payload] }
        case GET_ALL_GROUP_CINEMA:
            return { ...state, listGroupCinema: [...payload] }
        default:
            return state
    }
}


export default cinemaReducer;