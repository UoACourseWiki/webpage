const validEmail = (email) => {
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  return pattern.test(email);
};

const validPassword = (passwd, miniLength) => {
  // validate lowercase & uppercase letters
  const letters = new RegExp(/[a-z].*[A-Z]|[A-Z].*[a-z]/g);
  var ltr = letters.test(passwd);

  // validate numbers
  const numbers = new RegExp(/[0-9]/g);
  var nbr = numbers.test(passwd);

  // validate symbol
  const symbol = new RegExp(/[\p{P}]/u);
  var smb = symbol.test(passwd);

  var lgth = passwd.length >= miniLength;

  var result = {
    letter: ltr,
    number: nbr,
    symbol: smb,
    length: lgth,
    final: Boolean(ltr & nbr & smb & lgth),
  };

  return result;
};

export { validEmail, validPassword };
