// import { useCookies } from "react-cookie";
import { axios732 } from "./Macro";

export default async function TokenRefresher(jToken, rToken) {
    // const [cookies, setCookie] = useCookies(["user"]);

    // if (user == null) { return user };

    axios732.post(  "/Users/refresh-token", 
                    {
                        "jwtToken": jToken,
                        "refreshToken": rToken
                    }
    ).then(
        (res) => { 
                    console.log("token refreshed:" + res.data.jwtToken)
                    // setCookie("user", res.data, { path:"/" })
                    return res.data.jwtToken
                }
    ).catch( (err) => {
        console.log("Refresh Token Failed: err.response")
        throw err
    } )
}
