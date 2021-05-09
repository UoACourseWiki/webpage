// URL Path
const accountPath = "/account";
const signupPath = "/account/join";
const loginPath = "/account/login";
const loginAndRedirect = "/account/login?redir=";
const loginRedirectQueryKey = "redir";
const forgetPassword = "/account/password_reset";

const profilePath = "/setting";

const coursePathPrefix = "/course";
const subjectPath = "/course/:subject";
const coursePath = "/course/:subject/:courseId";
const emailValidatePath = "/email_validate";
const passwordReset = "/reset-password";

export {
  signupPath,
  loginPath,
  loginAndRedirect,
  loginRedirectQueryKey,
  accountPath,
  forgetPassword,
  coursePathPrefix,
  coursePath,
  subjectPath,
  profilePath,
  emailValidatePath,
  passwordReset,
};
