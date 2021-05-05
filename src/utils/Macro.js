import axios from "axios";

const axios732 = axios.create({ baseURL: process.env.REACT_APP_API_BASEURL });
const HTTP_OK = 200;

export { axios732, HTTP_OK };
