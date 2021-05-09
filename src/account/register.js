import { axios732, HTTP_OK, errorMessage } from "../utils/HTTPHelper";

const APIPath = "Users/register";
const bodyKeys = {
  nm: "nickName",
  em: "email",
  pd: "password",
  cpd: "confirmPassword",
  at: "acceptTerms",
};

const resigter = (user, callback) => {
  var body = {
    [bodyKeys.nm]: user.nm,
    [bodyKeys.em]: user.em,
    [bodyKeys.pd]: user.pd,
    [bodyKeys.cpd]: user.cpd,
    [bodyKeys.at]: user.at,
  };

  axios732.post(APIPath, body).then(
    () => {
      callback(HTTP_OK);
    },
    (err) => {
      const res = err.response;
      var errmsg = errorMessage(err);
      callback(res.status, errmsg);
    }
  );
};

export { resigter, HTTP_OK };
