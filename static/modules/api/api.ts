const BASE_URL = "https://ya-praktikum.tech/api/v2";

export const API = {
    getUser: `${BASE_URL}/auth/user`,
    getChats: `${BASE_URL}/chats`,
    signIn: `${BASE_URL}/auth/signin`,
    signUp: `${BASE_URL}/auth/signup`,
    logOut: `${BASE_URL}/auth/logout`,
    updProfile: `${BASE_URL}/user/profile`,
    changePsw: `${BASE_URL}/user/password`,
    createChat: `${BASE_URL}/chats`,
    findUser: `${BASE_URL}/user/search`,
    getChatUsers: (id: string) => `${BASE_URL}/chats/${id}/users`,
    findUsers: `${BASE_URL}/user/search`,
    addUsers: `${BASE_URL}/chats/users`,
    deleteUsers: `${BASE_URL}/chats/users`,
    uploadAvatar: `${BASE_URL}/user/profile/avatar`
}