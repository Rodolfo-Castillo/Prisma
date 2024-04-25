import axios from "axios";

const HTTP = axios.create({
    baseURL: import.meta.env.VITE_HOST_API,
});

HTTP.interceptors.request.use((request) => {
    const token = localStorage.getItem("token");
    if (token) request.headers.Authorization = `Bearer ${token}`;
    // console.log(request);
    return request;
});

HTTP.interceptors.response.use((response) => {
    return response;
});

export const HttpPost = async (url, params) => {
    try {
        const res = await HTTP.post(url, params).catch((error) => {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        return error.response;
    }
};

export const HttpGet = async (url, params) => {
    try {
        const res = await HTTP.get(url, params).catch((error) => {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        return error.response;
    }
};

export const HttpPut = async (url, params) => {
    try {
        const res = await HTTP.put(url, params).catch((error) => {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        return error.response;
    }
};

export const HttpDelete = async (url, params) => {
    try {
        const res = await HTTP.delete(url, params).catch((error) => {
            return {
                status: error.response.status,
                data: error.response.data,
            };
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        return error.response;
    }
};
