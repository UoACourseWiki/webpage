import { axios732 } from "../../utils/Macro";

const APIPath = "Users/register";
const at = "acceptTerms"; // always true

const HTTP_OK = 200;
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

export default resigter;
