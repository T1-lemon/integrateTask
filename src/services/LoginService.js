import requestApi from '../utils/requestApi';

export const login = async (data) => {
    try {
        const respone = await requestApi({
            method: 'post',
            url: 'auth/login',
            data: {
                email: `${data.email}`,
                password: `${data.password}`,
            },
        })
        return respone
    } catch (error) {
        return error.response
    }
}

export const logout = async (userId) => {
    try {
        const respone = await requestApi({
            method: 'post',
            url: `auth/logout/${userId}`,
        })
        return respone
    } catch (error) {
        return error.response
    }
}