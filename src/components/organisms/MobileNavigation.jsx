import { PropTypes } from "prop-types";

import AppInfo from "./AppInfo";
import MobileSideMenu from "../molecules/MobileSideMenu";

const MobileNavigation = ({
  isMobileScreen,
  showHideSideMenu,
  getActiveTag,
  feedbackItems,
  mobileSideMenuOpen,
}) => {
  return (
    <>
      <AppInfo
        isMobileScreen={isMobileScreen}
        showHideSideMenu={showHideSideMenu}
      />

      <MobileSideMenu
        getActiveTag={getActiveTag}
        feedbackItems={feedbackItems}
        mobileSideMenuOpen={mobileSideMenuOpen}
      />
    </>
  );
};

MobileNavigation.defaultProps = { shouldShowSideMenu: false };

MobileNavigation.propTypes = {
  isMobileScreen: PropTypes.bool,
  showHideSideMenu: PropTypes.func,
  getActiveTag: PropTypes.func,
  feedbackItems: PropTypes.arrayOf(PropTypes.object),
  mobileSideMenuOpen: PropTypes.bool,
};

export default MobileNavigation;
