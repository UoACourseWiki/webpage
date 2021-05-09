import axios from "axios";

const axios732 = axios.create({ baseURL: process.env.REACT_APP_API_BASEURL });
const HTTP_OK = 200;

function errorMessage(responseError) {
  var errmsg = undefined;
  if (responseError !== undefined) {
    const res = responseError.response;
    if (res !== undefined && res.data !== undefined) {
      errmsg = res.data.message;
    }
  }

  if (errmsg === undefined) {
    errmsg = "Sorry, Unknown Error please try again!";
  }

  return errmsg;
}

export { axios732, HTTP_OK, errorMessage };
