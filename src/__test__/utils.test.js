import { validEmail, validPassword } from "../utils/validator";

describe("User input validator testing", () => {
  it("should return false if email invalid", () => {
    const emailInputs = ["123", "someone", "someone@gmail"];
    emailInputs.forEach((e) => {
      var result = validEmail(e);
      expect(result).toBeFalsy();
    });
  });

  it("should return ture if email valid", () => {
    const emailInputs = ["someone@gmail.com"];
    emailInputs.forEach((e) => {
      var result = validEmail(e);
      expect(result).toBeTruthy();
    });
  });

  const minPswdLength = 6;
  it("should return false if password does not meet requirements", () => {
    const pswdInputs = [
      "1234",
      "123456",
      "abcdef",
      "123abcdef",
      "123ABCdef",
      "1Ab!",
    ];
    pswdInputs.forEach((e) => {
      var result = validPassword(e, minPswdLength);
      expect(result.final).toBeFalsy();
    });
  });

  it("should return true if password meets requirements", () => {
    const pswdInputs = ["123Abc!", "12Ab!!"];
    pswdInputs.forEach((e) => {
      var result = validPassword(e, minPswdLength);
      expect(result.final).toBeTruthy();
    });
  });
});
