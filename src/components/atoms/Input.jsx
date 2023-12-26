import { PropTypes } from "prop-types";

function Input({
  id,
  inputType,
  inputName,
  inputValue,
  isRequired,
  handleOnChange,
  showValidationMessage,
}) {
  return (
    <input
      required={isRequired}
      className={showValidationMessage ? "input--error" : "input"}
      type={`${inputType}`}
      name={`${inputName}`}
      id={`${id}`}
      value={inputValue}
      onChange={(e) => handleOnChange(e.target)}
    />
  );
}

Input.defaultProps = {
  isRequired: false,
  showValidationMessage: false,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  handleOnChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  showValidationMessage: PropTypes.bool,
};

export default Input;
