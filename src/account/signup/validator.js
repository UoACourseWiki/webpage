const validEmail = (email) => {
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  return pattern.test(email);
};

const validPassword = (input, miniLength) => {
  // Validate lowercase letters
  const lowerCaseLetters = new RegExp(/[a-z]/g);
  var ltr = lowerCaseLetters.test(input);

  // Validate capital letters
  const upperCaseLetters = new RegExp(/[A-Z]/g);
  var uclr = upperCaseLetters.test(input);

  // Validate numbers
  const numbers = new RegExp(/[0-9]/g);
  var nbr = numbers.test(input);

  var lgth = input.length >= miniLength;

  var result = {
    letter: ltr,
    capital: uclr,
    number: nbr,
    length: lgth,
    final: Boolean(ltr & uclr & nbr & lgth),
  };

  return result;
};

export { validEmail, validPassword };
