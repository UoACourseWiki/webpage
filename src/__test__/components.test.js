import { render } from "@testing-library/react";
import LoginPage from "../account/view/LoginPage";
import SignupPage from "../account/view/SignupPage";
import SubjectView from "../course/subjectView";
import SettingsPage from "../setting/SettingsPage";
import EmailValidate from "../users/EmailValidate";
import ForgetPasswordPage from "../users/view/ForgetPasswordPage";
import ResetPasswordPage from "../users/view/ResetPasswordPage";

const mockCourseData = [
  {
    catalogNbr: "350",
    subject: "COMPSCI",
    title: "Mathemtcl Foundtns of Comp Sci",
  },
];

describe("Pages render test", () => {
  it("should show login components", () => {
    const pageTitle = "Log in to CourseWiki";

    const { getByText } = render(<LoginPage />);
    const element = getByText(pageTitle);

    expect(element).toBeTruthy();
  });

  it("should show sign up components", () => {
    const pageTitle = "Sign up to CourseWiki";

    const { getByText } = render(<SignupPage />);
    const element = getByText(pageTitle);

    expect(element).toBeTruthy();
  });

  it("should show subject components", () => {
    const pageTitle = "All courses";

    const { getByText } = render(<SubjectView courses={mockCourseData} />);
    const element = getByText(pageTitle);

    expect(element).toBeTruthy();
  });

  it("should show notfound when no courses in subject page", () => {
    const buttonText = "Back to Home";

    const cs = [];
    const { getByText } = render(<SubjectView courses={cs} />);
    const element = getByText(buttonText);
    expect(element).toBeTruthy();
  });

  it("should show settings components", () => {
    const pageTitle = "Change your account settings";

    const { getByText } = render(
      <SettingsPage currentUser={{ email: "test@gmail.com" }} />
    );
    const element = getByText(pageTitle);

    expect(element).toBeTruthy();
  });

  it("should show email validate components", () => {
    const pageTitle = "Email Verify";

    const { getByText } = render(<EmailValidate />);
    const element = getByText(pageTitle);

    expect(element).toBeTruthy();
  });

  it("should show forget password components", () => {
    const pageTitle = "Reset your password";

    const { getByText } = render(<ForgetPasswordPage />);
    const element = getByText(pageTitle);

    expect(element).toBeTruthy();
  });

  it("should show reset password components", () => {
    const pageTitle = "Reset your password";

    const { getByText } = render(<ResetPasswordPage />);
    const element = getByText(pageTitle);

    expect(element).toBeTruthy();
  });
});
