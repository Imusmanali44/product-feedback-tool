import { useState } from "react";
import InputGroup from "../molecules/InputGroup";
import Button from "../atoms/button";
import { useNavigate } from "react-router-dom";
import { app } from "../../Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { getAuthErrorMessage } from "../../utils/helperfunction";

const LoginForm = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    emailError: false,
    passwordError: false,
  });

  const [loginInputItem, setLoginInputItem] = useState({
    email: "",
    password: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  function handleChange(target) {
    switch (target.name) {
      case "email":
        setLoginInputItem({ ...loginInputItem, email: target.value });
        break;

      case "password":
        setLoginInputItem({ ...loginInputItem, password: target.value });
        break;

      default:
        setLoginInputItem({ ...loginInputItem });
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const auth = getAuth(app);
    setBtnLoading(true);
    if (loginInputItem.email.trim() === "") {
      setInput({ ...input, emailError: true });
      setBtnLoading(false);

      return;
    } else if (loginInputItem.password.trim() === "") {
      setInput({ ...input, passwordError: true });
      setBtnLoading(false);

      return;
    } else {
      setInput({ emailError: false, passwordError: false });
      signInWithEmailAndPassword(
        auth,
        loginInputItem.email,
        loginInputItem.password
      )
        .then(() => {
          setBtnLoading(false);
          toast.success("Successfully Logged in");
          navigate("/");
        })
        .catch((error) => {
          setBtnLoading(false);
          const errorMessage = getAuthErrorMessage(error.code);
          toast.error(errorMessage);
          console.error(error);
        });
    }
  }

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <InputGroup
        labelText={"Email"}
        inputId={"email"}
        inputType={"email"}
        inputName={"email"}
        inputValue={loginInputItem.email}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.emailError}
      />
      <InputGroup
        labelText={"Password"}
        inputId={"password"}
        inputType={"password"}
        inputName={"password"}
        inputValue={loginInputItem.password}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.passwordError}
      />

      <Button
        type={"submit"}
        text={"Login"}
        className={"login-btn button--main"}
        isLink={false}
        isLoading={btnLoading}
      />
    </form>
  );
};

export default LoginForm;
