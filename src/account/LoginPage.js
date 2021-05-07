import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { axios732, HTTP_OK } from "../utils/Macro";
// import { useCookies } from "react-cookie";
import { useHistory } from "react-router";

import { useState } from "react";
import { validEmail } from "./signup/validator";

const LoginPage = () => {
    const [enableSubmit, setEnableSubmit] = useState(false);
    const [validInputs, setValidInputs] = useState({ em: false, pd: false });
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    // const [cookies, setCookie] = useCookies("user");
    const history = useHistory();
    const APIPathAuth = "User/authernicate";
    const bodyKeys = {
        em: "email",
        pd: "password",
    };

    // const updateInputsValid = (field) => {
    //     var result = { ...validInputs, ...field };

    //     setValidInputs(result);
    //     setEnableSubmit(Boolean(result.em & result.pd));
    // }

    const updateUser = (field) => {
        setUser({ ...user, ...field });
    }

    const loginCallback = (status, errorMsg) => {
        if (status === HTTP_OK) {
            history.goBack();
        }

        setError(errorMsg);
    }

    const handleSubmit = () => {
        var body = {
            [bodyKeys.em]: user.em,
            [bodyKeys.pd]: user.pd,
        };
        axios732.post(APIPathAuth, body)
            .then(
                (res) => {
                    // setCookie('user', res, { path: "/" });
                    // console.log(cookies.user);
                    loginCallback(HTTP_OK);
                }

            )
            .catch(
                () => {
                    const msg = "Login Failed! Please check your Email or Password";
                    loginCallback("500", msg);
                }
            )

    }

    const EmailInputText = ({ updateUser }) => {
        const [email, setEmail] = useState("");
        const [emailValid, setEmailValid] = useState(true);
        const [htxt, setHtxt] = useState("");

        const handleEmailBlur = () => {
            var text = "";
            // var valid = validEmail(email);
            // if (valid) {
            //     updateUser({ em: email });
            // } else {
            //     text = email.length === 0 ? "This field is required" : "Email is not valid";
            // }

            // setEmailValid(valid);
            setHtxt(text);
        }

        return (
            <TextField
                variant="outlined"
                value={email}
                error={!emailValid}
                onBlur={handleEmailBlur}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                helperText={htxt}
            />
        );
    };

    const PasswordInputText = ({ updateUser, updateInputsValid }) => {
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false);

        const handlePswdChange = (e) => {
            setPassword(e.target.value);
            console.log(password);
            // var valid = password.length !== 0;
            // if (valid) {
            //     updateUser({ pw: password });
            // }
            // updateInputsValid({ pw: valid })
        }


        return (
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={handlePswdChange}
                    labelWidth={70}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toogle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        )


    }

    return (
        <div styles={{
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <h2>LOGIN</h2>
            <br />
            <label>Email</label>
            <br />
            <EmailInputText
                updateUser={updateUser}
    
            />
            <br />
            <label>Password</label>
            <br />
            <PasswordInputText
                updateUser={() => updateUser}
                // updateInputsValid={(valid) => {
                //     updateInputsValid(valid);
                // }}
            />
            <br />
            <p style={{ color: "red" }}>{error}</p>
            <p>Do not have an account yet?</p>
            <p>Forgot your password?</p>
            <Button onClick={() => handleSubmit}>Login</Button>
        </div>
    )

}

export default LoginPage;