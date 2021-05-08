import { axios732, HTTP_OK } from "../utils/Macro";
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
      console.log("Failed to get current user info: ${err.response}");
      return user;
    });
};

const setInfo = (user, callback) => {
  var body = {
    [bodyKeys.nm]: user.nm,
    [bodyKeys.opd]: user.opd,
    role: "", //leave empty
    [bodyKeys.em]: user.em,
    [bodyKeys.pd]: user.pd,
    [bodyKeys.cpd]: user.cpd,
  };

  const reqUrl = APIPath + "/" + user.id;
  axios732.post(reqUrl, body).then(
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

// //
// useEffect(async () => {
//   try {
//     let _user = await TokenRefresher(_currentUser);
//     if (typeof _user !== "undefined") {
//       console.log(_user);
//       setCookie("user", _user, { path: "/" });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }, []);

export { getCurrentUser, setInfo, validate };
