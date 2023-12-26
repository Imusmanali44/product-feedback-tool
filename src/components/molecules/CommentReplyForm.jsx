import { useState, useContext } from "react";
import { PropTypes } from "prop-types";
import { Context } from "../../shared/context";

import Button from "../atoms/button";
import TextArea from "../atoms/Textarea";
import { app } from "../../Firebase";
import { getDatabase, ref, set } from "firebase/database";
import { generateUniqueId } from "../../utils/helperfunction";


const CommentReplyForm = ({
  shouldShow,
  commentId,
  toggleCommentReplyForm,
  replyUsername,
  feedbackItem,
}) => {
  const { user } = useContext(Context);

  const [btnLoading, setBtnLoading] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const [reply, setReply] = useState({
    id: "",
    content: "",
    replyingTo: "",
    user: {
      userId: "",
      name: "",
      username: "",
      image: "",
    },
  });

  function handleChange(target) {
    setReply({
      content: target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setBtnLoading(true);
    const db = getDatabase(app);

    if (reply.content.trim() === "") {
      setShowValidationMessage(true);
      setBtnLoading(false);

      return;
    } else {
      const uniqueReplyId = generateUniqueId();
      const replyData = {
        ...reply,
        id: uniqueReplyId,
        replyingTo: replyUsername,
        user: {
          userId: user.uid,
          name: user.displayName,
          username: user.displayName,
          image: user.photoURL,
        },
      };

      set(
        ref(
          db,
          `feedback/${feedbackItem.id}/comments/${commentId}/replies/${uniqueReplyId}`
        ),
        replyData
      )
        .then((res) => {
          setBtnLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setBtnLoading(false);
        });
    }

    toggleCommentReplyForm(false);
  }

  return (
    <div
      className={
        shouldShow
          ? "comment__reply-form-container"
          : "comment__reply-form-container--hidden"
      }
      data-testid="comment-reply-form"
    >
      <form className="comment__reply-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="comment__reply-form-textarea-container">
          <TextArea
            isRequired={false}
            name={"comment-reply"}
            id={"comment-reply"}
            placeholder={"Write a reply"}
            handleOnChange={handleChange}
            value={reply.content}
            showValidationMessage={showValidationMessage}
          />
        </div>

        <div className="comment__reply-form-button-container">
          <Button
            text={"Post Reply"}
            className={"button--add-feedback"}
            type={"submit"}
            isLoading={btnLoading}
          />
        </div>
      </form>
    </div>
  );
};

CommentReplyForm.propTypes = {
  shouldShow: PropTypes.bool,
  replyUsername: PropTypes.string,
  commentId: PropTypes.string,
  toggleCommentReplyForm: PropTypes.func,
  replyingToReply: PropTypes.bool,
  feedbackItem: PropTypes.object,
};

export default CommentReplyForm;
