

// actions/userActions.ts
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';


interface UserInfo {
    userName: string,
    phoneNumber: string,
    email:string;
}

interface SaveUserInfoAction {
    type: typeof SAVE_USER_INFO;
    payload: UserInfo;
}

interface ClearUserInfoAction {
    type: typeof CLEAR_USER_INFO;
}


export type UserActions = SaveUserInfoAction | ClearUserInfoAction;

export const saveUserInfo = (userInfo: UserInfo): SaveUserInfoAction => ({
    type: SAVE_USER_INFO,
    payload: userInfo
});

export const clearUserInfo = (): ClearUserInfoAction => ({
    type:CLEAR_USER_INFO
})