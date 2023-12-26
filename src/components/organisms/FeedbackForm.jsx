import { useState, useEffect } from "react";
import InputGroup from "../molecules/InputGroup";
import Button from "../atoms/button";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, remove } from "firebase/database";
import { app } from "../../Firebase";
import { useContext } from "react";
import { Context } from "../../shared/context";
import { generateUniqueId } from "../../utils/helperfunction";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";

const FeedbackForm = ({ isEditing, feedbackDetail }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const [delBtnLoading, setDelBtnLoading] = useState(false);

  const [input, setInput] = useState({
    showTitleError: false,
    showCategoryError: false,
    showDetailError: false,
  });

  const [feedbackItem, setFeedbackItem] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    comments: [],
    status: "",
    upvotes: 0,
    userId: "",
  });

  function handleChange(target) {
    switch (target.name) {
      case "feedback-title":
        setFeedbackItem({ ...feedbackItem, title: target.value });
        break;

      case "feedback-category":
        setFeedbackItem({ ...feedbackItem, category: target.value });
        break;

      case "feedback-status":
        setFeedbackItem({ ...feedbackItem, status: target.value });
        break;

      case "feedback-description":
        setFeedbackItem({ ...feedbackItem, description: target.value });
        break;

      default:
        setFeedbackItem({ ...feedbackItem });
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setBtnLoading(true);
    const db = getDatabase(app);

    if (feedbackItem.title.trim() === "") {
      setInput({ ...input, showTitleError: true });
      setBtnLoading(false);

      return;
    } else if (feedbackItem.category.trim() === "") {
      setInput({ ...input, showCategoryError: true });
      setBtnLoading(false);

      return;
    } else if (feedbackItem.description.trim() === "") {
      setInput({ ...input, showDetailError: true });
      setBtnLoading(false);

      return;
    } else {
      if (!isEditing) {
        const uniqueFeedbackId = generateUniqueId();
        const feedbackData = {
          ...feedbackItem,
          id: uniqueFeedbackId,
          userId: user.uid,
        };

        set(ref(db, `feedback/${uniqueFeedbackId}`), feedbackData)
          .then(() => {
            setBtnLoading(false);
            toast.success("Feedback Submitted");
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        set(ref(db, `feedback/${feedbackItem.id}`), feedbackItem)
          .then(() => {
            setBtnLoading(false);
            toast.success("Feedback Edited");
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  function getReadOnlyValue(inputName, value) {
    if (inputName === "feedback-category")
      setFeedbackItem({ ...feedbackItem, category: value });
    else if (inputName === "feedback-status")
      setFeedbackItem({ ...feedbackItem, status: value });
  }

  useEffect(() => {
    if (feedbackDetail) {
      setFeedbackItem({
        id: feedbackDetail.id,
        title: feedbackDetail.title,
        description: feedbackDetail.description,
        category: feedbackDetail.category,
        comments: feedbackDetail.comments,
        upvotes: feedbackDetail.upvotes,
        userId: feedbackDetail.userId,
      });
    }
  }, [feedbackDetail]);

  const deleteData = (objectId) => {
    setDelBtnLoading(true);
    const db = getDatabase(app);
    const objectRef = ref(db, `feedback/${objectId}`);

    remove(objectRef)
      .then(() => {
        toast.success("Feedback removed successfully!");
        setDelBtnLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setDelBtnLoading(false);
        console.error("Error removing object: ", error);
      });
  };

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <InputGroup
        labelText={"Feedback Title"}
        inputId={"feedback-title"}
        inputType={"text"}
        inputName={"feedback-title"}
        inputValue={feedbackItem.title}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.showTitleError}
      />
      <InputGroup
        labelText={"Category"}
        inputId={"feedback-category"}
        inputType={"text"}
        inputName={"feedback-category"}
        inputValue={feedbackItem.category}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.showCategoryError}
        hasDropdown={true}
        dropdownItemType={"Category"}
        updateReadOnlyValue={getReadOnlyValue}
      />
      <InputGroup
        labelText={"Feedback Detail"}
        inputId={"feedback-description"}
        inputType={"text"}
        inputName={"feedback-description"}
        inputValue={feedbackItem.description}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.showDetailError}
        isTextArea={true}
      />

      <div
        className={
          isEditing
            ? "add-edit-feedback__buttons--editing"
            : "add-edit-feedback__buttons"
        }
      >
        {isEditing && (
          <button
            type="button"
            className={"button button--main button--delete"}
            onClick={() => deleteData(feedbackItem.id)}
          >
            {delBtnLoading ? "Deleting..." : "Delete"}
          </button>
        )}

        <Button text={"Cancel"} className={"button--cancel"} />

        <Button
          type={"submit"}
          text={"Add FeedBack"}
          className={"button--main"}
          isLink={false}
          isLoading={btnLoading}
        />
      </div>
    </form>
  );
};

FeedbackForm.propTypes = {
  isEditing: PropTypes.bool,
  feedbackDetail: PropTypes.object,
};

export default FeedbackForm;
