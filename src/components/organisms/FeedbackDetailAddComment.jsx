import { PropTypes } from "prop-types";
import { useState } from "react";

import TextArea from "../atoms/Textarea";
import Button from "../atoms/button";
import { useContext } from "react";
import { Context } from "../../shared/context";
import { app } from "../../Firebase";
import { getDatabase, ref, set } from "firebase/database";

function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);

  return `${timestamp}${randomStr}`;
}

const FeedbackDetailAddComment = ({ feedbackItem }) => {
  const { user } = useContext(Context);
  const [maxLength, setMaxLength] = useState(250);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const [commentToAdd, setCommentToAdd] = useState({
    id: 0,
    content: "",
    user: {
      userId: "",
      name: "",
      username: "",
      image: "",
    },
  });

  function handleChange(target) {
    if (target.value.length - typedCharacters === 1)
      setMaxLength(maxLength - 1);
    else setMaxLength(maxLength + (typedCharacters - target.value.length));

    setTypedCharacters(target.value.length);

    setCommentToAdd({ ...commentToAdd, content: target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setBtnLoading(true);
    const db = getDatabase(app);

    if (commentToAdd.content.trim() === "") {
      setShowValidationMessage(true);
      setBtnLoading(false);

      return;
    } else {
      const uniqueCommentId = generateUniqueId();
      const commentData = {
        ...commentToAdd,
        id: uniqueCommentId,
        user: {
          userId: user.uid,
          name: user.displayName,
          username: user.displayName,
          image: user.photoURL,
        },
      };

      set(
        ref(db, `feedback/${feedbackItem.id}/comments/${uniqueCommentId}`),
        commentData
      )
        .then((res) => {
          setBtnLoading(false);
          console.log(res);
          // navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setBtnLoading(false);
        });
    }

    setCommentToAdd({
      id: 0,
      content: "",
      user: {
        userId: "",
        name: "",
        username: "",
        image: "",
      },
    });
  }

  return (
    <section className="feedback-detail__add-comment">
      <h2 className="title">Add Comment</h2>

      <form className="add-comment__form" onSubmit={(e) => handleSubmit(e)}>
        <label
          htmlFor="add-feedback-message-comment"
          className="screen-reader-only"
        >
          Type your comment here
        </label>

        <TextArea
          name={"add-feedback-message-comment"}
          id={"add-feedback-message-comment"}
          placeholder={"Type your comment here"}
          handleOnChange={handleChange}
          isRequired={false}
          value={commentToAdd.content}
          showValidationMessage={showValidationMessage}
        />

        <div className="add-comment__button-container">
          <p
            className="add-comment__character-limit-message"
            aria-live="polite"
          >
            <span
              className="add-comment__character-limit"
              data-testid="comment-character-limit"
            >
              {maxLength}
            </span>{" "}
            Characters left
          </p>

          <Button
            type={"submit"}
            text={" Post Comment"}
            className="button button--main button--add-feedback"
            isLink={false}
            isLoading={btnLoading}
          />
        </div>
      </form>
    </section>
  );
};

FeedbackDetailAddComment.propTypes = {
  feedbackItem: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  updateFeedbackItem: PropTypes.func,
};

export default FeedbackDetailAddComment;
