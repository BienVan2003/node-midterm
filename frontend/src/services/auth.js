import axiosConfig from '../utils/axiosConfig';

export const apiLogin = (username, password) => {
    return axiosConfig.post("/api/auth/login", { username, password });
}

export const apiRegister = (username, password) => {
    return axiosConfig.post("/api/auth/register", { username, password });
}

export const apiGetAllUsers = (id) => {
    return axiosConfig.get(`/api/auth/allusers/${id}`);
}

export const apiLogOut = (id) => {
    return axiosConfig.get(`/api/auth/logout/${id}`);
}
