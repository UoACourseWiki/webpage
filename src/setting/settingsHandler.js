import { axios732, HTTP_OK, errorMessage } from "../utils/HTTPHelper";
import { validEmail } from "../utils/validator";

function validate(user, callback) {
  var valid = true;
  var errmsg = "";
  if (((valid = validEmail(user.em)), !valid)) {
    errmsg = "Email not valid!";
  } else if (((valid = user.opd.length !== 0), !valid)) {
    errmsg = "Input your old password!";
  } else if (((valid = user.pd === user.cpd), !valid)) {
    errmsg = "Repeat password is not same!";
  }

  callback(valid, errmsg);
}

const bodyKeys = {
  nm: "nickName",
  opd: "oldPassword",
  em: "email",
  pd: "password",
  cpd: "confirmPassword",
};

const APIPath = "/Users";

const getCurrentUser = (user) => {
  const bearerString = "Bearer " + user.jwtToken;
  const tokenHeader = {
    headers: { Authorization: bearerString },
  };

  axios732
    .get(APIPath, tokenHeader)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Failed to get current user info");
      return user;
    });
};

const setInfo = (user, newUser, callback) => {
  const bearerString = "Bearer " + newUser.jwtToken;
  const tokenHeader = {
    headers: { Authorization: bearerString },
  };

  var body = {
    [bodyKeys.nm]: user.nm,
    [bodyKeys.opd]: user.opd,
    role: "", //leave empty
    [bodyKeys.em]: user.em,
    [bodyKeys.pd]: user.pd,
    [bodyKeys.cpd]: user.cpd,
  };

  const reqUrl = APIPath + "/" + newUser.id;
  axios732.put(reqUrl, body, tokenHeader).then(
    () => {
      callback(HTTP_OK);
    },
    (err) => {
      const res = err.response;
      const errmsg = errorMessage(err);
      callback(res.status, errmsg);
    }
  );
};

export { getCurrentUser, setInfo, validate };
