

import { UserActions, SAVE_USER_INFO, CLEAR_USER_INFO } from "../actions/userActions";


interface UserState {
    userName: string;
    phoneNumber: string;
    email:string;
    //saveForFuture: boolean;
    walletAddress:string;
}

const initialState: UserState = {
    userName: '',
    phoneNumber: '',
    email: '',
    //saveForFuture: false,
    walletAddress: '',
};

export const userReducer = (state = initialState, action: UserActions): UserState => {
    switch (action.type) {
        case SAVE_USER_INFO:
            return {
                ...state,
                ...action.payload,
                //saveForFuture: true
            };
        //case CLEAR_USER_INFO:
        //    return initialState;
        default:
            return state;
    }
}