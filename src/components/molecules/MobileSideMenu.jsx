import { PropTypes } from "prop-types";
import Tags from "../organisms/Tags";

const MobileSideMenu = ({ getActiveTag, mobileSideMenuOpen }) => {
  return (
    <div
      className={
        mobileSideMenuOpen ? "mobile-side-menu" : "mobile-side-menu--hidden"
      }
      data-testid="mobile-side-menu"
    >
      <Tags getActiveTag={getActiveTag} />
    </div>
  );
};

MobileSideMenu.propTypes = {
  getActiveTag: PropTypes.func,
  mobileSideMenuOpen: PropTypes.bool,
};

export default MobileSideMenu;
