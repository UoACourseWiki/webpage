// URL Path
const accountPath = "/account";
const signupPath = "/account/join";
const loginPath = "/account/login";
const loginAndRedirect = "/account/login?redir=";
const loginRedirectQueryKey = "redir";

const emailValidatePath = "/email_validate";
const forgetPswdPath = "/forget_password";
const resetPswdPath = "/reset";

const profilePath = "/setting";

const coursePathPrefix = "/course";
const subjectPath = "/course/:subject";
const coursePath = "/course/:subject/:courseId";

export {
  signupPath,
  loginPath,
  loginAndRedirect,
  loginRedirectQueryKey,
  accountPath,
  forgetPswdPath,
  coursePathPrefix,
  coursePath,
  subjectPath,
  profilePath,
  emailValidatePath,
  resetPswdPath,
};
