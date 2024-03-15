import { createContext, useState } from "react";

const ProgressContext = createContext({
  progress: "",
  showSpinner: () => {},
  hideSpinner: () => {},
  showError: () => {},
  hideError: () => {},
  onDisplayForm: () => {},
  hideForm: () => {},
  showSuccess: () => {},
  hideSuccess: () => {},
});
export default ProgressContext;

export function ProgressContextProvider({ children }) {
  const [showForm, setShowForm] = useState(false);
  const [userProgress, setUserProgress] = useState({
    progressState: "form",
    value: "",
  });

  const onDisplayForm = () => {
    setShowForm(true);
  };
  const hideForm = () => {
    setShowForm(false);
    setUserProgress({
      progressState: "form",
      value: "",
    });
  };
  const cancel = () => {
    setShowForm(false);
    setUserProgress({
      progressState: "form",
      value: "",
    });
  };

  const showError = (value) => {
    setUserProgress({
      progressState: "error",
      value: value,
    });
  };
  const hideError = () => {
    setUserProgress(() => {
      return {
        progressState: "",
        value: "",
      };
    });
  };
  const showSpinner = () => {
    setUserProgress(() => {
      return {
        progressState: "spinner",
        value: "",
      };
    });
  };
  // const hideSpinner = () => {
  //   setUserProgress(() => {
  //     return {
  //       progressState: "",
  //       value: "",
  //     };
  //   });
  // };

  const showSuccess = () => {
    setUserProgress(() => {
      return {
        progressState: "success",
        value: "",
      };
    });
  };
  // const hideSuccess = () => {
  //   setUserProgress(() => {
  //     return {
  //       progressState: "",
  //       value: "",
  //     };
  //   });
  // };
  console.log(userProgress);
  console.log(showForm);
  const userProgressCTX = {
    progress: userProgress.progressState,
    value: userProgress.value,
    showForm,
    showError,
    hideError,
    onDisplayForm,
    hideForm,
    showSpinner,
    // hideSpinner,
    showSuccess,
    cancel,
    // hideSuccess,
  };

  return (
    <ProgressContext.Provider value={userProgressCTX}>
      {children}
    </ProgressContext.Provider>
  );
}
