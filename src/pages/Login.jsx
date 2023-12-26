import LoginForm from "../components/organisms/LoginForm";
import Heading from "../components/atoms/Heading";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login form-page container">
      <Heading className="app-title" element="h1">
        Product FeedBack Tool App
      </Heading>
      <main className="login_main form_main">
        <Heading className="title text-center" element="h2">
          Login
        </Heading>
        <LoginForm />
        <div className="footer-sec">
          <p>{"Don't have account?"}</p>
          <Link to={"/register"}>SignUp</Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
