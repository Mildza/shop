const REQUIRE_TYPE = "REQUIRE";
const MINLENGTH_TYPE = "MINLENGTH";
const MAXLENGTH_TYPE = "MAXLENGTH";
const MIN_TYPE = "MIN";
const MAX_TYPE = "MAX";
const EMAILE_TYPE = "EMAIL";
const PASSWORD_MATCH = "PASSWORD_MATCH";

export const VALIDATOR_REQUIRE = () => ({ type: REQUIRE_TYPE });
export const VALIDATOR_MINLENGTH = val => ({
  type: MINLENGTH_TYPE,
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: MAXLENGTH_TYPE,
  val: val
});
export const VALIDATOR_MIN = val => ({ type: MIN_TYPE, val: val });
export const VALIDATOR_MAX = val => ({ type: MAX_TYPE, val: val });
export const VALIDATOR_EMAIL = () => ({ type: EMAILE_TYPE });
export const VALIDATOR_PASSWORD = email => ({
  type: PASSWORD_MATCH,
  val: email
});

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === REQUIRE_TYPE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === MINLENGTH_TYPE) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === MAXLENGTH_TYPE) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === MIN_TYPE) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === MAX_TYPE) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === EMAILE_TYPE) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === PASSWORD_MATCH) {
      isValid = isValid && value === validator.val;
      console.log("password: " + validator.val);
    }
  }
  return isValid;
};
