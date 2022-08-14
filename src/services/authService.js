import axiosInstance from "../utils/axiosInstance";

export const getUserByIdService = async (userId) => {
    try {
        const respone = await axiosInstance({
            method: 'get',
            url: `user/${userId}`,
        })
        return respone
    } catch (error) {
        return error.response
    }
}