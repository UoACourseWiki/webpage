import { axios732, HTTP_OK } from "../../utils/Macro";

const APIPath = "Users/register";
const at = "acceptTerms"; // always true

const resigter = (user, callback) => {
  var body = user;
  body[at] = true;

  axios732.post(APIPath, user).then(
    () => {
      callback(HTTP_OK);
    },
    (err) => {
      const res = err.response;
      const errmsg = res.data.message;
      callback(res.status, errmsg);
    }
  );
};

export { resigter, HTTP_OK };
