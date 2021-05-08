import { loginPath } from "../utils/URLPath";
import { useCookies } from "react-cookie";

export default function Auth() {
  const [cookies, , removeCookie] = useCookies(["user"]);
  const status = cookies.user !== undefined;

  const text = status ? "Logout" : "Login";
  const action = (lged) => {
    if (lged) {
      // logout
      removeCookie("user", { path: "/" });
      window.location.reload();
    } else {
      // redirect to login page
      window.location.href = loginPath;
    }
  };

  return [status, text, action];
}
