import { PropTypes } from "prop-types";
import { useState } from "react";
import useToggle from "../../hooks/useToggle";
import Button from "../atoms/button";
import DropdownMenu from "./Dropdown";
import { useContext } from "react";
import { Context } from "../../shared/context";
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/images/user.jpg";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";

const SuggestionsHeader = ({ getSortByCriteria, sharedProps }) => {
  const toggler = useToggle();
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);

  const dropdownMenuItems = [
    { buttonText: "Most Upvotes", isSelected: true },
    { buttonText: "Least Upvotes", isSelected: false },
    { buttonText: "Most Comments", isSelected: false },
    { buttonText: "Least Comments", isSelected: false },
  ];

  const [buttonText, setButtonText] = useState(dropdownMenuItems[0].buttonText);

  function changeButtonText(text) {
    getSortByCriteria(text);

    setButtonText(text);
  }

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const auth = getAuth();
      await signOut(auth);
      toast.success("Logged out done");

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="suggestions__header">
      <div className="suggestions__header-content container">
        <div className="suggestions__header-info">
          <div className="suggestions__header-container">
            <p className="suggestions__header-filter">
              Sort by :
              <button
                type="button"
                className="suggestions__header-sort button"
                onClick={() => toggler.toggleComponent(true)}
              >
                <span className="suggestions__header-button-text">
                  {buttonText}
                </span>
                <svg
                  width="10"
                  height="7"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    fill="none"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </p>

            <DropdownMenu
              dropdownItems={dropdownMenuItems}
              updateText={changeButtonText}
              toggleDropdownMenu={toggler.toggleComponent}
              shouldShow={toggler.shouldShowComponent}
            />
          </div>
        </div>

        <div
          className="suggestions__header"
          style={{ display: "flex", gap: "1rem" }}
        >
          <div className="userAction">
            {user ? (
              <div style={{ display: "flex", gap: "1rem" }}>
                <img
                  src={user.photoURL ? user.photoURL : userImg}
                  alt={`${user.displayName}'s headshot`}
                  className="comment__user-img"
                  onClick={() => navigate("/my-profile")}
                  width={45}
                  style={{ borderRadius: "50%", cursor: "pointer" }}
                />
                <button
                  className={"button button--main button--delete"}
                  onClick={handleLogout}
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : (
              <Button
                className={"button--add-feedback"}
                text={"Sign In"}
                isLink={true}
                toggleEditPage={sharedProps.toggleIsEditing}
                btnLinkParam={"/login"}
              />
            )}
          </div>
          <div className="suggestions__header-button-container">
            <Button
              className={"button--add-feedback"}
              icon={
                <svg
                  width="9"
                  height="9"
                  xmlns="http://www.w3.org/2000/svg"
                  className="feedback-button-svg"
                  aria-hidden="true"
                >
                  <text
                    transform="translate(-24 -20)"
                    fill="#F2F4FE"
                    fillRule="evenodd"
                    fontFamily="Jost-Bold, Jost"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    <tspan x="24" y="27.5">
                      +
                    </tspan>
                  </text>
                </svg>
              }
              text={"Add Feedback"}
              isLink={true}
              toggleEditPage={sharedProps.toggleIsEditing}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

SuggestionsHeader.propTypes = {
  getSortByCriteria: PropTypes.func.isRequired,
  sharedProps: PropTypes.object,
};

export default SuggestionsHeader;
