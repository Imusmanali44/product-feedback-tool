import { useState, useEffect } from "react";
import GoBackHeader from "../components/molecules/GoBackHeader";
import FeedbackForm from "../components/organisms/FeedbackForm";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../Firebase";
import { useParams } from "react-router-dom";

const EditFeedBack = () => {
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
    <div className="add-feedback form-page container">
      <GoBackHeader />
      <main className={"add-edit-feedback__main form_main"}>

        <h1 className="title">{`Editing '${feedbackDetail?.title}'`}</h1>

        <FeedbackForm isEditing={true} feedbackDetail={feedbackDetail} />
      </main>
    </div>
  );
};

export default EditFeedBack;
