export const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substr(2, 5);

  return `${timestamp}${randomStr}`;
};

export const getAuthErrorMessage = (errorCode) => {
  console.log(errorCode);
  switch (errorCode) {
    case "auth/invalid-credential":
      return "Invalid email password.";
    case "auth/user-disabled":
      return "This user account has been disabled.";
    case "auth/user-not-found":
      return "User not found. Please check your credentials.";
    case "auth/wrong-password":
      return "Invalid password. Please try again.";
    case "auth/too-many-requests":
      return "Too many unsuccessful login attempts. Please try again later.";

    default:
      return "An error occurred while signing in. Please try again later.";
  }
};
