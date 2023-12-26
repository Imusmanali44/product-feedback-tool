import { useState, useEffect } from "react";
import "./css/main.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddFeedBack from "./pages/AddFeedback";
import EditFeedBack from "./pages/EditFeedBack";
import FeedbackDetail from "./pages/FeedbackDetail";
import MyProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import { AuthContext } from "./shared/context";
import { Protected } from "./components/organisms/Protected";
import useToggle from "./hooks/useToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // set responsiveness layout view
  const mobileLayoutUpperBound = 600;

  const toggler = useToggle();

  const isEditing = toggler.shouldShowComponent;
  const toggleIsEditing = toggler.toggleComponent;

  const roadmapPageUpperBound = 700;

  const [isMobileScreen, setIsMobileScreen] = useState(
    window.outerWidth < mobileLayoutUpperBound
  );
  const [isSmallerThan700px, setIsSmallerThan700px] = useState(
    window.outerWidth < roadmapPageUpperBound
  );

  useEffect(() => {
    window.addEventListener("resize", showMobileLayout);

    return () => window.removeEventListener("resize", showMobileLayout);
  }, [isMobileScreen]);

  useEffect(() => {
    window.addEventListener("resize", showRoadmapPageNavbar);

    return () => window.removeEventListener("resize", showRoadmapPageNavbar);
  }, [isSmallerThan700px]);

  function showRoadmapPageNavbar() {
    setIsSmallerThan700px(window.outerWidth < roadmapPageUpperBound);
  }

  function showMobileLayout() {
    setIsMobileScreen(window.outerWidth < mobileLayoutUpperBound);
  }

  /**
   * set shared props
   */

  const sharedProps = {
    isMobileScreen,
    isEditing,
    isSmallerThan700px,
    toggleIsEditing,
  };

  const router = createBrowserRouter([
    { path: "/", element: <Home sharedProps={sharedProps} /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/dashboard",
      element: (
        <Protected>
          <Dashboard />
        </Protected>
      ),
    },
    {
      path: "/add-feedback",
      element: (
        <Protected>
          <AddFeedBack />
        </Protected>
      ),
    },
    {
      path: "/edit-feedback/:id",
      element: (
        <Protected>
          <EditFeedBack />
        </Protected>
      ),
    },
    {
      path: "/feedback-detail/:id",
      element: (
        <Protected>
          <FeedbackDetail />
        </Protected>
      ),
    },

    {
      path: "/my-profile",
      element: (
        <Protected>
          <MyProfile />
        </Protected>
      ),
    },
  ]);

  return (
    <AuthContext>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </AuthContext>
  );
}

export default App;
