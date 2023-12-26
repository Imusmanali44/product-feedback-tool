import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import FeedbackItem from "../molecules/FeedbackItem";
import FeedbackDetailAddComment from "./FeedbackDetailAddComment";
import FeedbackItemComments from "./FeedbackItemComments";

const FeedbackDetailMain = ({ feedbackItem }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (feedbackItem?.comments) {
      const feedbackCommentArray = Object.keys(feedbackItem.comments).map(
        (key) => ({
          id: key,
          ...feedbackItem.comments[key],
        })
      );

      setComments(feedbackCommentArray);
    }
  }, [feedbackItem]);

  if (feedbackItem === null) {
    return;
  } else if (feedbackItem !== undefined) {
    return (
      <main className="feedback-detail__main">
        <FeedbackItem
          id={feedbackItem.id}
          title={feedbackItem.title}
          message={feedbackItem.description}
          tagCategory={feedbackItem.category}
          totalUpvotes={feedbackItem.upvotes}
          totalComments={
            feedbackItem.comments
              ? Object.keys(feedbackItem.comments).length
              : 0
          }
        />

        {comments?.length > 0 && (
          <FeedbackItemComments
            comments={comments}
            feedbackItem={feedbackItem}
          />
        )}

        <FeedbackDetailAddComment feedbackItem={feedbackItem} />
      </main>
    );
  }
};

FeedbackDetailMain.propTypes = {
  feedbackItem: PropTypes.object,
};

export default FeedbackDetailMain;
