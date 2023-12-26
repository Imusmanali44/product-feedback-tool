import { useState } from "react";

function useToggle() {
  const [isComponentShowing, setIsComponentShowing] = useState(false);

  function toggleComponent() {
    setIsComponentShowing(!isComponentShowing);
  }

  return {
    shouldShowComponent: isComponentShowing,
    toggleComponent: toggleComponent,
  };
}

export default useToggle;
