import { axios732, HTTP_OK } from "./HTTPHelper";

export default function TokenRefresher(user, callback) {
  axios732
    .post("/Users/refresh-token", {
      jwtToken: user.jwtToken,
      refreshToken: user.refreshToken,
    })
    .then((res) => {
      console.log("Token refreshed!");
      callback(HTTP_OK, res.data);
    })
    .catch((err) => {
      console.log("Refresh Token Failed: see log");
      callback(err.response);
    });
}
