import RegisterForm from "../components/organisms/RegisterForm";
import Heading from "../components/atoms/Heading";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="login form-page container">
      <Heading className="app-title" element="h1">
        Product FeedBack Tool App
      </Heading>
      <main className="login_main form_main">
        <Heading className="title text-center" element="h2">
          Sign Up
        </Heading>
        <RegisterForm />
        <div className="footer-sec">
          <p>{"Already have account?"}</p>
          <Link to={"/login"}>Login</Link>
        </div>
      </main>
    </div>
  );
};

export default Register;
