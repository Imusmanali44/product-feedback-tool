import { useState } from "react";
import InputGroup from "../molecules/InputGroup";
import Button from "../atoms/button";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../Firebase";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    nameError: false,
    emailError: false,
    passwordError: false,
    phoneError: false,
  });

  const [registerInputItem, setRegisterInputItem] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [btnLoading, setBtnLoading] = useState(false);

  function handleChange(target) {
    switch (target.name) {
      case "name":
        setRegisterInputItem({ ...registerInputItem, name: target.value });
        break;
      case "email":
        setRegisterInputItem({ ...registerInputItem, email: target.value });
        break;

      case "phone":
        setRegisterInputItem({ ...registerInputItem, phone: target.value });
        break;

      case "password":
        setRegisterInputItem({ ...registerInputItem, password: target.value });
        break;

      default:
        setRegisterInputItem({ ...registerInputItem });
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const auth = getAuth(app);
    setBtnLoading(true);
    if (registerInputItem.name.trim() === "") {
      setInput({ ...input, nameError: true });

      return;
    } else if (registerInputItem.email.trim() === "") {
      setInput({ ...input, emailError: true });

      return;
    } else if (registerInputItem.password.trim() === "") {
      setInput({ ...input, passwordError: true });

      return;
    } else if (registerInputItem.phone.trim() === "") {
      setInput({ ...input, phoneError: true });

      return;
    } else {
      createUserWithEmailAndPassword(
        auth,
        registerInputItem.email,
        registerInputItem.password
      )
        .then((res) => {
          setBtnLoading(false);
          const user = res.user;
          updateProfile(user, {
            displayName: registerInputItem.name,
            phoneNumber: registerInputItem.phone,
          });
          toast.success("Successfully Registered your account");
          navigate("/login");
        })
        .catch((err) => {
          setBtnLoading(false);
          console.log(err);
          toast.error(err.message);
        });
    }
  }

  return (
    <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
      <InputGroup
        labelText={"Name"}
        inputId={"name"}
        inputType={"text"}
        inputName={"name"}
        inputValue={registerInputItem.name}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.nameError}
      />
      <InputGroup
        labelText={"Email"}
        inputId={"email"}
        inputType={"email"}
        inputName={"email"}
        inputValue={registerInputItem.email}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.emailError}
      />
      <InputGroup
        labelText={"Phone Number"}
        inputId={"phone"}
        inputType={"number"}
        inputName={"phone"}
        inputValue={registerInputItem.phone}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.phoneError}
      />
      <InputGroup
        labelText={"Password"}
        inputId={"password"}
        inputType={"password"}
        inputName={"password"}
        inputValue={registerInputItem.password}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.passwordError}
      />

      <Button
        type={"submit"}
        text={"Register"}
        className={"register-btn button--main"}
        isLink={false}
        isLoading={btnLoading}
      />
    </form>
  );
};

export default RegisterForm;
