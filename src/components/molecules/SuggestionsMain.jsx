import { PropTypes } from "prop-types";

import FeedbackItem from "./FeedbackItem";
import SuggestionsEmpty from "./SuggestionsEmpty";

const SuggestionsMain = ({ feedbackItems, sharedProps }) => {
  return (
    <main className="suggestions__main">
      <div className="suggestions__main-content container">
        {feedbackItems.length > 0 ? (
          feedbackItems.map((item) => (
            <FeedbackItem
              id={item.id}
              key={item.id}
              title={item.title}
              message={item.description}
              tagCategory={item.category}
              totalUpvotes={item.upvotes}
              totalComments={item.comments ? Object.keys(item.comments).length : 0}
              isLink={true}
              feedbackItemObject={item}
            />
          ))
        ) : (
          <SuggestionsEmpty sharedProps={sharedProps} />
        )}
      </div>
    </main>
  );
};

SuggestionsMain.propTypes = {
  feedbackItems: PropTypes.arrayOf(PropTypes.object),
  sharedProps: PropTypes.object,
};

export default SuggestionsMain;
