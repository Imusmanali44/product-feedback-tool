import { PropTypes } from "prop-types";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import DropdownMenu from "./Dropdown";
import useToggle from "../../hooks/useToggle";
import TextArea from "../atoms/Textarea";

const InputGroup = ({
  labelText,
  inputId,
  inputType,
  inputName,
  inputValue,
  isRequired,
  handleOnChange,
  showValidationMessage,
  hasDropdown,
  dropdownItemType,
  updateReadOnlyValue,
  isTextArea,
}) => {
  let dropdownMenuItems;

  const toggler = useToggle();

  if (dropdownItemType && dropdownItemType.toLowerCase() === "category") {
    dropdownMenuItems = [
      { buttonText: "Feature", isSelected: true },
      { buttonText: "UI", isSelected: false },
      { buttonText: "UX", isSelected: false },
      { buttonText: "Enhancement", isSelected: false },
      { buttonText: "Bug", isSelected: false },
    ];
  } else if (dropdownItemType && dropdownItemType.toLowerCase() === "status") {
    dropdownMenuItems = [
      { buttonText: "Suggestion", isSelected: true },
      { buttonText: "Planned", isSelected: false },
      { buttonText: "In Progress", isSelected: false },
      { buttonText: "Live", isSelected: false },
    ];
  } else {
    dropdownMenuItems = [
      { buttonText: "Feature", isSelected: true },
      { buttonText: "UI", isSelected: false },
      { buttonText: "UX", isSelected: false },
      { buttonText: "Enhancement", isSelected: false },
      { buttonText: "Bug", isSelected: false },
    ];
  }

  function changeInputValue(value) {
    updateReadOnlyValue(inputName, value);
  }

  return (
    <div className="input-group">
      <Label className={"input-label"} element={"label"}>
        {labelText}
      </Label>
      {hasDropdown ? (
        <div className="input--dropdown" data-testid="input-with-dropdown">
          <input
            readOnly
            required={isRequired}
            className={showValidationMessage ? "input--error" : "input"}
            type={`${inputType}`}
            name={`${inputName}`}
            id={`${inputId}`}
            value={inputValue}
            onChange={(e) => handleOnChange(e.target)}
          />

          <button
            type="button"
            className="input__dropdown-toggle button"
            onClick={() => toggler.toggleComponent(true)}
            aria-label="Open dropdown"
          >
            <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1l4 4 4-4"
                stroke="#4661E6"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>

          <DropdownMenu
            dropdownItems={dropdownMenuItems}
            updateText={changeInputValue}
            toggleDropdownMenu={toggler.toggleComponent}
            shouldShow={toggler.shouldShowComponent}
          />
        </div>
      ) : isTextArea ? (
        <TextArea
          isRequired={isRequired}
          name={inputName}
          id={inputId}
          value={inputValue}
          handleOnChange={handleOnChange}
          showValidationMessage={showValidationMessage}
        />
      ) : (
        <Input
          id={inputId}
          inputType={inputType}
          inputName={inputName}
          inputValue={inputValue}
          isRequired={isRequired}
          handleOnChange={handleOnChange}
          showValidationMessage={showValidationMessage}
        />
      )}

      {showValidationMessage && (
        <div
          className={
            showValidationMessage
              ? "validation-text-wrap"
              : "validation-text-wrap-hidden"
          }
        >
          <p className="validation-message">{"Can't be empty"}</p>
        </div>
      )}
    </div>
  );
};

InputGroup.defaultProps = {
  isRequired: false,
  showValidationMessage: false,
};

InputGroup.propTypes = {
  labelText: PropTypes.node,
  inputId: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  handleOnChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  showValidationMessage: PropTypes.bool,
  hasDropdown: PropTypes.bool,
  dropdownItemType: PropTypes.string,
  updateReadOnlyValue: PropTypes.func,
  isTextArea: PropTypes.bool,
};

export default InputGroup;
