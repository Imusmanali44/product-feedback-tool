import GoBackHeader from "../components/molecules/GoBackHeader";
import FeedbackForm from "../components/organisms/FeedbackForm";

function AddFeedbackPage() {
  return (
    <div className="add-feedback form-page container">
      <GoBackHeader />
      <main className={"add-edit-feedback__main form_main"}>
        <div className={"add-edit-feedback__icon--add"}></div>

        <h1 className="title">{"Create New Feedback"}</h1>

        <FeedbackForm isEditing={false} />
      </main>
    </div>
  );
}

export default AddFeedbackPage;
