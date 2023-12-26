import UserForm from "../components/organisms/UserForm";
import GoBackHeader from "../components/molecules/GoBackHeader";

const UserProfile = () => {
  return (
    <div className="form-page container">
      <GoBackHeader />
      <main className={"add-edit-feedback__main form_main"}>
        <h1 className="title">My Profile</h1>
        <UserForm />
      </main>
    </div>
  );
};

export default UserProfile;
