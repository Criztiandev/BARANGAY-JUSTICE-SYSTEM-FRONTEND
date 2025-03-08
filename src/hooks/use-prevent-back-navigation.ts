import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * A custom hook to prevent navigation to previous pages and redirect to a specified route
 * when users press the back button.
 *
 * @param redirectTo - The route to redirect to when back button is pressed
 * @param enabled - Whether the hook is enabled (default: true)
 */
const usePreventBackNavigation = (
  redirectTo: string,
  enabled: boolean = true
) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!enabled) return;

    // Store the current location path in session storage when the component mounts
    // or when location changes
    const currentPath = location.pathname;
    const storedPath = sessionStorage.getItem("lastPath");

    if (storedPath && storedPath !== currentPath) {
      // If there's a stored path and it's different from the current path,
      // it means the user navigated (possibly by pressing back)
      navigate(redirectTo, { replace: true });
    }

    // Update the stored path
    sessionStorage.setItem("lastPath", currentPath);

    // Additional protection: handle the popstate event
    const handlePopState = () => {
      navigate(redirectTo, { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location, navigate, redirectTo, enabled]);
};

export default usePreventBackNavigation;
