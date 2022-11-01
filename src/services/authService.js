import axios from "axios";

import { baseApi } from "../config/api";

const login = async (email, password) => {
    const loginApi = `${baseApi}/auth/login`;
    const res = await axios.post(loginApi, {
        email: email,
        password: password,
    });
    const result = res.data;
    console.log("login: ", result);

    return result;
};

const logout = async () => {
    const logoutApi = `${baseApi}/auth/logout`;

    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = `Beaer ${token}`;

        return config;
    });
    const res = await axios.post(logoutApi);
    const result = res.data;
    console.log("logout: ", result);

    return result;
};

const getCurrentAccount = async () => {
    console.log("baseApi: ", baseApi);
    const getCurrentAccountApi = `${baseApi}/auth/getCurrentAccount`;
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        config.headers.Authorization = `Beaer ${token}`;

        return config;
    });
    const res = await axios.get(getCurrentAccountApi);
    const result = res.data;
    console.log("current account: ", result);
    return result;
};

export { login, logout, getCurrentAccount };
