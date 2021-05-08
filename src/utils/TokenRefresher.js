// import { useCookies } from "react-cookie";
import { axios732 } from "./Macro";

export default function TokenRefresher(user) {
    // const [cookies, setCookie] = useCookies(["user"]);

    // if (user == null) { return user };

    axios732.post(  "/Users/refresh-token", 
                    {
                        "jwtToken": user.jwtToken,
                        "refreshToken": user.refreshToken
                    }
    ).then(
        (res) => { 
                    console.log("token refreshed:" + res.data.jwtToken);
                    return res.data;
                }
    ).catch( (err) => {
        console.log("Refresh Token Failed: see log")
        return user
    } )


}
