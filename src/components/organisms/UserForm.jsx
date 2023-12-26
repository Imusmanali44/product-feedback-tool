import { useState, useEffect } from "react";
import InputGroup from "../molecules/InputGroup";
import Button from "../atoms/button";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { app } from "../../Firebase";
import { useContext } from "react";
import { Context } from "../../shared/context";
import ImageUpload from "../molecules/ImageUpload";
import userImg from "../../assets/images/user.jpg";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    nameError: false,
    emailError: false,
    phoneError: false,
    photoURLError: false,
  });

  const [registerInputItem, setRegisterInputItem] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setSelectedFile(selectedImage);
      setRegisterInputItem({ ...registerInputItem, selectedImage });
      const objectUrl = URL.createObjectURL(selectedImage);
      setImageUrl(objectUrl);
    }
  };

  const [btnLoading, setBtnLoading] = useState(false);

  function handleChange(target) {
    switch (target.name) {
      case "name":
        setRegisterInputItem({
          ...registerInputItem,
          displayName: target.value,
        });
        break;
      case "email":
        setRegisterInputItem({ ...registerInputItem, email: target.value });
        break;
      case "phone":
        setRegisterInputItem({
          ...registerInputItem,
          phoneNumber: target.value,
        });
        break;
      default:
        setRegisterInputItem({ ...registerInputItem });
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const storage = getStorage(app);
    const profileRef = storageRef(storage, `images/${user.id}`);
    await uploadBytes(profileRef, selectedFile);

    const imgUrl = await getDownloadURL(profileRef);

    const auth = getAuth(app);

    if (registerInputItem.displayName.trim() === "") {
      setInput({ ...input, nameError: true });
      setBtnLoading(false);

      return;
    } else if (registerInputItem.email.trim() === "") {
      setInput({ ...input, emailError: true });
      setBtnLoading(false);

      return;
    } else if (registerInputItem.phoneNumber === "") {
      setInput({ ...input, phoneError: true });
      setBtnLoading(false);

      return;
    } else if (registerInputItem.photoURL === "") {
      setInput({ ...input, photoURLError: true });
      setBtnLoading(false);

      return;
    } else {
      updateProfile(auth.currentUser, {
        ...registerInputItem,
        photoURL: imgUrl,
      })
        .then(() => {
          navigate("/");
          setBtnLoading(false);
          toast.success("Profile Updated");
        })
        .catch((error) => {
          console.log(error);
          setBtnLoading(false);
        });
    }
  };

  useEffect(() => {
    if (user) {
      setRegisterInputItem({
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      });
    }
  }, [user]);

  return (
    <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
      <ImageUpload
        image={
          registerInputItem.photoURL ? registerInputItem.photoURL : userImg
        }
        imageUrl={imageUrl}
        handleChange={handleImageChange}
      />
      <InputGroup
        labelText={"Name"}
        inputId={"name"}
        inputType={"text"}
        inputName={"name"}
        inputValue={registerInputItem.displayName}
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
        inputValue={registerInputItem.phoneNumber}
        isRequired={false}
        handleOnChange={handleChange}
        showValidationMessage={input.phoneError}
      />

      <Button
        type={"submit"}
        text={"Update"}
        className={"register-btn button--main"}
        isLink={false}
        isLoading={btnLoading}
      />
    </form>
  );
};

export default RegisterForm;
