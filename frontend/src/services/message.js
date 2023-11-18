import axiosConfig from '../utils/axiosConfig';

export const apiAddMessage = (from, to, message) => {
    return axiosConfig.post("/api/messages/addmsg", { from, to, message });
}

export const apiGetMessages = (from, to) => {
    return axiosConfig.post("/api/messages/getmsg", { from, to });
}
