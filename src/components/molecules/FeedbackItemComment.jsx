// import { useState } from "react";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";

import FeedbackItemCommentReply from "./FeedbackItemCommentReply";
import CommentReplyForm from "./CommentReplyForm";
import useToggle from "../../hooks/useToggle";
import userImg from "../../assets/images/user.jpg";

const FeedbackItemComment = ({
  commentText,
  commenter,
  feedbackItem,
  replies,
  commentId,
}) => {
  const commenterFirstName = commenter.name.split(" ")[0].toLowerCase();

  const toggler = useToggle();

  const [repliesData, setReplies] = useState([]);

  useEffect(() => {
    if (replies) {
      const feedbackCommentArray = Object.keys(replies).map(
        (key) => ({
          id: key,
          ...replies[key],
        })
      );

      setReplies(feedbackCommentArray);
    }
  }, [replies]);


  return (
    <li className="feedback-detail__comment">
      <div className="comment__img-container">
        <img
          src={commenter.image ? commenter.image : userImg}
          alt={`${commenterFirstName}'s headshot`}
          className="comment__user-img"
        />
      </div>

      <div className="comment__header">
        <div className="comment__user-info">
          <h3 className="comment__user-name">{commenter.name}</h3>

          <p className="comment__user-handle">{`@${commenter.username}`}</p>
        </div>

        <div className="comment__reply-container">
          <button
            type="button"
            className="comment__reply-button button"
            onClick={() => toggler.toggleComponent(true)}
          >
            Reply
          </button>
        </div>
      </div>

      <div className="comment__message-container">
        <p className="comment__message">{commentText}</p>
      </div>

      <CommentReplyForm
        shouldShow={toggler.shouldShowComponent}
        toggleCommentReplyForm={toggler.toggleComponent}
        commentId={commentId}
        feedbackItem={feedbackItem}
        replyUsername={commenter.username}
      />

      {repliesData?.length > 0 && (
        <ul className="comment__replies">
          {repliesData.map((reply, index) => (
            <FeedbackItemCommentReply
              key={index}
              replyText={reply.content}
              replyingTo={reply.replyingTo}
              personReplying={reply.user}
              topLevelCommentId={commentId}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

FeedbackItemComment.propTypes = {
  commentText: PropTypes.string.isRequired,
  commenter: PropTypes.object.isRequired,
  feedbackItem: PropTypes.object,
  replies: PropTypes.object,
  commentId: PropTypes.string.isRequired,
};

export default FeedbackItemComment;
