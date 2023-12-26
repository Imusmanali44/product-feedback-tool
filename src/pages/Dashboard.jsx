import { getAuth, signOut } from "firebase/auth";
import { app } from "../Firebase";
const Dashboard = () => {
  const Logout = () => {
    const auth = getAuth(app);
    signOut(auth).then((res) => {
      console.log(res);
    });
  };

  return (
    <button className="button" onClick={Logout}>
      Hello Dashboard
    </button>
  );
};

export default Dashboard;
