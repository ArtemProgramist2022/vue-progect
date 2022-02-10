import axios from "axios"

export const getUsers = (offset = 0) => {
    return axios.get(`https://test.relabs.ru/api/users/list?limit=${5}&offset=${offset*5}`)
}