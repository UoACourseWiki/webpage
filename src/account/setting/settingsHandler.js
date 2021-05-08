import { axios732, HTTP_OK } from "../../utils/Macro";

const APIURL = "Users";
const bodyKeys = {
    nm: "nickName",
    opd: "oldPassword",
    em: "email",
    pd: "password",
    cpd: "confirmPassword",
}

const getCurrentUser = (user) => {
    const bearerString = "Bearer " + user.jwtToken;
    const tokenHeader = {
        headers: { Authorization: bearerString }
    };

    axios732.get(APIURL, tokenHeader)
        .then((res) => { return res.data })
        .catch((err) => {
            console.log("Failed to get current user info: ${err.response}");
            return user
        })
}

const settingsHandler = (user, callback) => {
    if (user.pd.length == 0 && user.cpd.length == 0){ 
        var body = {
            [bodyKeys.nm]: user.nm,
            [bodyKeys.opd]: user.opd,
            "role": "", //leave empty
            [bodyKeys.em]: user.em,
            [bodyKeys.pd]: user.opd,
            [bodyKeys.cpd]: user.opd,
        };
    } else {
        var body = {
            [bodyKeys.nm]: user.nm,
            [bodyKeys.opd]: user.opd,
            "role": "", //leave empty
            [bodyKeys.em]: user.em,
            [bodyKeys.pd]: user.pd,
            [bodyKeys.cpd]: user.cpd,
        };
    }

    const APIPath = "Users/" + user.id; 

    axios732.post(APIPath, body).then(
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



export { getCurrentUser, settingsHandler };