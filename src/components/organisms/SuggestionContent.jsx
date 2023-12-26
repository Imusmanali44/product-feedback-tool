import { PropTypes } from "prop-types";

import SuggestionsHeader from "../molecules/SuggestionsHeader";
import SuggestionsMain from "../molecules/SuggestionsMain";

const SuggestionsContent = ({
  feedbackItems,
  getSortByCriteria,
  getSelectedFeedbackItemId,
  sharedProps,
  mobileSideMenuOpen,
}) => {
  return (
    <div
      className={
        mobileSideMenuOpen
          ? "suggestions__content--dark"
          : "suggestions__content"
      }
    >
      <SuggestionsHeader
        getSortByCriteria={getSortByCriteria}
        sharedProps={sharedProps}
      />

      <SuggestionsMain
        feedbackItems={feedbackItems}
        getSelectedFeedbackItemId={getSelectedFeedbackItemId}
        sharedProps={sharedProps}
      />
    </div>
  );
};

SuggestionsContent.propTypes = {
  feedbackItems: PropTypes.arrayOf(PropTypes.object),
  getSortByCriteria: PropTypes.func.isRequired,
  getSelectedFeedbackItemId: PropTypes.func,
  sharedProps: PropTypes.object,
  mobileSideMenuOpen: PropTypes.bool,
};

export default SuggestionsContent;
