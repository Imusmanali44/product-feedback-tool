import { PropTypes } from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Button({
  text,
  className,
  icon,
  type,
  isLink,
  toggleEditPage,
  isLoading,
  btnLinkParam,
}) {
  const navigate = useNavigate();

  let linkDestination;

  switch (className) {
    case "button--add-feedback":
      linkDestination = "/add-feedback";
      break;

    case "button--edit-feedback":
      linkDestination = btnLinkParam;
      break;

    default:
      linkDestination = btnLinkParam ? btnLinkParam : "/";
      break;
  }

  function handleButtonClick(target) {
    if (target.classList.contains("button--cancel")) navigate(-1);

    return;
  }

  function handleLinkClick(target) {
    if (target.getAttribute("href") === btnLinkParam) toggleEditPage(true);
    else toggleEditPage(false);
  }

  return (
    <>
      {isLink ? (
        <Link
          to={linkDestination}
          className={
            className
              ? `${className} button button--main`
              : "button button--main"
          }
          onClick={(e) => handleLinkClick(e.target)}
        >
          {icon}
          {text}
        </Link>
      ) : (
        <button
          disabled={isLoading}
          type={`${type}`}
          className={
            className
              ? `${className} button button--main`
              : "button button--main"
          }
          onClick={(e) => handleButtonClick(e.target)}
        >
          {isLoading ? (
            <Loader
              style={{ width: "20px", height: "20px", borderWidth: "2px" }}
            />
          ) : (
            <>
              {icon}
              {text}
            </>
          )}
        </button>
      )}
    </>
  );
}

Button.defaultProps = {
  type: "button",
  isLink: false,
  isLoading: false,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.node,
  isLink: PropTypes.bool,
  toggleEditPage: PropTypes.func,
  isLoading: PropTypes.bool,
  btnLinkParam: PropTypes.string,
};

export default Button;
