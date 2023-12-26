import { useState } from "react";
import { PropTypes } from "prop-types";
import DropdownMenuItem from "./DropDownMenuItem";

function DropdownMenu({
  dropdownItems,
  updateText,
  toggleDropdownMenu,
  shouldShow,
}) {
  const [items, setItems] = useState(dropdownItems);

  function changeSelectedButton(index) {
    const updatedDropdownItems = items.map((item, i) => {
      if (i === index) return { buttonText: item.buttonText, isSelected: true };
      else return { buttonText: item.buttonText, isSelected: false };
    });

    updateText(
      updatedDropdownItems.filter((item) => item.isSelected === true)[0]
        .buttonText
    );

    setItems(updatedDropdownItems);
  }

  return (
    <ul
      className={shouldShow ? "dropdown-menu" : "dropdown-menu--hidden"}
      role="list"
    >
      {items.map((item, index) => (
        <DropdownMenuItem
          key={index}
          buttonText={item.buttonText}
          isSelected={item.isSelected}
          index={index}
          setActive={changeSelectedButton}
          toggleDropdownMenu={toggleDropdownMenu}
        />
      ))}
    </ul>
  );
}

DropdownMenu.propTypes = {
  dropdownItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateText: PropTypes.func,
  toggleDropdownMenu: PropTypes.func.isRequired,
  shouldShow: PropTypes.bool.isRequired,
};

export default DropdownMenu;
