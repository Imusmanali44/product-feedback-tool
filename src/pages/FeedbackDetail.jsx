import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../Firebase";

import GoBackHeader from "../components/molecules/GoBackHeader";
import FeedbackDetailMain from "../components/organisms/FeedbackDetailMain";

function FeedbackDetail({ toggleEditPage }) {
  const { id } = useParams();
  const [feedbackDetail, setFeedbackDetail] = useState(null);

  useEffect(() => {
    const db = getDatabase(app);
    const feedbackRef = ref(db, `feedback/${id}`);

    onValue(feedbackRef, (snapshot) => {
      const feedbackData = snapshot.val();
      setFeedbackDetail(feedbackData);
    });
  }, [id]);

  return (
    <div className="feedback-detail form-page container">
      <GoBackHeader
        hasSecondaryButton={true}
        secButtonText={"Edit Feedback"}
        secButtonClassName={"button--edit-feedback"}
        toggleEditPage={toggleEditPage}
        btnLinkParam={`/edit-feedback/${id}`}
      />

      <FeedbackDetailMain feedbackItem={feedbackDetail} />
    </div>
  );
}

FeedbackDetail.propTypes = {
  toggleEditPage: PropTypes.func,
};

export default FeedbackDetail;
