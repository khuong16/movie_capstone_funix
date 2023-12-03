import { getLocaleStorage } from "../../../base/base";
import { SET_USER } from "../constant/constant";
const initialState = {
    user: {
        taiKhoan: getLocaleStorage("User")?.taiKhoan,
    },
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USER: return { ...state, user: { ...payload } }
        default:
            return state
    }
}


export default userReducer;