import axios from "axios";

import { baseApi } from "../config/api";

const addAccount = async (full_name, email, password) => {
    const addAccountApi = `${baseApi}/account/add`;
    const res = await axios.post(addAccountApi, {
        email: email,
        password: password,
        full_name: full_name,
    });
    const result = res.data;

    return result;
};

const checkExistEmail = async (email) => {
    if (!email) return false;
    const checkExistAccountApi = `${baseApi}/account/isExist/email/${email}`;
    const res = await axios.get(checkExistAccountApi);
    const result = res.data;
    console.log("checkExistAccountApi: ", result);
    return result;
};

export { addAccount, checkExistEmail };
